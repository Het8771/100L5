import React, { useState, useContext, useEffect } from "react";
import { ChromePicker } from "react-color";
import { PiFileCssLight } from "react-icons/pi";
import { MdGradient } from "react-icons/md";
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
import { MdOutlineContentPaste, MdShare } from "react-icons/md";
import Comment from "../Text tools/Comment";
import { FavoritesContext } from "../../Context/FavoriteContext";

const GradientGenerator = ({ id = "CSS Gradient Generator" }) => {
  const { updateFavorites } = useContext(FavoritesContext);
  const [startColor, setStartColor] = useState("#474bff");
  const [midColor, setMidColor] = useState("#8c6fff");
  const [endColor, setEndColor] = useState("#bc48ff");
  const [useMidColor, setUseMidColor] = useState(false);
  const [type, setType] = useState("linear");
  const [angle, setAngle] = useState(0);
  const [reverse, setReverse] = useState(false);

  const presetGradients = [
    {
      name: "Default",
      startColor: "#474bff",
      endColor: "#bc48ff",
      midColor: "#8c6fff",
      useMid: false,
    },
    {
      name: "Warm Feelings",
      startColor: "#ff5e62",
      endColor: "#ff9966",
      midColor: "#ff7e5f",
      useMid: false,
    },
    {
      name: "Shiny Purple",
      startColor: "#5f2c82",
      endColor: "#7f7fd5",
      midColor: "#6a4d8f",
      useMid: false,
    },
    {
      name: "Candy Cake",
      startColor: "#ff758c",
      endColor: "#ff7eb3",
      midColor: "#ff7ea1",
      useMid: false,
    },
    {
      name: "Spring",
      startColor: "#00d2ff",
      endColor: "#3a7bd5",
      midColor: "#1fa7ea",
      useMid: false,
    },
    {
      name: "Metallic",
      startColor: "#e0e0e0",
      endColor: "#959595",
      midColor: "#c9c9c9",
      useMid: false,
    },
    {
      name: "Neon Green",
      startColor: "#00c9ff",
      endColor: "#92fe9d",
      midColor: "#50d18d",
      useMid: false,
    },
  ];

  const getGradient = () => {
    const colors = reverse
      ? [endColor, ...(useMidColor ? [midColor] : []), startColor]
      : [startColor, ...(useMidColor ? [midColor] : []), endColor];

    return `${type}-gradient(${
      type === "linear" ? `${angle}deg, ` : ""
    }${colors.join(", ")})`;
  };

  const handleShuffle = () => {
    const randomColor = () =>
      `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;
    setStartColor(randomColor());
    setEndColor(randomColor());
    if (useMidColor) setMidColor(randomColor());
  };

  const handlePresetChange = (e) => {
    const selectedPreset = presetGradients.find(
      (preset) => preset.name === e.target.value
    );

    if (selectedPreset) {
      setStartColor(selectedPreset.startColor);
      setEndColor(selectedPreset.endColor);
      setMidColor(selectedPreset.midColor);
      setUseMidColor(selectedPreset.useMid);
    }
  };

  const cssOutput = `background: ${startColor};\nbackground: -webkit-${getGradient()};\nbackground: ${getGradient()};`;
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
    <div className="w-full max-w-4xl mx-auto mt-6 px-4 sm:px-6 md:px-8">
      {/* Header */}
      <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl text-indigo-400 mt-3">
            <MdGradient />
          </span>
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center sm:text-left mt-3">
            CSS Gradient Generator
          </span>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end gap-3 w-full sm:w-auto md:mt-3">
   <button
                             onClick={() => setShareOpen(true)}
                             className="flex items-center justify-center md:w-auto px-3 py-2 text-sm rounded-xl border border-white bg-[#273D58]  border border-white text-white mb-2 md:mb-0 cursor-pointer"
                           >
                             <FiShare2 className="mr-2" size={18} />
                             Share
                           </button>    <button
                             className="flex items-center justify-center gap-2 w-full md:w-auto px-3 py-2 text-sm rounded-xl border border-white bg-[#273D58]  border border-white text-white cursor-pointer transition"
                             onClick={() => setOpen(true)}
                           >
                             <FiAlertCircle className="text-white text-base" />
                             Report Bug
                           </button>
                            <button
                                      onClick={onFavoriteToggle}
                                      className={`px-3 py-2 rounded-xl border text-sm mt-2 md:mt-0 ml-0 cursor-pointer ${isFavorite
                                        ? "border border-white bg-[#273D58]  border border-white text-white"
                                        : "bg-[#273D58]  border border-white text-white"
                                        }`}
                                    >
                                      {isFavorite ? (
                                        <>
                                          <FaCheck className="inline-block mr-1" size={12} /> Added
                                        </>
                                      ) : (
                                        <>
                                          <FaRegStar className="inline-block mr-1" size={12} /> Add to
                                          Favorites
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
                          ? "bg-[#273D58]  border border-white text-white"
                          : "text-black hover:bg-[#273D58] hover:text-white"
                          }`}
                      >
                        ⚙️ Share Tool
                      </button>
                      <button
                        onClick={() => setActiveTab("home")}
                        className={`w-1/2 px-4 py-2 rounded-xl font-semibold text-sm ${activeTab === "home"
                          ? "bg-[#273D58]  border border-white text-white"
                          : "text-black hover:bg-[#273D58] hover:text-white"
                          }`}
                      >
                        🏠 Share 10015
                      </button>
                    </div>
                    <div className="text-center border border-gray-500 rounded-xl p-6">
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
                <div className="fixed inset-0 bg-black/30 z-40 flex justify-center items-center">
                  <div className="bg-[#16283E] border border-white max-w-md w-full p-6 rounded-2xl shadow-lg relative">
                    <h2 className="text-xl font-bold mb-2 text-white">Bug Report</h2>
                    <p className="text-sm mb-4">
                     

                    </p>
                    <label className="text-sm mb-1 block text-white" htmlFor="bugDescription">
                      Please describe the issue.
                    </label>
                    <textarea
                      id="bugDescription"
                      className="w-full p-3 border border-gray-500 rounded-xl text-base h-32 text-white"
                      placeholder="Description*"
                      value={bugDescription}
                      onChange={(e) => setBugDescription(e.target.value)}
                    />
                    <div className="flex justify-end gap-3 mt-4">
                      <button
                        onClick={() => setOpen(false)}
                        className="px-4 py-2 bg-[#273D58]  border border-white text-white border border-white rounded-lg"
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



      {/* Main Content */}
      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <div
          className="w-full sm:w-64 h-48 sm:h-64 rounded shadow"
          style={{ background: getGradient() }}
        ></div>

        <div className="flex-1 space-y-4">
          <div>
            <label className="block font-medium mb-1 text-sm text-white sm:text-base">Preset Gradients</label>
            <select
              className="w-full border border-gray-200 rounded text-white bg-[#16283E] px-3 py-2 outline-none text-sm sm:text-base"
              onChange={handlePresetChange}
            >
              {presetGradients.map((preset, index) => (
                <option key={index} value={preset.name}>
                  {preset.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm sm:text-base text-white">Start Color</label>
              <input
                type="color"
                value={startColor}
                onChange={(e) => setStartColor(e.target.value)}
                className="w-full h-10 p-0 border border-gray-200 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm sm:text-base text-white">End Color</label>
              <input
                type="color"
                value={endColor}
                onChange={(e) => setEndColor(e.target.value)}
                className="w-full h-10 p-0 border border-gray-200 rounded"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useMidColor}
              onChange={() => setUseMidColor(!useMidColor)}
              className="h-5 w-5"
            />
            <span className="text-sm sm:text-base text-white">Use Mid Color</span>
            {useMidColor && (
              <input
                type="color"
                value={midColor}
                onChange={(e) => setMidColor(e.target.value)}
                className="h-8 w-12 sm:w-16 ml-2 border border-gray-500 rounded"
              />
            )}
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="linear"
                checked={type === "linear"}
                onChange={() => setType("linear")}
                className="h-5 w-5"
              />
              <span className="text-sm sm:text-base text-white">Linear</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="radial"
                checked={type === "radial"}
                onChange={() => setType("radial")}
                className="h-5 w-5"
              />
              <span className="text-sm sm:text-base text-white">Radial</span>
            </label>
          </div>

          {type === "linear" && (
            <div>
              <label className="block mb-1 text-sm sm:text-base text-white">Angle: {angle}°</label>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={reverse}
              onChange={() => setReverse(!reverse)}
              className="h-5 w-5"
            />
            <span className="text-sm sm:text-base text-white" >Reverse</span>
          </div>

          <button
            onClick={handleShuffle}
            className="transition bg-[#273D58] border border-white text-white cursor-pointer rounded-lg px-6 py-2 w-full sm:w-auto"
          >
            Shuffle Colors
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-1 text-sm sm:text-base text-white">CSS</label>
        <pre className="border border-gray-500 bg-[#16283E] p-4 rounded overflow-x-auto whitespace-pre-wrap text-xs sm:text-sm text-gray-500">
          {cssOutput}
        </pre>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          className="w-full sm:w-40 px-6 py-3 transition bg-[#273D58] border border-white text-white cursor-pointer rounded-lg flex items-center justify-center hover:opacity-90"
          onClick={() => {
            setStartColor("#474bff");
            setEndColor("#bc48ff");
            setMidColor("#8c6fff");
            setUseMidColor(false);
            setType("linear");
            setAngle(0);
            setReverse(false);
          }}
        >
          Reset
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(cssOutput)}
          className="w-full sm:w-40 px-6 py-3 transition bg-[#273D58] border border-white text-white cursor-pointer rounded-lg flex items-center justify-center hover:opacity-90"
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
        pre {
          overflow-wrap: break-word;
          word-break: break-word;
        }
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .w-full {
            width: 100% !important;
          }
          .max-w-5xl {
            max-width: 100% !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
          .sm\\:w-64 {
            width: 100% !important;
          }
          .h-48 {
            height: 180px !important;
          }
          .sm\\:h-64 {
            height: 180px !important;
          }
          .sm\\:flex-row {
            flex-direction: column !important;
          }
          .sm\\:w-auto {
            width: 100% !important;
          }
          .sm\\:w-40 {
            width: 100% !important;
            max-width: 180px;
          }
          .text-lg {
            font-size: 1rem !important;
          }
          .text-xl {
            font-size: 1.125rem !important;
          }
          .text-2xl {
            font-size: 1.25rem !important;
          }
          .text-3xl {
            font-size: 1.5rem !important;
          }
          .text-4xl {
            font-size: 1.75rem !important;
          }
          .text-5xl {
            font-size: 2rem !important;
          }
          .text-6xl {
            font-size: 2.25rem !important;
          }
          .mb-6 {
            margin-bottom: 1.5rem !important;
          }
          .gap-6 {
            gap: 1.5rem !important;
          }
          .gap-4 {
            gap: 1rem !important;
          }
          .gap-3 {
            gap: 0.75rem !important;
          }
          .gap-2 {
            gap: 0.5rem !important;
          }
          .p-4 {
            padding: 0.75rem !important;
          }
          .p-6 {
            padding: 1rem !important;
          }
          .px-4 {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }
          .py-6 {
            padding-top: 1.25rem !important;
            padding-bottom: 1.25rem !important;
          }
          .px-6 {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }
          .py-3 {
            padding-top: 0.75rem !important;
            padding-bottom: 0.75rem !important;
          }
          .py-2 {
            padding-top: 0.5rem !important;
            padding-bottom: 0.5rem !important;
          }
          .text-sm {
            font-size: 0.875rem !important;
          }
          .text-base {
            font-size: 1rem !important;
          }
          .min-w-\\[120px\\] {
            min-width: 100% !important;
            max-width: 180px;
          }
          .h-10 {
            height: 2.25rem !important;
          }
          .h-8 {
            height: 1.75rem !important;
          }
          .w-12 {
            width: 2.5rem !important;
          }
          .sm\\:w-16 {
            width: 2.5rem !important;
          }
          .h-5 {
            height: 1.25rem !important;
          }
          .w-5 {
            width: 1.25rem !important;
          }
          .space-y-4 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 1rem !important;
          }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .max-w-5xl {
            max-width: 90% !important;
          }
          .sm\\:w-64 {
            width: 40% !important;
          }
          .sm\\:h-64 {
            height: 220px !important;
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
        }
      `}</style>
    </div>
      <Comment />
      </>
  );
};

export default GradientGenerator;