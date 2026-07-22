export type RootStackParamList = {
  ProductDetail: { productId: number };
  OrderDetail: { orderId: number };
  Checkout: { productId: number; quantity: number };
  EditProfile: undefined;
  ChangePassword: undefined;
  SearchResults: { query?: string; type?: string };
};

export type BottomTabParamList = {
  Home: undefined;
  Products: undefined;
  Orders: undefined;
  Profile: undefined;
};
