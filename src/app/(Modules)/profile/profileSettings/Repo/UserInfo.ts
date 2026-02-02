import { DeleteAccountType } from "../_Validations/CheckPasswordToDeleteAccount";
import { UpdateUserPasswordType, UpdateUserSchemaType } from "../_Validations/UpdateUserInfoValidation";

interface UserInfo{
    editUsername:(data:UpdateUserSchemaType,id:string|number)=>Promise<void>;
    editUserPassword:(data:UpdateUserPasswordType,id:string|number)=>Promise<void>;
    deleteUserAccount:(data:DeleteAccountType,id:string|number)=>Promise<void>;


}

export default UserInfo;