import React, { useContext, useEffect, useState } from "react";
import { VscCaseSensitive } from "react-icons/vsc";
import { FaCheck, FaRegStar, FaRegCopy, FaCopy, FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { MdShare } from "react-icons/md";
import Comment from "../Text tools/Comment";
import { FiShare2 } from "react-icons/fi";
import { FiAlertCircle } from 'react-icons/fi';
import { FavoritesContext } from "../../Context/FavoriteContext";

function CaseConverter({ id = "Case Converter" }) {
  const { updateFavorites } = useContext(FavoritesContext);

  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const toSentenceCase = () => {
    setText(
      text
        .toLowerCase()
        .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase())
    );
  };
  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());
  const toTitleCase = () => {
    setText(text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()));
  };
  const toMixedCase = () => {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      result += i % 2 === 0 ? text[i].toUpperCase() : text[i].toLowerCase();
    }
    setText(result);
  };
  const toInverseCase = () => {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      result += char === char.toUpperCase()
        ? char.toLowerCase()
        : char.toUpperCase();
    }
    setText(result);
  };

  const handleReset = () => setText("");
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");

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
      <div className="max-w-4xl mx-auto mt-7 md:py-2">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 ">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <span className="text-4xl text-indigo-400">
              <VscCaseSensitive />
            </span>
            <h1 className="text-2xl font-bold text-white md:text-lg lg:text-2xl sm:text-lg">Case&nbsp;Converter</h1>
          </div>
          <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 lg:justify-end lg:gap-6">
              <button
            onClick={() => setShareOpen(true)}
            className="flex items-center justify-center md:w-auto px-3 py-2 text-sm rounded-xl border border-white bg-[#273D58]  border border-white text-white mb-2 md:mb-0 cursor-pointer"
          >
            <FiShare2 className="mr-2" size={18} />
            Share
          </button>
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

              <button
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

        <textarea
          className="w-full p-4 border border-gray-500 rounded-2xl text-base mb-5 h-40"
          placeholder="Enter your text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex flex-wrap gap-3 mb-3">
          <button
            onClick={toSentenceCase}
            className="flex-1 min-w-[120px] bg-[#273D58]  border border-white text-white px-4 py-2 rounded-xl shadow-md cursor-pointer"
          >
            Sentence case
          </button>
          <button
            onClick={toUpperCase}
            className="flex-1 min-w-[120px] bg-[#273D58]  border border-white text-white px-4 py-2 rounded-xl shadow-md cursor-pointer"
          >
            UPPER CASE
          </button>
          <button
            onClick={toLowerCase}
            className="flex-1 min-w-[120px] bg-[#273D58]  border border-white text-white px-4 py-2 rounded-xl shadow-md cursor-pointer"
          >
            lower case
          </button>
        </div>
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={toTitleCase}
            className="flex-1 min-w-[120px] bg-[#273D58]  border border-white text-white px-4 py-2 rounded-xl shadow-md cursor-pointer"
          >
            Title Case
          </button>
          <button
            onClick={toMixedCase}
            className="flex-1 min-w-[120px] bg-[#273D58]  border border-white text-white px-4 py-2 rounded-xl shadow-md cursor-pointer"
          >
            MiXeD CaSe
          </button>
          <button
            onClick={toInverseCase}
            className="flex-1 min-w-[120px] bg-[#273D58]  border border-white text-white px-4 py-2 rounded-xl shadow-md cursor-pointer"
          >
            iNvErSe cAsE
          </button>
        </div>

        <div className="flex flex-wrap justify-end gap-3">
          <button
            onClick={handleReset}
            disabled={!text}
            className="bg-[#273D58]  border border-white text-white px-5 py-2 rounded-xl shadow-md cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={handleCopy}
            disabled={!text}
            className="bg-[#273D58]  border border-white text-white px-5 py-2 rounded-xl shadow-md flex items-center cursor-pointer"
          >
            {!copied ? (
              <>
                <FaRegCopy className="mr-1" />
                <span>Copy</span>
              </>
            ) : (
              <span>Copied!</span>
            )}
          </button>
        </div>
      </div>
      {/* Uncomment below if you have a Comment component */}
      <Comment />
    </>
  );
}

export default CaseConverter;
