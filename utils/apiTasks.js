import supabase1 from "./supabase";

// -------------------- Task data with tasks table in supabase -------------------- //
export async function getTaskData(){
let { data, error } = await supabase1
.from('tasks')
.select('*')

if(error){
    console.error(error)  
    throw new Error("Data Could not be fetched");
}
return data;
}

export async function deleteTaskData(id){
    let { data, error } = await supabase1
    .from('tasks')
    .delete()
    .eq("id", id)

    if(error){
        console.error(error)
        throw new Error("Data could not be deleted");   
    }
    return data;
}

//Insert data
export async function insertTaskData(newTask){

    const { data, error } = await supabase1
    .from('tasks')
    .insert([
      { 
        name: newTask.name, startDate: newTask.startDate , endDate: newTask.endDate,
        workers: newTask.workers, payment: newTask.payment, status: newTask.status,
        description: newTask.description,
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
export async function updateTaskData(updateTask){

    const { data, error } = await supabase1
    .from('tasks')
    .update(
        {...updateTask}
    )
    .eq("id" , updateTask.id)
    .select()       

    if(error){
        console.log(JSON.stringify(error))
    }
    return data;
}
