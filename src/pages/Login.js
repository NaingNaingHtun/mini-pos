import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { BeatLoader } from "react-spinners";
import api from ".././api";
import FadeInOut from "../components/FadeInOut";
const Login = ({ setIsAuthenticated }) => {
  const [signingIn, setSigningIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongCredentials, setWrongCredentials] = useState(false);

  //HANDLERS
  //sign in
  const signIn = async (e) => {
    e.preventDefault();
    //no email or password required, then do nothing
    if (!email && !password) {
      return;
    }

    setSigningIn(true);
    await api
      .post("/auth/signin", { email, password })
      .then((res) => {
        if (res.status === 200) {
          setSigningIn(false); //hide the spinner
          setWrongCredentials(false); //hide the incorrect credentials box
          setIsAuthenticated(true); //
        }
      })
      .catch((err) => {
        console.log(err);
        setSigningIn(false); //hide the spinner
        setWrongCredentials(true); //hide the incorrect credentials box
        setIsAuthenticated(false);
      });
  };
  //handling email changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setWrongCredentials(false); //hide the incorrect credentials box when the user makes changes in the form
  };
  //handling password changes
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setWrongCredentials(false); //hide the incorrect credentials box when the user makes changes in the form
  };
  return (
    <div className="flex w-[100vw] h-[100vh] font-medium">
      <div className="flex-1 hidden md:flex flex-col justify-between bg-[#151D72] text-white">
        <img
          src="images/logo.png"
          alt="K-Link Logo"
          className="h-[35px] w-[152px] m-[32px]"
        />
        <div className="flex flex-col justify-center items-center gap-[32px]">
          <div className="flex gap-1">
            {[0, 0, 0, 0, 0].map((star, index) => (
              <AiFillStar
                key={index}
                className="w-[20px] h-[20px] text-[#FEC84B]"
              />
            ))}
          </div>
          <h1 className="text-center text-[30px] leading-[38px] w-[592px] h-[114px] mt-5">
            KLink has saved us thousands of hours of work. We’re able to spin up
            projects and features much faster.
          </h1>
          <img
            src="images/Avatar.png"
            className="w-[64px] h-[64px] object-cover"
            alt="Designer"
          />
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <h1 className="text-[16px]">Lori Bryson</h1>
          <h2 className="text-[14px] text-[#939DD4] leading-5">
            Product Designer, Sisyphus
          </h2>
        </div>
        <div className="p-[32px] flex justify-between items-end text-[#939DD4]">
          <div>© klinkenterprise.com</div>
          <div className="flex items-center gap-2">
            <HiOutlineMail />
            <span>help@klinkenterprise.com</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center flex-col gap-5">
        {wrongCredentials && (
          <FadeInOut show={wrongCredentials}>
            <div className="w-[360px] border-[1px] text-center border-red-500 p-2 rounded-lg text-red-500 bg-red-200">
              Incorrect email or password
            </div>
          </FadeInOut>
        )}

        <div className="flex flex-col items-start gap-[40px] w-[360px]">
          <div className="flex flex-col items-start gap-[12px]">
            <h1 className="font-semibold text-[36px] leading-[44px] text-[#101828] tracking-[-0.02em]">
              Login
            </h1>
            <h2 className="text-[#667085] leading-[24px] text-[16px]">
              Welcome back! Please enter your details.
            </h2>
          </div>
          <form
            className="w-full flex flex-col gap-[20px] items-start"
            onSubmit={signIn}
          >
            <div className="w-full flex flex-col items-start gap-1">
              <label className="text-[14px] text-[#344054]" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required={true}
                className="w-full py-[10px] px-[14px] border-[1px] border-gray-300 rounded-lg outline-none"
                onChange={handleEmailChange}
                style={{ border: wrongCredentials ? "1px solid red" : "" }}
              />
            </div>
            <div className="w-full flex flex-col items-start gap-1">
              <label className="text-[14px] text-[#344054]" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                required={true}
                placeholder="Enter your password"
                className="w-full py-[10px] px-[14px] border-[1px] border-gray-300 rounded-lg outline-none"
                onChange={handlePasswordChange}
                style={{ border: wrongCredentials ? "1px solid red" : "" }}
              />
            </div>
            {signingIn ? (
              <div className="w-full py-[10px] px-[18px] text-center rounded-lg bg-[#2E3EA1] text-white cursor-pointer hover:bg-[#485ad0]">
                <BeatLoader color="#ffffff" size={10} />
              </div>
            ) : (
              <input
                type="submit"
                value="Sign In"
                className="w-full py-[10px] px-[18px] rounded-lg bg-[#2E3EA1] text-white cursor-pointer hover:bg-[#485ad0]"
                onClick={signIn}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
