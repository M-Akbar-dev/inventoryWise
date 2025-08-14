// import { CLEAR_CART } from "../Constants";

//  const initialState = {
//     items: [],
// };

// const cartReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'ADD_TO_CART':
//             const existingItem = state.items.find(item => item._id === action.payload._id);
//             if (existingItem) {
//                  return {
//                     ...state,
//                     items: state.items.map(item =>
//                         item._id === existingItem._id
//                             ? { ...item, quantity: item.quantity + action.payload.quantity }
//                             : item
//                     ),
//                 };
//             }
//              return {
//                 ...state,
//                 items: [...state.items, action.payload],
//             };
//         case 'REMOVE_FROM_CART':
//             return {
//                 ...state,
//                 items: state.items.filter(item => item._id !== action.payload),
//             };
//         case 'UPDATE_QUANTITY':
//             return {
//                 ...state,
//                 items: state.items.map(item =>
//                     item._id === action.payload.productId
//                         ? { ...item, quantity: action.payload.quantity }
//                         : item
//                 ),
//             };
//         case CLEAR_CART:
//             return {
//                 ...state,
//                 items: [],  
//             };

//         default:
//             return state;
//     }
// };

// export default cartReducer;
