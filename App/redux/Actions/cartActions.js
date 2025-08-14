// cartActions.js
import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from "../Constants";

export const addToCart = (product, quantity) => ({
    type: ADD_TO_CART,
    payload: { ...product, quantity },
});

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});

export const updateQuantity = (productId, quantity) => ({
    type: UPDATE_QUANTITY,
    payload: { productId, quantity },
});
export const clearCart = () => ({
    type: CLEAR_CART,
});