"use client";
import { useRouter } from "@node_modules/next/navigation";
import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query/build/legacy";
import toast from "@node_modules/react-hot-toast/dist";
import { Login as LoginApi } from "@utils/apiAuth";

export function useLogin(){
    const route = useRouter();
    const queryClient = useQueryClient();
    const {mutate: login,isLoading:signInLoading, status} = useMutation({
        mutationFn: async ({ email, password })=>{const user = await LoginApi({email, password})
        return user},
        onSuccess:(user)=>{
            queryClient.setQueryData(["user"], user.user);
            toast.success("Login successful");
            route.push("/dashboard",{replace:"true"});
        },
        onError:(err)=>{
            toast.error("email or password is not correct "+err);
        }
    });

    return {login, signInLoading, status}
}
