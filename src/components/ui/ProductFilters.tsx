import type { ProductQuery } from "@/types";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ProductFiltersProps {
  value: ProductQuery;
  onChange: (value: ProductQuery) => void;
}

const SORT_OPTIONS: {
  value: NonNullable<ProductQuery["sortBy"]>;
  label: string;
}[] = [
  { value: "createdAt", label: "Newest" },
  { value: "price", label: "Price" },
  { value: "name", label: "Name A-Z" },
];

export function ProductFilters({ value, onChange }: ProductFiltersProps) {
  const [minPrice, setMinPrice] = useState(value.minPrice?.toString() ?? "");
  const [maxPrice, setMaxPrice] = useState(value.maxPrice?.toString() ?? "");
  const [type, setType] = useState(value.type ?? "");

  function applyFilters() {
    onChange({
      ...value,
      page: 1,
      type: type || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  }

  function reset() {
    setMinPrice("");
    setMaxPrice("");
    setType("");

    onChange({
      page: 1,
      limit: value.limit,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Sort By</Text>

      <View style={styles.row}>
        {SORT_OPTIONS.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.chip,
              value.sortBy === item.value && styles.activeChip,
            ]}
            onPress={() =>
              onChange({
                ...value,
                sortBy: item.value,
                page: 1,
              })
            }
          >
            <Text
              style={[
                styles.chipText,
                value.sortBy === item.value && styles.activeChipText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.chip, value.order === "desc" && styles.activeChip]}
          onPress={() =>
            onChange({
              ...value,
              order: "desc",
              page: 1,
            })
          }
        >
          <Text
            style={[
              styles.chipText,
              value.order === "desc" && styles.activeChipText,
            ]}
          >
            ↓ Desc
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.chip, value.order === "asc" && styles.activeChip]}
          onPress={() =>
            onChange({
              ...value,
              order: "asc",
              page: 1,
            })
          }
        >
          <Text
            style={[
              styles.chipText,
              value.order === "asc" && styles.activeChipText,
            ]}
          >
            ↑ Asc
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <Text style={styles.label}>Category</Text>

      <TextInput
        value={type}
        onChangeText={setType}
        placeholder="e.g. Electronics"
        style={styles.input}
      />

      <Text style={styles.label}>Price Range (VND)</Text>

      <View style={styles.priceRow}>
        <TextInput
          value={minPrice}
          onChangeText={setMinPrice}
          placeholder="Min"
          keyboardType="numeric"
          style={[styles.input, styles.priceInput]}
        />

        <Text style={styles.separator}>-</Text>

        <TextInput
          value={maxPrice}
          onChangeText={setMaxPrice}
          placeholder="Max"
          keyboardType="numeric"
          style={[styles.input, styles.priceInput]}
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={reset}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    marginTop: 12,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },

  chip: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  activeChip: {
    backgroundColor: "#000",
    borderColor: "#000",
  },

  chipText: {
    fontSize: 14,
  },

  activeChipText: {
    color: "#fff",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 16,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  priceInput: {
    flex: 1,
  },

  separator: {
    marginHorizontal: 10,
    fontSize: 16,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 12,
  },

  applyButton: {
    flex: 1,
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  applyText: {
    color: "#fff",
    fontWeight: "600",
  },

  resetButton: {
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  resetText: {
    fontWeight: "500",
  },
});
