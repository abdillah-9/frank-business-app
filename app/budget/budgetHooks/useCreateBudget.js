"use client"
import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query"
import toast from "@node_modules/react-hot-toast/dist";
import { insertBudgetData } from "@utils/apiBudget";
import { useForm } from "@node_modules/react-hook-form";

export const useCreateBudget = ()=>{
    // Here we define mutate func that sends data to supabase
    const {reset} = useForm();
    const queryClient = useQueryClient();
    const {mutate: insertDataMutation} = useMutation({
          mutationFn: insertBudgetData,
          onSuccess: () =>{
            toast.success("Data inserted successful...");
            queryClient.invalidateQueries({ queryKey: ["budgetData"]});
            reset();
          },
          onError: (err)=>{
            toast.error(err.message)
        }
        });

    return {insertDataMutation}
}