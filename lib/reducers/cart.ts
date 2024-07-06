import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { constants } from "@/app/(app)/home/utils/constants";

// Define a type for the slice state
export interface CartState {
  cart: any;
  totalCartItems: number;
}

// Define the initial state using that type
const initialState: CartState = {
  cart: null,
  totalCartItems: 0,
};

export const CartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`

    onCartChangeHandler: (state, action: PayloadAction<any>) => {
      const mainItem = action?.payload?.item;
      const newCart = state.cart ? JSON.parse(JSON.stringify(state.cart)) : {};

      let totalCartItems = state.totalCartItems;

      if (!newCart[mainItem.uuid]) {
        newCart[mainItem.uuid] = { ...mainItem, quantity: 1 };
        totalCartItems += 1;
      } else {
        if (action?.payload?.user_action === constants.ADD_PRODUCT) {
          newCart[mainItem.uuid].quantity += 1;
          totalCartItems += 1;
        } else if (action?.payload?.user_action === constants.REMOVE_PRODUCT) {
          if (newCart[mainItem.uuid].quantity > 0) {
            newCart[mainItem.uuid].quantity -= 1;
            if (newCart[mainItem.uuid].quantity === 0)
              delete newCart[mainItem.uuid];
            totalCartItems -= 1;
          }
        }
      }

      if (Object.keys(newCart).length === 0) totalCartItems = 0;

      state.cart = newCart;
      state.totalCartItems = totalCartItems;
    },

    getProductQuantityFromCart: (state, action: PayloadAction<any>) => {
      const mainItem = action.payload;
      return state?.cart[mainItem?.uuid]?.quantity || 0;
    },
    resetCart: (state) => {
      state.cart = null;
      state.totalCartItems = 0;
    },
  },
});

export const { onCartChangeHandler, getProductQuantityFromCart, resetCart } =
  CartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => state.cart;

export default CartSlice.reducer;
