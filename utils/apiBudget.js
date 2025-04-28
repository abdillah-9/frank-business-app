import supabase1 from "./supabase";

// -------------------- Task data with Budget table in supabase -------------------- //
export async function getBudgetData(){
let { data, error } = await supabase1
.from('budget')
.select('*')

if(error){
    console.error(error)  
    throw new Error("Data Could not be fetched");
}
return data;
}

export async function deleteBudgetData(id){
    let { data, error } = await supabase1
    .from('budget')
    .delete()
    .eq("id", id)

    if(error){
        console.error(error)
        throw new Error("Data could not be deleted");   
    }
    return data;
}

//Insert data
export async function insertBudgetData(newBudget){
    console.log("budget inserted "+JSON.stringify(newBudget))
    
    const { data, error } = await supabase1
    .from('budget')
    .insert([
      { 
        ...newBudget
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
export async function updateBudgetData(updateBudget){

    const { data, error } = await supabase1
    .from('budget')
    .update(
        {...updateBudget}
    )
    .eq("id" , updateBudget.id)
    .select()       

    if(error){
        console.log(JSON.stringify(error))
    }
    return data;
}
