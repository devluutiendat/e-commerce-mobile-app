import { QueryProvider } from "@/provider/query-provider";
import { store, useAppSelector } from "@/store";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

function RouteGuard() {
  const router = useRouter();
  const segments = useSegments();
  const { user } = useAppSelector((state) => state.auth);
  const inAuthGroup = segments[0] === "(auth)";
  const inTabsGroup = segments[0] === "(tabs)";

  useEffect(() => {
    if (!user) {
      if (!inAuthGroup) {
        router.replace("/(auth)/login");
      }
    } else {
      if (!inTabsGroup) {
        router.replace("/(tabs)");
      }
    }
  }, [user, segments, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}
export default function RootLayout() {
  return (
    <Provider store={store}>
      <QueryProvider>
        <RouteGuard />
        <Toast />
      </QueryProvider>
    </Provider>
  );
}
