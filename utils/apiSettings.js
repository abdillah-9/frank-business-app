import supabase1 from "./supabase";
// -------------------- Settings data with settings table in supabase -------------------- //

//Fetching data 
export async function getSettings(){

    let { data, error } = await supabase1
    .from('settings')
    .select('*')
    
    if(error){
        console.error(error)
        throw new Error("Settings Could not be fetched");
    }
    
    return data;
    }

//Updating data by each input field individually
export async function updateSetting(newSetting) {
    const { data, error } = await supabase1
    .from('settings')
    .update(
        //{ name: updateCustomer.name, age: updateCustomer.age, images: photoPath },
        newSetting
    )
    .eq("id" , 1)
    .select()       

    if(error){
        console.log(error)
        console.log(newSetting)
        //Create custom error with throw() Eg below:
        throw new Error("Data could not be updated");
        
    }
}
