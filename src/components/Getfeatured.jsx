import { useState } from "react";
import { Star } from "lucide-react";
import search from "../image/search.svg";
import explore from "../image/explore.svg";
import finder from "../image/finder.svg";
import firefox from "../image/firefox.svg";
import Getleaf from "../image/Getleaf.svg";
import Support from "./Support"; // Import the Support component
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ston from "../image/ston.svg";
import Oval2 from "../image/Oval2.svg";
import chrome from "../image/chrome.svg";
import leaf1 from "../image/leaf1.svg";

const ProductFinderHero = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const isAuthenticated = false; // Replace with actual auth logic

  // Only show auth modal when submitting, not when selecting
  const handleSubmit = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    alert(`Submitting for ${selectedProduct || "Unknown Product"}`);
  };

  return (
    <>
      <section className="w-full relative bg-[#16283E]">
        <img
          src={Oval2}
          alt="Background"
          className="absolute w-150 h-auto object-cover hidden lg:block  "
        />
        <Navbar />
        {/* <div
        className="absolute inset-0 w-140 left-280 top-[-50px] hidden lg:block md:left-150 lg:left-115 xl:left-230 2xl:left-[64%] "
        style={{ zIndex: -1 }}
      >
        <img
          src={ston}
          alt="Background Shape"
          className="w-full h-auto object-cover"
        />
      </div> */}
        {/* Leaf Background */}
        {/* <img
          src={Getleaf}
          alt="Leaf Background"
          className="hidden lg:block absolute left-0 top-0 w-48 md:w-64 lg:w-80 opacity-5 z-0"
        /> */}
        <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
          {/* Main Blur Container */}
          <div
            className={`${showAuthModal ? "blur-sm pointer-events-none select-none" : ""
              }`}
          >
            <div className="py-12 flex flex-col lg:flex-row items-center justify-between relative z-10 gap-10">
              <div className="flex-1 text-center lg:text-left space-y-6 max-w-xl mx-auto lg:mx-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  Product Finder
                </h1>
                <p className="text-gray-400 text-base sm:text-lg">
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
                      <button className="bg-[#273D58] text-gray-400 px-8 py-2 rounded-full text-gray-600 font-semibold shadow-md whitespace-nowrap cursor-pointer">
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

            {/* Bottom Section */}
            <section className="max-w-7xl mx-auto bg-[#273D58] py-12 px-4 rounded-xl shadow-sm relative z-0 mb-4">
              <div className="max-w-5xl mx-auto space-y-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white ">
                  Feature your product
                </h2>

                {/* Product Selector - Fixed the onChange handler */}
                <div className="space-y-4">
                  <label className="block text-left font-medium text-white">
                    Please choose your product*
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full max-w-md mx-auto px-4 py-3 bg-[#16283E] rounded-lg shadow-sm outline-none text-gray-400 "
                  >
                    <option value="">Select Your Plan</option>
                    <option value="Basic Plan">Basic Plan</option>
                    <option value="Standard Plan">Standard Plan</option>
                    <option value="Premium Plan">Premium Plan</option>
                  </select>
                </div>

                {/* Package Cards */}
                <label className="block text-left font-medium text-white ">
                  Please choose your package*
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                  {[1, 2, 3].map((num) => (
                    <div
                      key={num}
                      className={`relative bg-[#16283E] p-6 rounded-2xl shadow-lg cursor-pointer ${selectedPackage === num ? "" : ""
                        }`}
                      onClick={() => setSelectedPackage(num)}
                    >
                      <div className="absolute top-4 right-4 text-yellow-400 text-2xl">
                        <Star fill="currentColor" className="w-6 h-6" />
                      </div>
                      <h3 className="text-center text-sm font-bold tracking-wider text-white uppercase">
                        {num === 1
                          ? "Basic"
                          : num === 2
                            ? "Standard"
                            : "Premium"}{" "}
                        <br /> Category Star
                      </h3>
                      <p className="text-center text-3xl font-bold  text-white mt-3">
                        ${num === 1 ? "29.99" : num === 2 ? "49.99" : "99.99"}{" "}
                        <span className="text-base font-medium text-gray-400">
                          / month
                        </span>
                      </p>
                      <div className="flex justify-center mt-2 text-yellow-500">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              fill="currentColor"
                              className="w-4 h-4 mx-0.5"
                            />
                          ))}
                      </div>
                      <ul className="mt-4 text-sm text-gray-400 space-y-2 text-left">
                        <li>Featured on your product's categories</li>
                        <li>Featured on your product's tags</li>
                        <li>
                          Indexed on Google and gets a dofollow high DA backlink
                        </li>
                      </ul>
                      <button
                        onClick={handleSubmit}
                        className="mt-6 w-full bg-[#D5C7FF] text-black font-semibold py-2 rounded-full transition cursor-pointer"
                      >
                        Submit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Auth Modal */}
          {showAuthModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40">
              <div className="bg-white rounded-2xl px-6 py-8 text-center max-w-md mx-auto shadow-xl">
                <h2 className="text-2xl font-bold text-[#060B57]">
                  Sign in / Register
                </h2>
                <p className="text-gray-600 mt-2 mb-6">
                  You need to sign in or register to use this feature
                </p>
                <div className="flex justify-center gap-4">
                  <Link to="/Signup">
                    <button
                      className="px-6 py-2 bg-blue-100 text-blue-700 rounded-full font-medium  cursor-pointer"
                      onClick={() => setShowAuthModal(false)}
                    >
                      Register
                    </button>
                  </Link>
                  <Link to="/Login">
                    <button
                      className="px-6 py-2 bg-gradient-to-r from-[#cdddfd] to-[#e5c9fd] text-[#060B57] font-medium rounded-full hover:opacity-90 cursor-pointer"
                      onClick={() => setShowAuthModal(false)}
                    >
                      Sign In
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
        <Support />
        <Footer />
      </section>
    </>
  );
};

export default ProductFinderHero;
