import axios from "axios";
import { domain_name } from "./Domain";

export const getCountOfArticles = async () => {
  try {
    const response = axios.get(`${domain_name}/api/articles/count`);
    const count = (await response).data.message;
    return count;
  } catch {
    return 0;
  }
};
