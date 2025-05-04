"use client"

import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query"
import toast from "@node_modules/react-hot-toast";
import { updateExpenseData } from "@utils/apiExpense";

export const useUpdateFormData = ()=>{

      const queryClientUpdate = useQueryClient();
      const {mutate: updateDataMutation , isLoading: isUpdateLoading} = useMutation({
        mutationFn: updateExpenseData,
        onSuccess: () =>{
          toast.success("Data updated successful...");
          queryClientUpdate.invalidateQueries({ queryKey: ["expenseData"]});
        },
        onError: (err)=>{ 
            console.log(err)
            toast.error(err.message)
        }
      });
    return {updateDataMutation, isUpdateLoading}
}