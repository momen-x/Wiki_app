import axios from "axios";
import { DeleteAccountType } from "../_Validations/CheckPasswordToDeleteAccount";
import { UpdateUserPasswordType, UpdateUserSchemaType } from "../_Validations/UpdateUserInfoValidation";
import UserInfo from "./UserInfo";
import { domain_name } from "@/app/utils/Domain";




const URL=`${domain_name}/api/users/profile`;
const userApi:UserInfo={
editUsername:async (data:UpdateUserSchemaType,id:string|number)=>{
    try {
         await axios.put(
        `${URL}/${id}`,
        data
        ,)
    } catch (error) {
        console.error(error);
        
    }

},
editUserPassword:async (data:UpdateUserPasswordType,id:string|number)=>{
    try {
         await axios.put(`${domain_name}/api/users/profile/${id}`, {
        oldPassword: data.oldPassword,
        password: data.newPassword,
      });
        
    } catch (error) {
        console.error(error);
        
    }

},
deleteUserAccount:async (data:DeleteAccountType,id:string|number)=>{
    try {
         await axios.delete(
        `${domain_name}/api/users/profile/${id}`,
        {
          headers: {
            "X-Password": data.password,
          },
        },
      );
        
    } catch (error) {
        console.error(error);
    }


}
}

export default userApi;