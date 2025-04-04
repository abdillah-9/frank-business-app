import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query/build/legacy";
import toast from "@node_modules/react-hot-toast/dist";
import { deleteUser as deleteUserApi } from "@utils/apiUsers";

export default function useDeleteFormData() {

    const queryClient = useQueryClient();

    const {mutate: deleteUser, error: errOnDeleteUser} = useMutation({
        mutationFn:(userID)=>deleteUserApi(userID),
        onSuccess:()=>{
            queryClient.invalidateQueries()
            toast.success("User deleted successfully");
        },
        onError:(err)=>{
            if(err){
                // throw new Error(err.message)
                toast.error("failed to delete user "+err);
            }
        }
    })

    return {deleteUser, errOnDeleteUser};
}

