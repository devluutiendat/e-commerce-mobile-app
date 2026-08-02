import { Button, Input } from "@/components/ui";
import { Colors, FontSize, Radius, Spacing } from "@/constants";
import { useRegister } from "@/hooks/use-auth";
import { getErrorMessage } from "@/lib/api/client";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { z } from "zod";

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().optional(),
    address: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
type FormData = z.infer<typeof schema>;

export const RegisterScreen = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { error, isPending } = useRegister();
  const register = useRegister();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = ({ confirmPassword, ...data }: FormData) => {
    register.mutate(
      {
        email: data.email,
        address: data.address,
        password: data.password,
        name: data.name,
        phone: data.phone,
      },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "wellcome back",
          });
          console.log(1111);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            padding: Spacing.lg,
            paddingTop: Spacing.xl,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginBottom: Spacing.lg }}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: FontSize.xxl,
              fontWeight: "700",
              color: Colors.text,
              marginBottom: 6,
            }}
          >
            Create account
          </Text>
          <Text
            style={{
              fontSize: FontSize.md,
              color: Colors.textSecondary,
              marginBottom: Spacing.xl,
            }}
          >
            Join us and start shopping
          </Text>

          {error && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                backgroundColor: Colors.dangerLight,
                padding: 12,
                borderRadius: Radius.md,
                marginBottom: Spacing.md,
              }}
            >
              <Ionicons name="alert-circle" size={16} color={Colors.danger} />
              <Text
                style={{ color: Colors.danger, fontSize: FontSize.sm, flex: 1 }}
              >
                {error.message}
              </Text>
            </View>
          )}

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Full name"
                placeholder="John Doe"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="words"
                error={errors.name?.message}
                leftIcon={
                  <Ionicons
                    name="person-outline"
                    size={18}
                    color={Colors.gray400}
                  />
                }
              />
            )}
          />

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
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Phone (optional)"
                placeholder="+84 901 234 567"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="phone-pad"
                leftIcon={
                  <Ionicons
                    name="call-outline"
                    size={18}
                    color={Colors.gray400}
                  />
                }
              />
            )}
          />

          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Address (optional)"
                placeholder="123 Main St, Hanoi"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                leftIcon={
                  <Ionicons
                    name="location-outline"
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
                  <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
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

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Confirm password"
                placeholder="••••••••"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={!showPassword}
                error={errors.confirmPassword?.message}
                leftIcon={
                  <Ionicons
                    name="lock-closed-outline"
                    size={18}
                    color={Colors.gray400}
                  />
                }
              />
            )}
          />

          <Button
            title={isPending ? "Creating account…" : "Create account"}
            onPress={handleSubmit(onSubmit)}
            loading={isPending}
            fullWidth
            style={{ marginTop: Spacing.sm, marginBottom: Spacing.lg }}
          />

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text
              style={{ fontSize: FontSize.sm, color: Colors.textSecondary }}
            >
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text
                style={{
                  fontSize: FontSize.sm,
                  color: Colors.primary,
                  fontWeight: "600",
                }}
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
