import arrow from "../../image/arrow.svg";
import arrow2 from "../../image/arrow2.svg";
import whishlist from "../../image/whishlist.svg";
import whishlist2 from "../../image/whishlist2.svg";
import { FaBrain } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";
import { FaSwatchbook } from "react-icons/fa";
import { IoColorFilterOutline } from "react-icons/io5";
import { HiCircleStack } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../../Context/FavoriteContext";

function Colortool1() {
  const tools = [
    {
      title: "AI Color Palette Generator",
      description: "Craft perfect color palettes effortlessly with AI-driven creativity.",
      icon: <FaBrain className="w-[60px] h-[60px] text-blue-400" />,
      filename: "/AIColor",
    },
    {
      title: "HEX to RGBA Converter",
      description: "Convert HEX color codes to RGBA equivalents and see all details of a color",
      icon: <IoColorFilterOutline className="w-[60px] h-[60px] text-yellow-400" />,
      filename: "/HEX",
    },
    {
      title: "RGBA to HEX Converter",
      description: "Convert RGBA color codes to alpha-supported 6 or 8 digit HEX equivalents",
      icon: <FaHashtag className="w-[60px] h-[60px] text-pink-400" />,
      filename: "/RGBA",
    },
    {
      title: "Color Shades Generator",
      description:
        "Generate all color shades using steps: darken, lighten, saturate, desaturate systematically",
      icon: <FaSwatchbook className="w-[60px] h-[60px] text-orange-400" />,
      filename: "/ColorMixer",
    },
    {
      title: "Color Mixer",
      description: "Mix 2 colors and get color codes for intermediate colors from 2 to 10 steps",
      icon: <HiCircleStack className="w-[60px] h-[60px] text-blue-400" />,
      filename: "/ColorShades",
    },
  ];

  const navigate = useNavigate();
  const { favoriteTools, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWishlistClick = (e, tool) => {
    e.stopPropagation(); // Prevent card click navigation

    const isAlreadyFavorite = favoriteTools.includes(tool.title);

    if (isAlreadyFavorite) {
      removeFromFavorites(tool.title);
    } else {
      addToFavorites(tool.title);
    }
  };

  const handleCardClick = (filename) => {
    scrollToTop();
    navigate(filename);
  };

  // Split tools into chunks of 4
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const toolChunks = chunkArray(tools, 4);

  const ToolCard = ({ tool, index }) => {
    const isFavorite = favoriteTools.includes(tool.title);

    return (
      <div
        key={index}
        className="group relative rounded-2xl shadow-md cursor-pointer p-6 bg-[#273D58] flex flex-col justify-between transition-all duration-300 hover:shadow-lg w-full max-w-[280px]"
        onClick={() => handleCardClick(tool.filename)}
      >
        {/* Wishlist Icon */}
        <div className="group relative z-10" onClick={(e) => handleWishlistClick(e, tool)}>
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
              className="absolute top-1 right-2 w-5 h-5 transition-opacity duration-300 opacity-10 hover:opacity-100 cursor-pointer hover:scale-110"
            />
          )}
        </div>

        {/* Tool Icon with background */}
        <div className="rounded-md flex items-center justify-start mb-4">{tool.icon}</div>

        {/* Title */}
        <h3 className="text-left font-semibold text-white mb-2 break-words">{tool.title}</h3>

        {/* Description */}
        <p className="text-left text-gray-400 mb-8">{tool.description}</p>

        {/* Arrow Button */}
        <div className="group absolute bottom-5.5 right-1">
          <div className="relative w-28 h-10 flex items-center justify-center  rounded-full z-0 transition-all duration-300">
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
    );
  };

  return (
    <div className="bg-[#16293B]">
      <div className="py-10 px-4 md:px-10 max-w-7xl mx-auto">
        <h2
          style={{ fontFamily: "David Libre" }}
          className="text-2xl md:text-4xl font-semibold text-center text-white mb-2"
        >
          Color Tools
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
  );
}

export default Colortool1;