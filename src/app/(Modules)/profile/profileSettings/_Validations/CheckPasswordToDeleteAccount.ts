import z from "zod";

const DeleteAccount =z.object({
     password:z.string().min(8,"invalid password")
})
export type DeleteAccountType=z.infer<typeof DeleteAccount>
export default DeleteAccount;