"use client"
import { setReduxState } from "@app/provider/redux/reducer";
import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query";
import toast from "@node_modules/react-hot-toast";
import { useDispatch } from "@node_modules/react-redux/dist/react-redux";
import { deleteExpenseData } from "@utils/apiExpense";

export function useDeleteFormData(){
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
      //delete data using button
    const {mutate: mutateDeleting, isLoading: loadingDelete} = useMutation({
    mutationFn: (id) => deleteExpenseData(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryClient: 'expenseData'
      })
        toast.success("successfully deleted");
        dispatch(setReduxState({overlay:false,showNavBar:false,deleteData:false}));
    },

    onError: (err)=> toast.error(err.message)
  })

  return{mutateDeleting, loadingDelete}

}