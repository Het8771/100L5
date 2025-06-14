import React, { useState,useContext,useEffect,useRef } from "react";
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
import { FiAlertCircle } from 'react-icons/fi';
import { FiShare2 } from "react-icons/fi";
import Comment from "../Text tools/Comment";
import { FavoritesContext } from "../../Context/FavoriteContext";

export default function ListRandomizer({id="List Randomizer"}) {
  const { updateFavorites } = useContext(FavoritesContext);
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [uniqueList, setUniqueList] = useState([]);
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [bugDescription, setBugDescription] = useState("");
  const [activeTab, setActiveTab] = useState("tool");
  const [format, setFormat] = useState("Space-separated");
  const [randomized, setRandomized] = useState([]);
  const [numSelect, setNumSelect] = useState("Select All");
  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const splitInput = (str) => {
    if (format === "Space-separated") return str.trim().split(/\s+/);
    if (format === "Comma-separated") return str.split(",").map(s => s.trim()).filter(Boolean);
    if (format === "Line-separated") return str.split("\n").map(s => s.trim()).filter(Boolean);
    return [];
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setInput(value);
    const arr = splitInput(value);
    setList(arr);
    setUniqueList([...new Set(arr)]);
  };

  const handleFormat = (e) => {
    setFormat(e.target.value);
    const arr = splitInput(input);
    setList(arr);
    setUniqueList([...new Set(arr)]);
  };

  const handleRandomize = () => {
    let arr = removeDuplicates ? [...uniqueList] : [...list];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    let count = arr.length;
    if (numSelect !== "Select All" && !isNaN(numSelect)) {
      count = Math.min(Number(numSelect), arr.length);
    }
    setRandomized(arr.slice(0, count));
  };

  const handleReset = () => {
    setInput("");
    setList([]);
    setUniqueList([]);
    setRandomized([]);
    setNumSelect("Select All");
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
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6 mt-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <MdOutlineContentPaste className="text-4xl text-indigo-500" />
          <h1 className="text-2xl font-bold text-white sm:text-lg md:text-lg lg:text-2xl">List Randomizer</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <button
            onClick={() => setShareOpen(true)}
            className="flex items-center justify-center md:w-auto px-3 py-2 text-sm rounded-xl border border-white bg-[#273D58]  border border-white text-white mb-2 md:mb-0 cursor-pointer"
          >
            <FiShare2 className="mr-2" size={18} />
            Share
          </button> <button
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

      {/* Textarea Input */}
      <textarea
        value={input}
        onChange={handleInput}
        placeholder="Enter your list..."
        rows={8}
        className="w-full p-3 sm:p-4 border border-gray-500 rounded-lg outline-none mb-4"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-6">
        <div>
          <div className="font-semibold text-gray-600">Total Count</div>
          <div className="text-lg font-bold">{list.length}</div>
        </div>
        <div>
          <div className="font-semibold text-gray-600">Unique Count</div>
          <div className="text-lg font-bold">{uniqueList.length}</div>
        </div>
        <div>
          <div className="font-semibold text-gray-600">Duplicate Count</div>
          <div className="text-lg font-bold">{list.length - uniqueList.length}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <select
          value={format}
          onChange={handleFormat}
          className="px-3 py-2 bg-[#16283E] border border-gray-500 rounded-md text-sm outline-none w-full sm:w-auto"
        >
          <option>Space-separated</option>
          <option>Comma-separated</option>
          <option>Line-separated</option>
        </select>
        <select
          value={numSelect}
          onChange={(e) => setNumSelect(e.target.value)}
          className="px-3 py-2 bg-[#16283E] border border-gray-500 rounded-md text-sm outline-none w-full sm:w-auto"
        >
          <option>Select All</option>
          {[...Array(uniqueList.length || 1)].map((_, i) => (
            <option key={i + 1}>{i + 1}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-lg w-full sm:w-auto">
          <input
            type="checkbox"
            checked={removeDuplicates}
            onChange={(e) => setRemoveDuplicates(e.target.checked)}
            className="form-checkbox"
          />
          Remove Duplicates
        </label>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-[#273D58]  border border-white text-white rounded-md text-lg w-full sm:w-auto"
        >
          Reset
        </button>
        <button
          onClick={handleRandomize}
          className="px-4 py-2 bg-[#273D58]  border border-white text-white rounded-md text-lg w-full sm:w-auto"
        >
          Randomize
        </button>
      </div>

      {/* Randomized List Output */}
      {randomized.length > 0 && (
        <div className="bg-[#16283E] border border-gray-500 rounded-xl p-4 mb-6 overflow-x-auto">
          <h2 className="font-semibold mb-2 text-gray-400">Randomized List:</h2>
          <ul className="list-decimal list-inside text-base break-words">
            {randomized.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
      <Comment />
      </>
  );
}
