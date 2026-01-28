import axios from "axios";
import { domain_name } from "./Domain";

export const GetSingleUser = async (id: any) => {
  const response = await axios.get(`${domain_name}/api/users/profile/${id}`);
  console.log(response.data);
};
