import axios from "axios";
import React, { useState } from "react";
import { ColorButton } from "./StyledButton"
import EditUserDialog from "./EditUserDialog"

const API_URL = process.env.REACT_APP_API;

export default function Home() {
  const [address, setAddress] = useState("");
  const [open, setOpen] = React.useState(false);
  const [userInfo, setUserInfo] = useState({});

  const getAddress = (event) => {
    setAddress(event.target.value.toLowerCase());
  }
  const onSearch = async () => {
    const url = `${API_URL}/users/search`;
    async function getData() {
      axios.post(url, { address: address })
        .then(res => {
          if (res.data.exist === true) {
            setUserInfo(res?.data?.user);
            setOpen(true);
          }
        })
    }
    getData();
  }

  return (
    <div>
      <div>
        <a href="HOME.html#sec-b0d7" data-page-id="2979819091" className="u-image u-image-default u-logo u-image-1" data-image-width="233" data-image-height="101" title="Home">
        </a>
        <div className="u-social-icons u-spacing-10 u-social-icons-1">
          <EditUserDialog
            open={open}
            userInfo={userInfo}
            fulladdress={address}
            editable={false}
            onClose={() => setOpen(false)}
          />
          <section className="text-center pt-36 bg-u_section1 bg-cover">
            <h1 className="text-7xl text-purple-600 font-sans font-bold my-10" data-animation-name="slideIn" data-animation-duration="1000" data-animation-direction="Down">SEEFOW</h1>
            <h1 className="text-6xl text-black font-sans font-bold mx-40" data-animation-name="slideIn" data-animation-duration="1000" data-animation-direction="Down">Explore&nbsp; and meet&nbsp; people on the blockchain</h1>
            <input type="text" placeholder="Enter an adress" className="bg-opacity-0 m-10 pr-5 pl-5 border-collapse border border-black rounded-3xl p-4 text-xl w-1/3" onChange={getAddress}></input>
            <ColorButton onClick={onSearch}>Find User</ColorButton>
          </section>
          <section className="flex flex-col md:flex-row justify text-center pt-36 bg-theme-body-back z-10">
            <img alt="section2" src={window.location.origin + '/images/section-2.png'} className="mx-auto md:ml-40 w-full md:w-2/5 h-3/5" />
            <div className="w-3/5 mt-40 mx-40">
              <p className="text-5xl">About Us</p>
              <p className="text-2xl my-20 text-left">Sit amet massa vitae tortor condimentum lacinia quis.Ornare arcu dui vivamus arcu felis bibendum ut.Consectetur adipiscing elit duis tristique sollicitudin.Volutpat lacus laoreet non curabitur.Magna fringilla urna porttitor rhoncus.Ultricies leo integer malesuada nunc vel risus commodo viverra.Ipsum a arcu cursus vitae congue.Imperdiet dui accumsan sit amet nulla facilisi.</p>
            </div>
          </section>
          <section className="text-center pt-36 bg-theme-body-back z-10">
            <p className="text-7xl font-sans font-bold border-l-8 border-indigo-700 w-96 mx-auto">OUR GOAL</p>
            <p className="text-2xl mt-20 pb-40 mx-auto min-w-1/4 max-w-3/4">Oh feel if up to till like.He an thing rapid these after going drawn or.Timed she his law the spoil round defer.In surprise concerns informed betrayed he learning is ye.Ignorant formerly so ye blessing.He as spoke avoid given downs money on we.Of properly carriage shutters ye as wandered up repeated moreover.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
