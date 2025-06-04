"use client"

import { useRef, useState, useContext } from "react"
import { TbFilters } from "react-icons/tb"
import { FiShare2, FiAlertCircle } from "react-icons/fi"
import { FaCheck, FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaCopy, FaRegStar } from "react-icons/fa6"
import { MdShare } from "react-icons/md"
import Comment from "../Text tools/Comment"
import { FavoritesContext } from "../../Context/FavoriteContext"

const FILTERS = [
  { name: "Brighten", css: "brightness", min: 0, max: 2, step: 0.01, default: 1 },
  { name: "Lighten", css: "brightness", min: 0, max: 2, step: 0.01, default: 1.1 },
  { name: "Darken", css: "brightness", min: 0, max: 2, step: 0.01, default: 0.75 },
  { name: "Saturate", css: "saturate", min: 0, max: 3, step: 0.01, default: 2 },
  { name: "Desaturate", css: "saturate", min: 0, max: 3, step: 0.01, default: 0.5 },
  { name: "Greyscale", css: "grayscale", min: 0, max: 1, step: 0.01, default: 1 },
  { name: "Contrast", css: "contrast", min: 0, max: 3, step: 0.01, default: 1 },
  { name: "Blur", css: "blur", min: 0, max: 10, step: 0.1, default: 0 }, // px
  { name: "Hue Rotate", css: "hue-rotate", min: 0, max: 360, step: 1, default: 0 }, // deg
  { name: "Invert", css: "invert", min: 0, max: 1, step: 0.01, default: 1 },
  { name: "Opacity", css: "opacity", min: 0, max: 1, step: 0.01, default: 1 },
  { name: "Sepia", css: "sepia", min: 0, max: 1, step: 0.01, default: 1 },
]

export default function ImageFilter() {
  const { addToFavorites, removeFromFavorites, updateFavorites, isFavorite } = useContext(FavoritesContext)
  const [open, setOpen] = useState(false)
  const [bugDescription, setBugDescription] = useState("")
  const [shareOpen, setShareOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("tool")
  const [image, setImage] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0])
  const [amount, setAmount] = useState(FILTERS[0].default)
  const [appliedFilter, setAppliedFilter] = useState({ filter: FILTERS[0], amount: FILTERS[0].default })
  const imgRef = useRef()
  const canvasRef = useRef()

  const toolName = "Image Filter" // Consistent with sidebar and Imagestools1

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(URL.createObjectURL(file))
      setSelectedFilter(FILTERS[0])
      setAmount(FILTERS[0].default)
      setAppliedFilter({ filter: FILTERS[0], amount: FILTERS[0].default })
    }
  }

  const handleFilterChange = (e) => {
    const filter = FILTERS.find((f) => f.name === e.target.value)
    setSelectedFilter(filter)
    setAmount(filter.default)
  }

  const handleApply = () => {
    setAppliedFilter({ filter: selectedFilter, amount })
  }

  const handleReset = () => {
    setImage(null)
    setSelectedFilter(FILTERS[0])
    setAmount(FILTERS[0].default)
    setAppliedFilter({ filter: FILTERS[0], amount: FILTERS[0].default })
  }

  const getFilterStyle = () => {
    const { filter, amount } = appliedFilter
    if (filter.css === "brightness") {
      return `brightness(${amount})`
    }
    return `${filter.css}(${amount})`
  }

  const handleApplyAndDownload = () => {
    setAppliedFilter({ filter: selectedFilter, amount })
    setTimeout(() => {
      handleDownload()
    }, 100)
  }

  const handleDownload = () => {
    if (!imgRef.current || !canvasRef.current) return

    const img = imgRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set canvas dimensions to match the image
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight

    // Apply the filter to the canvas context
    const { filter, amount } = appliedFilter
    ctx.filter = filter.css === "brightness" ? `brightness(${amount})` : `${filter.css}(${amount})`

    // Draw the image onto the canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    // Create a download link
    try {
      const link = document.createElement("a")
      link.download = "filtered-image.png"
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (error) {
      alert("Failed to download image. Please try again.")
      console.error(error)
    }

    // Reset the canvas filter to avoid affecting subsequent renders
    ctx.filter = "none"
  }

  const onFavoriteToggle = () => {
    if (isFavorite(toolName)) {
      removeFromFavorites(toolName)
      console.log(`Removed "${toolName}" from favorites`)
    } else {
      addToFavorites(toolName)
      console.log(`Added "${toolName}" to favorites`)
    }

    // Update favorites to sync with sidebar
    if (updateFavorites) {
      updateFavorites()
    }
  }

  return (
    <>
      <div className=" bg-[#16283E] ">
        <div className="max-w-4xl mx-auto p-3">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4  gap-2">
            <div className="flex items-center gap-3 mb-2 mt-8 sm:mb-0">
              <span className="text-4xl text-indigo-400">
                <TbFilters />
              </span>
              <span className="text-2xl font-bold text-white md:text-sm lg:text-2xl sm:text-lg">
                Image&nbsp;Filter
              </span>
            </div>
            <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 lg:justify-end lg:gap-2 mb-2 xl:mt-8">
              <button
                onClick={() => setShareOpen(true)}
                className="flex items-center justify-center md:w-auto px-3 py-2 text-sm rounded-xl border mb-2 md:mb-0 cursor-pointer border-white bg-[#273D58] text-white"
              >
                <FiShare2 className="mr-2" size={18} />
                Share
              </button>
              <button
                className="flex items-center justify-center gap-2 w-full md:w-auto px-3 py-2 text-sm rounded-xl border text-white  border-white cursor-pointer bg-[#273D58] transition"
                onClick={() => setOpen(true)}
              >
                <FiAlertCircle className="text-white text-base" />
                Report Bug
              </button>
              <button
                onClick={onFavoriteToggle}
                className={`px-3 py-2 rounded-xl border text-sm mt-2 md:mt-0 ml-0 cursor-pointer  border-white text-white bg-[#273D58] ${isFavorite(toolName)
                    ? ""
                    : ""
                  }`}
              >
                {isFavorite(toolName) ? (
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


          {!image && (
            <label
              htmlFor="file-upload"
              className="w-full max-w-4xl h-40 border-2 border-dashed border-white rounded-lg flex flex-col items-center justify-center cursor-pointer mb-8 transition"
            >
              <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              <svg
                className="w-12 h-12 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <p className="text-gray-500 text-lg">
                Drag your image here, or <span className="">browse</span>
              </p>
            </label>
          )}

          {image && (
            <div className="w-full max-w-4xl bg-white  rounded-lg shadow p-6 flex flex-col items-center mb-6 ">
              <div
                className="bg-white flex justify-center items-center p-4 rounded-lg"
                style={{ width: "min(100%, 600px)" }}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt="Preview"
                  ref={imgRef}
                  className="object-contain max-w-full max-h-[450px] rounded-lg"
                  style={{
                    width: "100%",
                    height: "auto",
                    filter: getFilterStyle(),
                  }}
                  draggable={false}
                />
                {/* Hidden canvas for rendering the filtered image */}
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>
            </div>
          )}

          {image && (
            <section className="mx-auto max-w-4xl  bg-[#16283E]   rounded-lg shadow p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-white">
              <div className="flex flex-col w-full md:w-1/4 bottom-full">
                <label htmlFor="filter-select" className="mb-2 text-sm font-medium  text-white">
                  Filter Type
                </label>
                <select
                  id="filter-select"
                  className="w-full border border-white  bg-[#16283E]  text-white  rounded px-3 py-2 outline-none bottom-full"
                  value={selectedFilter.name}
                  onChange={handleFilterChange}
                >
                  {FILTERS.map((f) => (
                    <option className="" key={f.name} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col w-full md:w-1/3">
                <label htmlFor="amount-range" className="mb-2 text-sm font-medium text-white">
                  Amount: {Math.round(((amount - selectedFilter.min) / (selectedFilter.max - selectedFilter.min)) * 100)}%
                </label>
                <input
                  id="amount-range"
                  type="range"
                  min={selectedFilter.min}
                  max={selectedFilter.max}
                  step={selectedFilter.step}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full accent-white"
                />
              </div>

              <button
                onClick={handleApply}
                className="cursor-pointer text-white bg-[#273D58] border  px-8 py-2 rounded-full transition"
              >
                Apply
              </button>

              <div className="flex gap-4">
                <button
                  onClick={handleReset}
                  className="cursor-pointer text-white bg-[#273D58]  border flex items-center gap-2 px-6 py-2 rounded-full transition"
                >
                  Reset
                </button>

                <button
                  onClick={handleApplyAndDownload}
                  className="cursor-pointer text-white bg-[#273D58] border flex items-center gap-2 px-6 py-2 rounded-full transition"
                >
                  Download
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
      <Comment />
    </>
  )
}
