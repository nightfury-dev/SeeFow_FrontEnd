import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { profileServerUrl } from "../utils/config";
const API_URL = process.env.REACT_APP_API;

export default function EditUserDialog({
  open = false,
  userInfo = {},
  fulladdress = "",
  editable = false,
  onClose = console.log,
}) {
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const url = `${API_URL}/users/add`;
  const updateUrl = `${API_URL}/users/update-user`;
  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const changeBio = (event) => {
    setBio(event.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);
    formData.append("address", userInfo?.address ?? fulladdress);
    formData.append("bio", bio);
    if (Boolean(userInfo?.address)) {
      await axios
        .post(updateUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          onClose();
        });
    } else {
      await axios
        .post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          onClose();
        });
    }
  };

  useEffect(() => {
    setImage({
      raw: "",
      preview: Boolean(userInfo?.avatar)
        ? `${profileServerUrl}${userInfo?.avatar}`
        : "",
    });
    setBio(userInfo?.bio ?? "");
    setAddress(userInfo?.address ?? "");
  }, [userInfo]);

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>User Information</DialogTitle>
        <DialogContent>
          <div className="flex justify">
            <div className="flex flex-col items-center">
              <label htmlFor="upload-button">
                <Avatar
                  src={image.preview}
                  alt="dummy"
                  sx={{ width: 150, height: 150 }}
                />
              </label>
              <input
                type="file"
                id="upload-button"
                style={{ display: "none" }}
                onChange={handleChange}
              />
              <br />
            </div>
            <div className="flex flex-col m-5">
              <label className="text-purple-700 text-xl py-3">
                Wallet Address
              </label>
              <label>{userInfo?.address ?? fulladdress}</label>
            </div>
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="bio"
            label="BIO"
            type="text"
            value={bio}
            fullWidth
            variant="standard"
            onChange={changeBio}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          {editable === true ? <Button onClick={handleUpload}>
            {!Boolean(userInfo?.address) ? "ADD" : "Update"}
          </Button> : <></>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
