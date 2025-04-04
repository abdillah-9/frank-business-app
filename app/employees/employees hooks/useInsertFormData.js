"use client"

import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query"
import toast from "@node_modules/react-hot-toast/dist";
import { insertEmployeeData } from "@utils/apiEmployees";
import { useForm } from "@node_modules/react-hook-form";

export const useInsertFormData = ()=>{
    // Here we define mutate func that sends data to supabase
    const {reset} = useForm();
    const queryClient = useQueryClient();
    const {mutate: insertDataMutation} = useMutation({
          mutationFn: insertEmployeeData,
          onSuccess: () =>{
            toast.success("Data inserted successful...");
            queryClient.invalidateQueries({ queryKey: ["employeeData"]});
            reset();
          },
          onError: (err)=>{
            toast.error("Data could not be inserted"); //toast.error(err.message)
        }
        });

    return {insertDataMutation}
}