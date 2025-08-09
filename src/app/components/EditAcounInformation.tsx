"use client";
import { Button, Divider, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SaveIcon from "@mui/icons-material/Save";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { domin_name } from "../utils/DOMIN";
import { useRouter } from "next/navigation";
import DialogEditPasswordAccount from "./DialogEditPasswordAccount";
import DeleteAcountDialog from "./DeleteAcountDialog";

interface UserData {
  username: string;
  email: string;
}

const EditAccountInformation = ({ id }: { id: string }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
  });
  const [originalData, setOriginalData] = useState<UserData>({
    username: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openDeleteAcountDialog, setOpenDeleteAcountDialog] = useState(false);

  const handleChange = (
    name: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserData({ ...userData, [name]: e.target.value });
  };

  const handleDeleteAccount = async () => {
    setOpenDeleteAcountDialog(true);
  };

  const handleUpdateAccount = async () => {
    if (
      userData.username === originalData.username &&
      userData.email === originalData.email
    ) {
      toast.info("No changes detected");
      return;
    }

    try {
      const response = await axios.put(
        `${domin_name}/api/users/profile/${id}`,
        {
          username:
            userData.username !== originalData.username
              ? userData.username
              : undefined,
          email:
            userData.email !== originalData.email ? userData.email : undefined,
        }
      );

      // If username was updated, update the token in cookie
      if (userData.username !== originalData.username) {
        // Update the token with new username
        const newToken = response.data.token || response.data.message?.token;
        if (newToken) {
          document.cookie = `token=${newToken}; path=/; max-age=86400`;
        }
        toast.success("Profile updated successfully. Reloading...");
        setTimeout(() => {
          // window.location.reload();
          router.refresh();
        }, 1000);
      } else {
        toast.success("Profile updated successfully");
        fetchUserData(); // Refresh data
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to update profile";
      toast.error(message);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${domin_name}/api/users/profile/${id}`);

      const data = {
        username: response.data.message.username,
        email: response.data.message.email,
      };
      setUserData(data);
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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <DialogEditPasswordAccount
        id={id}
        open={openPasswordDialog}
        setOpen={setOpenPasswordDialog}
      />
      <DeleteAcountDialog
        id={id}
        open={openDeleteAcountDialog}
        setOpen={setOpenDeleteAcountDialog}
      />
      <Toaster position="top-right" richColors />
      <Typography variant="h4" component="h1" gutterBottom>
        Profile Settings
      </Typography>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <Typography variant="h6" gutterBottom className="mb-6">
          Profile Information
        </Typography>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <PersonIcon color="action" />
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={userData.username}
                onChange={(e) => handleChange("username", e)}
              />
            </div>

            <div className="flex items-center gap-2">
              <EmailIcon color="action" />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                value={userData.email}
                onChange={(e) => handleChange("email", e)}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            size="large"
            onClick={handleUpdateAccount}
            disabled={
              userData.username === originalData.username &&
              userData.email === originalData.email
            }
          >
            Save Changes
          </Button>
        </div>
      </div>

      <Divider className="my-8" />

      <div className="bg-white rounded-lg shadow-md p-6">
        <Typography variant="h6" gutterBottom className="mb-6">
          Security Settings
        </Typography>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <LockIcon color="action" />
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => setOpenPasswordDialog(true)}
            >
              Change Password
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <LockIcon color="action" />
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={handleDeleteAccount}
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
