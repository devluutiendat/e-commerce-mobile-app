import { ProductFilters } from "@/components/ui";
import { Pagination } from "@/components/ui/";
import { useProducts } from "@/hooks/use-products";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ProductCard } from "@/components/ui";
import type { ProductQuery } from "@/types";

const LIMIT = 12;

export default function ProductsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const query: ProductQuery = useMemo(
    () => ({
      page: Number(params.page ?? 1),
      limit: LIMIT,
      search: params.search?.toString(),
      type: params.type?.toString(),
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
      sortBy: (params.sortBy as ProductQuery["sortBy"]) ?? "createdAt",
      order: (params.order as ProductQuery["order"]) ?? "desc",
    }),
    [params],
  );

  const { data, isLoading, isError, isFetching } = useProducts(query);

  function updateQuery(next: ProductQuery) {
    const queryParams: Record<string, string> = {};

    Object.entries(next).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && key !== "limit") {
        queryParams[key] = String(value);
      }
    });
    router.push(`/products/${queryParams.id}`);
  }

  const totalPages = data ? Math.max(1, Math.ceil(data.meta.total / LIMIT)) : 1;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          {query.search ? `Results for "${query.search}"` : "All Products"}
        </Text>

        {data && (
          <Text style={styles.subtitle}>
            {data.meta.total} {data.meta.total === 1 ? "item" : "items"}
          </Text>
        )}
      </View>

      <ProductFilters value={query} onChange={updateQuery} />

      <View style={[styles.content, isFetching && { opacity: 0.6 }]}>
        {isError ? (
          <View style={styles.center}>
            <Text style={styles.errorTitle}>Couldn't load products</Text>

            <Text style={styles.errorText}>
              Check that the API is running and reachable.
            </Text>
          </View>
        ) : isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <FlatList
              data={data?.products}
              numColumns={2}
              keyExtractor={(item) => item.id.toString()}
              columnWrapperStyle={{
                gap: 12,
                paddingHorizontal: 16,
              }}
              contentContainerStyle={{
                paddingTop: 16,
              }}
              renderItem={({ item }) => <ProductCard product={item} />}
            />

            <Pagination
              page={query.page ?? 1}
              totalPages={totalPages}
              onChange={(page: any) =>
                updateQuery({
                  ...query,
                  page,
                })
              }
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 4,
    color: "#666",
    fontSize: 14,
  },

  content: {
    flex: 1,
  },

  center: {
    paddingVertical: 80,
    alignItems: "center",
  },

  errorTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  errorText: {
    marginTop: 6,
    color: "#666",
    textAlign: "center",
  },
});
