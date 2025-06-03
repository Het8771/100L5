
import arrow from "../../image/arrow.svg"
import arrow2 from "../../image/arrow2.svg"
import whishlist from "../../image/whishlist.svg" // wishlist icon
import whishlist2 from "../../image/whishlist2.svg" // wishlist icon
import { MdMovieFilter } from "react-icons/md"
import { MdPostAdd } from "react-icons/md"
import { FaTwitterSquare } from "react-icons/fa"
import { LuGitGraph } from "react-icons/lu"
import { IoLogoVimeo } from "react-icons/io"
import { FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { FavoritesContext } from "../../Context/FavoriteContext"

function Socialmediatool1() {
  const tools = [
    {
      title: "Instagram Filters",
      description:
        "Apply Instagram-like filters to photos by uploading local files or image URLs",
      icon: <MdMovieFilter className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/InstagramFilters",
    },
    {
      title: "Instagram Post Generator",
      description:
        "Create realistic Instagram posts, download as images, and prank your friends playfully",
      icon: <MdPostAdd className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/InstagramPostGenerator",
    },
    {
      title: "Tweet Generator",
      description: "Create realistic tweets, download as images, and prank or joke with friends playfully",
      icon: <FaTwitterSquare className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/TweetGenerator",
    },
    {
      title: "Twitter Ad Revenue Generator",
      description: "Generate Twitter ad revenue screenshots and make jokes to your friends",
      icon: <FaXTwitter className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Twitteradrevenuegenerator",
    },
    {
      title: "YouTube Thumbnail Grabber",
      description: "Get all available thumbnail images of a YouTube videos just by entering the URL",
      icon: <FaYoutube className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Youtubethumbnailgrabber",
    },
    {
      title: "Vimeo Thumbnail Grabber",
      description: "Get all available thumbnail images of a Vimeo videos just by entering the URL",
      icon: <IoLogoVimeo className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Vimeothumbnailgrabber",
    },
    {
      title: "Open Graph Meta Generator",
      description: "Generate open graph meta code for your web page and add it to your site's head section",
      icon: <LuGitGraph className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Opengraphmetagenerator",
    },
  ]

  const navigate = useNavigate()
  const { favoriteTools, addToFavorites, removeFromFavorites } = useContext(FavoritesContext)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleWishlistClick = (e, tool) => {
    e.stopPropagation() // Prevent card click navigation

    const isAlreadyFavorite = favoriteTools.includes(tool.title)

    if (isAlreadyFavorite) {
      removeFromFavorites(tool.title)
    } else {
      addToFavorites(tool.title)
    }
  }

  const handleCardClick = (filename) => {
    scrollToTop()
    navigate(filename)
  }

  // Split tools into chunks of 4
  const chunkArray = (array, chunkSize) => {
    const chunks = []
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize))
    }
    return chunks
  }

  const toolChunks = chunkArray(tools, 4)

  const ToolCard = ({ tool, index }) => {
    const isFavorite = favoriteTools.includes(tool.title)

    return (
       
      <div
        key={index}
        className="relative rounded-2xl shadow-md cursor-pointer p-6 bg-[#273D58] flex flex-col justify-between transition-all duration-300 hover:shadow-lg w-full max-w-[280px]"
        onClick={() => handleCardClick(tool.filename)}
      >
        {/* Wishlist Icon */}
        <div className="group relative" onClick={(e) => handleWishlistClick(e, tool)}>
          <img
            src={isFavorite ? whishlist2 : whishlist}
            alt="Wishlist"
            className={`absolute top-1 right-2 w-5 h-5 transition-opacity duration-300 cursor-pointer hover:scale-110 ${
              isFavorite ? "opacity-100" : "opacity-100 group-hover:opacity-0"
            }`}
          />
          {!isFavorite && (
            <img
              src={whishlist2 || "/placeholder.svg"}
              alt="Wishlist"
              className="absolute top-1 right-2 w-5 h-5 transition-opacity duration-300 opacity-0 group-hover:opacity-100 cursor-pointer hover:scale-110"
            />
          )}
        </div>

        {/* Tool Icon with background */}
        <div className="rounded-md flex items-center justify-start mb-4">{tool.icon}</div>

        {/* Title */}
        <h3 className="text-left font-semibold text-[#1F2B56] mb-2 break-words">{tool.title}</h3>

        {/* Description */}
        <p className="text-left text-gray-600 mb-8">{tool.description}</p>

        {/* Arrow Button */}
        <div className="group absolute bottom-5.5 right-1">
          <div className="relative w-28 h-10 flex items-center justify-center bg-gray-100 rounded-full z-0 transition-all duration-300">
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
  }

  return (
    <div className="bg-[#16283E]">
      <div className="py-10 px-4 md:px-10 max-w-7xl mx-auto">
        <h2
          style={{ fontFamily: "David Libre" }}
          className="text-2xl md:text-4xl font-semibold text-center text-[#1F2B56] mb-2"
        >
          Social Media Tools
        </h2>
        <p className="text-center text-gray-500 mb-10">Smart Tools. Simple Solutions.</p>

        <div className="space-y-6">
          {toolChunks.map((chunk, chunkIndex) => (
            <div key={chunkIndex}>
              {chunk.length === 4 ? (
                // Full row with 4 items - use grid
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {chunk.map((tool, index) => (
                    <ToolCard key={`${chunkIndex}-${index}`} tool={tool} index={index} />
                  ))}
                </div>
              ) : (
                // Partial row with 1-3 items - use flex with center alignment
                <div className="flex flex-wrap justify-center gap-6">
                  {chunk.map((tool, index) => (
                    <ToolCard key={`${chunkIndex}-${index}`} tool={tool} index={index} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Socialmediatool1
