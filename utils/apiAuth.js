import supabase1 from "./supabase";

export async function SignUp(userData){

  const {fullName,email,password,avatar} = userData;
  console.log("avatar in auth "+avatar.name)

  //Create file name if avatar is not ""
  if(avatar){
  let avatarName = Math.random()+"/"+avatar.name;
  let avatarPath = "https://qrsfeffnfqyohagdakgd.supabase.co/storage/v1/object/public/avatar/"+avatarName;

    //Send avatar in avatar store
    const { error: storageError } = await supabase1.storage
    .from("avatar")
    .upload(avatarName, avatar);

    if (storageError) {
      console.error("Error uploading avatar:", storageError);
      return storageError; // Stop further execution if there's an error
    }    

    //Send all data alongside with avatar in respective table
    const {data, error} = await supabase1.auth.signUp({email,password,options:{
      data:{fullName, avatar:avatarPath}
    }})

    if(error) throw new Error(error.message);
    return data
} 

// Account without Avatar
else if(!avatar){

  //Send all data alongside with avatar="" in respective table
  const {data, error} = await supabase1.auth.signUp({email,password,options:{
    data:{fullName, avatar:""}
  }})

  if(error) throw new Error(error.message);
  return data
}

}


export async function Login({email,password}){ 
const { data, error } = await supabase1.auth.signInWithPassword({
    email,
    password
  });

  if(error) {
    console.log("login err "+error);
    throw new Error(error.message);
}

  return data
}

export async function getCurrentUser() {
  const {data: session} = await  supabase1.auth.getSession() // Here I fetch auth token in local storage 
  
  if(!session.session) return null;
  
  const {data, error} = await supabase1.auth.getUser();

  console.log(data);

  if(error) throw new Error(error);

  return data?.user

}

export async function  Logout() {
  const {error} = await supabase1.auth.signOut();
  if(error) throw new Error(error.message);  
}
