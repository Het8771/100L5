import { Link } from "react-router-dom";
import explore from "../image/explore.svg";


function Information({
  title,
  description,
  buttonText,
  buttonText1,
  srcImg,
  srcImg1,
  exploreLinkState,
}) {
  return (
    <>
      <div className="bg-[#16283E] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between py-10 ">
            {/* Left: Text Content */}
            <div className="relative flex-1 w-full text-center lg:text-left space-y-6 max-w-xl mx-auto lg:mx-0">
              <h1
                style={{ fontFamily: "" }}
                // David Libre font family if needed
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              >
                {title}
              </h1>
              <p className="text-gray-400 text-base sm:text-lg text-justify">
                {description}
              </p>
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-4">
                <Link
                  to="/"
                  state={exploreLinkState}
                >

                  <div className="relative inline-flex items-center cursor-pointer">
                    <button className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B]  font-bold px-6 sm:px-8 py-2 rounded-full shadow-md whitespace-nowrap">
                      {buttonText}
                    </button>
                    <img
                      src={explore}
                      alt="Arrow Icon"
                      className="absolute right-[-10px] w-5 h-5 sm:w-6 sm:h-6"
                    />
                  </div>
                </Link>
                <Link to="/Signup">
                  <button className="relative bg-[#273D58]  text-gray-400 px-8 py-2 rounded-full  font-semibold shadow-md whitespace-nowrap cursor-pointer">
                    {buttonText1}
                  </button>
                </Link>
              </div>


            </div>

            <div className="flex-1 flex justify-center  w-full relative">
              {/* Blurred color blob */}
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
              {/* Main image */}
              <img
                src={srcImg1}
                alt="Illustration"
                className="hidden xl:block 2xl:block lg:block w-full max-w-xs sm:max-w-sm md:max-w-md relative z-10  2xl:left-70"
              />
            </div>


          </div>
        </div>
      </div>
    </>
  );
}

export default Information;