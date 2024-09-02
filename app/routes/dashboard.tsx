import DashBoardHeader from "~/routes/dashboard.DashBoardHeader";
import SideBar from "~/routes/dashboard.SideBar";
import { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "../functions/session/session";
import { getUser } from "~/functions/fetch_data/getUser";

type User = {
  id: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  email?: string;
  profile_picture?: string;
};

type LoaderData = {
  user: {
    sucess: boolean;
    data: User;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const phoneNumber = session.get("phoneNumber") as string;
  if (!phoneNumber) {
    return redirect("/login");
  }
  // console.log(phoneNumber);

  const user = await getUser(phoneNumber);
  // console.log(user);
  return { user };
};

const Dashboard: React.FC = () => {
  const { user } = useLoaderData<LoaderData>();
  // console.log(user);
  const userData = user.data;
  // console.log(userData);
  return (
    <div className="flex">
      <SideBar />
      <DashBoardHeader user={userData} />
    </div>
  );
};

export default Dashboard;
