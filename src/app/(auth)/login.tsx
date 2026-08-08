import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

import { Button, Input } from "@/components/ui";
import { Colors, FontSize, Radius, Spacing } from "@/constants";
import { useLogin } from "@/hooks/use-auth";
import { getErrorMessage } from "@/lib/api/client";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormData = z.infer<typeof schema>;

export default function LoginScreen() {
  const router = useRouter();
  const login = useLogin();
  const { error, isPending } = useLogin();
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });
  const onSubmit = (data: FormData) => {
    login.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "wellcome back",
          });
        },
        onError: (error) =>
          Toast.show({
            type: "error",
            text1: getErrorMessage(error),
          }),
      },
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>🛍️</Text>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
          </View>

          {/* Error */}
          {error && (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={16} color={Colors.danger} />
              <Text style={styles.errorText}>{error.message}</Text>
            </View>
          )}

          {/* Form */}
          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email"
                  placeholder="you@example.com"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.email?.message}
                  leftIcon={
                    <Ionicons
                      name="mail-outline"
                      size={18}
                      color={Colors.gray400}
                    />
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Password"
                  placeholder="••••••••"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!showPassword}
                  error={errors.password?.message}
                  leftIcon={
                    <Ionicons
                      name="lock-closed-outline"
                      size={18}
                      color={Colors.gray400}
                    />
                  }
                  rightIcon={
                    <TouchableOpacity
                      onPress={() => setShowPassword((v) => !v)}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={18}
                        color={Colors.gray400}
                      />
                    </TouchableOpacity>
                  }
                />
              )}
            />

            <Button
              title={isPending ? "Signing in…" : "Sign in"}
              onPress={handleSubmit(onSubmit)}
              loading={isPending}
              fullWidth
              style={{ marginTop: Spacing.sm }}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.navigate("/register")}>
              <Text style={styles.footerLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flexGrow: 1, padding: Spacing.lg, justifyContent: "center" },
  header: { alignItems: "center", marginBottom: Spacing.xl },
  logo: { fontSize: 56, marginBottom: Spacing.md },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 6,
  },
  subtitle: { fontSize: FontSize.md, color: Colors.textSecondary },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.dangerLight,
    padding: 12,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
  },
  errorText: { color: Colors.danger, fontSize: FontSize.sm, flex: 1 },
  form: { marginBottom: Spacing.xl },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  footerLink: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: "600",
  },
});
