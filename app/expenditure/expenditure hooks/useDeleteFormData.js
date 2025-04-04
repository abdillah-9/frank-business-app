import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query/build/legacy";
import toast from "@node_modules/react-hot-toast";
import { deleteExpenditureData } from "@utils/apiExpenditure";

export function useDeleteFormData(){
    const queryClient = useQueryClient();
      //delete data using button
    const {mutate: mutateDeleting, isLoading: loadingDelete} = useMutation({
    mutationFn: (id) => deleteExpenditureData(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryClient: 'expenditureData'
      })
      toast.success("successfully deleted");
    },

    onError: (err)=> toast.error(err.message)
  })

  return{mutateDeleting, loadingDelete}

}