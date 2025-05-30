"use client"

import arrow from "../../image/arrow.svg" // arrow icon
import arrow2 from "../../image/arrow2.svg"
import whishlist from "../../image/whishlist.svg" // wishlist icon
import whishlist2 from "../../image/whishlist2.svg" // wishlist icon for hover state
import { FaBookReader } from "react-icons/fa"
import { VscCaseSensitive } from "react-icons/vsc"
import { MdGroups } from "react-icons/md"
import { TbTransform } from "react-icons/tb"
import { SlEnvolopeLetter } from "react-icons/sl"
import { MdOutlineContentPaste } from "react-icons/md"
import { BsScissors } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { FavoritesContext } from "../../Context/FavoriteContext"

function Texttool1() {
  const tools = [
    {
      id: "case-converter",
      title: "Case Converter",
      description: "Convert your text or string to uppercase, lowercase, title case & sentence case",
      icon: <VscCaseSensitive className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/caseconverter",
    },
    {
      id: "lorem-ipsum-generator",
      title: "Lorem Ipsum Generator",
      description: "Create your placeholder texts with desired number of paragraphs and properties",
      icon: <MdOutlineContentPaste className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/lorem",
    },
    {
      id: "letter-counter",
      title: "Letter Counter",
      description: "Count letters, words and sentences in a text and analyze this numbers with common limits",
      icon: <SlEnvolopeLetter className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/letter",
    },
    {
      id: "text-to-handwriting-converter",
      title: "Text to Handwriting", // Changed to match sidebar exactly
      description: "Convert your text into handwriting with desired paper type and ink color and download as PDF",
      icon: <TbTransform className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Text",
    },
    {
      id: "bionic-reading-converter",
      title: "Bionic Reading Converter",
      description: "Convert your texts into Bionic Reading mode to read them faster than before",
      icon: <FaBookReader className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/BionicReading",
    },
    {
      id: "multiple-whitespace-remover",
      title: "Multiple Whitespace Remove", // Changed to match sidebar exactly
      description: "Remove multiple whitespaces and line breaks in a text and clear unwanted characters",
      icon: <BsScissors className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Whitespace",
    },
    {
      id: "google-fonts-pair-finder",
      title: "Google Fonts Pair Finder",
      description: "Find font pairs which looks cool together on your designs, pages or apps as heading and body font",
      icon: <MdGroups className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Googlefont",
    },
  ]

  const navigate = useNavigate()
  const { favoriteTools, addToFavorites, removeFromFavorites, updateFavorites, isFavorite } =
    useContext(FavoritesContext)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleWishlistClick = (e, tool) => {
    e.stopPropagation() // Prevent card click navigation

    // Use tool.title (the display name) for consistency with sidebar
    const toolName = tool.title

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

  const handleCardClick = (filename) => {
    scrollToTop()
    navigate(filename)
  }

  return (
    <div>
      <div className="py-10 px-4 md:px-10 max-w-7xl mx-auto">
        <h2
          style={{ fontFamily: "David Libre" }}
          className="text-2xl md:text-4xl font-semibold text-center text-[#1F2B56] mb-2"
        >
          Text Tools
        </h2>
        <p className="text-center text-gray-500 mb-10">Smart Tools. Simple Solutions.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => {
            const isToolFavorite = isFavorite(tool.title)

            return (
              <div
                key={tool.id}
                className="relative rounded-2xl shadow-md cursor-pointer p-6 bg-[#F6F5F8] flex flex-col justify-between transition-all duration-300 hover:shadow-lg"
                onClick={() => handleCardClick(tool.filename)}
              >
                {/* Wishlist Icon */}
                <div className="group relative z-10" onClick={(e) => handleWishlistClick(e, tool)}>
                  <img
                    src={isToolFavorite ? whishlist2 : whishlist}
                    alt="Wishlist"
                    className={`absolute top-4 right-4 w-5 h-5 transition-all duration-300 cursor-pointer hover:scale-110 ${isToolFavorite ? "opacity-100" : "opacity-100 group-hover:opacity-0"
                      }`}
                  />
                  {!isToolFavorite && (
                    <img
                      src={whishlist2 || "/placeholder.svg"}
                      alt="Wishlist"
                      className="absolute top-4 right-4 w-5 h-5 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer hover:scale-110"
                    />
                  )}
                </div>

                {/* Tool Icon with background */}
                <div className="rounded-md flex items-center justify-start mb-4">

                  {tool.icon}

                </div>

                {/* Title */}
                <h3 className="text-left font-semibold text-[#1F2B56] mb-2 break-words">{tool.title}</h3>

                {/* Description */}
                <p className="text-left text-gray-600 mb-8">{tool.description}</p>

                {/* Arrow Button */}
                <div className="group absolute bottom-5.5 right-1">
                  <div className="relative w-28 h-10 flex items-center justify-center bg-gray-100 rounded-full z-0 transition-all duration-300 hover:bg-gray-200">
                    <img
                      src={arrow || "/placeholder.svg"}
                      alt="Arrow"
                      className="absolute inset-0 m-auto transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                    />
                    <img
                      src={arrow2 || "/placeholder.svg"}
                      alt="Arrow"
                      className="absolute inset-0 m-auto transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Texttool1
