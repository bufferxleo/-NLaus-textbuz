import Logo from "~/ui/Logo";
import NavLink from "~/ui/NavLink";

const Home = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col gap-4 font-primaryFont">
      <Logo className="w-[300px] h-[60px]" />
      <NavLink to="/login">Get Started</NavLink>
    </div>
  );
};

export default Home;
