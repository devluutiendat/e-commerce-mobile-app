import { authApi } from "@/lib/api/auth";
import { tokenStorage } from "@/lib/api/client";
import { queryKeys } from "@/lib/query-keys";
import { useAppDispatch } from "@/store";
import { loginSuccess } from "@/store/slices/authSlice";
import { Auth, LoginDto } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (dto: LoginDto) => authApi.login(dto),
    onSuccess: async (data: Auth) => {
      tokenStorage.set(data);
      dispatch(loginSuccess(data.user));
      await queryClient.invalidateQueries({ queryKey: queryKeys.users.me() });
      router.push("/");
    },
  });
}
