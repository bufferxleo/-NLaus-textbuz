import { Link } from "@remix-run/react";

interface NavLinkProps {
  to: string;
  className?: string;
  hidden?: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({
  to,
  className,
  children,
  hidden = false,
}) => {
  return (
    <Link
      hidden={hidden}
      to={to}
      className={
        className ||
        "h-12 w-auto px-[22px] py-[18px] bg-primaryColor text-white rounded-md shadow justify-center items-center gap-1 inline-flex"
      }
    >
      {children}
    </Link>
  );
};

export default NavLink;
