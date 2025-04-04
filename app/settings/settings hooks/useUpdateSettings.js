import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query"
import toast from "@node_modules/react-hot-toast/dist";
import { updateSetting } from "@utils/apiSettings";

 function useUpdateSettings(){
      //Now lets use the React QueryClient with onMount
      const queryClient = useQueryClient();
      const {mutate: updateSettingApi, isLoading: isLoadingUpdateSetting} = useMutation({
        mutationFn: updateSetting,

        onSuccess: () => {
          toast.success("Setting updated successful");
          queryClient.invalidateQueries({queryKey: "settingsData"});
        },

        onError: (err)=>{toast.error(err.message)}
      });

    return {isLoadingUpdateSetting, updateSettingApi}
}
export default useUpdateSettings;