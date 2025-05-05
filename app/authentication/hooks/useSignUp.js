"use client"
import { useMutation } from "@node_modules/@tanstack/react-query";
import toast from "@node_modules/react-hot-toast/dist";
import { SignUp as SignUpApi } from "@utils/apiAuth";
import { useRouter } from "@node_modules/next/navigation";

export default function useSignUp(){
    const routing = useRouter();
    
    const {mutate:signUpMutation, isLoading:signUpIsLoading} = useMutation({
        mutationFn: SignUpApi,
        onSuccess:(user)=>{
            console.log(user)
            toast.success("New user successfully created")    
            //Redirect to signIn
            routing.push("/authentication/signIn");         
        },
        onError:(error)=>{
            console.log("SignUpError :"+error);
            toast.error(error.message);
        }
    })

    return {signUpMutation, signUpIsLoading}
}