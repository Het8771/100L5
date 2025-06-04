import React, { useState, useRef,useEffect,useContext} from "react";
import { FaHashtag } from "react-icons/fa";
import {
    FaCheck,
    FaRegStar,
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaEnvelope,
    FaCopy,
} from "react-icons/fa6";
import { FiAlertCircle, FiShare2 } from "react-icons/fi";
import { MdShare } from "react-icons/md";
import Comment from "../Text tools/Comment";
import { FavoritesContext } from "../../Context/FavoriteContext";


function rgbaToHex(r, g, b, a = 1) {
    r = Math.max(0, Math.min(255, parseInt(r)));
    g = Math.max(0, Math.min(255, parseInt(g)));
    b = Math.max(0, Math.min(255, parseInt(b)));
    a = Math.max(0, Math.min(1, parseFloat(a)));
    const alpha = Math.round(a * 255);

    if (alpha === 255) {
        return (
            "#" +
            [r, g, b]
                .map((x) => x.toString(16).padStart(2, "0").toUpperCase())
                .join("")
        );
    } else {
        return (
            "#" +
            [r, g, b, alpha]
                .map((x) => x.toString(16).padStart(2, "0").toUpperCase())
                .join("")
        );
    }
}

function parseRgbaInput(input) {
    const match = input
        .replace(/[^\d.,]/g, "")
        .split(",")
        .map((v) => v.trim());
    if (match.length === 3 || match.length === 4) {
        const [r, g, b, a = 1] = match;
        if (
            [r, g, b].every(
                (v) => !isNaN(v) && Number(v) >= 0 && Number(v) <= 255
            ) &&
            !isNaN(a) &&
            Number(a) >= 0 &&
            Number(a) <= 1
        ) {
            return { r, g, b, a };
        }
    }
    return null;
}

export default function RgbaToHexConverter({id="RGBA to HEX Converter"}) {
     const { updateFavorites } = useContext(FavoritesContext);
    const [rgbaInput, setRgbaInput] = useState("(22,25,255,0.9)");
    const [hex, setHex] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const hexRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [bugDescription, setBugDescription] = useState("");
    const [shareOpen, setShareOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("tool");
    const [isFavorite, setIsFavorite] = useState(false);

    const handleConvert = () => {
        setError("");
        setHex("");
        const parsed = parseRgbaInput(rgbaInput);
        if (!parsed) {
            setError("Please enter RGBA as (r,g,b) or (r,g,b,a), values 0-255, alpha 0-1.");
            return;
        }
        const { r, g, b, a } = parsed;
        setHex(rgbaToHex(r, g, b, a));
    };

    const handleCopy = () => {
        if (hex) {
            navigator.clipboard.writeText(hex);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    
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
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8 mt-3 font-sans">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <span className="text-4xl text-indigo-400">
                        <FaHashtag />
                    </span>
                    <h1 className="text-xl sm:text-2xl md:text-lg font-bold text-white">
                        RGBA&nbsp;to&nbsp;HEX&nbsp;Converter
                    </h1>
                </div>
                <div className="flex flex-col w-full sm:w-auto sm:flex-row sm:items-center gap-2 sm:gap-3">
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
                    <h2 className="text-xl font-bold mb-2">Bug Report</h2>
                    <p className="text-sm mb-4">
                      <strong>Tool:</strong> Lorem Ipsum Generator
                    </p>
                    <label className="text-sm mb-1 block" htmlFor="bugDescription">
                      Please describe the issue.
                    </label>
                    <textarea
                      id="bugDescription"
                      className="w-full p-3 border border-gray-500 rounded-xl text-base h-32 "
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

            {/* Input Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-3xl mb-8">
                <input
                    type="text"
                    className="w-full sm:w-[340px] px-4 py-3 border border-gray-500 rounded-lg text-lg outline-none"
                    value={rgbaInput}
                    onChange={(e) => setRgbaInput(e.target.value)}
                    placeholder="(22,25,255,0.9)"
                />
                <button
                    className="w-full sm:w-auto bg-[#273D58] text-white border border-white cursor-pointer text-black px-4 py-3 rounded-md text-lg transition"
                    onClick={handleConvert}
                >
                    Convert
                </button>
                <input
                    type="text"
                    ref={hexRef}
                    className="w-full sm:w-[340px] px-4 py-3 border border-gray-500 rounded-lg text-lg outline-none"
                    value={hex}
                    placeholder="HEX"
                    readOnly
                />
            </div>

            {/* Copy Button */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={handleCopy}
                    disabled={!hex}
                    className={`w-full sm:w-auto bg-[#273D58] text-white border border-white cursor-pointer text-black px-6 py-2 rounded-md flex items-center gap-2
                        ${!hex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-50'}
                    `}
                >
                    {copied ? 'Copied!' : 'Copy HEX Color'}
                </button>
            </div>

            {/* Error or Preview */}
            <div className="w-full max-w-2xl flex flex-col items-center">
                {error && (
                    <div className="text-red-600 font-medium mb-4">{error}</div>
                )}
                {/* Preview area */}
                <div className="flex w-full min-h-[150px] bg-[#273D58] rounded-xl shadow-md overflow-hidden">
                    <div className="flex-1 flex items-center justify-center text-4xl text-gray-400 bg-gray-50">
                        {hex ? (
                            <span
                                className="w-16 h-16 rounded-lg border-2 border-gray-200 inline-block"
                                style={{ background: hex }}
                                title={hex}
                            ></span>
                        ) : (
                            <span>?</span>
                        )}
                    </div>
                    <div className="flex-1 flex flex-col justify-center px-6">
                        <div className="text-white text-sm mb-1">HEX</div>
                        <div className="text-lg font-mono">{hex || "--"}</div>
                        <div className="text-white text-sm mt-4">RGBA</div>
                        <div className="text-lg font-mono">{rgbaInput || "--"}</div>
                    </div>
                </div>
            </div>
        </div>
            <Comment />
            </>
    );
}
