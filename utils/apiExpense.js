import supabase1 from "./supabase";

// -------------------- Task data with Expense table in supabase -------------------- //
export async function getExpenseData(){
let { data, error } = await supabase1
.from('expense')
.select('*')

if(error){
    console.error(error)  
    throw new Error("Data Could not be fetched");
}
return data;
}

export async function deleteExpenseData(id){
    let { data, error } = await supabase1
    .from('expense')
    .delete()
    .eq("id", id)

    if(error){
        console.error(error)
        throw new Error("Data could not be deleted");   
    }
    return data;
}

//Insert data
export async function insertExpenseData(newExpense){
    console.log("Expense inserted "+JSON.stringify(newExpense))
    console.log("Expense inserted "+newExpense.photo.name)
    
    //send data in db if photo
    if(newExpense?.photo?.name){
        // destructure newExpense to remove id
        const {id, ...expenseWithoutID} = newExpense 

        let photoName = Math.random()+"/"+newExpense.photo.name;
        let photoPath = "https://qrsfeffnfqyohagdakgd.supabase.co/storage/v1/object/public/photo/"+photoName;
      
          //Send photo in photo store
          const { error: storageError } = await supabase1.storage
          .from("photo")
          .upload(photoName, newExpense.photo);
      
          if (storageError) {
            console.error("Error uploading photo:", storageError);
            return storageError; 
          } 

        //then upload data
        const { data, error } = await supabase1
        .from('expense')
        .insert([
          { 
            ...expenseWithoutID,photo:photoPath
            },
        ])
        .select()          
    
        if(error){
            console.error(error)    
            throw new Error(JSON.stringify(error));
        }
        return data;
    }

    else{
        //then upload data
        // destructure newExpense to remove id
        const {id, ...expenseWithoutID} = newExpense 
        const { data, error } = await supabase1
        .from('expense')
        .insert([
          { 
            ...expenseWithoutID,photo:"",
            },
        ])
        .select()          
    
        if(error){
            console.error(error)    
            throw new Error(JSON.stringify(error));
        }  
        return data;      
    }
}

//Update data
export async function updateExpenseData(updateExpense){
    updateExpense?.photo? console.log("photo in expense api "+JSON.stringify(updateExpense.photo)) :""
    let photoName=""; let photoPath="";

    if(updateExpense.photo.name){
        photoName = Math.random()+"/"+updateExpense.photo.name;
        photoPath = "https://qrsfeffnfqyohagdakgd.supabase.co/storage/v1/object/public/photo/"+photoName;

        //Send photo in photo store
        const { error: storageError } = await supabase1.storage
        .from("photo")
        .upload(photoName, updateExpense.photo);
      
        if (storageError) {
            console.error("Error uploading photo:", storageError);
            return storageError; 
        } 
    }

    const { data, error } = await supabase1
    .from('expense')
    .update(
        {...updateExpense, photo:photoPath}
    )
    .eq("id" , updateExpense.id)
    .select()       

    if(error){
        console.log(JSON.stringify(error))
    }
    return data;
}
