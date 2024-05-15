/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useLocation } from "react-router-dom";
import img from "../images/logo.svg";
import ProfileIcon from "./ProfileIcon";
import BrainComponent from "./brain/BrainScanner";
interface Props {
  onSignOut: () => void;
}

function NewBar({ onSignOut }: Props) {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      <div
        className="sticky top-0 left-0 w-full h-16 grid place-items-center grid-flow-row grid-cols-6  z-20 border-b border-primary transition duration-500 ease-in-out  "
        style={{
          backdropFilter: "blur(7px)",
          backgroundColor: "hsl(var(--background)/.6",
        }}
      >
        <div
          className="h-full flex relative gap-2 w-full pl-9"
          style={{ justifySelf: "left" }}
        >
          <Link to="/" className="relative h-full w-full">
            <img src={img} alt="Logo" className=" w-32 h-full  " />
            <div className="absolute top-2 left-10">
              <BrainComponent />
            </div>
          </Link>

          {/* LOGO */}
        </div>

        <div className="flex col-start-2 col-end-6 justify-center items-center gap-10">
          {/* ta7awal */}
          {/* <Link
            to="/"
            className="hover:text-primary hover:-mt-2 "
            style={{
              color: location.pathname === "/" ? "#3b82f6" : "",
              fontFamily: location.pathname === "/" ? "Fontsemi" : "",
              marginTop: location.pathname === "/" ? "-4px" : "",
              textDecoration: location.pathname === "/" ? "underline 2px" : "",
            }}
          >
            Home
          </Link> */}

          <Link
            to="/inbox"
            className="hover:text-primary hover:-mt-2"
            style={{
              color: location.pathname === "/inbox" ? "#3b82f6" : "", // color
              fontFamily: location.pathname === "/inbox" ? "Fontsemi" : "", // font
              marginTop: location.pathname === "/inbox" ? "-4px" : "", // margin top
              textDecoration:
                location.pathname === "/inbox" ? "underline 2px" : "", // underline
            }}
          >
            Inbox
          </Link>

          <Link
            to="/project-types"
            className="hover:text-primary hover:-mt-2"
            style={{
              color: location.pathname === "/project-types" ? "#3b82f6" : "", // color
              fontFamily:
                location.pathname === "/project-types" ? "Fontsemi" : "", // font
              marginTop: location.pathname === "/project-types" ? "-4px" : "", // margin top
              textDecoration:
                location.pathname === "/project-types" ? "underline 2px" : "", // underline
            }}
          >
            Project Types
          </Link>

          <Link
            to="/project"
            className="hover:text-primary hover:-mt-2"
            style={{
              color: location.pathname === "/project" ? "#3b82f6" : "", // color
              fontFamily: location.pathname === "/project" ? "Fontsemi" : "", // font
              marginTop: location.pathname === "/project" ? "-4px" : "", // margin top
              textDecoration:
                location.pathname === "/project" ? "underline 2px" : "", // underline
            }}
          >
            Project
          </Link>

          <Link
            to="/help-center"
            className="hover:text-primary hover:-mt-2"
            style={{
              color: location.pathname === "/help-center" ? "#3b82f6" : "", // color
              fontFamily:
                location.pathname === "/help-center" ? "Fontsemi" : "", // font
              marginTop: location.pathname === "/help-center" ? "-4px" : "", // margin top
              textDecoration:
                location.pathname === "/help-center" ? "underline 2px" : "", // underline
            }}
          >
            Help Center
          </Link>

          {/* <Link
            to="/"
            className="hover:text-primary hover:-mt-2"
            style={{
              color: location.pathname === "/contact-us" ? "#3b82f6" : "", // color
              fontFamily: location.pathname === "/contact-us" ? "Fontsemi" : "", // font
              marginTop: location.pathname === "/contact-us" ? "-4px" : "", // margin top
              textDecoration:
                location.pathname === "/contact-us" ? "underline 2px" : "", // underline
            }}
          >
            Contact Us
          </Link> */}
        </div>

        <div className=" pr-9" style={{ justifySelf: "right" }}>
          {/* Profile Icon */}

          <ProfileIcon onSignOut={onSignOut} />
        </div>
      </div>
    </>
  );
}

export default NewBar;
