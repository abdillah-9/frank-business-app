import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query/build/legacy";
import toast from "@node_modules/react-hot-toast";
import { deleteTaskData } from "@utils/apiTasks";

export function useDeleteFormData(){
    const queryClient = useQueryClient();
      //delete data using button
    const {mutate: mutateDeleting, isLoading: loadingDelete} = useMutation({
    mutationFn: (id) => deleteTaskData(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryClient: 'taskData'
      })
      toast.success("successfully deleted");
    },

    onError: (err)=> toast.error(err.message)
  })

  return{mutateDeleting, loadingDelete}

}