import { LoaderFunction, redirect } from "react-router-dom";
import { getSession } from "~/functions/session/session";
import EditableContentContextText from "~/ui/EditableContentContextText";
import FormInput from "~/ui/FormInput";
import Logo from "~/ui/Logo";
import NavLink from "~/ui/NavLink";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("phoneNumber") as string | undefined;
  if (!user) {
    return redirect("/login");
  }
  return null;
};

const ValidationForm = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col font-primaryFont">
      <Logo className="w-[150px] h-[30px]" />
      <EditableContentContextText className="text-2xl text-center font-bold mt-3 text-primaryColor">
        Create your acccount
      </EditableContentContextText>
      <NavLink
        to="/login"
        className="mt-2 text-xs text-center font-bold text-secondaryColor"
      >
        or click here to log in
      </NavLink>
      <FormInput className="flex flex-col  items-center gap-2" method="POST">
        <EditableContentContextText className="w-[150px] text-sm text-center font-bold text-primaryColor">
          Account has been sucessfully created.
        </EditableContentContextText>
        <NavLink
          to="/dashboard"
          className="flex h-10 mt-3 w-full rounded-md shadow justify-center items-center text-white text-center text-sm 
        bg-primaryColor"
        >
          Get Started
        </NavLink>
      </FormInput>
    </div>
  );
};

export default ValidationForm;
