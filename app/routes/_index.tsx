import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
export const meta: MetaFunction = () => {
  return [
    { title: "Text Buz" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className=" h-screen w-screen flex items-center justify-center flex-col gap-4 font-primaryFont text-red-500">
      <Link className="border border-black border-2 rounded p-2 hover:bg-gray-200" to='/home'>Access the app from here, Home</Link>
    </div>
  );
}
