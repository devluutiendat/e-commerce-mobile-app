import { useProduct } from "@/hooks/use-products";
import { useAppDispatch, useAppSelector } from "@/store";
import { addToCart } from "@/store/slices/cartSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = parseInt(id, 10);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { data: product, isLoading, isError } = useProduct(productId);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !product) {
    return (
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-lg font-semibold">Product not found</Text>

        <TouchableOpacity
          className="mt-4"
          onPress={() => router.push("/(tabs)")}
        >
          <Text className="text-amber-600">Back to all products</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product }));
  };

  const handleBuyNow = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    dispatch(addToCart({ product }));
    router.push("/cart");
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Text className="text-gray-500">← Back</Text>
        </TouchableOpacity>

        <Image
          source={{ uri: product.images }}
          className="w-full h-80 rounded-xl"
          resizeMode="cover"
        />

        <Text className="mt-4 text-xs uppercase text-gray-500">
          {product.type}
        </Text>

        <Text className="text-2xl font-bold mt-2">{product.name}</Text>

        <Text className="text-xl font-semibold text-green-600 mt-3">
          ${product.price}
        </Text>

        <Text className="mt-4 text-gray-600 leading-6">
          {product.description}
        </Text>

        {/* Actions */}
        <View className="mt-6 gap-3">
          <TouchableOpacity
            className="bg-gray-200 py-4 rounded-lg items-center"
            onPress={handleAddToCart}
          >
            <Text className="font-semibold">Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-black py-4 rounded-lg items-center"
            onPress={handleBuyNow}
          >
            <Text className="text-white font-semibold">Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
