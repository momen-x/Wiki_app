import axios from "axios";
import { domin_name } from "./DOMIN";

export const GetSingleUser = async (id: any) => {
  const response = await axios.get(`${domin_name}/api/users/profile/${id}`);
  console.log(response.data);
};
