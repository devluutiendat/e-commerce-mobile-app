import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useCreateOrder } from "@/hooks/use-orders";
import { getErrorMessage } from "@/lib/api/client";
import { useAppDispatch, useAppSelector } from "@/store";
import { clearCart, removeItem, setQuantity } from "@/store/slices/cartSlice";
import Toast from "react-native-toast-message";

export default function CartScreen() {
  const router = useRouter();

  const { lines } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const createOrder = useCreateOrder();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const discountedPrice = (price: number, discountPercent?: number) => {
    if (!discountPercent) return price;
    return Math.round(price - (price * discountPercent) / 100);
  };
  const total = lines.reduce(
    (sum, line) =>
      sum +
      discountedPrice(line.product.price, line.product.discountPercent) *
        line.quantity,
    0,
  );

  async function handleCheckout() {
    if (!user) {
      router.push("/login");
      return;
    }

    setIsCheckingOut(true);

    try {
      for (const line of lines) {
        await createOrder.mutateAsync({
          productId: line.product.id,
          quantity: line.quantity,
        });
      }

      clearCart();
      Toast.show({
        text1: "Order placed successfully",
        type: "success",
      });
      router.push("/orders");
    } catch (error) {
      Toast.show({ text1: getErrorMessage(error), type: "error" });
    } finally {
      setIsCheckingOut(false);
    }
  }

  if (lines.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>

        <Text style={styles.emptyText}>
          Saved for this session only — browse and add something you like.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/")}
        >
          <Text style={styles.buttonText}>Browse Products</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Your Cart</Text>

        {lines.map((line) => (
          <View key={line.product.id} style={styles.cartItem}>
            <TouchableOpacity
              onPress={() => router.push(`/products/${line.product.id}`)}
            >
              <Image
                source={{ uri: line.product.images }}
                style={styles.image}
              />
            </TouchableOpacity>

            <View style={styles.content}>
              <Text style={styles.productName}>{line.product.name}</Text>

              <Text style={styles.productType}>{line.product.type}</Text>

              <Text>
                {line.product.price} with {line.product.discountPercent}{" "}
                discount
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() => dispatch(removeItem(line.product.id))}
              >
                <Text>remove</Text>
              </TouchableOpacity>

              <View style={styles.quantityBox}>
                <TouchableOpacity
                  onPress={() =>
                    dispatch(
                      setQuantity({
                        productId: line.product.id,
                        quantity: Math.max(1, line.quantity - 1),
                      }),
                    )
                  }
                >
                  <Text style={styles.qtyBtn}>−</Text>
                </TouchableOpacity>

                <Text style={styles.qtyText}>{line.quantity}</Text>

                <TouchableOpacity
                  onPress={() =>
                    dispatch(
                      setQuantity({
                        productId: line.product.id,
                        quantity: line.quantity + 1,
                      }),
                    )
                  }
                >
                  <Text style={styles.qtyBtn}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Summary</Text>

        <View style={styles.row}>
          <Text>{lines.length} items</Text>
          <Text>{total}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>{total}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
          disabled={isCheckingOut}
        >
          <Text style={styles.checkoutText}>
            {isCheckingOut
              ? "Placing Order..."
              : user
                ? "Place Order"
                : "Sign In To Checkout"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    padding: 16,
  },

  cartItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },

  content: {
    flex: 1,
    marginLeft: 12,
  },

  productName: {
    fontSize: 16,
    fontWeight: "600",
  },

  productType: {
    color: "#666",
    marginTop: 4,
    marginBottom: 8,
  },

  actions: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  qtyBtn: {
    fontSize: 20,
    fontWeight: "700",
  },

  qtyText: {
    fontSize: 16,
    minWidth: 24,
    textAlign: "center",
  },

  summary: {
    borderTopWidth: 1,
    borderColor: "#eee",
    padding: 16,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  totalLabel: {
    fontWeight: "700",
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: "700",
  },

  checkoutButton: {
    marginTop: 16,
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  checkoutText: {
    color: "#fff",
    fontWeight: "600",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 16,
  },

  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 8,
    marginBottom: 24,
  },

  button: {
    backgroundColor: "#000",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
