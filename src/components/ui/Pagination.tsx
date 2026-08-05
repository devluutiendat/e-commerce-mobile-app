import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.navButton, page <= 1 && styles.disabled]}
        disabled={page <= 1}
        onPress={() => onChange(page - 1)}
      >
        Prev
      </TouchableOpacity>

      {pages.map((p, i) => (
        <View key={p} style={styles.pageWrapper}>
          {i > 0 && pages[i - 1] !== p - 1 && (
            <Text style={styles.ellipsis}>...</Text>
          )}

          <TouchableOpacity
            style={[styles.pageButton, p === page && styles.activePage]}
            onPress={() => onChange(p)}
          >
            <Text
              style={[styles.pageText, p === page && styles.activePageText]}
            >
              {p}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={[styles.navButton, page >= totalPages && styles.disabled]}
        disabled={page >= totalPages}
        onPress={() => onChange(page + 1)}
      >
        Next
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },

  pageWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  navButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },

  pageButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },

  activePage: {
    backgroundColor: "#000",
    borderColor: "#000",
  },

  pageText: {
    fontSize: 14,
    fontWeight: "500",
  },

  activePageText: {
    color: "#fff",
  },

  ellipsis: {
    marginHorizontal: 4,
    fontSize: 14,
    color: "#666",
  },

  disabled: {
    opacity: 0.4,
  },
});
