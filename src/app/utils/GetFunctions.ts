import axios from "axios";
import { domin_name } from "./DOMIN";

export const getCountOfArticles = async () => {
  try {
    const response = axios.get(`${domin_name}/api/articles/count`);
    const count = (await response).data.message;
    return count;
  } catch {
    return 0;
  }
};
