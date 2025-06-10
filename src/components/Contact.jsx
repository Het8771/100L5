import explore from "../image/explore.svg";
import finder from "../image/finder.svg";
import Contact from "../image/Contact.svg";
import Support from "./Support";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const ContactSection = () => {
  const exploreLinkState = {
    scrollTo: "featured-tools",
    fromContactPage: true,
    message: "Navigated from Contact Section",
  };

  return (
    <>
      <div className="relative bg-[#16283E]">
        <Navbar />
        <div className=" max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 ">
          <div className="py-12 flex flex-col lg:flex-row items-center justify-between relative z-10 ">
            <div className="flex-1 text-center lg:text-left space-y-6 max-w-xl mx-auto lg:mx-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Contact us
              </h1>
              <p className="text-white text-base sm:text-lg">
                You can contact via email for your issues related with 10015.io.
                You can give feedback about current tools or suggest new tools
                that you want to see on 10015 Tools.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
                <div className="relative inline-flex items-center">
                   <Link
      to="/"
      state={exploreLinkState} 
    >
      <button className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] 
  font-bold px-6 sm:px-8 py-2 rounded-full shadow-md whitespace-nowrap">
                    EXPLORE TOOL
                  </button></Link>
                  <img
                    src={explore}
                    alt="Arrow Icon"
                    className="absolute right-[-10px] w-5 h-5 sm:w-6 sm:h-6"
                  />
                </div>
                <div className="relative inline-flex items-center">
               <Link to ="/Productfinder"> <button className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] 
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
                <div className="flex flex-col items-center space-y-3 md:mx-auto lg:mx-25">
                  <Link to="/Signup">
                    <button className="bg-[#273D58] px-8 py-2 rounded-full text-white font-semibold shadow-md whitespace-nowrap cursor-pointer">
                      LOGIN / REGISTER
                    </button>
                  </Link>
                </div>
              </div>
            </div>

              <div className="flex-1 flex justify-center  w-full relative">
              <div
                  className="
                  hidden xl:block  2xl:block lg:block
                  absolute
                  xl:right-[-40px]  top-1/4   2xl:right-[-100px] lg:right-[-30px]
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
              <img
                src={Contact}
                alt="Illustration"
                  className="hidden xl:block 2xl:block lg:block w-full max-w-xs sm:max-w-sm md:max-w-md relative z-10  2xl:left-10"
              />
            </div>
          </div>
          <Support />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ContactSection;
