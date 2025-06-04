// File: UrlSlugGenerator.jsx
import React, { useState } from "react";
import { FiShare2 } from "react-icons/fi";
import { FiAlertCircle } from 'react-icons/fi';
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
import { MdKeyboardArrowDown, MdOutlineContentPaste, MdShare } from "react-icons/md";
import Comment from "../Text tools/Comment";
import { FaLink } from "react-icons/fa";

const stopWords = new Set([
  "a", "an", "the", "and", "but", "or", "on", "in", "with", "is", "to", "for", "of", "at", "by"
]);

const UrlSlugGenerator = () => {
  const [title, setTitle] = useState("");
  const [separator, setSeparator] = useState("_");
    const [isFavorite, setIsFavorite] = useState(false);
  
  const [options, setOptions] = useState({
    lowercase: false,
    removeSpecialChars: false,
    removeStopWords: true,
    removeNumbers: true,
  });
  const [slug, setSlug] = useState("");
    const onFavoriteToggle = () => setIsFavorite((v) => !v);

  const generateSlug = (text) => {
    let result = text;

    if (options.removeSpecialChars) {
      result = result.replace(/[^\w\s-]/g, "");
    }

    if (options.removeNumbers) {
      result = result.replace(/\d+/g, "");
    }

    let words = result.split(/\s+/);

    if (options.removeStopWords) {
      words = words.filter(word => !stopWords.has(word.toLowerCase()));
    }

    if (options.lowercase) {
      words = words.map(word => word.toLowerCase());
    }

    const finalSlug = words.filter(Boolean).join(separator);
    setSlug(finalSlug);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(slug);
    alert("Slug copied to clipboard!");
  };

   const [open, setOpen] = useState(false);
    const [bugDescription, setBugDescription] = useState("");
    const [shareOpen, setShareOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("tool");

  return (
    <>
    <div className="max-w-4xl mx-auto mt-7">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
       <span className="text-4xl text-indigo-400">
                  <FaLink />
                </span>
      <h1 className="text-2xl font-bold text-white md:text-lg lg:text-2xl sm:text-lg">
        URL&nbsp;Slug&nbsp;Generator
      </h1>
      </div>
         <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 lg:justify-end lg:gap-6">
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

      <input
        type="text"
        placeholder="Article Title, Blog Post Title etc."
        className="w-full p-3 border border-gray-500 outline-none rounded-lg mb-2 "
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          generateSlug(e.target.value);
        }}
      />

      <div className="space-y-3">
        <label className="block font-medium">Separator:</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="separator"
              value="-"
              checked={separator === "-"}
              onChange={() => {
                setSeparator("-");
                generateSlug(title);
              }}
            />
            Dash (-)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="separator"
              value="_"
              checked={separator === "_"}
              onChange={() => {
                setSeparator("_");
                generateSlug(title);
              }}
            />
            Underscore (_)
          </label>
        </div>
      </div>

      <div className="space-y-2">
        {[
          { key: "lowercase", label: "Lowercase" },
          { key: "removeSpecialChars", label: "Remove Special Characters" },
          { key: "removeStopWords", label: "Remove Stop Words (English Only)" },
          { key: "removeNumbers", label: "Remove Numbers" },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options[key]}
              onChange={() => {
                const updated = { ...options, [key]: !options[key] };
                setOptions(updated);
                generateSlug(title);
              }}
            />
            {label}
          </label>
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          className=" mt-2 w-full p-3 border border-gray-500 outline-none rounded-lg bg-[#16283E] text-white"
          value={slug}
          readOnly
          placeholder="Slug will be shown here automatically..."
        />
        <button
          className="absolute right-2 top-3 bottom-2 px-4 bg-[#273D58]  border border-white text-white cursor-pointer rounded-md"
          onClick={handleCopy}
        >
          Copy
        </button>
      </div>
    </div>
      <Comment/>
      </>
  );
};

export default UrlSlugGenerator;
