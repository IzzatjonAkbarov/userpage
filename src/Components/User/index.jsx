// /
//
//
//
//
//
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, Input, Modal } from "antd";
import { toast } from "react-toastify";

const User = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const UserData = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!UserData) {
      navigate("/");
    }
  }, [navigate, UserData]);

  useEffect(() => {
    if (UserData) {
      reset({
        name: UserData?.Fisrt_Name,
        surname: UserData?.Last_Name,
        country: UserData?.Country,
        town: UserData?.Town_city,
        Stateadress: UserData?.State_Address,
        extra: UserData?.Extra_Adress,
        state: UserData?.State_Address,
        Zip: UserData?.Zip,
        email: UserData?.Email_Adress,
        number: UserData?.Phone_number,
      });
    }
  }, [UserData, reset]);

  const clearing = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const submit = (formData) => {
    axios
      .put(
        `https://67aec39a9e85da2f020e488f.mockapi.io/user_Info/${UserData.id}`,
        {
          Fisrt_Name: formData.name || "",
          Last_Name: formData.surname || "",
          State_Address: formData.Stateadress || "",
          Extra_Adress: formData.extra || "",
          Town_city: formData.town || "",
          Email_Adress: formData.email || "",
          Country: formData.country || "",
          Your_State: formData.state || "",
          Zip: formData.Zip || "",
          Phone_number: formData.number || "",
        }
      )
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("User data updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user data:", error.message);
        toast.error("Failed to update user data!");
      });
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);

    axios
      .get(
        `https://67aec39a9e85da2f020e488f.mockapi.io/user_Info/${UserData.id}`
      )
      .then((data) => {
        if (data.data.Password === currentPassword) {
          if (newPassword === confirmPassword) {
            axios
              .put(
                `https://67aec39a9e85da2f020e488f.mockapi.io/user_Info/${UserData.id}`,
                { Password: newPassword }
              )
              .then(() => {
                setLoading(false);
                setOpen(false);
                const updatedUserData = { ...UserData, Password: newPassword };
                localStorage.setItem("user", JSON.stringify(updatedUserData));
                toast.success("Password updated successfully!");
              })
              .catch((error) => {
                setLoading(false);
                console.error("Error updating password:", error.message);
                toast.error("Failed to update password!");
              });
          } else {
            setLoading(false);
            toast.error("New password and confirmation do not match!");
          }
        } else {
          setLoading(false);
          toast.error("Current password is incorrect!");
        }
      })
      .catch((error) => {
        console.error("Error updating password:", error.message);
        toast.error("Failed to update password!");
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const isSubmitDisabled =
    !currentPassword ||
    !newPassword ||
    !confirmPassword ||
    newPassword !== confirmPassword;

  return (
    <div>
      <div className="absolute top-10 right-40">
        <Button
          className="!px-5 !py-2.5 !text-white !bg-green-600"
          onClick={showModal}>
          Change password
        </Button>

        <Modal
          open={open}
          title="Update Password"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleOk}
              disabled={isSubmitDisabled}>
              Update Password
            </Button>,
          ]}>
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="currentPassword"
              style={{ display: "block", fontWeight: "bold" }}>
              Current Password
            </label>
            <Input.Password
              id="currentPassword"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="newPassword"
              style={{ display: "block", fontWeight: "bold" }}>
              New Password
            </label>
            <Input.Password
              id="newPassword"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="confirmPassword"
              style={{ display: "block", fontWeight: "bold" }}>
              Confirm New Password
            </label>
            <Input.Password
              id="confirmPassword"
              placeholder="Re-enter your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {newPassword !== confirmPassword && confirmPassword && (
            <p style={{ color: "red" }}>
              New password and confirmation do not match.
            </p>
          )}
        </Modal>
      </div>

      <div className="h-screen w-full flex items-center justify-center">
        <button
          onClick={clearing}
          className="w-[fit] absolute top-10 right-10 text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Log out
        </button>

        <form onSubmit={handleSubmit(submit)} className="w-[90%] mx-auto">
          <div className="flex items-center gap-10">
            <div className="mb-5 w-full">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900">
                Your Name
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-5 w-full">
              <label
                htmlFor="surname"
                className="block mb-2 text-sm font-medium text-gray-900">
                Your Surname
              </label>
              <input
                {...register("surname")}
                type="text"
                id="surname"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Your Surname"
              />
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="mb-5 w-full">
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium text-gray-900">
                Country/Region
              </label>
              <input
                {...register("country")}
                type="text"
                id="country"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Your Country"
              />
            </div>
            <div className="mb-5 w-full">
              <label
                htmlFor="town"
                className="block mb-2 text-sm font-medium text-gray-900">
                Town/City
              </label>
              <input
                {...register("town")}
                type="text"
                id="town"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Your Town or City"
              />
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="mb-5 w-full">
              <label
                htmlFor="Stateadress"
                className="block mb-2 text-sm font-medium text-gray-900">
                State Address
              </label>
              <input
                {...register("Stateadress")}
                type="text"
                id="Stateadress"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="State Address"
              />
            </div>
            <div className="mb-5 w-full">
              <label
                htmlFor="extra"
                className="block mb-2 text-sm font-medium text-gray-900">
                Extra Address
              </label>
              <input
                {...register("extra")}
                type="text"
                id="extra"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Extra Address"
              />
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="mb-5 w-full">
              <label
                htmlFor="state"
                className="block mb-2 text-sm font-medium text-gray-900">
                Your State
              </label>
              <input
                {...register("state")}
                type="text"
                id="state"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Your State"
              />
            </div>
            <div className="mb-5 w-full">
              <label
                htmlFor="Zip"
                className="block mb-2 text-sm font-medium text-gray-900">
                Your Zip Address
              </label>
              <input
                {...register("Zip")}
                type="number"
                id="Zip"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Your Zip Address"
              />
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="mb-5 w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900">
                Your Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-5 w-full">
              <label
                htmlFor="number"
                className="block mb-2 text-sm font-medium text-gray-900">
                Your Number
              </label>
              <input
                {...register("number")}
                type="text"
                id="number"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Your Number"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-[fit] text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Click to save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default User;
