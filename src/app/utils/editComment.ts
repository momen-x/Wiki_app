import axios from "axios";
import { domain_name } from "./Domain";

export const editComment = async (commentId: number, text: string) => {
  let error = "";
  try {
    await axios.put(`${domain_name}/api/comments/${commentId}`, { text: text });
    error = "hi";
  } catch (error) {
    console.error(error);

    error = error;
  }
  return error;
};
