import React, { useState, seRef, useContext, useEffect } from "react";
import { MdShare } from "react-icons/md";
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
import Comment from "../Text tools/Comment";
import { FiAlertCircle } from 'react-icons/fi';
import { FiShare2 } from "react-icons/fi";
import { PiFileCssLight } from "react-icons/pi";
import { FavoritesContext } from "../../Context/FavoriteContext";



// Simple HTML minifier function
function minifyHTML(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "") // Remove comments
    .replace(/\n/g, "")              // Remove line breaks
    .replace(/\s{2,}/g, " ")         // Collapse multiple spaces
    .replace(/>\s+</g, "><")         // Remove spaces between tags
    .trim();
}

export default function HtmlMinifier({ id = "CSS Minifier" }) {
  const { updateFavorites } = useContext(FavoritesContext);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isFavorite, setIsFavorite] = useState(false);


  // Minify on button click
  const handleMinify = () => {
    setOutput(minifyHTML(input));
    setIsCopied(false);
  };

  // Reset input/output
  const handleReset = () => {
    setInput("");
    setOutput("");
    setIsCopied(false);
  };

  // Copy output to clipboard
  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch {
      setIsCopied(false);
      alert("Copy failed. Please try again.");
    }
  };

  // Download minified HTML as file
  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "minified.html";
    a.click();
    URL.revokeObjectURL(url);
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
      <div className="max-w-4xl mx-auto mt-7">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-3 mb-2 sm:mb-0">
            <span className="text-4xl text-indigo-400 mt-2">
              <PiFileCssLight />
            </span>
            <span className="text-2xl font-bold text-white md:text-lg lg:text-2xl sm:text-lg mt-2">
              CSS&nbsp;Minifier
            </span>
          </div>
          <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 lg:justify-end lg:gap-2">
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

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-4">
          {/* Input Area */}
          <div className="flex-1  bg-[#16283E] rounded-xl border border-gray-200 p-4 min-h-[220px] flex flex-col">
            <label className="text-gray-400 text-sm mb-2">
              Raw HTML Code
            </label>
            <textarea
              className="flex-1 resize-none outline-none bg-transparent text-white text-base"
              placeholder="Paste your HTML code here"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          </div>
          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center">
            <span className="text-gray-400 text-2xl">&raquo;</span>
          </div>
          {/* Output Area */}
          <div className="flex-1  bg-[#16283E] rounded-xl border border-gray-200 p-4 min-h-[220px] flex flex-col">
            <label className="text-gray-400 text-sm mb-2">
              Minified HTML Code
            </label>
            <textarea
              className="flex-1 resize-none outline-none bg-transparent text-white text-base"
              placeholder="Minified HTML will appear here"
              value={output}
              readOnly
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-4xl mx-auto">
          <button
            className="px-6 py-2 bg-[#273D58] text-white border border-white rounded-lg transition cursor-pointer flex items-center gap-2"
            onClick={handleReset}
          >
            <span className="text-lg"></span> Reset
          </button>
          <button
            className="px-8 py-2 bg-[#273D58] text-white border border-white cursor-pointer rounded-lg transition"
            onClick={handleMinify}
          >
            Minify &rarr;
          </button>
          <button
            className="px-6 py-2 bg-[#273D58] text-white border border-white rounded-lg cursor-pointer flex items-center gap-2 text-[#5b63e6] transition"
            onClick={handleDownload}
            disabled={!output}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path d="M12 4v12m0 0l-4-4m4 4l4-4" stroke="#5b63e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="4" y="18" width="16" height="2" rx="1" fill="#5b63e6" opacity="0.2" />
            </svg>
            Download
          </button>
          <button
            className={`px-6 py-2 bg-[#273D58] text-white border border-white rounded-lg cursor-pointer flex items-center gap-2 transition ${isCopied
                ? "text-green-600 bg-[#273D58] border-white"
                : "text-white bg-[#273D58]"
              }`}
            onClick={handleCopy}
            disabled={!output}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <rect
                x="7"
                y="7"
                width="10"
                height="10"
                rx="2"
                stroke="#5b63e6"
                strokeWidth="2"
              />
              <rect
                x="3"
                y="3"
                width="10"
                height="10"
                rx="2"
                stroke="#5b63e6"
                strokeWidth="2"
                opacity="0.4"
              />
            </svg>
            {isCopied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      <Comment />
    </>
  );
}
