import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query/build/legacy";
import toast from "@node_modules/react-hot-toast/dist";
import { updateUser as updateUserApi } from "@utils/apiUsers";

export default function useUpdateUser(){
    const queryClient = useQueryClient();

    const {mutate:updateUser,isLoading:userUpdateLoading} = useMutation({
        mutationFn:
        ({id,email,password,avatar,fullName})=>{updateUserApi({id,email,password,avatar,fullName})},
        onSuccess:()=>{
            queryClient.invalidateQueries();
            toast.success("User updated successfully");
        },
        onError:(error)=>{
            if(error) {
                console.log("user update error "+error);
                toast.error(error);
                throw new Error(error);
            }
        }
    })
    return {updateUser, userUpdateLoading}
}