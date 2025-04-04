import supabase1 from "./supabase";

// -------------------- Task data with Employee table in supabase -------------------- //
export async function getEmployeeData(){

let { data, error } = await supabase1
.from('employees')
.select('*')

if(error){
    console.error(error)
    //Create custom error with throw() Eg below:
    
    //throw new Error("Data Could not be fetched");
    
}

return data;

}

export async function deleteEmployeeData(id){

    let { data, error } = await supabase1
    .from('employees')
    .delete()
    .eq("id", id)

    if(error){
        console.error(error)
        //Create custom error with throw() Eg below:
        
            throw new Error("Data could not be deleted");
        
    }
    
    return data;

}

//Insert data
export async function insertEmployeeData(newEmployee){

    if(newEmployee?.images?.name){
    // 1. create Employee photo/image here
    console.log(newEmployee.images);
    const photoName = Math.random()+"/"+newEmployee.images.name;
    const supabaseUrl = "https://hlppyilngpqwxfijkoab.supabase.co/storage/v1/object/public/photos/";
    const photoPath = supabaseUrl + photoName;

    const { data, error } = await supabase1
    .from('employees')
    .insert([
      { name: newEmployee.name, age: newEmployee.age , status:newEmployee.status ,
        dateCreated:newEmployee.dateCreated,images: photoPath },
    ])
    .select()          

    if(error){
        console.error(error)    
        throw new Error(JSON.stringify(error));
    }

    // 2. Upload image
    const { error: storageError } = await supabase1.storage
    .from("photos")
    .upload(photoName, newEmployee.images);

    // 3. Delete file if there was an err on file uploading
    if(storageError){
    await supabase1.from('employees').delete().eq("id", data.id);

    console.error(storageError)
        throw new Error("Image could not be uploaded hence cabin cannot be inserted");
    }
    return data;
}

else{
    //If image was not uploaded
    const { data, error } = await supabase1
    .from('employees')
    .insert([
      { name: newEmployee.name, age: newEmployee.age , status:newEmployee.status ,
        dateCreated:newEmployee.dateCreated,images: "defaultUserIcon" },
    ])
    .select()          

    if(error){
        console.error(error)    
        throw new Error(JSON.stringify(error));
    }
    return data
}

}

//Update data
export async function updateEmployeeData(updateCustomer){
    console.log("Errors in updating")
    console.log(updateCustomer.name);
    console.log(updateCustomer.age);
    //console.log(updateCustomer.images.name);
    console.log(updateCustomer.id);

    if(updateCustomer?.images?.name)
    {
    // 1. create Employee photo/image here
    const photoName = Math.random()+""+updateCustomer.images.name;
    const supabaseUrl = "https://hlppyilngpqwxfijkoab.supabase.co/storage/v1/object/public/photos/";
    const photoPath = supabaseUrl + photoName;

    const { data, error } = await supabase1
    .from('employees')
    .update(
        {...updateCustomer, images:photoPath},
    )
    .eq("id" , updateCustomer.id)
    .select()       

    if(error){
        console.log(JSON.stringify(error))
    }

    // 2. Upload image
    const { error: storageError } = await supabase1.storage
    .from("photos")
    .upload(photoName, updateCustomer.images);

    // 3. Delete file if there was an err on file uploading
    if(storageError){
    await supabase1.from('employees').delete().eq("id", data.id);

    console.error(storageError)
        throw new Error("Image could not be uploaded hence cabin cannot be updated");
    }
    return data;
}

else
{
    console.log("Here file is absent")
    const { data, error } = await supabase1
    .from('employees')
    .update(
       // { name: updateCustomer.name, age: updateCustomer.age},
        {...updateCustomer},
    )
    .eq("id" , updateCustomer.id)
    .select()       

    if(error){
        console.log(JSON.stringify(error))
    }
    return data;
}

}
