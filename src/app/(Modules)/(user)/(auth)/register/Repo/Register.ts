import { RegisterSchemaType } from "../_Validation/RegisterValidation";

interface Register{
    register:(data:RegisterSchemaType)=>Promise<void>,
}

export default Register;