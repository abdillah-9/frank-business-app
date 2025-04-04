import { useQuery } from "@node_modules/@tanstack/react-query"
import { getSettings } from "@utils/apiSettings";

 function useFetchSettings(){
      //Now lets use the React Query to fetch data from supabase
      const {isLoading, data, error} =  useQuery({
        queryKey: ['settingsData'],
        queryFn: getSettings
      });

    return {isLoading, data, error}
}
export default useFetchSettings;