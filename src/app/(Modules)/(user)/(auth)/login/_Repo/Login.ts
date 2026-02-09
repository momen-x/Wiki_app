import { LoginSchemaType } from "../_Validations/LoginValidation";

interface Login {
    login: (data:LoginSchemaType)=>Promise<{message:string,success:boolean}>,
}

export default Login;