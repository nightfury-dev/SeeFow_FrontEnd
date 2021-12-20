import axios from "axios";
import React, { useState } from "react";
import logo from "../logo.png";
import EditUserDialog from "./EditUserDialog";
import { ColorButton } from "./StyledButton";
const API_URL = process.env.REACT_APP_API;

let address;
export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [fulladdress, setFulladdress] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const connectMetamask = async () => {
    const ethereum = await window.ethereum;
    if (!ethereum) {
      return;
    }
    const connected_wallet = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (connected_wallet) {
      const _fulladdress = await connected_wallet[0];
      setFulladdress(_fulladdress);

      address =
        connected_wallet[0].substr(0, 7) +
        "..." +
        connected_wallet[0].substr(
          connected_wallet[0].length - 7,
          connected_wallet[0].length
        );
      setConnectedWallet("Your Account : " + address);
      getUserInfo(_fulladdress);
    }
  };

  const getUserInfo = (_fulladdress = "") => {
    const url = `${API_URL}/users/check`;
    axios
      .post(url, { address: _fulladdress })
      .then((res) => {
        if (res?.data?.exist) {
          setUserInfo(res?.data?.user);
        }
        setOpen(true);
      })
      .catch((error) => {
        setOpen(true);
      });
  };

  return (
    <div className="flex justify-between bg-white pt-7 text-black">
      <img src={logo} className="w-30 h-14 ml-20 mt-10" alt="logo" />
      <EditUserDialog
        open={open}
        userInfo={userInfo}
        fulladdress={fulladdress}
        editable = {true}
        onClose={() => setOpen(false)}
      />
      <div className="flex justify-between md:text-lg mr-5">
        <ColorButton
          variant="outlined"
          className="h-12"
          onClick={connectMetamask}
        >
          {connectedWallet ? connectedWallet : "Connect Wallet"}
        </ColorButton>
      </div>
    </div>
  );
}
