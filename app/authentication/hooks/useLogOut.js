"use client";
import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query";
import { useRouter } from "@node_modules/next/navigation";
import toast from "@node_modules/react-hot-toast";
import { Logout as logOutApi } from "@utils/apiAuth";

export default function useLogOut() {
    const routing = useRouter();

    const queryClient = useQueryClient();
    const {mutate: logOut, isLoading:logOutIsLoading} = useMutation({
        mutationFn:logOutApi,
        onSuccess:()=>{
            queryClient.clear();
            toast.success("You've successfully logged out ");
            routing.push('/authentication/signIn',{replace:"true"});
        },
        onError:(err)=>{
            toast.error(err.message)
        }
    });
    
    return {logOut, logOutIsLoading}
}
