import axios from "axios";
import { domin_name } from "./DOMIN";

export const EditArticle = async (
  title: string,
  description: string,
  id: number
) => {
  try {
    const response = await axios.put(`${domin_name}/api/articles/${id}`, {
      title: title,
      description: description,
    });
    console.log("updated");
    return response.data;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error; // Re-throw the error so it can be caught by the component
  }
};
