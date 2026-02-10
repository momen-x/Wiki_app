"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { domain_name } from "../../../../utils/Domain";
import { useRouter } from "next/navigation";
import DeleteAccountDialog from "./DeleteAccountDialog";
import { useForm } from "react-hook-form";
import  {UpdateUserSchema, UpdateUserSchemaType } from "../_Validations/UpdateUserInfoValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/app/_Components/ui/form";
import ValidationInput from "@/app/_Components/Inputs/ValidationInput";
import { LockIcon, Mail, User, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/app/_Components/ui/button";
import DialogEditPasswordAccount from "./DialogEditPasswordAccount";
import { toast } from "react-toastify";

interface UserData {
  username: string;

}

const EditAccountInformation = ({ id }: { id: string }) => {
  const router = useRouter();
  
  const form = useForm<UpdateUserSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      username: "",
    },
  });

  const [originalData, setOriginalData] = useState<UserData>({
    username: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);

  const handleDeleteAccount = async () => {
    setOpenDeleteAccountDialog(true);
  };

  const handleUpdateAccount = async (data: UpdateUserSchemaType) => {
    try {
      const response = await axios.put(
        `${domain_name}/api/users/profile/${id}`,
        {
          username:
            data.username !== originalData.username ? data.username : undefined,
        },
        { withCredentials: true },
      );
      toast.success("the username updated successfully");
  
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to update profile";
      toast.error(message);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${domain_name}/api/users/profile/${id}`,
        {
          withCredentials: true,
        },
      );
      const data = {
        username: response.data.message.username,
        name: response.data.message.name,
      };
      
      form.reset({
        username: data.username,
      });
      setOriginalData(data);
    } catch (error) {
      toast.error("Failed to fetch user data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }



  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <DialogEditPasswordAccount
        id={id}
        open={openPasswordDialog}
        setOpen={setOpenPasswordDialog}
      />
      <DeleteAccountDialog
        id={id}
        open={openDeleteAccountDialog}
        setOpen={setOpenDeleteAccountDialog}
      />

      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Profile Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account information and security
        </p>
      </div>

      {/* Profile Information Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Profile Information
          </h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateAccount)}
            className="space-y-5"
          >
            <div className="space-y-4">
              {originalData.username && (
                <ValidationInput<UpdateUserSchemaType>
                  fieldTitle="Username"
                  nameInSchema="username"
                  placeholder="Enter your username"
                  type="text"
                />
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium cursor-pointer"
                disabled={
                  isLoading || form.watch("username") === originalData.username
                }
              >
                {isLoading ? " Updating..." : " Save Profile Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Security Settings Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Security Settings
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <div className="flex items-center gap-3">
              <LockIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">
                  Password
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Change your account password
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setOpenPasswordDialog(true)}
              className="shrink-0"
            >
              Change Password
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">
                  Delete Account
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Permanently delete your account and all data
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleDeleteAccount}
              className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/30 shrink-0"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccountInformation;