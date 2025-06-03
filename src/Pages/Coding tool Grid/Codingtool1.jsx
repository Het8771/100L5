import arrow from "../../image/arrow.svg";
import arrow2 from "../../image/arrow2.svg";
import whishlist from "../../image/whishlist.svg";
import whishlist2 from "../../image/whishlist2.svg";
import { RiCodeBlock } from "react-icons/ri";
import { FaLink } from "react-icons/fa";
import { PiFileHtmlBold } from "react-icons/pi";
import { FaReact } from "react-icons/fa6";
import { PiDatabaseBold } from "react-icons/pi";
import { TbHtml } from "react-icons/tb";
import { ImHtmlFive2 } from "react-icons/im";
import { PiFileCssLight } from "react-icons/pi";
import { PiFileJsxBold } from "react-icons/pi";
import { LiaHtml5 } from "react-icons/lia";
import { SiCsswizardry } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../../Context/FavoriteContext";

function Codingtools1() {
  const tools = [
    {
      title: "Code to Image Converter",
      description: "Convert your codes to fancy images and share with your friends or colleagues",
      icon: <RiCodeBlock className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/CodetoImage",
    },
    {
      title: "URL Slug Generator",
      description: "Generate SEO-friendly slugs from titles or any other strings for your webpages or blog posts",
      icon: <FaLink className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Slug",
    },
    {
      title: "React Native Shadow Generator",
      description: "Generate fancy box shadows in React Native both for iOS and Android",
      icon: <FaReact className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Shadow",
    },
    {
      title: "Base64 Encoder Decoder",
      description: "Encode your strings to Base64 or decode strings encoded with Base64",
      icon: <PiDatabaseBold className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/BaseEncoderDecoder",
    },
    {
      title: "HTML Encoder/Decoder",
      description: "Encode or decode your HTML by replacing special characters into equivalent escape forms",
      icon: <TbHtml className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/HTMLEncoderDecoder",
    },
    {
      title: "URL Encoder/Decoder",
      description: "Encode your URL by escaping characters that may break your navigation and decode it",
      icon: <PiFileHtmlBold className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/URLEncoderDecoder",
    },
    {
      title: "HTML Minifier",
      description: "Minify your HTML code, then copy it to clipboard or download as .html file",
      icon: <ImHtmlFive2 className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/HTMLMinifier",
    },
    {
      title: "CSS Minifier",
      description: "Minify your CSS code, then copy it to clipboard or download as style.min.css file",
      icon: <PiFileCssLight className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/CSSMinifier",
    },
    {
      title: "JavaScript Minifier",
      description: "Minify your JavaScript code, then copy it to clipboard or download as .min.js file",
      icon: <PiFileJsxBold className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/JavaScriptMinifier",
    },
    {
      title: "HTML Formatter",
      description: "Format HTML with beautifier, then copy or download the result",
      icon: <LiaHtml5 className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Hf",
    },
    {
      title: "CSS Formatter",
      description: "Beautify CSS code, then copy to clipboard or download as style.css",
      icon: <SiCsswizardry className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Cs",
    },
    {
      title: "JavaScript Formatter",
      description: "Beautify JavaScript code, then copy to clipboard or download as file",
      icon: <PiFileJsxBold className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Javaf",
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
        className="relative rounded-2xl shadow-md cursor-pointer p-6 bg-[#273D58] flex flex-col justify-between transition-all duration-300 hover:shadow-lg w-full max-w-[280px]"
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
              className="absolute top-1 right-2 w-5 h-5 transition-opacity duration-300 opacity-0 group-hover:opacity-100 cursor-pointer hover:scale-110"
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
      <div className="bg-[#16283E]">
      <div className="py-10 px-4 md:px-10 max-w-7xl mx-auto">
        <h2
          style={{ fontFamily: "David Libre" }}
          className="text-2xl md:text-4xl font-semibold text-center text-white mb-2"
        >
          Coding Tools
        </h2>
        <p className="text-center text-gray-400 mb-10">Smart Tools. Simple Solutions.</p>

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

export default Codingtools1;