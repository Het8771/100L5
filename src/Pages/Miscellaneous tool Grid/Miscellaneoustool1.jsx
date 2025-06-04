import arrow from "../../image/arrow.svg";
import arrow2 from "../../image/arrow2.svg";
import whishlist from "../../image/whishlist.svg";
import whishlist2 from "../../image/whishlist2.svg";
import { ImBarcode } from "react-icons/im";
import { BsQrCode } from "react-icons/bs";
import { MdOutlineContentPaste } from "react-icons/md";
import { BiSolidLock } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../../Context/FavoriteContext";

function Miscellaneoustool1() {
  const tools = [
    {
      title: "Bar Code Generator",
      description:
        "Generate barcodes for different international standardizations with desired sizes",
      icon: <ImBarcode className="w-[60px] h-[60px] text-blue-400 rounded-lg" />,
      filename: "/Barcode",
    },
    {
      title: "QR Code Generator",
      description:
        "Generate QR code for your links or texts easily and download them as an image file",
      icon: <BsQrCode className="w-[60px] h-[60px] text-yellow-400" />,
      filename: "/QRcode",
    },
    {
      title: "List Randomizer",
      description:
        "Randomize lists, run lotteries, draw campaigns, or pick random people easily",
      icon: <MdOutlineContentPaste className="w-[60px] h-[60px] text-pink-400" />,
      filename: "/Randomizer",
    },
    {
      title: "Strong Random Password",
      description:
        "Generate strong random passwords and check their strength using a password meter",
      icon: <BiSolidLock className="w-[60px] h-[60px] text-orange-400" />,
      filename: "/StrongRandom",
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
        className="group relative rounded-2xl shadow-md cursor-pointer p-6 bg-[#273D58] flex flex-col justify-between transition-all duration-300 hover:shadow-lg w-full max-w-[280px] mx-auto"
        onClick={() => handleCardClick(tool.filename)}
      >
        {/* Wishlist Icon */}
        <div className="relative z-10" onClick={(e) => handleWishlistClick(e, tool)}>
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
        <div className="absolute bottom-5.5 right-1">
          <div className="relative w-28 h-10 flex items-center justify-center rounded-full z-0 transition-all duration-300">
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
      <div className="py-10 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <h2
          style={{ fontFamily: "David Libre" }}
          className="text-2xl md:text-4xl font-semibold text-center text-white mb-2"
        >
          Miscellaneous Tools
        </h2>
        <p className="text-center text-gray-500 mb-10">Smart Tools. Simple Solutions.</p>

        <div className="space-y-6">
          {toolChunks.map((chunk, chunkIndex) => (
            <div key={chunkIndex}>
              {chunk.length === 4 ? (
                // Full row with 4 items - use flex for mobile, grid for larger screens
                <div className="flex flex-wrap justify-center gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
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

export default Miscellaneoustool1;