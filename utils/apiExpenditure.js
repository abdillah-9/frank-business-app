import supabase1 from "./supabase";

// -------------------- Task data with expenditure table in supabase -------------------- //
export async function getExpenditureData(){
let { data, error } = await supabase1
.from('expenditure')
.select('*')

if(error){
    console.error(error)  
    throw new Error("Data Could not be fetched");
}
return data;
}

export async function deleteExpenditureData(id){
    let { data, error } = await supabase1
    .from('expenditure')
    .delete()
    .eq("id", id)

    if(error){
        console.error(error)
        throw new Error("Data could not be deleted");   
    }
    return data;
}

//Insert data
export async function insertExpenditureData(newExpenditure){
    
    const { data, error } = await supabase1
    .from('expenditure')
    .insert([
      { 
        date: newExpenditure.date, description: newExpenditure.description,
        cost: newExpenditure.cost, taskSite: newExpenditure.taskSite,
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
export async function updateExpenditureData(updateExpenditure){

    const { data, error } = await supabase1
    .from('expenditure')
    .update(
        {...updateExpenditure}
    )
    .eq("id" , updateExpenditure.id)
    .select()       

    if(error){
        console.log(JSON.stringify(error))
    }
    return data;
}
