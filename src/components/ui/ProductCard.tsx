import { Product } from "@/types";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const router = useRouter();

  const finalPrice = product.discountPercent
    ? Math.round(product.price * (1 - product.discountPercent / 100))
    : product.price;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={() => router.push(`/products/${product.id}`)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: product.images || "https://via.placeholder.com/400x500",
          }}
          style={styles.image}
        />

        {!!product.discountPercent && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>-{product.discountPercent}%</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.type} numberOfLines={1}>
          {product.type}
        </Text>

        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${finalPrice.toLocaleString()}</Text>

          {!!product.discountPercent && (
            <Text style={styles.oldPrice}>
              ${product.price.toLocaleString()}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },

  imageContainer: {
    aspectRatio: 4 / 5,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#EF4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  content: {
    marginTop: 8,
  },

  type: {
    fontSize: 11,
    color: "#888",
    textTransform: "uppercase",
    marginBottom: 4,
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    minHeight: 40,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  price: {
    fontSize: 16,
    fontWeight: "700",
  },

  oldPrice: {
    marginLeft: 8,
    fontSize: 13,
    color: "#999",
    textDecorationLine: "line-through",
  },
});
