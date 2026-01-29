// "use client";

// import * as React from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { domain_name } from "@/app/utils/Domain";
// import { useForm } from "react-hook-form";
// import { UpdateCommentSchema, UpdateCommentSchemaType } from "../Validation/CreateAndEditComment";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Dialog, DialogContent, DialogTitle } from "@/app/_Components/ui/dialog";
// import ValidationInput from "@/app/_Components/Inputs/ValidationInput";
// import { Button } from "@/app/_Components/ui/button";

// interface IProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   text: string;
//   setText: (text: string) => void;
//   id: number;
//   articleId: number;
// }

// export default function DialogToEditComment({
//   open,
//   text,
//   id,
//   articleId,
// }: IProps) {
//   const router = useRouter();
//   const [loading, setLoading] = React.useState(false);

// const form =useForm<UpdateCommentSchemaType>({
//     defaultValues: {
//       text: text
//     },
//     mode: "onBlur",
//     resolver: zodResolver(UpdateCommentSchema)
// })

//   const editComment = async () => {
 

//     setLoading(true);
//     try {
//       await axios.put(`${domain_name}/api/comments/${id}`, {
//         text: text.trim(),
//         articleId,
//       });
//       router.refresh();
  
//     } catch (error) {
//       console.error("Failed to update comment:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <Dialog
//       open={open}
//     >
//       <DialogTitle>
//         <div
//         >
//           <p >
//             Edit Comment
//           </p>
//         </div>
//       </DialogTitle>
//       <DialogContent>
//         <ValidationInput<UpdateCommentSchemaType>
//                       fieldTitle="Add Comment"
//               nameInSchema="text"
//               placeholder="Write your comment here..."
//             />
//        <Button
//           onClick={editComment}
//           disabled={!text.trim() || loading}
//           variant="default"
//           color="primary"
//           type="submit"
// >
//           {loading ? "Saving..." : "Save"}
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// }
