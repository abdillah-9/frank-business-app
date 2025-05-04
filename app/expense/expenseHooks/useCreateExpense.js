"use client"
import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query"
import toast from "@node_modules/react-hot-toast/dist";
import { insertExpenseData } from "@utils/apiExpense";

export const useCreateExpense = ()=>{
    // Here we define mutate func that sends data to supabase
    const queryClient = useQueryClient();
    const {mutate: insertDataMutation} = useMutation({
          mutationFn: insertExpenseData,
          onSuccess: () =>{
            toast.success("Data inserted successful...");
            queryClient.invalidateQueries({ queryKey: ["expenseData"]});
          },
          onError: (err)=>{
            console.log("Insert data mutation "+err);
            toast.error(err.message);
        }
        });

    return {insertDataMutation}
}