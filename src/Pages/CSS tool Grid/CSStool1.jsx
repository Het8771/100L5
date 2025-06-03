import arrow from "../../image/arrow.svg";
import arrow2 from "../../image/arrow2.svg";
import whishlist from "../../image/whishlist.svg";
import whishlist2 from "../../image/whishlist2.svg";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { LuLoader } from "react-icons/lu";
import { TbBackground } from "react-icons/tb";
import { LuSpline } from "react-icons/lu";
import { IoMdPhonePortrait } from "react-icons/io";
import { CgGoogle } from "react-icons/cg";
import { MdGradient } from "react-icons/md";
import { IoTriangleSharp } from "react-icons/io5";
import { FaBoxArchive } from "react-icons/fa6";
import { AiOutlineRadiusUpright } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../../Context/FavoriteContext";

function CSStools1() {
  const tools = [
    {
      title: "CSS Clip Path Generator",
      description:
        "Generate CSS clip-path with different patterns and use clip-path property in your projects",
      icon: <MdOutlineDocumentScanner className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Cssclippathgenerator",
    },
    {
      title: "CSS Loader",
      description:
        "Generate fancy CSS loaders by specifying the type, color, and size of the loading indicator",
      icon: <LuLoader className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Cssloader",
    },
    {
      title: "CSS Background Pattern",
      description:
        "Generate beautiful CSS-only background patterns and use it in your projects right away",
      icon: <TbBackground className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/CSSbackgroundpattern",
    },
    {
      title: "CSS Cubic Bezier Generator",
      description:
        "Easily create CSS cubic Bezier easing by previewing animations and progress graphs live",
      icon: <LuSpline className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Csscubic",
    },
    {
      title: "CSS Glass Morphism",
      description:
        "Easily create CSS for frosted-glass effects by adding background blur to elements",
      icon: <IoMdPhonePortrait className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Cssglassmorphism",
    },
    {
      title: "CSS Text Glitch",
      description:
        "Generate CSS text glitch effect and create fancy text animations by using pure CSS",
      icon: <CgGoogle className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Csstextglitch",
    },
    {
      title: "CSS Gradient Generator",
      description:
        "Generate beautiful CSS gradients either by using presets or customizing your own",
      icon: <MdGradient className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Cssgradientgenerator",
    },
    {
      title: "CSS Triangle Generator",
      description:
        "Generate CSS code for triangle shapes with desired width, height, and color",
      icon: <IoTriangleSharp className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/CSStrianglegenerator",
    },
    {
      title: "CSS Box Shadow Generator",
      description:
        "Generate CSS code for box shadows while previewing it for box, circle, or header design",
      icon: <FaBoxArchive className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Cssboxshadowgenerator",
    },
    {
      title: "Border Radius Generator",
      description:
        "Generate advanced CSS border radius to shape your HTML elements' corners individually",
      icon: <AiOutlineRadiusUpright className="w-[60px] h-[60px] text-indigo-400" />,
      filename: "/Borderradiusgenerator",
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
          CSS Tools
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

export default CSStools1;