import axios from "axios";
import { domin_name } from "./DOMIN";

export const editComment = async (commentId: number, text: string) => {
  let error = "";
  try {
    await axios.put(`${domin_name}/api/comments/${commentId}`, {text:text});
    console.log("ubdated");
    error = "hi";
  } catch (error) {
    console.log(error);
    console.log("error");
    error = error;
  }
  return error;
};
