"use client"

import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query"
import toast from "@node_modules/react-hot-toast/dist";
import { insertTaskData } from "@utils/apiTasks";
import { useForm } from "@node_modules/react-hook-form";

export const useInsertFormData = ()=>{
    // Here we define mutate func that sends data to supabase
    const {reset} = useForm();
    const queryClient = useQueryClient();
    const {mutate: insertDataMutation} = useMutation({
          mutationFn: insertTaskData,
          onSuccess: () =>{
            toast.success("Data inserted successful...");
            queryClient.invalidateQueries({ queryKey: ["taskData"]});
            reset();
          },
          onError: (err)=>{
            toast.error("Data could not be inserted");//toast.error(err.message)
        }
        });

    return {insertDataMutation}
}