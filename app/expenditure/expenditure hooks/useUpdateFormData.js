"use client"

import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query"
import toast from "@node_modules/react-hot-toast";
import { updateExpenditureData } from "@utils/apiExpenditure";
import { useForm } from "@node_modules/react-hook-form";

export const useUpdateFormData = ()=>{
  const {reset} = useForm();

      const queryClientUpdate = useQueryClient();
      const {mutate: updateDataMutation , isLoading: isUpdateLoading} = useMutation({
        mutationFn: updateExpenditureData,
        onSuccess: () =>{
          toast.success("Data updated successful...");
          queryClientUpdate.invalidateQueries({ queryKey: ["expenditureData"]});
          reset();
        },
        onError: (err)=>{ toast.error(err.message)}
      });
    return {updateDataMutation, isUpdateLoading}
}