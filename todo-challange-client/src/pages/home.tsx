import { useState } from "react";
import { FcMenu } from "react-icons/fc";
import { Center } from "../components/presentational/center";
import { LeftBar } from "../components/presentational/left-bar";
import { MobileLeftBar } from "../components/presentational/mobile-left-bar";

export const Home = () => {
  const [showMobileLeftBar, setShowMobileLeftBar] = useState(false);

  return <div>
    <div className="block lg:flex">
      <div className="hidden lg:block">
        <LeftBar />
      </div>
      <div className="block lg:hidden">
        <div className="fixed top-0 left-0 w-full py-5 bg-white">
          <button className="block px-10" type="button" onClick={() => setShowMobileLeftBar(true)}>
            <FcMenu className="text-2xl text-black" />
          </button>
        </div>
      </div>
      {
        showMobileLeftBar && <MobileLeftBar clickAwayCb={() => setShowMobileLeftBar(false)} />
      }
      <div className="ml-0 lg:ml-[25rem] py-[8rem] lg:py-[5rem] px-10 lg:px-[5rem]">
        <Center />
      </div>
    </div>
  </div>
}