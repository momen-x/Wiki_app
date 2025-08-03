import axios from "axios";
import { domin_name } from "./DOMIN";

export const EditArticle = async (
  title: string,
  description: string,
  id: number
) => {
  try {
    await axios.put(`${domin_name}/api/articles/${id}`, {
      title: title,
      description: description,
    });
    console.log("ubdated");
  } catch (error) {
    console.log("error");
  }
};
