
import supabase1 from "./supabase";
import supabaseAdmin from "./supabaseAdmin";

console.log("auth in adminAuth "+supabaseAdmin.auth.admin);

export async function getAllUsers(){

    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      // //page: 1,  //number of pages
      // perPage: 10, //number of users per page
    });
  
    console.log("all users are "+data);
  
    if(error) throw new Error(error);
  
    return data
    
  }
  
  export async function deleteUser(userID){

    console.log("user ID"+userID)
  
    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(
      userID
    )
  
    if(error) throw new Error(error);
  
    return data
    
  }

  export async function updateUser({avatar,id,password,fullName,email}){
    console.log("update user api "+" id :"+id+" avatar:"+avatar+" password:"+password+" fullname: "+fullName+" email: "+email);
    const supabaseUrl = "https://qrsfeffnfqyohagdakgd.supabase.co/storage/v1/object/public/avatar/";

    //First condition PASSWORD AND AVATAR ***************************************
    if(password && avatar){
      const photoName = id+"/"+avatar.name;
      console.log("Photoname :"+photoName)
      let avatarPath = supabaseUrl+photoName;

      const {data, error} = await supabaseAdmin.auth.admin.updateUserById(id,{
        email,password,user_metadata:{fullName,avatar: avatarPath}
      });

      if(error) throw new Error(error);

      //List all files in users folder of his/her avatar photo
      // List all files in the 'user1' folder
      const { data: files, error: listError } = await supabase1.storage
      .from('avatar')
      .list(id, { limit: 100, offset: 0 });  // Adjust limit if necessary

      // Handle errors in listing
      if (listError) {
        console.error('Error listing files:', listError.message);
        return;
      }

      //Delete any file in the given path in store
      for (const file of files) {
        console.log("file is :"+file.name);
        const {error: storageDelete} = await supabase1.storage
        .from("avatar")
        .remove(id+"/"+file.name);

        if(storageDelete) throw new Error("cant delete file.name :" + JSON.stringify(storageDelete));
      }
      
      //Move the new file into avatar store
      const { error: storageError } = await supabase1.storage
      .from("avatar")
      .upload(photoName, avatar);    

      if(storageError) throw new Error("storage error :" + JSON.stringify(storageError));

      return data
    }

    //Second condition !PASSWORD AND AVATAR ***********************************
    if(!password && avatar){
      const photoName = id+"/"+avatar.name;
      console.log("Photoname :"+photoName)
      let avatarPath = supabaseUrl+photoName;

      const {data, error} = await supabaseAdmin.auth.admin.updateUserById(id,{
        email,user_metadata:{fullName,avatar: avatarPath}
      });

      if(error) throw new Error(error);

      //List all files in users folder of his/her avatar photo
      // List all files in the 'user1' folder
      const { data: files, error: listError } = await supabase1.storage
      .from('avatar')
      .list(id, { limit: 100, offset: 0 });  // Adjust limit if necessary

      // Handle errors in listing
      if (listError) {
        console.error('Error listing files:', listError.message);
        return;
      }

      //Delete any file in the given path in store
      for (const file of files) {
        console.log("file is :"+file.name);
        const {error: storageDelete} = await supabase1.storage
        .from("avatar")
        .remove(id+"/"+file.name);

        if(storageDelete) throw new Error("cant delete file.name :" + JSON.stringify(storageDelete));
      }
      
      //MOve the new file into avatar store
      const { error: storageError } = await supabase1.storage
      .from("avatar")
      .upload(photoName, avatar);    

      if(storageError) throw new Error("storage error :" + JSON.stringify(storageError));

      return data
    }

    //Third condition PASSWORD AND !AVATAR ***********************************
    else if(password && !avatar){
      const {data, error} = await supabaseAdmin.auth.admin.updateUserById(id,{
        email,password,user_metadata:{fullName}
      });

      if(error) throw new Error(error);

      return data
    }

    //Forth condition !PASSWORD AND !AVATAR ********************************* 
    else if(!password && !avatar){
      const {data, error} = await supabaseAdmin.auth.admin.updateUserById(id,{
        email,user_metadata:{fullName}
      });

      if(error) throw new Error(error);

      return data
    }   
  }


  // const {error: storageDelete} = await supabase1.auth.storage
  //     .from("avatar")
  //     .delete(photoName);

  //     if(storageDelete) throw new Error("storage error :" + JSON.stringify(storageDelete));
  