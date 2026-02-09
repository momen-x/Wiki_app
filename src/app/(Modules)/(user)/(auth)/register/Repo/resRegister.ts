import axios from "axios";
import { RegisterSchemaType } from "../_Validation/RegisterValidation";
import Register from "./Register";

const userRegister: Register = {
  register: async (data: RegisterSchemaType) => {
    await axios.post("/api/users/register", data);
  },
};

export default userRegister;