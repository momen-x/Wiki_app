import axios from 'axios';
import Login from './Login';
import { LoginSchemaType } from '../_Validations/LoginValidation';
import { domain_name } from '@/app/utils/Domain';
export const userLogin :Login={
    login:async (data:LoginSchemaType)=>{
const response=await axios.post(
        `${domain_name}/api/users/login`,
        {
          email:data.email,
          password:data.password,}, ); }

}
