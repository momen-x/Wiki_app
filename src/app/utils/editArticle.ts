import axios from "axios";
import { domain_name } from "./Domain";

export const EditArticle = async (
  title: string,
  description: string,
  id: number,
  userId:number
) => {
  try {
    const response = await axios.put(`${domain_name}/api/articles/${id}`, {
      title: title,
      description: description,
      userId:userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error; 
  }
};
