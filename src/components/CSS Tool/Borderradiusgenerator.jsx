import React, { useState, useRef, useEffect, useContext } from "react";
import { AiOutlineRadiusUpright } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";
import {
  FaCheck,
  FaRegCopy,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn, 
  FaEnvelope,
  FaCopy,
  FaRegStar,
} from "react-icons/fa6";
import {  MdShare } from "react-icons/md";
import Comment from "../Text tools/Comment";
import { FavoritesContext } from "../../Context/FavoriteContext";

const BorderRadiusGenerator = ({ id = "Border Radius Generator" }) => {
  const { updateFavorites } = useContext(FavoritesContext);
  const [corners, setCorners] = useState({
    topLeft: 25,
    topRight: 25,
    bottomRight: 25,
    bottomLeft: 25,
  });

  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(400);
  const [previewType, setPreviewType] = useState("Solid Color");
  const [mergeEdges, setMergeEdges] = useState(false);
  const [hideGuides, setHideGuides] = useState(false);

  const containerRef = useRef(null);
  const draggingCorner = useRef(null);

  // Function to compute border-radius value
  const getBorderRadius = () => {
    if (mergeEdges) {
      return "50% 50% 50% 50% / 50% 50% 50% 50%";
    }
    const { topLeft, topRight, bottomRight, bottomLeft } = corners;
    return `${topLeft}% ${topRight}% ${bottomRight}% ${bottomLeft}% / ${topLeft}% ${topRight}% ${bottomRight}% ${bottomLeft}%`;
  };

  const handleCopy = () => {
    const code = `border-radius: ${getBorderRadius()};`;
    navigator.clipboard.writeText(code);
  };

  const handleReset = () => {
    setCorners({
      topLeft: 25,
      topRight: 25,
      bottomRight: 25,
      bottomLeft: 25,
    });
    setWidth(400);
    setHeight(400);
  };

  const handleMouseMove = (e) => {
    if (!draggingCorner.current || !containerRef.current) return;

    const box = document.getElementById("preview-box").getBoundingClientRect();
    const x = e.clientX - box.left;

    let percent = Math.min(Math.max(Math.round((x / box.width) * 100), 0), 50);
    if (
      draggingCorner.current === "topRight" ||
      draggingCorner.current === "bottomRight"
    ) {
      percent = 50 - percent;
    }

    setCorners((prev) => ({
      ...prev,
      [draggingCorner.current]: percent,
    }));
  };

  const handleMouseUp = () => {
    draggingCorner.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const startDrag = (corner) => {
    draggingCorner.current = corner;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const getPreviewBackground = () => {
    switch (previewType) {
      case "Gradient":
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      case "Image":
        return 'url("https://via.placeholder.com/400") center/cover no-repeat';
      case "Solid Color":
      default:
        return "#E6E7FA";
    }
  };

  const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isFavorite, setIsFavorite] = useState(false);

  const onFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem("FavoriteTools") || "[]");
    let newFavorites;

    if (favorites.includes(id)) {
      newFavorites = favorites.filter((favId) => favId !== id);
      setIsFavorite(false);
    } else {
      newFavorites = [...favorites, id];
      setIsFavorite(true);
    }

    localStorage.setItem("FavoriteTools", JSON.stringify(newFavorites));
    updateFavorites();
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("FavoriteTools") || "[]");
    setIsFavorite(favorites.includes(id));
  }, [id]);

  return (
    <>
      <div className=" bg-[#16283E] ">
        <div className="w-full max-w-4xl mx-auto  px-4 sm:px-5 md:px-8">
          {/* Header */}
          <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-3xl text-indigo-400 mt-4">
                <AiOutlineRadiusUpright />
              </span>
              <span className="text-lg sm:text-sm md:text-2xl font-bold text-white text-center sm:text-left mt-4">
                CSS Border Radius Generator
              </span>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-3 w-full sm:w-auto md:mt-3">
              <button
                onClick={() => setShareOpen(true)}
                className="flex items-center justify-center px-4 py-2 text-sm rounded-xl border  bg-[#273D58] text-white transition w-full sm:w-auto min-w-[120px]"
              >
                <FiShare2 className="mr-2" size={18} />
                Share
              </button>
              <button
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-xl  border bg-[#273D58] text-white transition w-full sm:w-auto min-w-[120px]"
                onClick={() => setOpen(true)}
              >
                <FiAlertCircle className="text-white text-base" />
                Report Bug
              </button>
              <button
                onClick={onFavoriteToggle}
                className={`flex items-center justify-center px-4 py-2 rounded-xl border text-sm cursor-pointer  bg-[#273D58] text-white ${isFavorite
                  ? ""
                  : ""
                  }  transition w-full sm:w-auto min-w-[120px]`}
              >
                {isFavorite ? (
                  <>
                    <FaCheck className="inline-block mr-1" size={12} /> Added
                  </>
                ) : (
                  <>
                    <FaRegStar className="inline-block mr-1" size={12} /> Add to Favorites
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Share Popup */}
          {shareOpen && (
            <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
              <div className="bg-[#16283E] border border-white p-6 rounded-2xl shadow-xl max-w-md w-full relative">
                <div className="flex justify-between mb-4 bg-indigo-50 p-1 rounded-xl">
                  <button
                    onClick={() => setActiveTab("tool")}
                    className={`w-1/2 px-4 py-2 rounded-xl font-semibold text-sm ${activeTab === "tool"
                      ? "bg-[#273D58] text-white"
                      : "text-black"
                      }`}
                  >
                    ⚙️ Share Tool
                  </button>
                  <button
                    onClick={() => setActiveTab("home")}
                    className={`w-1/2 px-4 py-2 rounded-xl font-semibold text-sm ${activeTab === "home"
                      ? "bg-[#273D58] text-white"
                      : "text-black"
                      }`}
                  >
                    🏠 Share 10015
                  </button>
                </div>
                <div className="text-center border border-gray-300 rounded-xl p-6">
                  <p className="text-sm mb-1 text-white">
                    You are currently sharing:
                  </p>
                  <h2 className="text-xl font-semibold mb-5 text-white">
                    {activeTab === "tool"
                      ? "Google Fonts Pair Finder"
                      : "10015 Tools"}
                  </h2>
                  <div className="flex justify-center mb-6">
                    <MdShare className="text-white text-7xl" />
                  </div>
                  <div className="flex justify-center gap-4">
                    {[FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaCopy].map(
                      (Icon, i) => (
                        <button
                          key={i}
                          className="text-black bg-white rounded-full w-10 h-10 flex items-center justify-center"
                        >
                          <Icon />
                        </button>
                      )
                    )}
                  </div>
                </div>
                <button
                  className="absolute top-0 h-2 w-2 right-4 text-white text-lg cursor-pointer"
                  onClick={() => setShareOpen(false)}
                >
                  ✕
                </button>
              </div>
            </div>
          )}


          {/* Bug Report Popup */}
          {open && (
            <div className="fixed inset-0  z-40 flex justify-center items-center text-white ">
              <div className="bg-[#16283E] border border-white max-w-md w-full p-6 rounded-2xl shadow-lg relative">
                <h2 className="text-xl font-bold mb-2">Bug Report</h2>
                <p className="text-sm mb-4">
                  <strong>Tool:</strong> Lorem Ipsum Generator
                </p>
                <label className="text-sm mb-1 block" htmlFor="bugDescription">
                  Please describe the issue.
                </label>
                <textarea
                  id="bugDescription"
                  className="w-full p-3 border border-gray-300 rounded-xl text-base h-32 "
                  placeholder="Description*"
                  value={bugDescription}
                  onChange={(e) => setBugDescription(e.target.value)}
                />
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 bg-[#273D58] text-white border border-white rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!bugDescription.trim()) {
                        alert("Please enter a description.");
                        return;
                      }
                      console.log("Bug description submitted:", bugDescription);
                      setOpen(false);
                      setBugDescription("");
                    }}
                    className="px-4 py-2 bg-[#273D58] border border-white text-white rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Preview Area */}
          <div className="p-4 rounded-lg shadow-sm mb-6">
            <div
              ref={containerRef}
              className="relative w-full flex justify-center items-center  rounded overflow-hidden"
              style={{ height: "300px sm:400px" }}
            >
              <div
                id="preview-box"
                className="relative"
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                  borderRadius: getBorderRadius(),
                  background: getPreviewBackground(),
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              >
                {!hideGuides && !mergeEdges && (
                  <>
                    <div
                      className="absolute w-4 h-4 bg-blue-500 rounded-full cursor-pointer"
                      style={{
                        left: `${corners.topLeft}%`,
                        top: 0,
                        transform: "translate(-50%, -50%)",
                      }}
                      onMouseDown={() => startDrag("topLeft")}
                    />
                    <div
                      className="absolute w-4 h-4 bg-red-500 rounded-full cursor-pointer"
                      style={{
                        right: `${corners.topRight}%`,
                        top: 0,
                        transform: "translate(50%, -50%)",
                      }}
                      onMouseDown={() => startDrag("topRight")}
                    />
                    <div
                      className="absolute w-4 h-4 bg-red-500 rounded-full cursor-pointer"
                      style={{
                        right: `${corners.bottomRight}%`,
                        bottom: 0,
                        transform: "translate(50%, 50%)",
                      }}
                      onMouseDown={() => startDrag("bottomRight")}
                    />
                    <div
                      className="absolute w-4 h-4 bg-blue-500 rounded-full cursor-pointer"
                      style={{
                        left: `${corners.bottomLeft}%`,
                        bottom: 0,
                        transform: "translate(-50%, 50%)",
                      }}
                      onMouseDown={() => startDrag("bottomLeft")}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4 text-white">
            <div>
              <label className="block text-sm sm:text-base  mb-1">Preview Type</label>
              <select
                className="w-full outline-none border bg-[#16283E]  text-white border-gray-200 rounded py-2 px-3 "
                value={previewType}
                onChange={(e) => setPreviewType(e.target.value)}
              >
                <option>Solid Color</option>
                <option>Gradient</option>
              </select>
            </div>
            <div>
              <label className="block text-sm sm:text-base  mb-1">
                Width: {width}px
              </label>
              <input
                type="range"
                className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
                min="100"
                max="600"
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base  mb-1">
                Height: {height}px
              </label>
              <input
                type="range"
                className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
                min="100"
                max="360"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col sm:flex-row sm:space-x-8 mb-6 gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-5 w-5"
                checked={mergeEdges}
                onChange={() => setMergeEdges(!mergeEdges)}
              />
              <span className="text-sm sm:text-base text-white">Merge Edge Radiuses</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-5 w-5"
                checked={hideGuides}
                onChange={() => setHideGuides(!hideGuides)}
              />
              <span className="text-sm sm:text-base text-white">Hide Guides</span>
            </label>
          </div>

          {/* CSS Output */}
          <div className="mb-6 text-white">
            <label className="block text-sm sm:text-base  mb-1">CSS Code</label>
            <div className="border border-gray-200 rounded p-3 bg-gray-100 overflow-x-auto whitespace-pre-wrap">
              <code className="text-gray-800 text-xs sm:text-sm">
                border-radius: {getBorderRadius()};
              </code>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 py-5">
            <button
              onClick={handleReset}
              className="w-full sm:w-40 px-6 py-2 border  bg-[#273D58] text-white cursor-pointer rounded-lg hover:opacity-90"
            >
              Reset
            </button>
            <button
              onClick={handleCopy}
              className="w-full sm:w-40 px-6 py-2 bg-[#273D58] text-white  border cursor-pointer rounded-lg hover:opacity-90"
            >
              Copy
            </button>
          </div>

          <style jsx global>{`
        /* Range input styling for consistency */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
        input[type="range"]::-ms-thumb {
          width: 16px;
          height: 16px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
        }
        /* Ensure text doesn't overflow */
        code {
          overflow-wrap: break-word;
          word-break: break-word;
        }
        /* Responsive adjustments for mobile (≤ 640px) */
        @media (max-width: 640px) {
          .w-full {
            width: 100% !important;
          }
          .max-w-4xl {
            max-width: 100% !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
          .sm\\:flex-row {
            flex-direction: column !important;
          }
          .sm\\:w-auto {
            width: 100% !important;
          }
          .sm\\:w-40 {
            width: 100% !important;
            max-width: 160px !important;
          }
          /* Adjust preview container height */
          .sm\\:400px {
            height: 180px !important;
          }
          /* Adjust drag handles for better touch interaction */
          .w-4 {
            width: 1.25rem !important;
          }
          .h-4 {
            height: 1.25rem !important;
          }
          /* Adjust font sizes for better readability */
          .text-lg {
            font-size: 0.9375rem !important; /* 15px */
          }
          .text-xl {
            font-size: 1.0625rem !important; /* 17px */
          }
          .text-2xl {
            font-size: 1.1875rem !important; /* 19px */
          }
          .text-3xl {
            font-size: 1.375rem !important; /* 22px */
          }
          .text-4xl {
            font-size: 1.625rem !important; /* 26px */
          }
          .text-5xl {
            font-size: 1.875rem !important; /* 30px */
          }
          .text-6xl {
            font-size: 2.125rem !important; /* 34px */
          }
          .text-sm {
            font-size: 0.8125rem !important; /* 13px */
          }
          .text-base {
            font-size: 0.9375rem !important; /* 15px */
          }
          /* Adjust spacing and padding */
          .mb-6 {
            margin-bottom: 1.25rem !important;
          }
          .gap-6 {
            gap: 1.25rem !important;
          }
          .gap-4 {
            gap: 0.875rem !important;
          }
          .gap-3 {
            gap: 0.625rem !important;
          }
          .gap-2 {
            gap: 0.375rem !important;
          }
          .p-4 {
            padding: 0.625rem !important;
          }
          .p-6 {
            padding: 0.875rem !important;
          }
          .px-4 {
            padding-left: 0.625rem !important;
            padding-right: 0.625rem !important;
          }
          .py-6 {
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
          }
          .px-6 {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          .py-2 {
            padding-top: 0.625rem !important;
            padding-bottom: 0.625rem !important;
          }
          /* Adjust button sizes for better touch targets */
          .min-w-\\[120px\\] {
            min-width: 100% !important;
            max-width: 160px !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
            padding-top: 0.75rem !important;
            padding-bottom: 0.75rem !important;
          }
          /* Adjust checkbox sizes and spacing */
          .h-5 {
            height: 1.5rem !important;
          }
          .w-5 {
            width: 1.5rem !important;
          }
          .sm\\:space-x-8 {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          /* Adjust select and input elements for better touch interaction */
          select {
            padding: 0.625rem !important;
            font-size: 0.8125rem !important;
            height: 2.5rem !important;
          }
          input[type="range"] {
            height: 0.625rem !important;
          }
          input[type="range"]::-webkit-slider-thumb {
            width: 20px !important;
            height: 20px !important;
          }
          input[type="range"]::-moz-range-thumb {
            width: 20px !important;
            height: 20px !important;
          }
          input[type="range"]::-ms-thumb {
            width: 20px !important;
            height: 20px !important;
          }
          /* Adjust textarea in popup */
          textarea {
            padding: 0.625rem !important;
            font-size: 0.8125rem !important;
            height: 6rem !important;
          }
          /* Adjust CSS output font size */
          .text-xs {
            font-size: 0.875rem !important; /* 14px */
          }
        }
        /* Tablet adjustments (641px - 1024px) remain unchanged */
        @media (min-width: 641px) and (max-width: 1024px) {
          .max-w-5xl {
            max-width: 90% !important;
          }
          .sm\\:400px {
            height: 300px !important;
          }
          .text-sm {
            font-size: 0.9rem !important;
          }
          .text-base {
            font-size: 1rem !important;
          }
          .gap-4 {
            gap: 1.25rem !important;
          }
          .gap-3 {
            gap: 0.875rem !important;
          }
          .w-4 {
            width: 1rem !important;
          }
          .h-4 {
            height: 1rem !important;
          }
          select {
            padding: 0.5rem 0.75rem !important;
            font-size: 0.9rem !important;
          }
        }
      `}</style>
        </div>
      </div>
      <Comment />
    </>
  );
};

export default BorderRadiusGenerator;