import supabase1 from "./supabase";

// -------------------- Task data with Expense table in supabase -------------------- //
export async function getSettingsData(){
let { data, error } = await supabase1
.from('frankAppSettings')
.select('*')

if(error){
    console.error(error)  
    throw new Error("Data Could not be fetched");
}
return data;
}

export async function deleteSettingsData(id){
    let { data, error } = await supabase1
    .from('frankAppSettings')
    .delete()
    .eq("id", id)

    if(error){
        console.error(error)
        throw new Error("Data could not be deleted");   
    }
    return data;
}

//Insert data
export async function insertSettingsData(newSettings){
    console.log("Settings inserted "+JSON.stringify(newSettings))
    
    // destructure newSettings to remove id
    const {id, ...settingsWithoutID} = newSettings 
    const { data, error } = await supabase1
    .from('frankAppSettings')
    .insert([
        { 
        ...settingsWithoutID
        },
    ])
    .select()          

    if(error){
        console.error(error)    
        throw new Error(JSON.stringify(error));
    }  
    return data;      
}

//Update data
export async function updateSettingsData(updateSettings){

    const { data, error } = await supabase1
    .from('frankAppSettings')
    .update(
        {...updateSettings}
    )
    .eq("id" , updateSettings.id)
    .select()       

    if(error){
        console.log(JSON.stringify(error))
    }
    return data;
}
