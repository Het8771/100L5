import React, { useState } from "react";
import { Star } from "lucide-react";
import search from "../image/search.svg";
import explore from "../image/explore.svg";
import finder from "../image/finder.svg";
import firefox from "../image/firefox.svg";
import Getleaf from "../image/Getleaf.svg";
import Support from "./Support";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ston from "../image/ston.svg";
import chrome from "../image/chrome.svg";
import Oval2 from "../image/Oval2.svg";
import { Link } from "react-router-dom";
import leaf1 from "../image/leaf1.svg";

const ProductFinderHero = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const isAuthenticated = false; // Replace with actual auth logic

  const handleProductClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  };

  const handleSubmit = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    alert(`Submitting for ${"Unknown Product"} with `);
  };

  return (
    <>
    <section className="w-full relative bg-[#16283E] ">
      <Navbar />
             <div className="absolute hidden lg:block left-80 top-0 bottom-120 inset-0 overflow-hidden z-0 lg:left-0 2xl:right-100 ">
          <img
            src={Oval2}
            alt="Background"
            className="w-150 h-auto object-cover"
          />
        </div>
      {/* <div
        className="absolute inset-0 w-140 left-280 top-[-50px] hidden lg:block md:left-150 lg:left-115 xl:left-230 2xl:left-[63%] "
        style={{ zIndex: -1 }}
      >
        <img
          src={ston}
          alt="Background Shape"
          className="w-full h-auto object-cover"
        />
      </div> */}

      {/* Leaf Background */}
      <img
        src={Getleaf}
        alt="Leaf Background"
        className="absolute left-0 top-0 w-48 md:w-64 lg:w-80 opacity-5 z-0 hidden lg:block"
      />
      <div className="max-w-7xl mx-auto">
        {/* Main Blur Container */}
        <div
          className="absolute inset-0 w-140 left-280 top-[-50px] hidden lg:block md:left-150 lg:left-115 xl:left-230 2xl:left-[63%] "
          style={{ zIndex: -1 }}
        >
          <div className="py-12 px-4 relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Product Finder
              </h1>
              <p className="text-gray-200 text-lg">
                Find Exactly What You Need <br /> Your Shortcut to the Right
                Choice
              </p>

              {/* Buttons */}
               <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
                               <div className="relative inline-flex items-center">
                                 <button className="bg-[#273D58]  border border-white text-white font-bold px-6 sm:px-8 py-2 rounded-full shadow-md whitespace-nowrap">
                                   EXPLORE TOOL
                                 </button>
                                 <img
                                   src={explore}
                                   alt="Arrow Icon"
                                   className="absolute right-[-10px] w-5 h-5 sm:w-6 sm:h-6"
                                 />
                               </div>
                               <div className="relative inline-flex items-center">
                                 <Link to ="/Productfinder"><button className="bg-[#273D58]  border border-white text-white font-bold px-6 py-2 rounded-full shadow-md whitespace-nowrap cursor-pointer">
                                   PRODUCT FINDER
                                 </button></Link>
                                 <img
                                   src={finder}
                                   alt="Finder Icon"
                                   className="absolute -top-1 -right-2 w-5 h-5 sm:w-6 sm:h-6 hover:scale-150 transition-transform"
                                 />
                               </div>
                             </div>
             
              {/* Login/Register + Extension */}
              <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 mt-10">
                {/* Login/Register Section */}
                <div className="flex flex-col items-center space-y-3">
                  <button className="bg-[#273D58] px-8 py-2 rounded-full text-gray-400 font-semibold shadow-md">
                    LOGIN / REGISTER
                  </button>
                  {/* <div className="text-red-600 font-semibold cursor-pointer hover:underline">
                    SIGN IN
                  </div> */}
                </div>

                {/* Extension Info */}
                {/* <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">
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
                      <img
                        src={chrome}
                        alt="Chrome"
                        className="w-6 h-6"
                      />
                    </a>
                    <a
                      href="https://chrome.google.com/webstore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <img
                        src={firefox}
                        alt="Firefox"
                        className="w-6 h-6"
                      />
                    </a>
                    <div className="h-px w-12 bg-gray-300" />
                  </div>
                </div> */}
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 flex justify-center max-w-md w-full">
              <img
                src={search}
                alt="Illustration"
                className="hidden lg:block w-full max-w-xs sm:max-w-sm md:max-w-md"
              />
            </div>
          </div>
          <div class="bg-[#273D58] rounded-3xl p-8 max-w-7xl mx-auto mb-5 shadow-lg">
            <h2 class="text-2xl font-bold text-white mb-6 ">
              Submit your product
            </h2>
            <div class="bg-[#16283E] rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4">
              <div class="flex-1 w-full">
                <label
                  class="block text-base font-medium text-white mb-1 "
                  for="product-url"
                >
                  1. Please enter the webpage of your product*
                </label>
                <input
                  id="product-url"
                  type="url"
                  placeholder="URL of your Product"
                  class="mt-2 w-full bg-transparent text-[#888888] placeholder-[#bdbdbd] border-none focus:ring-0 focus:outline-none text-base"
                />
              </div>
              <button
                type="submit"
                class="bg-[#D5C7FF] text-black font-medium rounded-full px-8 py-2 transition hover:bg-[#23233c]"
              >
                Submit
              </button>
            </div>
            <p class="text-[#888888] text-sm mt-4">
              *Your site data will be fetched and used to fill out the
              submission form. Please review the fields.
            </p>
          </div>
          </div>
        </div>

        {/* Leaf Background */}
        {/* <img
          src={Getleaf}
          alt="Leaf Background"
          className="absolute left-0 top-0 w-48 md:w-64 lg:w-80 opacity-5 z-0 hidden lg:block"
        /> */} 
        <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
          {/* Main Blur Container */}
          <div
            className={`${
              showAuthModal ? "blur-sm pointer-events-none select-none" : ""
            }`}
          >
         <div className="py-12 flex flex-col lg:flex-row items-center justify-between relative z-10 gap-10">
                <div className="flex-1 text-center lg:text-left space-y-6 max-w-xl mx-auto lg:mx-0">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                    Product Finder
                  </h1>
                  <p className="text-gray-600 text-base sm:text-lg">
                    Find Exactly What You Need <br /> Your Shortcut to the Right
                    Choice
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
                    <div className="relative inline-flex items-center">
                      <Link
                        to="/"
                        state={{ scrollTo: "featured-tools" }}
                        className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] 
 font-bold px-6 sm:px-8 py-2 rounded-full shadow-md whitespace-nowrap cursor-pointer inline-block text-center"
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
                      <Link to="/Productfinder">
                        <button className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] 
 font-bold px-6 py-2 rounded-full shadow-md whitespace-nowrap">
                          PRODUCT FINDER
                        </button>
                      </Link>
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
            <div class="bg-[#273D58]  rounded-3xl p-8 max-w-7xl mx-auto mb-5 shadow-lg">
              <h2 class="text-2xl font-bold text-white mb-6 ">
                Submit your product
              </h2>
              <div class="bg-[#16283E] rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4">
                <div class="flex-1 w-full">
                  <label
                    class="block text-base font-medium text-white mb-1"
                    for="product-url"
                  >
                    1. Please enter the webpage of your product*
                  </label>
                  <input
                    id="product-url"
                    type="url"
                    placeholder="URL of your Product"
                    class="mt-2 w-full bg-transparent text-[#888888] placeholder-[#bdbdbd] border-none focus:ring-0 focus:outline-none text-base"
                  />
                </div>
                <button
                  type="submit"
                  class="bg-[#D5C7FF] text-black font-medium rounded-full px-8 py-2 transition hover:bg-[#23233c]"
                >
                  Submit
                </button>
              </div>
              <p class="text-[#888888] text-sm mt-4">
                *Your site data will be fetched and used to fill out the
                submission form. Please review the fields.
              </p>
            </div>
          </div>
          <Support />
        </div>
        <Footer />
      </section>
    </>
  );
};

export default ProductFinderHero;
