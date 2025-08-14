import { apiGet, apiPost, apiPut } from '../../Config/Axios/Axios';
import { AuthAction, LoaderAction } from '../Actions';
import AlertMiddleware from './AlertMiddleware';

const ProductListingMiddleware = {
    GetAllProducts: (payload) => {
        // console.log(payload, "this is the payload from the API");

        return async (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                try {
                    dispatch(LoaderAction.LoaderTrue());

                    const state = getState();
                    const accessToken = state.AuthReducer.accessToken;

                    const response = await apiPost("/v2/customer/meal/filter", payload, accessToken);
                    // console.log('Get product response', response);


                    if (response.success) {
                        dispatch(LoaderAction.LoaderFalse());
                        resolve(response);
                        // dispatch(AuthAction.UpdateTokens(response.tokens))
                    } else {
                        dispatch(LoaderAction.LoaderFalse());
                        reject(response);
                    }
                } catch (e) {
                    dispatch(LoaderAction.LoaderFalse());
                    console.log('Error', e);
                    reject(e);
                }
            });
        };
    },

    getProductDetail: (id) => {
        return async (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                try {
                    dispatch(LoaderAction.LoaderTrue());
                    const state = getState();
                    const accessToken = state.AuthReducer.accessToken;
                    const refreshToken = state.AuthReducer.refreshToken;
                    const response = await apiGet(`/v2/customer/meal/${id}`, accessToken, refreshToken);
                    console.log('Single product response:', response);
                    if (response.success) {
                        dispatch(LoaderAction.LoaderFalse());
                        resolve(response?.meal);
                        // dispatch(AuthAction.UpdateTokens(response.tokens))

                    } else {
                        dispatch(LoaderAction.LoaderFalse());
                        reject(response);
                    }
                } catch (e) {
                    dispatch(LoaderAction.LoaderFalse());
                    console.log('Error fetching single product:', e);
                    reject(e);
                }
            });
        };
    },

    getUserDetails: () => {
        return async (dispatch, getState) => {
            try {
                // dispatch(LoaderAction.LoaderTrue());
                const { accessToken } = getState().AuthReducer;
                const response = await apiGet(`/v2/customer/me`, accessToken);
                if (response?.success) {
                    //   dispatch(AuthAction.UpdateTokens(response.tokens));
                    return response; // resolves the normalized success
                } else {
                    throw new Error(response?.message || "Failed to fetch user details.");
                }
            } catch (e) {
                console.error('getUserDetails error:', e);
                throw e; // already normalized from apiGet
            } finally {
                dispatch(LoaderAction.LoaderFalse());
            }
        };
    },



    PlaceOrder: (payload) => {
        return async (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                try {
                    dispatch(LoaderAction.LoaderTrue());

                    const state = getState();
                    const accessToken = state.AuthReducer.accessToken;
                    const refreshToken = state.AuthReducer.refreshToken;

                    const response = await apiPost("/v2/customer/order/create", payload, accessToken, refreshToken);
                    console.log('order place order', response);

                    if (response.success) {
                        dispatch(LoaderAction.LoaderFalse());
                        resolve(response);
                    } else {
                        dispatch(LoaderAction.LoaderFalse());
                        reject(response);
                    }
                } catch (e) {
                    dispatch(LoaderAction.LoaderFalse());
                    console.log('Error in post orders', e);
                    reject(e);
                }
            });
        };
    },


    EditOrder: (payload) => {
        console.log(payload, "?A>D>A>SDF>ADFS>ADS>4343");
        return async (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                try {
                    dispatch(LoaderAction.LoaderTrue());

                    const state = getState();
                    const accessToken = state.AuthReducer.accessToken;
                    const refreshToken = state.AuthReducer.refreshToken;

                    const orderID = payload?.order_id;
                    const url = `/v2/customer/order/update/${orderID}`;
                    const { order_id, ...sanitizedPayload } = payload;

                    const response = await apiPut(url, sanitizedPayload, accessToken, refreshToken);
                    console.log('Updated order:', response);

                    dispatch(LoaderAction.LoaderFalse());

                    response.success ? resolve(response) : reject(response);
                } catch (e) {
                    dispatch(LoaderAction.LoaderFalse());
                    console.log('Error in updating order', e);
                    reject(e);
                }
            });
        };
    },





    getFavDishes: () => {
        return async (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                try {
                    dispatch(LoaderAction.LoaderTrue());
                    const state = getState();
                    const accessToken = state.AuthReducer.accessToken;
                    const refreshToken = state.AuthReducer.refreshToken;

                    const response = await apiGet(`/v2/customer/meal/favorite-meals`, accessToken, refreshToken);
                    console.log('Singlget favorite meals is this not mine:', response);
                    if (response.success) {
                        dispatch(LoaderAction.LoaderFalse());
                        resolve(response?.favMeals);
                    } else {
                        dispatch(LoaderAction.LoaderFalse());
                        reject(response);
                    }
                } catch (e) {
                    dispatch(LoaderAction.LoaderFalse());
                    console.log('Error fetching single product:232323', e);
                    reject(e);
                }
            });
        };
    },


    getOrdersDays: () => {
        return async (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                try {
                    dispatch(LoaderAction.LoaderTrue());
                    const state = getState();
                    const accessToken = state.AuthReducer.accessToken;
                    const refreshToken = state.AuthReducer.refreshToken;
                    const response = await apiGet(`/v2/customer/order/order-placing-duration`, accessToken, refreshToken);
                    if (response.success) {
                        dispatch(LoaderAction.LoaderFalse());
                        resolve(response?.duration);
                    } else {
                        dispatch(LoaderAction.LoaderFalse());
                        reject(response);
                    }
                } catch (e) {
                    dispatch(LoaderAction.LoaderFalse());
                    console.log('Error fetching single product:232323', e);
                    reject(e);
                }
            });
        };
    },


    getPreviousOrders: () => {
        return async (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                try {
                    dispatch(LoaderAction.LoaderTrue());
                    const state = getState();
                    const accessToken = state.AuthReducer.accessToken;
                    const refreshToken = state.AuthReducer.refreshToken;

                    const response = await apiGet(`/v2/customer/order/all`, accessToken, refreshToken);
                    console.log('Previous orders#$#$#$#$#:', response);
                    if (response.success) {
                        dispatch(LoaderAction.LoaderFalse());
                        resolve(response?.orders?.reverse());
                    } else {
                        dispatch(LoaderAction.LoaderFalse());
                        reject(response);
                    }
                } catch (e) {
                    dispatch(LoaderAction.LoaderFalse());
                    console.log('Error fetching Prvious orders:', e);
                    // dispatch(AlertMiddleware.showErrorAlert("No orders found"))
                    reject(e);
                }
            });
        };
    },

    RateMeals: (payload) => {
        return async (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                try {
                    dispatch(LoaderAction.LoaderTrue());

                    const state = getState();
                    const accessToken = state.AuthReducer.accessToken;
                    const refreshToken = state.AuthReducer.refreshToken;

                    const response = await apiPost("/v2/customer/review/create", payload, accessToken, refreshToken);
                    console.log('RAte meals', response);

                    if (response.success) {
                        dispatch(LoaderAction.LoaderFalse());
                        resolve(response);
                    } else {
                        dispatch(LoaderAction.LoaderFalse());
                        reject(response);
                    }
                } catch (e) {
                    dispatch(LoaderAction.LoaderFalse());
                    console.log('Error in post orders', e);
                    reject(e);
                }
            });
        };
    },

    userRequests: (payload) => {
        return async (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                try {
                    dispatch(LoaderAction.LoaderTrue());
                    console.log(payload?.payload, "3/?A/sd/a/sdf3$##$$##$$$#$$#$#$$%$%$%$%$%$45")
                    const state = getState();
                    const accessToken = state.AuthReducer.accessToken;

                    const response = await apiPost("/v2/customer/create-request", payload?.payload, accessToken);
                    if (response.success) {
                        dispatch(LoaderAction.LoaderFalse());
                        resolve(response);
                    } else {
                        dispatch(LoaderAction.LoaderFalse());
                        reject(response);
                    }
                } catch (e) {
                    dispatch(LoaderAction.LoaderFalse());
                    console.log('Error in post orders', e);
                    reject(e);
                }
            });
        };
    },

    getDetailPreviousOrder: (id) => {
        return async (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                try {
                    dispatch(LoaderAction.LoaderTrue());
                    const state = getState();
                    const accessToken = state.AuthReducer.accessToken;
                    const refreshToken = state.AuthReducer.refreshToken;

                    const response = await apiGet(`/v2/customer/order/single/${id}`, accessToken, refreshToken);
                    if (response.success) {
                        dispatch(LoaderAction.LoaderFalse());
                        resolve(response?.order);
                    } else {
                        dispatch(LoaderAction.LoaderFalse());
                        reject(response);
                    }
                } catch (e) {
                    dispatch(LoaderAction.LoaderFalse());
                    console.log('Error fetching Prvious orders:', e);
                    dispatch(AlertMiddleware.showErrorAlert("No orders found"))
                    reject(e);
                }
            });
        };
    },

    OrderCompleted: (id) => {
        return async (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                try {
                    dispatch(LoaderAction.LoaderTrue());
                    const state = getState();
                    const accessToken = state.AuthReducer.accessToken;
                    const refreshToken = state.AuthReducer.refreshToken;

                    const response = await apiPut(`/admin/api/orders/complete/${id}`, {}, accessToken, refreshToken);
                    if (response.success) {
                        dispatch(LoaderAction.LoaderFalse());
                        resolve(response.data);
                    } else {
                        dispatch(LoaderAction.LoaderFalse());
                        reject(response);
                    }
                } catch (error) {
                    dispatch(LoaderAction.LoaderFalse());
                    const errorMessage = error?.message || "Failed to complete the order.";
                    console.error("OrderCompleted Error:", errorMessage);
                    dispatch(AlertMiddleware.showErrorAlert(errorMessage));
                    reject(error);
                }
            });
        };
    },

};


export default ProductListingMiddleware;
