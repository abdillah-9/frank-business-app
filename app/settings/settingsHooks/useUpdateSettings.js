"use client"

import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query"
import toast from "@node_modules/react-hot-toast";
import { updateSettingsData } from "@utils/apiSettings";

export const useUpdateFormData = ()=>{

      const queryClientUpdate = useQueryClient();
      const {mutate: updateDataMutation , isLoading: isUpdateLoading} = useMutation({
        mutationFn: updateSettingsData,
        onSuccess: () =>{
          toast.success("Data updated successful...");
          queryClientUpdate.invalidateQueries({ queryKey: ["settingsData"]});
        },
        onError: (err)=>{ 
            console.log(err)
            toast.error(err.message)
        }
      });
    return {updateDataMutation, isUpdateLoading}
}