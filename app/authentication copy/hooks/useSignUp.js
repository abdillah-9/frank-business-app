import { useMutation } from "@node_modules/@tanstack/react-query";
import toast from "@node_modules/react-hot-toast/dist";
import { SignUp as SignUpApi } from "@utils/apiAuth";

export default function useSignUp(){
    
    const {mutate:signUpMutation, isLoading:signUpIsLoading} = useMutation({
        mutationFn: SignUpApi,
        onSuccess:(user)=>{
           console.log(user)
           toast.success("New user successfully created")            
        },
        onError:(error)=>{
            console.log("SignUpError :"+error);
            toast.error(error);
            throw new Error(error);
        }
    })

    return {signUpMutation, signUpIsLoading}
}