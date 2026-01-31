import axios from "axios";
import { RegisterSchemaType } from "../_Validation/RegisterValidation";
import Register from "./Register";
import { domain_name } from "@/app/utils/Domain";

const userRegister:Register={
register:async (data:RegisterSchemaType)=>{
     const response = await axios.post(
        `${domain_name}/api/users/register`,
    data
      );
}
}

export default userRegister;