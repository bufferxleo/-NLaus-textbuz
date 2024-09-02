import EditableContentContextText from "~/ui/EditableContentContextText";
import EditableFormInput from "~/ui/EditableFormInput";
import { GoBell } from "react-icons/go";
import Image from "~/ui/Image";
import { useState } from "react";
import Button from "~/ui/Button";
import { FaToggleOff } from "react-icons/fa6";
import NavLink from "~/ui/NavLink";

// Define props type for the DashBoardHeader component
type DashBoardHeaderProps = {
  user: {
    id: string;
    phone_number: string;
    email?: string;
    first_name: string;
    last_name: string;
    profile_picture?: string;
    // Add other fields as necessary based on the user object
  };
};

const DashBoardHeader: React.FC<DashBoardHeaderProps> = ({ user }) => {
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  // console.log(user);
  const closeMenu = () => {
    if (showMenu) {
      setShowMenu(false);
    }
  };
  return (
    <div className="w-full flex flex-col" onClick={closeMenu}>
      <div className="h-20 w-full flex justify-between items-center p-2 px-4 gap-2 shadow">
        <div className="w-3/5">
          <EditableFormInput
            value={search}
            onChange={setSearch}
            placeholder="  ⌕  Search for anything..."
            className="p-2 border-2 border-gray-300 rounded-lg w-full"
          />
        </div>
        <div className="flex gap-4 items-center justify-center ">
          <GoBell size={25} />
          <div className="relative">
            <div
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center cursor-pointer"
            >
              <Image
                src={
                  user.profile_picture
                    ? `${user.profile_picture}`
                    : "./assets/profile.png"
                }
                className="h-9 w-9 rounded-full object-cover object-center"
              />
            </div>
            <div className="absolute top-16 right-0 z-10 w-[200px] bg-white rounded-md shadow-md">
              <ul hidden={!showMenu}>
                <li className=" pl-8 px-4 py-3 hover:bg-gray-100">
                  <NavLink to="#" className="block whitespace-no-wrap">
                    Profile
                  </NavLink>
                </li>
                <li className="pl-8 px-4 py-3 hover:bg-gray-100">
                  <NavLink to="#" className="block whitespace-no-wrap">
                    Settings
                  </NavLink>
                </li>
                <li className=" pl-8 px-4 py-3 hover:bg-gray-100 flex items-center justify-between">
                  <NavLink to="#" className="block whitespace-no-wrap">
                    Dark mode
                  </NavLink>
                  <FaToggleOff size={20} />
                </li>
                <hr className="mx-2 my-1" />
                <li className=" pl-8 px-4 py-4 hover:bg-gray-100">
                  <NavLink to="/login" className="block whitespace-no-wrap">
                    Sign out
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-auto max-w-full flex items-start justify-between p-4 px-8 gap-2 shadow">
        <div className="flex flex-col items-start">
          <EditableContentContextText className="text-center text-base xs:text-lg sm:text-xl md:text-2xl">
            Hi {user.last_name || "John"}!
          </EditableContentContextText>
          <EditableContentContextText className="font-medium text-sm text-slate-500 xs:text-base hidden sm:hidden md:block">
            Welcome back! Here's what's happening on your social media.
          </EditableContentContextText>
        </div>

        <Button className="relative mx-2 flex gap-2 h-12 w-auto bg-primaryColor shadow-none px-6">
          <p className="text-white font-light">+ Link social account</p>
        </Button>
      </div>
    </div>
  );
};

export default DashBoardHeader;
