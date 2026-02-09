export interface IReturnData {
  type: "success" | "error";
  message: string;
  open: boolean;
}

export interface VerificationTokenData {
  id: string;      // Added id field
  email: string;
  token: string;
  expires: Date;
}