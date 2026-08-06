import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartLine {
  product: Product;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
}

const initialState: CartState = {
  lines: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>,
    ) => {
      const { product, quantity = 1 } = action.payload;

      const existing = state.lines.find(
        (line) => line.product.id === product.id,
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.lines.push({
          product,
          quantity,
        });
      }
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.lines = state.lines.filter(
        (line) => line.product.id !== action.payload,
      );
    },

    setQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) => {
      const { productId, quantity } = action.payload;

      const item = state.lines.find((line) => line.product.id === productId);

      if (item) {
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.lines = [];
    },
  },
});

export const { addItem, removeItem, setQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
