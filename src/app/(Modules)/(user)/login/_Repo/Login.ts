import { LoginSchemaType } from "../_Validations/LoginValidation";

interface Login {
    login: (data:LoginSchemaType)=>Promise<void>,
}

export default Login;