import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    ScrollView,
    TouchableOpacity,
    View,
    Alert,
    Image,
    Modal,
    FlatList,
    BackHandler,
    TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styles from './styles';
import { AppStyles, MetricsMod } from '../../themes';
import VectorIconComponent from '../../Component';
import { ICON_TYPES } from '../../constants/constant';
import CustomAlertPermission from '../../Component/CustomAlertPermission';
import CustomTextInput from '../../Component/customTextInput';
import DatePicker from 'react-native-date-picker';
import SignatureCanvas from 'react-native-signature-canvas';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { LoaderAction } from '../../redux/Actions';
import AlertMiddleware from '../../redux/Middlewares/AlertMiddleware';
import { MAIN_SCREENS } from '../../constants/screens';
import moment from 'moment';

const REPORT_TYPES = [
    'Inventory Report',
    'Mid term Inspection',
    'Checkout Report',
];

const TOGGLE_ITEMS = [
    { label: 'Pre Paid Electricity Meter', key: 'prePaidElectricMeter' },
    { label: 'Pre Paid Gas Meter', key: 'prePaidGasMeter' },
    { label: 'Water Meter Reading', key: 'waterMeter' },
    { label: 'Smoke Alarm', key: 'smokeAlarm' },
    { label: 'CO Alarm', key: 'coAlarm' },
    { label: 'Heating System', key: 'heatingSystem' },
];

let idCounter = 0;
const generateUniqueId = () => `room_${Date.now()}_${idCounter++}`;

const SignatureSection = React.memo(({ label, type, signature, onOpenModal, onClear, error }) => {
    return (
        <View style={styles.signatureSection}>
            <Text style={styles.formLabel}>
                {label}
                <Text style={styles.mandatoryStar}> *</Text>
            </Text>
            <TouchableOpacity
                style={[styles.signaturePicker, error && styles.errorBorder]}
                onPress={() => onOpenModal(type)}
            >
                <Text style={styles.signaturePickerText}>
                    {signature ? 'View/Edit Signature' : 'Add Signature'}
                </Text>
                <VectorIconComponent
                    name="edit"
                    size={20}
                    color={AppStyles.colorSet.appPrimaryColor}
                    type={ICON_TYPES.AntDesign}
                />
            </TouchableOpacity>
            {signature && (
                <View style={styles.signaturePreviewContainer}>
                    <Image source={{ uri: signature }} style={styles.signaturePreview} resizeMode="contain" />
                </View>
            )}
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
});

const EditProperty = ({ navigation, route }) => {
    const { id, property } = route.params;
    const [selectedReport, setSelectedReport] = useState(REPORT_TYPES[0]);
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [selectedDateField, setSelectedDateField] = useState('');
    const [signatureModalVisible, setSignatureModalVisible] = useState(false);
    const [currentSignatureType, setCurrentSignatureType] = useState(null);
    const [formData, setFormData] = useState({
        propertyAddress: '',
        tenantName: '',
        inspectorName: '',
        inspectionDate: null,
        epcExpiryDate: null,
        gasSafetyCertExpiry: null,
        eicrExpiryDate: null,
        electricityMeter: '',
        gasMeter: '',
        waterMeterReading: '',
        prePaidElectricMeter: false,
        prePaidGasMeter: false,
        waterMeter: false,
        smokeAlarm: false,
        coAlarm: false,
        heatingSystem: false,
        adviceForLandlord: '',
        adviceForTenant: '',
        summary: '',
        inspectorSignature: '',
        tenantSignature: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [images, setImages] = useState({
        main: [],
        features: {
            prePaidElectricMeter: [],
            prePaidGasMeter: [],
            waterMeter: [],
            smokeAlarm: [],
            coAlarm: [],
            heatingSystem: [],
        },
    });
    const [currentImageType, setCurrentImageType] = useState(null);
    const [currentRoomId, setCurrentRoomId] = useState(null);
    const [currentRoomType, setCurrentRoomType] = useState(null);
    const [roomSections, setRoomSections] = useState({
        frontSideAspects: [],
        entranceHalls: [],
        livingRooms: [],
        kitchens: [],
        rearGardens: [],
        landings: [],
        bedrooms: [],
        bathrooms: [],
    });
    const [inspectorSignature, setInspectorSignature] = useState(null);
    const [tenantSignature, setTenantSignature] = useState(null);
    const inspectorSignatureRef = useRef(null);
    const tenantSignatureRef = useRef(null);
    const isRemovingImage = useRef(false);
    const [roomCounters, setRoomCounters] = useState({
        livingRoom: 1,
        bedroom: 1,
        bathroom: 1,
    });
    const [isMounted, setIsMounted] = useState(true);

    const user = useSelector((state) => state.AuthReducer.user);
    const token = user?.jwtToken;
    const dispatch = useDispatch();

    useEffect(() => {
        if (property) {
            populateFormData(property);
        } else {
            getPropertiesByUserId();
        }

        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (signatureModalVisible || openDatePicker || isAlertVisible) {
                setSignatureModalVisible(false);
                setOpenDatePicker(false);
                setAlertVisible(false);
                return true;
            }
            navigation.navigate(MAIN_SCREENS.HOME);
            return true;
        });

        return () => {
            backHandler.remove();
            setIsMounted(false);
        };
    }, [navigation, property]);

    useEffect(() => {
        return () => {
            setIsMounted(false);
            inspectorSignatureRef.current?.clearSignature?.();
            tenantSignatureRef.current?.clearSignature?.();
        };
    }, []);

    const populateFormData = (data) => {
        setFormData({
            propertyAddress: data.property_address || '',
            tenantName: data.tenant_name || '',
            inspectorName: data.inspector_name || '',
            inspectionDate: data.inspection_date ? new Date(data.inspection_date) : null,
            epcExpiryDate: data.epc_expiry_date ? new Date(data.epc_expiry_date) : null,
            gasSafetyCertExpiry: data.gas_safety_certificate_exp_date ? new Date(data.gas_safety_certificate_exp_date) : null,
            eicrExpiryDate: data.eicr_expiry_date ? new Date(data.eicr_expiry_date) : null,
            electricityMeter: data.electricity_meter_reading || '',
            gasMeter: data.gas_meter_reading || '',
            waterMeterReading: data.water_meter_reading || '',
            prePaidElectricMeter: data.electricity_meter === 'Yes',
            prePaidGasMeter: data.gas_meter === 'Yes',
            waterMeter: data.water_meter === 'Yes',
            smokeAlarm: data.smoke_alarm === 'Working',
            coAlarm: data.co_alarm === 'Working',
            heatingSystem: data.heating_system === 'Central',
            adviceForLandlord: data.asked_landlord_to || '',
            adviceForTenant: data.advised_tenant_to || '',
            summary: data.final_remarks || '',
            inspectorSignature: data.signature_inspector || '',
            tenantSignature: data.signature_tenant || '',
        });

        setSelectedReport(data.types || REPORT_TYPES[0]);
        setInspectorSignature(data.signature_inspector || null);
        setTenantSignature(data.signature_tenant || null);

        setImages({
            main: data.main_img ? [`https://api.inventorywise.co.uk/uploads/${data.main_img}`] : [],
            features: {
                prePaidElectricMeter: data.electricity_meter_img ? [`https://api.inventorywise.co.uk/uploads/${data.electricity_meter_img}`] : [],
                prePaidGasMeter: data.gas_meter_img ? [`https://api.inventorywise.co.uk/uploads/${data.gas_meter_img}`] : [],
                waterMeter: data.water_meter_img ? [`https://api.inventorywise.co.uk/uploads/${data.water_meter_img}`] : [],
                smokeAlarm: [
                    data.smoke_alarm_front_img ? `https://api.inventorywise.co.uk/uploads/${data.smoke_alarm_front_img}` : '',
                    data.smoke_alarm_back_img ? `https://api.inventorywise.co.uk/uploads/${data.smoke_alarm_back_img}` : '',
                ].filter(Boolean),
                coAlarm: [
                    data.co_alarm_front_img ? `https://api.inventorywise.co.uk/uploads/${data.co_alarm_front_img}` : '',
                    data.co_alarm_back_img ? `https://api.inventorywise.co.uk/uploads/${data.co_alarm_back_img}` : '',
                ].filter(Boolean),
                heatingSystem: data.heating_system_img ? [`https://api.inventorywise.co.uk/uploads/${data.heating_system_img}`] : [],
            },
        });

        const roomMapping = {
            'Front & Side Aspect': 'frontSideAspects',
            'Entrance Hall': 'entranceHalls',
            'Living Room 1': 'livingRooms',
            'Living Room 2': 'livingRooms',
            'Kitchen': 'kitchens',
            'Rear Garden': 'rearGardens',
            'Landing': 'landings',
            'Bedroom 1': 'bedrooms',
            'Bedroom 2': 'bedrooms',
            'Bedroom 3': 'bedrooms',
            'Bathroom 1': 'bathrooms',
            'Bathroom 2': 'bathrooms',
        };

        const fieldDefaults = {
            frontSideAspects: { walls: 'Fair', windows: 'Fair', lawn_drive_way: 'Fair', doors: 'Fair' },
            entranceHalls: { walls: 'Fair', windows: 'Fair', ceiling: 'Fair', floor: 'Fair', doors: 'Fair' },
            livingRooms: { walls: 'Fair', ceiling: 'Fair', windows: 'Fair', floor: 'Fair', doors: 'Fair' },
            kitchens: { walls: 'Fair', units: 'Fair', appliances: 'Fair', doors: 'Fair', floor: 'Fair', ceiling: 'Fair' },
            rearGardens: { wall_fence: 'Fair', lawn: 'Fair', plants: 'Fair', structures: 'Fair' },
            landings: { walls: 'Fair', windows: 'Fair', ceiling: 'Fair', floor: 'Fair', doors: 'Fair' },
            bedrooms: { walls: 'Fair', ceiling: 'Fair', windows: 'Fair', floor: 'Fair', doors: 'Fair' },
            bathrooms: { walls: 'Fair', ceiling: 'Fair', windows: 'Fair', floor: 'Fair', doors: 'Fair', fixtures: 'Fair', bath_shower_set: 'Fair' },
        };

        const newRoomSections = {
            frontSideAspects: [],
            entranceHalls: [],
            livingRooms: [],
            kitchens: [],
            rearGardens: [],
            landings: [],
            bedrooms: [],
            bathrooms: [],
        };

        const newRoomCounters = {
            livingRoom: 1,
            bedroom: 1,
            bathroom: 1,
        };

        data.property_details.forEach((detail) => {
            const sectionKey = roomMapping[detail.name];
            if (!sectionKey) return;

            const roomType = {
                frontSideAspects: 'frontSideAspect',
                entranceHalls: 'hall',
                livingRooms: 'livingRoom',
                kitchens: 'kitchen',
                rearGardens: 'garden',
                landings: 'landing',
                bedrooms: 'bedroom',
                bathrooms: 'bathroom',
            }[sectionKey];

            const fields = { ...fieldDefaults[sectionKey] };
            Object.keys(fields).forEach((field) => {
                if (detail[field] !== null && detail[field] !== undefined) {
                    fields[field] = detail[field];
                }
            });

            newRoomSections[sectionKey].push({
                id: generateUniqueId(),
                name: detail.name,
                type: roomType,
                fields,
                images: detail.property_images.map((img) => `https://api.inventorywise.co.uk/uploads/${img.url}`),
                description: detail.description || '',
            });

            if (sectionKey === 'livingRooms') newRoomCounters.livingRoom += 1;
            if (sectionKey === 'bedrooms') newRoomCounters.bedroom += 1;
            if (sectionKey === 'bathrooms') newRoomCounters.bathroom += 1;
        });

        setRoomSections(newRoomSections);
        setRoomCounters(newRoomCounters);
    };

    const getPropertiesByUserId = async () => {
        dispatch(LoaderAction.LoaderTrue());
        try {
            const response = await axios.get(`https://api.inventorywise.co.uk/properties/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            populateFormData(response.data);
            dispatch(LoaderAction.LoaderFalse());
        } catch (error) {
            dispatch(LoaderAction.LoaderFalse());
            console.error("Error fetching properties:", error.message);
            if (error.response) {
                console.error("Response error:", error.response.data);
                console.error("Status:", error.response.status);
            }
            setApiError('Failed to load property data. Please try again.');
        }
    };

    const formatDate = (date) => {
        if (!date) return null;
        return moment(date).utc().format('DD/MM/YYYY');
    };

    const formatDateApi = (date) => {
        if (!date) return null;
        return moment(date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
    };

    const handleOpenModalSignature = (type) => {
        setCurrentSignatureType(type);
        setSignatureModalVisible(true);
    };

    const handleCloseModalSignature = () => {
        setSignatureModalVisible(false);
        setCurrentSignatureType(null);
    };

    const handleSaveInspectorSignature = (signature) => {
        setInspectorSignature(signature);
        setFormData((prev) => ({ ...prev, inspectorSignature: signature }));
        setFormErrors((prev) => ({ ...prev, inspectorSignature: '' }));
        handleCloseModalSignature();
    };

    const handleClearInspectorSignature = () => {
        inspectorSignatureRef.current.clearSignature();
        setInspectorSignature(null);
        setFormData((prev) => ({ ...prev, inspectorSignature: null }));
    };

    const handleSaveTenantSignature = (signature) => {
        setTenantSignature(signature);
        setFormData((prev) => ({ ...prev, tenantSignature: signature }));
        setFormErrors((prev) => ({ ...prev, tenantSignature: '' }));
        handleCloseModalSignature();
    };

    const handleClearTenantSignature = () => {
        tenantSignatureRef.current.clearSignature();
        setTenantSignature(null);
        setFormData((prev) => ({ ...prev, tenantSignature: null }));
    };

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        setFormErrors((prev) => ({ ...prev, [key]: '' }));
        setApiError('');
    };

    const removeRoom = (type, id) => {
        const pluralMap = {
            livingRoom: 'livingRooms',
            bedroom: 'bedrooms',
            bathroom: 'bathrooms',
        };

        setRoomSections((prev) => ({
            ...prev,
            [pluralMap[type]]: prev[pluralMap[type]].filter((room) => room.id !== id),
        }));
        setRoomCounters((prev) => ({
            ...prev,
            [type]: prev[type] > 1 ? prev[type] - 1 : prev[type],
        }));
    };

    const addRoom = (type) => {
        dispatch(AlertMiddleware.showSuccess(`${type} Added Successfully`));
        const fieldDefaults = {
            livingRoom: { walls: 'Fair', ceiling: 'Fair', windows: 'Fair', floor: 'Fair', doors: 'Fair' },
            bedroom: { walls: 'Fair', ceiling: 'Fair', windows: 'Fair', floor: 'Fair', doors: 'Fair' },
            bathroom: { walls: 'Fair', ceiliceilingngs: 'Fair', windows: 'Fair', floor: 'Fair', doors: 'Fair', fixtures: 'Fair', bath_shower_set: 'Fair' },
        };

        const pluralMap = {
            livingRoom: 'livingRooms',
            bedroom: 'bedrooms',
            bathroom: 'bathrooms',
        };

        const newRoom = {
            id: generateUniqueId(),
            name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${roomCounters[type]}`,
            type,
            fields: fieldDefaults[type],
            images: [],
            description: '',
        };

        setRoomSections((prev) => ({
            ...prev,
            [pluralMap[type]]: [...prev[pluralMap[type]], newRoom],
        }));

        setRoomCounters((prev) => ({
            ...prev,
            [type]: prev[type] + 1,
        }));
    };

    const handleRemoveImage = useCallback(
        (type, index, roomType, roomId) => {
            if (isRemovingImage.current) return;
            isRemovingImage.current = true;

            const pluralMap = {
                frontSideAspect: 'frontSideAspects',
                hall: 'entranceHalls',
                livingRoom: 'livingRooms',
                kitchen: 'kitchens',
                garden: 'rearGardens',
                landing: 'landings',
                bedroom: 'bedrooms',
                bathroom: 'bathrooms',
            };

            if (type === 'room') {
                setRoomSections((prev) => ({
                    ...prev,
                    [pluralMap[roomType]]: prev[pluralMap[roomType]].map((room) =>
                        room.id === roomId ? { ...room, images: room.images.filter((_, i) => i !== index) } : room
                    ),
                }));
            } else if (TOGGLE_ITEMS.some((item) => item.key === type)) {
                setImages((prev) => ({
                    ...prev,
                    features: {
                        ...prev.features,
                        [type]: prev.features[type].filter((_, i) => i !== index),
                    },
                }));
            } else {
                setImages((prev) => ({
                    ...prev,
                    [type]: prev[type].filter((_, i) => i !== index),
                }));
            }

            setTimeout(() => {
                isRemovingImage.current = false;
            }, 100);
        },
        []
    );

    const validateForm = () => {
        let errors = {};
        if (!formData.propertyAddress.trim()) {
            errors.propertyAddress = 'Property Address is required';
            dispatch(AlertMiddleware.showErrorAlert(errors.propertyAddress));
        }
        if (!formData.tenantName.trim()) {
            errors.tenantName = 'Tenant Name is required';
            dispatch(AlertMiddleware.showErrorAlert(errors.tenantName));
        }
        if (!formData.inspectorName.trim()) {
            errors.inspectorName = 'Inspector Name is required';
            dispatch(AlertMiddleware.showErrorAlert(errors.inspectorName));
        }
        if (images.main.length === 0) {
            errors.mainImage = 'Exactly one main picture is required';
            dispatch(AlertMiddleware.showErrorAlert(errors.mainImage));
        }
        if (images.main.length > 1) {
            errors.mainImage = 'Only one main picture is allowed';
            dispatch(AlertMiddleware.showErrorAlert(errors.mainImage));
        }
        if (!formData.adviceForLandlord.trim()) {
            errors.adviceForLandlord = 'Advice for Landlord is required';
            dispatch(AlertMiddleware.showErrorAlert(errors.adviceForLandlord));
        }
        if (!formData.adviceForTenant.trim()) {
            errors.adviceForTenant = 'Advice for Tenant is required';
            dispatch(AlertMiddleware.showErrorAlert(errors.adviceForTenant));
        }
        if (!formData.summary.trim()) {
            errors.summary = 'Summary is required';
            dispatch(AlertMiddleware.showErrorAlert(errors.summary));
        }
        if (!formData.inspectorSignature) {
            errors.inspectorSignature = 'Inspector’s Signature is required';
            dispatch(AlertMiddleware.showErrorAlert(errors.inspectorSignature));
        }
        if (!formData.tenantSignature) {
            errors.tenantSignature = 'Tenant’s Signature is required';
            dispatch(AlertMiddleware.showErrorAlert(errors.tenantSignature));
        }
        if (formData.prePaidElectricMeter && !formData.electricityMeter.trim()) {
            errors.electricityMeter = 'Electricity meter reading is required';
            dispatch(AlertMiddleware.showErrorAlert(errors.electricityMeter));
        }
        if (formData.prePaidGasMeter && !formData.gasMeter.trim()) {
            errors.gasMeter = 'Gas meter reading is required';
            dispatch(AlertMiddleware.showErrorAlert(errors.gasMeter));
        }
        if (formData.waterMeter && !formData.waterMeterReading.trim()) {
            errors.waterMeterReading = 'Water meter reading is required';
            dispatch(AlertMiddleware.showErrorAlert(errors.waterMeterReading));
        }

        ['prePaidElectricMeter', 'prePaidGasMeter', 'waterMeter', 'smokeAlarm', 'coAlarm'].forEach((key) => {
            if (formData[key] && images.features[key].length !== 1) {
                errors[`${key}Image`] = `Exactly one image is required for ${TOGGLE_ITEMS.find((item) => item.key === key).label}`;
                dispatch(AlertMiddleware.showErrorAlert(errors[`${key}Image`]));
            }
        });

        if (formData.heatingSystem && images.features.heatingSystem.length > 1) {
            errors.heatingSystemImage = 'Maximum one image allowed for Heating System';
            dispatch(AlertMiddleware.showError(errors.heatingSystemImage));
        }

        Object.entries(roomSections).forEach(([sectionKey, rooms]) => {
            rooms.forEach((room, index) => {
                Object.keys(room.fields).forEach((keyField) => {
                    if (!room.fields[keyField]?.trim()) {
                        errors[`room_${sectionKey}_${index}_${keyField}`] = `${keyField.charAt(0).toUpperCase() + keyField.slice(1)} condition is required`;
                        dispatch(AlertMiddleware.showError(errors[`room_${sectionKey}_${index}_${keyField}`]));
                    }
                });
                if (room.images.length > 6) {
                    errors[`room_${sectionKey}_${index}_images`] = `Maximum six images allowed for ${room.name}`;
                    dispatch(AlertMiddleware.showError(errors[`room_${sectionKey}_${index}_images`]));
                }
            });
        });

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        // if (!validateForm()) {
        //     return;
        // }
        dispatch(LoaderAction.LoaderTrue());
        try {
            const propertyDetails = [];
            Object.entries(roomSections).forEach(([sectionKey, rooms]) => {
                rooms.forEach((room) => {
                    const fieldMappings = {
                        frontSideAspects: ['walls', 'windows', 'lawn_drive_way', 'doors'],
                        entranceHalls: ['walls', 'windows', 'ceiling', 'floor', 'doors'],
                        livingRooms: ['walls', 'ceiling', 'windows', 'floor', 'doors'],
                        kitchens: ['walls', 'units', 'appliances', 'doors', 'floor', 'ceiling'],
                        rearGardens: ['wall_fence', 'lawn', 'plants', 'structures'],
                        landings: ['walls', 'windows', 'ceiling', 'floor', 'doors'],
                        bedrooms: ['walls', 'ceiling', 'windows', 'floor', 'doors'],
                        bathrooms: ['walls', 'ceiling', 'windows', 'floor', 'doors', 'fixtures', 'bath_shower_set'],
                    };

                    const detail = {
                        name: room.name,
                        description: room.description,
                        images: room.images.map((url) => url.replace('https://api.inventorywise.co.uk/uploads/', '')),
                    };

                    const fieldsToInclude = fieldMappings[sectionKey] || [];
                    fieldsToInclude.forEach((field) => {
                        if (room.fields[field] !== undefined) {
                            detail[field] = room.fields[field];
                        }
                    });

                    propertyDetails.push(detail);
                });
            });

            const payload = {
                user_id: parseInt(user?.id, 10) || 1,
                property_address: formData.propertyAddress,
                tenant_name: formData.tenantName,
                inspector_name: formData.inspectorName,
                inspectiondate: formatDateApi(formData.inspectionDate),
                epc_expiry_date: formatDateApi(formData.epcExpiryDate),
                gas_safety_certificate_expiry_date: formatDateApi(formData.gasSafetyCertExpiry),
                eicr_expiry_date: formatDateApi(formData.eicrExpiryDate),
                electricity_meter: formData.prePaidElectricMeter ? 'Yes' : 'No',
                gas_meter: formData.prePaidGasMeter ? 'Yes' : 'No',
                water_meter: formData.waterMeter ? 'Yes' : 'No',
                smoke_alarm: formData.smokeAlarm ? 'Working' : 'Not Working',
                co_alarm: formData.coAlarm ? 'Working' : 'Not Working',
                heating_system: formData.heatingSystem ? 'Central' : 'None',
                signature_inspector: formData.inspectorSignature || '',
                advised_tenant_to: formData.adviceForTenant,
                asked_landlord_to: formData.adviceForLandlord,
                contractor_instructed: 'Plumber Ltd.',
                gas_meter_reading: formData.gasMeter,
                electricity_meter_reading: formData.electricityMeter,
                water_meter_reading: formData.waterMeterReading,
                types: selectedReport,
                signature_tenant: formData.tenantSignature || '',
                final_remarks: formData.summary,
                main_img: images.main[0]?.replace('https://api.inventorywise.co.uk/uploads/', '') || '',
                electricity_meter_img: images.features.prePaidElectricMeter[0]?.replace('https://api.inventorywise.co.uk/uploads/', '') || '',
                gas_meter_img: images.features.prePaidGasMeter[0]?.replace('https://api.inventorywise.co.uk/uploads/', '') || '',
                water_meter_img: images.features.waterMeter[0]?.replace('https://api.inventorywise.co.uk/uploads/', '') || '',
                smoke_alarm_front_img: images.features.smokeAlarm[0]?.replace('https://api.inventorywise.co.uk/uploads/', '') || '',
                smoke_alarm_back_img: images.features.smokeAlarm[1]?.replace('https://api.inventorywise.co.uk/uploads/', '') || '',
                co_alarm_front_img: images.features.coAlarm[0]?.replace('https://api.inventorywise.co.uk/uploads/', '') || '',
                co_alarm_back_img: images.features.coAlarm[1]?.replace('https://api.inventorywise.co.uk/uploads/', '') || '',
                heating_system_img: images.features.heatingSystem[0]?.replace('https://api.inventorywise.co.uk/uploads/', '') || '',
                property_details: propertyDetails,
            };

            console.log('Full API Payload:4554544%$%$%$$%545', JSON.stringify(payload, null, 2));

            const response = await axios.put(`https://api.inventorywise.co.uk/properties/${id}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            Alert.alert('Success', 'Property updated successfully!');
            dispatch(LoaderAction.LoaderFalse());
            navigation.navigate(MAIN_SCREENS.HOME);
        } catch (error) {
            console.log(error, "ASDF:LASD:FLA:SDFASDLF:")
            dispatch(LoaderAction.LoaderFalse());
            setApiError(error.response?.data?.message || 'Failed to update property. Please try again.');
            dispatch(AlertMiddleware.showError('Failed to update property'));
            console.error('API Error:', error.response?.data || error.message);
        }
    };

    const handleRoomFieldChange = (roomId, roomType, field, value) => {
        const pluralMap = {
            frontSideAspect: 'frontSideAspects',
            hall: 'entranceHalls',
            livingRoom: 'livingRooms',
            kitchen: 'kitchens',
            garden: 'rearGardens',
            landing: 'landings',
            bedroom: 'bedrooms',
            bathroom: 'bathrooms',
        };

        setRoomSections((prev) => ({
            ...prev,
            [pluralMap[roomType]]: prev[pluralMap[roomType]].map((room) =>
                room.id === roomId ? { ...room, fields: { ...room.fields, [field]: value } } : room
            ),
        }));
    };

    const handleRoomNameChange = (roomId, type, newName) => {
        const pluralMap = {
            frontSideAspect: 'frontSideAspects',
            hall: 'entranceHalls',
            livingRoom: 'livingRooms',
            kitchen: 'kitchens',
            garden: 'rearGardens',
            landing: 'landings',
            bedroom: 'bedrooms',
            bathroom: 'bathrooms',
        };

        setRoomSections((prev) => ({
            ...prev,
            [pluralMap[type]]: prev[pluralMap[type]].map((room) =>
                room.id === roomId ? { ...room, name: newName } : room
            ),
        }));
    };

    const handleDateChange = (date) => {
        setFormData((prev) => ({ ...prev, [selectedDateField]: date }));
        setFormErrors((prev) => ({ ...prev, [selectedDateField]: '' }));
        setOpenDatePicker(false);
    };

    const handleShowAlert = (imageType, roomId = null) => {
        setCurrentImageType(imageType);
        if (roomId) {
            setCurrentRoomId(roomId);
            setCurrentRoomType(
                roomSections.frontSideAspects.find((r) => r.id === roomId)
                    ? 'frontSideAspect'
                    : roomSections.entranceHalls.find((r) => r.id === roomId)
                        ? 'hall'
                        : roomSections.livingRooms.find((r) => r.id === roomId)
                            ? 'livingRoom'
                            : roomSections.kitchens.find((r) => r.id === roomId)
                                ? 'kitchen'
                                : roomSections.rearGardens.find((r) => r.id === roomId)
                                    ? 'garden'
                                    : roomSections.landings.find((r) => r.id === roomId)
                                        ? 'landing'
                                        : roomSections.bedrooms.find((r) => r.id === roomId)
                                            ? 'bedroom'
                                            : roomSections.bathrooms.find((r) => r.id === roomId)
                                                ? 'bathroom'
                                                : null
            );
        }
        setAlertVisible(true);
    };

    const handleHideAlert = () => setAlertVisible(false);

    const requestCameraPermission = async () => {
        return true;
    };

    const openCamera = async () => {
        const hasPermission = await requestCameraPermission();
        if (hasPermission) {
            launchCamera({ mediaType: 'photo' }, handleImageUpload);
        } else {
            Alert.alert('Permission Denied', 'Camera permission is required to take photos.');
        }
    };

    const openGallery = async () => {
        const singleImageFeatures = ['prePaidElectricMeter', 'prePaidGasMeter', 'waterMeter', 'smokeAlarm', 'coAlarm'];
        const selectionLimit = currentImageType === 'main' || singleImageFeatures.includes(currentImageType) ? 1 : 4;

        launchImageLibrary(
            {
                mediaType: 'photo',
                selectionLimit,
                includeExtra: true,
            },
            handleImageUpload
        );
    };

    const validateImage = (asset) => {
        const validFormats = ['image/jpeg', 'image/png'];
        const maxSize = 30 * 1024 * 1024;

        if (!validFormats.includes(asset.type)) {
            return { isValid: false, error: 'Only JPEG or PNG images are allowed.' };
        }

        if (asset.fileSize && asset.fileSize > maxSize) {
            return { isValid: false, error: 'Image size must not exceed 20MB.' };
        }

        return { isValid: true };
    };


    const uploadImages = async (assets, token, dispatch) => {
        try {
            dispatch(LoaderAction.LoaderTrue());

            const formData = new FormData();
            assets.forEach((asset, index) => {
                const validation = validateImage(asset);
                if (!validation.isValid) {
                    throw new Error(validation.error);
                }
                formData.append('images', {
                    uri: asset.uri,
                    type: asset.type || 'image/jpeg',
                    name: asset.fileName || `image_${Date.now()}_${index}.jpg`,
                });
            });

            const response = await axios.post('https://api.inventorywise.co.uk/properties/upload-images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            const imageUrls = response.data.files.map(
                (file) => `https://api.inventorywise.co.uk/uploads/${file.filename}`
            );

            return imageUrls;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || error.message || 'Failed to upload images'
            );
        } finally {
            dispatch(LoaderAction.LoaderFalse());
        }
    };

    const handleImageUpload = async (response) => {
        if (response.didCancel || response.errorCode) return;

        try {
            const maxMainImages = 1;
            const maxFeatureImages = ['prePaidElectricMeter', 'prePaidGasMeter', 'waterMeter', 'smokeAlarm', 'coAlarm'].includes(currentImageType) ? 1 : 1;
            const maxRoomImages = 5;

            let currentImageCount = 0;
            if (currentImageType === 'main') {
                currentImageCount = images.main.length;
                if (currentImageCount >= maxMainImages) {
                    Alert.alert('Limit Reached', 'Only one main picture is allowed.');
                    return;
                }
            } else if (currentImageType === 'room') {
                const pluralMap = {
                    frontSideAspect: 'frontSideAspects',
                    hall: 'entranceHalls',
                    livingRoom: 'livingRooms',
                    kitchen: 'kitchens',
                    garden: 'rearGardens',
                    landing: 'landings',
                    bedroom: 'bedrooms',
                    bathroom: 'bathrooms',
                };
                const room = roomSections[pluralMap[currentRoomType]]?.find((r) => r.id === currentRoomId);
                currentImageCount = room?.images.length || 0;
                if (currentImageCount >= maxRoomImages) {
                    Alert.alert('Limit Reached', `Maximum five images allowed for ${room.name}.`);
                    return;
                }
            } else if (TOGGLE_ITEMS.some((item) => item.key === currentImageType)) {
                currentImageCount = images.features[currentImageType]?.length || 0;
                if (currentImageCount >= maxFeatureImages) {
                    Alert.alert(
                        'Limit Reached',
                        `Only one image allowed for ${TOGGLE_ITEMS.find((item) => item.key === currentImageType).label}.`
                    );
                    return;
                }
            }

            let allowedImages = response.assets;
            if (currentImageType === 'main') {
                allowedImages = response.assets.slice(0, maxMainImages - currentImageCount);
            } else if (currentImageType === 'room') {
                allowedImages = response.assets.slice(0, maxRoomImages - currentImageCount);
            } else if (TOGGLE_ITEMS.some((item) => item.key === currentImageType)) {
                allowedImages = response.assets.slice(0, maxFeatureImages - currentImageCount);
            }

            if (allowedImages.length === 0) return;

            const uploadedUrls = await uploadImages(allowedImages, token, dispatch);

            if (currentImageType === 'main') {
                setImages((prev) => ({ ...prev, main: [...prev.main, ...uploadedUrls] }));
            } else if (currentImageType === 'room') {
                const pluralMap = {
                    frontSideAspect: 'frontSideAspects',
                    hall: 'entranceHalls',
                    livingRoom: 'livingRooms',
                    kitchen: 'kitchens',
                    garden: 'rearGardens',
                    landing: 'landings',
                    bedroom: 'bedrooms',
                    bathroom: 'bathrooms',
                };
                setRoomSections((prev) => ({
                    ...prev,
                    [pluralMap[currentRoomType]]: prev[pluralMap[currentRoomType]].map((room) =>
                        room.id === currentRoomId ? { ...room, images: [...room.images, ...uploadedUrls] } : room
                    ),
                }));
            } else {
                setImages((prev) => ({
                    ...prev,
                    features: {
                        ...prev.features,
                        [currentImageType]: [...(prev.features[currentImageType] || []), ...uploadedUrls],
                    },
                }));
            }

            if (response.assets.length > allowedImages.length) {
                Alert.alert(
                    'Partial Upload',
                    `Only ${allowedImages.length} image(s) were uploaded due to the ${currentImageType === 'main' ||
                        ['prePaidElectricMeter', 'prePaidGasMeter', 'waterMeter', 'smokeAlarm', 'coAlarm'].includes(currentImageType)
                        ? '1-image'
                        : '3-image'
                    } limit.`
                );
            }
        } catch (error) {
            Alert.alert('Upload Failed', error.message || 'Failed to upload images. Please try again.');
        }
    };

    const debounceToggle = useCallback(
        (key, value) => {
            setFormData((prev) => ({ ...prev, [key]: value === 'Yes' }));
            setFormErrors((prev) => ({ ...prev, [key]: '' }));
        },
        []
    );

    const renderReportType = () => (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
            style={styles.horizontalScrollView}
            horizontal
        >
            {REPORT_TYPES.map((report) => (
                <TouchableOpacity
                    key={report}
                    style={[styles.reportButton, selectedReport === report && styles.selectedReportButton]}
                    onPress={() => setSelectedReport(report)}
                >
                    <Text
                        style={[styles.buttonText, { color: 'black' }, selectedReport === report && styles.selectedButtonText]}
                    >
                        {report}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    const renderBack = () => (
        <View style={styles.rowView}>
            <TouchableOpacity onPress={() => navigation.navigate(MAIN_SCREENS.HOME)}>
                <View
                    style={[
                        styles.backCircleView,
                        { height: MetricsMod.thirty, width: MetricsMod.thirty, borderRadius: MetricsMod.thirty / 2 },
                    ]}
                >
                    <VectorIconComponent
                        name="chevron-back-outline"
                        size={25}
                        color={AppStyles.colorSet.black}
                        style={styles.iconStyles}
                        type={ICON_TYPES.IonIcons}
                    />
                </View>
            </TouchableOpacity>
            <Text style={styles.heading}>Edit Property</Text>
            <VectorIconComponent
                name="chevron-back-outline"
                size={25}
                color={AppStyles.colorSet.blurBackground}
                style={styles.iconStyles}
                type={ICON_TYPES.IonIcons}
            />
        </View>
    );

    const propertyMainPicture = () => (
        <View>
            <Text style={styles.formLabel}>
                Main Picture
                <Text style={styles.mandatoryStar}> *</Text>
            </Text>

            {images.main.length > 0 ? (
                <View style={styles.imagePreviewContainer}>
                    <Image source={{ uri: images.main[0] }} style={styles.imagePreview} resizeMode="contain" />
                    <TouchableOpacity
                        style={styles.cancelIcon}
                        onPress={() => handleRemoveImage('main', 0)}
                    >
                        <VectorIconComponent
                            name="closecircle"
                            size={20}
                            color={AppStyles.colorSet.appRed}
                            type={ICON_TYPES.AntDesign}
                        />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    style={[styles.propertyImagePicContainer, formErrors.mainImage && styles.imageError]}
                    onPress={() => handleShowAlert('main')}
                >
                    <VectorIconComponent
                        name="images"
                        size={40}
                        color={formErrors.mainImage ? AppStyles.colorSet.appRed : AppStyles.colorSet.appPrimaryColor}
                        type={ICON_TYPES.IonIcons}
                    />
                </TouchableOpacity>
            )}

            {images.main.length < 1 && (
                <TouchableOpacity style={styles.uploadButton} onPress={() => handleShowAlert('main')}>
                    <VectorIconComponent
                        name="camera"
                        size={24}
                        color={AppStyles.colorSet.appPrimaryColor}
                        type={ICON_TYPES.FontAwesome}
                    />
                    <Text style={styles.imageCountText}>1/1</Text>
                </TouchableOpacity>
            )}

            {formErrors.mainImage && <Text style={styles.errorText}>{formErrors.mainImage}</Text>}
        </View>
    );


    const renderField = (label, key, placeholder, keyboardType = 'default') => (
        <View>
            <Text style={styles.formLabel}>
                {label}
                {key !== 'electricityMeter' && key !== 'gasMeter' && key !== 'waterMeterReading' && (
                    <Text style={styles.mandatoryStar}> *</Text>
                )}
            </Text>
            <CustomTextInput
                placeholder={placeholder}
                value={formData[key]}
                customInput={{ fontSize: 16 }}
                onChangeText={(text) => handleChange(key, text)}
                keyboardType={keyboardType}
                isRequired={key !== 'electricityMeter' && key !== 'gasMeter' && key !== 'waterMeterReading'}
                customContainerInput={styles.textInput}
            />
            {formErrors[key] && <Text style={styles.errorText}>{formErrors[key]}</Text>}
        </View>
    );

    const renderDateField = (label, key) => (
        <View>
            <Text style={styles.formLabel}>{label}</Text>
            <TouchableOpacity
                style={[styles.datePickerView, formErrors[key] && styles.errorBorder]}
                onPress={() => {
                    setSelectedDateField(key);
                    setOpenDatePicker(true);
                }}
            >
                <Text style={styles.dateText}>
                    {formData[key] ? formatDate(formData[key]) : 'Select Date'}
                </Text>
                <VectorIconComponent
                    name="calendar"
                    size={24}
                    color={AppStyles.colorSet.appPrimaryColor}
                    type={ICON_TYPES.AntDesign}
                />
            </TouchableOpacity>
            {formErrors[key] && <Text style={styles.errorText}>{formErrors[key]}</Text>}
        </View>
    );

    const renderToggleSection = (label, key) => (
        <View style={styles.toggleContainer}>
            <View style={styles.toggleHeader}>
                <Text style={styles.toggleLabel}>{label}</Text>
                <View style={styles.toggleGroup}>
                    {['Yes', 'No'].map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={[
                                styles.toggleButton,
                                formData[key] === (option === 'Yes') && styles.selectedToggle,
                                formErrors[key] && styles.errorBorder,
                            ]}
                            onPress={() => debounceToggle(key, option)}
                        >
                            <Text
                                style={[
                                    styles.toggleText,
                                    formData[key] === (option === 'Yes') && styles.selectedToggleText,
                                ]}
                            >
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.meterImageContainer}>
                <Text style={styles.imageUploadLabel}>Upload {label}</Text>
                <FlatList
                    horizontal
                    data={images.features[key]}
                    keyExtractor={(uri, index) => `${key}_${index}_${uri.replace(/[^a-zA-Z0-9]/g, '')}`}
                    renderItem={({ item: uri, index }) => (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri }} style={styles.meterImagePreview} resizeMode="contain" />
                            <TouchableOpacity
                                style={styles.cancelIcon}
                                onPress={() => handleRemoveImage(key, index)}
                            >
                                <VectorIconComponent
                                    name="closecircle"
                                    size={20}
                                    color={AppStyles.colorSet.appRed}
                                    type={ICON_TYPES.AntDesign}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <TouchableOpacity
                            style={[styles.meterImageButton, formErrors[`${key}Image`] && styles.imageError]}
                            onPress={() => handleShowAlert(key)}
                        >
                            <VectorIconComponent
                                name="camera"
                                size={32}
                                color={AppStyles.colorSet.appPrimaryColor}
                                type={ICON_TYPES.FontAwesome}
                            />
                        </TouchableOpacity>
                    )}
                    ListFooterComponent={() => (
                        images.features[key].length < 1 ? (
                            <TouchableOpacity style={styles.uploadButton} onPress={() => handleShowAlert(key)}>
                                <VectorIconComponent
                                    name="camera"
                                    size={24}
                                    color={AppStyles.colorSet.appPrimaryColor}
                                    type={ICON_TYPES.FontAwesome}
                                />
                                <Text style={styles.imageCountText}>{images.features[key].length}/1</Text>
                            </TouchableOpacity>
                        ) : null
                    )}
                />
                {formErrors[`${key}Image`] && <Text style={styles.errorText}>{formErrors[`${key}Image`]}</Text>}
            </View>
        </View>
    );

    const renderRoomSection = (type, label, allowAdd = false) => {
        const fieldNames = {
            frontSideAspect: ['walls', 'windows', 'lawn_drive_way', 'doors'],
            hall: ['walls', 'windows', 'ceiling', 'floor', 'doors'],
            livingRoom: ['walls', 'ceiling', 'windows', 'floor', 'doors'],
            kitchen: ['walls', 'units', 'appliances', 'doors', 'floor', 'ceiling'],
            garden: ['wall_fence', 'lawn', 'plants', 'structures'],
            landing: ['walls', 'windows', 'ceiling', 'floor', 'doors'],
            bedroom: ['walls', 'ceiling', 'windows', 'floor', 'doors'],
            bathroom: ['walls', 'ceiling', 'windows', 'floor', 'doors', 'fixtures', 'bath_shower_set'],
        };

        const pluralMap = {
            frontSideAspect: 'frontSideAspects',
            hall: 'entranceHalls',
            livingRoom: 'livingRooms',
            kitchen: 'kitchens',
            garden: 'rearGardens',
            landing: 'landings',
            bedroom: 'bedrooms',
            bathroom: 'bathrooms',
        };

        return (
            <View key={type} style={styles.roomSectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeading}>{label}</Text>
                </View>
                {roomSections[pluralMap[type]].map((room) => (
                    <View key={room.id} style={styles.roomContainer}>
                        <View style={styles.roomHeader}>
                            <CustomTextInput
                                placeholder="Enter room name"
                                value={room.name}
                                onChangeText={(text) => handleRoomNameChange(room.id, type, text)}
                                customContainerInput={styles.roomNameInput}
                            />
                            {allowAdd && (
                                <TouchableOpacity onPress={() => removeRoom(type, room.id)}>
                                    <VectorIconComponent
                                        name="close"
                                        type={ICON_TYPES.MaterialIcons}
                                        size={20}
                                        color={AppStyles.colorSet.appRed}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                        {fieldNames[type].map((field) => (
                            <View key={`${room.id}_${field}`} style={styles.conditionRow}>
                                <Text style={styles.conditionLabel}>
                                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                                </Text>
                                <CustomTextInput
                                    placeholder="Condition"
                                    value={room.fields[field]}
                                    placeholderTextColor="rgba(33, 37, 41, 0.5)"
                                    onChangeText={(text) => handleRoomFieldChange(room.id, type, field, text)}
                                    customContainerInput={styles.conditionInput}
                                    customInput={{ color: 'rgba(33, 37, 41, 0.5)' }}
                                />
                            </View>
                        ))}
                        <Text style={styles.sectionHeading}>Additional Details</Text>
                        <TextInput
                            placeholder="Enter description..."
                            multiline
                            numberOfLines={3}
                            value={room.description}
                            onChangeText={(text) =>
                                setRoomSections((prev) => ({
                                    ...prev,
                                    [pluralMap[type]]: prev[pluralMap[type]].map((r) =>
                                        r.id === room.id ? { ...r, description: text } : r
                                    ),
                                }))
                            }
                            style={styles.descriptionInput}
                        />
                        <View style={styles.imageUploadContainer}>
                            <Text style={styles.uploadLabel}>Upload Images:</Text>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={room.images}
                                keyExtractor={(img, index) => `${room.id}_img_${index}`}
                                renderItem={({ item: img, index }) => (
                                    <View style={styles.imageContainer}>
                                        <Image source={{ uri: img }} style={styles.thumbnail} resizeMode="contain" />
                                        <TouchableOpacity
                                            style={styles.removeImageButton}
                                            onPress={() => handleRemoveImage('room', index, type, room.id)}
                                        >
                                            <VectorIconComponent
                                                name="closecircle"
                                                size={16}
                                                color={AppStyles.colorSet.appRed}
                                                type={ICON_TYPES.AntDesign}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                ListFooterComponent={() => (
                                    room.images.length < 3 ? (
                                        <TouchableOpacity
                                            style={styles.uploadButton}
                                            onPress={() => {
                                                setCurrentImageType('room');
                                                setCurrentRoomType(type);
                                                setCurrentRoomId(room.id);
                                                handleShowAlert('room', room.id);
                                            }}
                                        >
                                            <VectorIconComponent
                                                name="camera"
                                                size={24}
                                                color={AppStyles.colorSet.appPrimaryColor}
                                                type={ICON_TYPES.FontAwesome}
                                            />
                                            <Text style={styles.imageCountText}>{room.images.length}/5</Text>
                                        </TouchableOpacity>
                                    ) :
                                        (<TouchableOpacity
                                            style={styles.uploadButton}
                                            onPress={() => {
                                                setCurrentImageType('room');
                                                setCurrentRoomType(type);
                                                setCurrentRoomId(room.id);
                                                handleShowAlert('room', room.id);
                                            }}
                                        >
                                            <VectorIconComponent
                                                name="camera"
                                                size={24}
                                                color={AppStyles.colorSet.appPrimaryColor}
                                                type={ICON_TYPES.FontAwesome}
                                            />
                                            <Text style={styles.imageCountText}>{room.images.length}/4</Text>
                                        </TouchableOpacity>)
                                )}
                            />
                        </View>
                    </View>
                ))}
                {allowAdd && (
                    <TouchableOpacity
                        style={[styles.submitButton, styles.addRoomButton]}
                        onPress={() => addRoom(type)}
                    >
                        <Text style={styles.submitButtonText}>Add New {label.slice(0, -1)}</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    const renderSignatureModal = () => (
        <Modal
            visible={signatureModalVisible}
            animationType="slide"
            transparent={false}
            onRequestClose={handleCloseModalSignature}
        >
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>
                        {currentSignatureType === 'inspector' ? 'Inspector’s Signature' : 'Tenant’s Signature'}
                    </Text>
                    <TouchableOpacity onPress={handleCloseModalSignature}>
                        <VectorIconComponent
                            name="close"
                            size={24}
                            color={AppStyles.colorSet.black}
                            type={ICON_TYPES.AntDesign}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.signatureContainer}>
                    <SignatureCanvas
                        ref={currentSignatureType === 'inspector' ? inspectorSignatureRef : tenantSignatureRef}
                        onOK={(signature) => (currentSignatureType === 'inspector' ? handleSaveInspectorSignature(signature) : handleSaveTenantSignature(signature))}
                        descriptionText="Sign within the box"
                        penColor="black"
                        backgroundColor="white"
                        style={styles.signatureCanvas}
                    />
                </View>
            </SafeAreaView>
        </Modal>
    );

    const renderForm = () => (
        <View style={styles.formContainer}>
            {renderField('Property Address', 'propertyAddress', 'e.g., 123 Main St')}
            {renderField('Tenant Name', 'tenantName', 'e.g., John Doe')}
            {renderField('Inspector Name', 'inspectorName', 'e.g., Inspector Name')}
            {renderDateField('Inspection Date', 'inspectionDate')}
            {renderDateField('EPC Expiry Date', 'epcExpiryDate')}
            {renderDateField('Gas Safety Cert Expiry Date', 'gasSafetyCertExpiry')}
            {renderDateField('EICR Expiry Date', 'eicrExpiryDate')}
            {renderField('Electricity Meter Reading', 'electricityMeter', 'e.g., 12345', 'numeric')}
            {renderField('Gas Meter Reading', 'gasMeter', 'e.g., 12345', 'numeric')}
            {renderField('Water Meter Reading', 'waterMeterReading', 'e.g., 12345', 'numeric')}
            <Text style={styles.sectionHeading}>Property Features</Text>
            {TOGGLE_ITEMS.map((item) => renderToggleSection(item.label, item.key))}
            <Text style={styles.sectionHeading}>Room Details</Text>
            {renderRoomSection('frontSideAspect', 'Front & Side Aspects')}
            {renderRoomSection('hall', 'Entrance Hall')}
            {renderRoomSection('livingRoom', 'Living Rooms', true)}
            {renderRoomSection('kitchen', 'Kitchen')}
            {renderRoomSection('garden', 'Rear Garden')}
            {renderRoomSection('landing', 'Landing')}
            {renderRoomSection('bedroom', 'Bedrooms', true)}
            {renderRoomSection('bathroom', 'Bathrooms', true)}
            <Text style={styles.sectionHeading}>Additional Information</Text>
            <View>
                <Text style={styles.formLabel}>
                    Advice for Landlord
                    <Text style={styles.mandatoryStar}> *</Text>
                </Text>
                <CustomTextInput
                    placeholder="Enter advice for landlord..."
                    multiline
                    value={formData.adviceForLandlord}
                    onChangeText={(text) => handleChange('adviceForLandlord', text)}
                    style={styles.descriptionInput}
                    customContainerInput={styles.textInput}
                />
                {formErrors.adviceForLandlord && <Text style={styles.errorText}>{formErrors.adviceForLandlord}</Text>}
            </View>
            <View>
                <Text style={styles.formLabel}>
                    Advice for Tenant
                    <Text style={styles.mandatoryStar}> *</Text>
                </Text>
                <CustomTextInput
                    placeholder="Enter advice for tenant..."
                    multiline
                    value={formData.adviceForTenant}
                    onChangeText={(text) => handleChange('adviceForTenant', text)}
                    style={styles.descriptionInput}
                    customContainerInput={styles.textInput}
                />
                {formErrors.adviceForTenant && <Text style={styles.errorText}>{formErrors.adviceForTenant}</Text>}
            </View>
            <View>
                <Text style={styles.formLabel}>
                    Summary
                    <Text style={styles.mandatoryStar}> *</Text>
                </Text>
                <CustomTextInput
                    placeholder="Enter summary..."
                    multiline
                    value={formData.summary}
                    onChangeText={(text) => handleChange('summary', text)}
                    style={styles.descriptionInput}
                    customContainerInput={styles.textInput}
                />
                {formErrors.summary && <Text style={styles.errorText}>{formErrors.summary}</Text>}
            </View>
            <SignatureSection
                label="Inspector’s Signature"
                type="inspector"
                signature={inspectorSignature}
                onOpenModal={handleOpenModalSignature}
                onClear={handleClearInspectorSignature}
                error={formErrors.inspectorSignature}
            />
            <SignatureSection
                label="Tenant’s Signature"
                type="tenant"
                signature={tenantSignature}
                onOpenModal={handleOpenModalSignature}
                onClear={handleClearTenantSignature}
                error={formErrors.tenantSignature}
            />
            {apiError && (
                <Text style={[styles.errorText, { textAlign: 'center', marginVertical: 10 }]}>{apiError}</Text>
            )}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Update Property</Text>
            </TouchableOpacity>
        </View>
    );

    const body = () => (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            {renderBack()}
            <SafeAreaView style={styles.container}>
                {/* <Text style={styles.heading}>Edit Property</Text> */}
                {renderReportType()}
                {propertyMainPicture()}
                {renderForm()}
            </SafeAreaView>
            <CustomAlertPermission
                visible={isAlertVisible}
                title="Select Image Source"
                description="Choose where you'd like to upload images from"
                buttons={[
                    { text: 'Cancel', onPress: handleHideAlert },
                    { text: 'Gallery', onPress: () => { handleHideAlert(); openGallery(); }, style: 'primary' },
                    { text: 'Camera', onPress: () => { handleHideAlert(); openCamera(); }, style: 'primary' },
                ]}
            />
            {openDatePicker && (
                <DatePicker
                    modal
                    open={openDatePicker}
                    date={formData[selectedDateField] || new Date()}
                    onConfirm={handleDateChange}
                    onCancel={() => setOpenDatePicker(false)}
                    mode="date"
                />
            )}
            {renderSignatureModal()}
        </ScrollView>
    );

    return body();
};

export default EditProperty;