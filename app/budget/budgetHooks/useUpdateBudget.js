"use client"

import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query"
import toast from "@node_modules/react-hot-toast";
import { updateBudgetData } from "@utils/apiBudget";

export const useUpdateFormData = ()=>{

      const queryClientUpdate = useQueryClient();
      const {mutate: updateDataMutation , isLoading: isUpdateLoading} = useMutation({
        mutationFn: updateBudgetData,
        onSuccess: () =>{
          toast.success("Data updated successful...");
          queryClientUpdate.invalidateQueries({ queryKey: ["budgetData"]});
        },
        onError: (err)=>{ toast.error(err.message)}
      });
    return {updateDataMutation, isUpdateLoading}
}