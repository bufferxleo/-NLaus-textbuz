import { LuHome } from "react-icons/lu";
import Button from "~/ui/Button";
import Image from "~/ui/Image";
import Logo from "~/ui/Logo";
import { IoSettingsOutline } from "react-icons/io5";

const SideBar = () => {
  return (
    <div className="h-screen flex flex-col gap-3 w-[300px] items-start shadow p-10 hidden sm:hidden md:block">
      <Logo className="w-[200px] h-[40px]" />
      <Button className="mx-4 mt-12 h-12 gap-2 flex w-[200px] shadow-none bg-gradient-to-r from-[#54b58f] to-[#4fb5ff] px-8">
        <LuHome size={20} />
        <p className="text-white text-left font-bold">Dashboard</p>
      </Button>
      <Image
        className=" my-2 mt-6 w-[200px]"
        src="./assets/horizontalLine.png"
      ></Image>
      <Button className="mx-4  flex gap-2 h-12 w-[200px] bg-transparent shadow-none px-8">
        <LuHome color="black" size={20} />
        <p className="text-black text-left">Accounts</p>
      </Button>
      <Button className="mx-4  flex gap-2 h-12 w-[200px] bg-transparent shadow-none px-8">
        <IoSettingsOutline color="black" size={20} />
        <p className="text-black text-left">Settings</p>
      </Button>
    </div>
  );
};

export default SideBar;
