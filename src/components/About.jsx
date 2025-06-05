import search from "../image/search.svg";
import leaf1 from "../image/leaf1.svg";
import boy from "../image/boy.svg";
import facebook from "../image/facebook.svg";
import instagram from "../image/instagram.svg";
import linkedin from "../image/linkedin.svg";
import tiweter from "../image/tiweter.svg";
import Support from "./Support";
import finder from "../image/finder.svg";
import Navbar from "./Navbar";
import Footer from "./Footer";
import explore from "../image/explore.svg";
import { Link } from "react-router-dom";
import Oval2 from "../image/Oval2.svg";

export default function About() {
  return (
    <>
      <div className="mx-auto bg-[#16283E]">
        <div className="absolute hidden lg:block left-80 top-0 bottom-120 inset-0 overflow-hidden z-0 lg:left-0 2xl:right-100 ">
          <img
            src={Oval2}
            alt="Background"
            className="w-150 h-auto object-cover "
          />
        </div>
        <div
          className="absolute inset-0 w-140 left-280 top-[-50px] hidden lg:block md:left-150 lg:left-115 xl:left-230 2xl:left-[63%] "
          style={{ zIndex: -1 }}
        >

        </div>
        <Navbar />
        <img
          src={leaf1}
          alt="leav"
          className="top-15 absolute hidden lg:block"
        />

        <div className="bg-[#16283E]">
          <div className=" max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
            <div className="py-12 flex flex-col lg:flex-row items-center justify-between relative z-10 gap-10">
              <div className="flex-1 text-center lg:text-left space-y-6 max-w-xl mx-auto lg:mx-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  Product Finder
                </h1>
                <p className="text-white text-base sm:text-lg">
                  Find Exactly What You Need <br /> Your Shortcut to the Right
                  Choice
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
                  <div className="relative inline-flex items-center">
                    <Link
                      to="/"
                      state={{ scrollTo: "featured-tools" }}
                      className="inline-flex items-center bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] font-bold px-6 py-2 rounded-full shadow-md whitespace-nowrap hover:scale-105 transition-transform"
                    >
                      EXPLORE TOOL
                    </Link>
                    <img
                      src={explore}
                      alt="Arrow Icon"
                      className="absolute right-[-10px] w-5 h-5 sm:w-6 sm:h-6"
                    />
                  </div>
                  <div className="relative inline-flex items-center">
                    <Link to="/Productfinder"><button className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] 
   font-bold px-6 py-2 rounded-full shadow-md whitespace-nowrap">
                      PRODUCT FINDER
                    </button></Link>
                    <img
                      src={finder}
                      alt="Finder Icon"
                      className="absolute -top-1 -right-2 w-5 h-5 sm:w-6 sm:h-6 hover:scale-150 transition-transform"
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 mt-10 max-w-md mx-auto lg:mx-0">
                  <div className="flex flex-col items-center space-y-3">
                    <Link to="/Signup">
                      <button className="bg-[#273D58] px-8 py-2 rounded-full text-gray-400 font-semibold shadow-md whitespace-nowrap cursor-pointer">
                        LOGIN / REGISTER
                      </button>
                    </Link>

                  </div>

                  {/* <div className="text-center ">
                <p className="text-sm text-gray-500 mb-2 max-w-xs mx-auto sm:mx-0">
                  Get the extension and access all tools with just one click
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-12 bg-gray-300" />
                  <a
                    href="https://chrome.google.com/webstore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <img src={chrome} alt="Chrome" className="w-6 h-6" />
                  </a>
                  <a
                    href="https://chrome.google.com/webstore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <img src={firefox} alt="Firefox" className="w-6 h-6" />
                  </a>
                  <div className="h-px w-12 bg-gray-300" />
                </div>
              </div> */}
                </div>
              </div>

              <div className="flex-1 flex justify-center max-w-md w-full">
                <img
                  src={search}
                  alt="Illustration"
                  className="hidden lg:block w-full max-w-xs sm:max-w-sm md:max-w-md"
                />
                <div
                  className="
                  hidden xl:block  2xl:block lg:block
                  absolute
                  xl:right-[-40px]  top-1/4   2xl:right-[-200px] lg:right-[-30px]
                  -translate-y-1/2
                  w-190  h-100
                  rounded-full
                  bg-gradient-to-br from-[#1F2B56] to-[#ffffff]     
                 blur-3xl
                  opacity-35
                  z-0
                "
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#D5C7FF] mb-7">
          <section className="max-w-7xl  mx-auto  px-4 py-10 items-center">
            {/* Subtitle */}
            <div className="flex flex-col items-center justify-center  py-8 px-4 md:flex-row md:justify-center md:items-center">
              {/* Illustration */}
              <img
                src={boy}
                alt="Boy Illustration"
                className="w-28 md:w-32 mb-4 md:mb-0 md:mr-8"
              />
              {/* Text Content */}
              <div
                style={{ fontFamily: "David Libre" }}
                className="flex flex-col  items-center md:items-start"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-[#23274b] text-center md:text-left mb-2">
                  ABOUT OUR
                </h2>
                <h2 className="text-4xl md:text-5xl ml-[10%] font-bold text-[#23274b] text-center md:text-left mb-2">
                  PROECT
                </h2>
                <p className="text-gray-500 text-center md:text-left">
                  Digitize your documents and save time with this smart and
                  reliable tool.
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl w-full space-y-8 ">
              {/* What */}
              <div>
                <h3
                  style={{ fontFamily: "David Libre" }}
                  className="text-3xl font-bold text-[#23274b] mb-2"
                >
                  What?
                </h3>
                <p className="text-gray-500 mb-4">
                  10015.io is an online tool factory where you can get all tools
                  you needed in one place. While serving different type of tools
                  in different categories, it aims to perform this with a clean
                  and beautiful user interface. Every tool is designed to solve a
                  problem with minimum number of steps to save time of the users
                  and decrease the complexity of the operation.
                </p>
                <p className="text-gray-500 ">
                  10015.io has started to operate in 2020 and it will continue to
                  grow with time by adding new tools each day.
                </p>
              </div>
              {/* Why */}
              <div>
                <h3
                  style={{ fontFamily: "David Libre" }}
                  className="text-3xl font-bold  mb-2"
                >
                  Why?
                </h3>
                <p className="mb-4 text-[16px] text-gray-500 ">
                  There are lots of sites on web which offers you online tools.
                  Most of them focus on specific topics and they mostly have
                  outdated designs which makes you think "Am I in 90's?". When you
                  start to bookmark the tools you needed, the list becomes larger
                  and larger in some point.
                </p>
                <p className="text-gray-500 ">
                  10015 Tools solves all these problems. So, bookmark it and
                  forget about all other tool sites.
                </p>
              </div>
              {/* Who */}
              <div>
                <h3
                  style={{ fontFamily: "David Libre" }}
                  className="text-3xl font-bold text-[#23274b] mb-2"
                >
                  Who?
                </h3>
                <p className="text-gray-500 ">
                  10015.io is designed and coded by Fatih Telis (me) as a side
                  project. I am a frontend developer based in Istanbul, Turkey. I
                  started this project to build a platform which will work as an
                  all-in-one toolbox while I'm challenging myself to create tools
                  which does many different things. Even though I'm not a
                  professional designer, I'm doing my best to construct a simple,
                  aesthetic and easy-to-use UI system. You can contact me via
                  email or Twitter about anything.
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x mt-10">
              <Link
                to="https://www.facebook.com/" className=" ">
                <img
                  src={facebook}
                  alt="Facebook"
                  className=""
                />
              </Link>
              <Link
                to="https://x.com/" className="">
                <img
                  src={tiweter}
                  alt="Twitter"
                  className=""
                />
              </Link>
              <Link
                to="https://in.linkedin.com/" className="">
                <img
                  src={linkedin}
                  alt="LinkedIn"
                  className=""
                />
              </Link>
              <Link
                to="https://www.instagram.com/" className="">
                <img
                  src={instagram || "/placeholder.svg"}
                  alt="LinkedIn"
                  className=""
                />
              </Link>
            </div>
          </section>
        </div>
        <Support />
        <Footer />
      </div>
    </>
  );
}
