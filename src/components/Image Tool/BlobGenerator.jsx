import { useState, useContext, useEffect, useRef } from "react";
import { GiSlowBlob } from "react-icons/gi";
import { FiShare2, FiAlertCircle } from "react-icons/fi";
import {
    FaCheck,
    FaRegStar,
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaEnvelope,
    FaCopy,
} from "react-icons/fa6";
import { MdShare } from "react-icons/md";
import Comment from "../Text tools/Comment";
import { FavoritesContext } from "../../Context/FavoriteContext";

// Helper: Generate a random blob SVG path
function generateBlob({ growth, edges }) {
    const points = [];
    const radius = 90;
    const cx = 100;
    const cy = 100;
    const steps = edges;

    for (let i = 0; i < steps; i++) {
        const theta = (2 * Math.PI * i) / steps;
        const r = radius + Math.sin(theta * edges) * growth * 8 + Math.random() * growth * 6;
        points.push([
            cx + r * Math.cos(theta),
            cy + r * Math.sin(theta)
        ]);
    }

    // Close the loop for smooth transition
    points.push(points[0], points[1]);

    let d = `M ${points[0][0]},${points[0][1]}`;

    for (let i = 1; i < points.length - 2; i++) {
        const [x0, y0] = points[i - 1];
        const [x1, y1] = points[i];
        const [x2, y2] = points[i + 1];
        const [x3, y3] = points[i + 2];

        const cp1x = x1 + (x2 - x0) / 6;
        const cp1y = y1 + (y2 - y0) / 6;
        const cp2x = x2 - (x3 - x1) / 6;
        const cp2y = y2 - (y3 - y1) / 6;

        d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`;
    }

    d += " Z";
    return d;
}

export default function BlobGenerator({ id = "BlobGenerator" }) {

    // If you use context for favorites, get updateFavorites from context.
    const { updateFavorites } = useContext(FavoritesContext) || { updateFavorites: () => { } };

    const [open, setOpen] = useState(false);
    const [bugDescription, setBugDescription] = useState("");
    const [shareOpen, setShareOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("tool");
    const [isFavorite, setIsFavorite] = useState(false);
    const [fill, setFill] = useState("#474bff");
    const [growth, setGrowth] = useState(3);
    const [edges, setEdges] = useState(6);
    const [bgUrl, setBgUrl] = useState("");
    const [useBg, setUseBg] = useState(false);
    const [blobPath, setBlobPath] = useState(generateBlob({ growth: 3, edges: 6 }));
    const svgRef = useRef();

    // Shuffle: randomize growth and edge count
    const shuffle = () => {
        const newGrowth = Math.floor(Math.random() * 6) + 2;
        const newEdges = Math.floor(Math.random() * 7) + 4;
        setGrowth(newGrowth);
        setEdges(newEdges);
        setBlobPath(generateBlob({ growth: newGrowth, edges: newEdges }));
    };

    // Update blob on slider change
    const updateBlob = (g, e) => {
        setBlobPath(generateBlob({ growth: g, edges: e }));
    };

    // Copy SVG code to clipboard
    const copySVG = () => {
        const svgCode = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="400" height="400">
      ${useBg && bgUrl ? `<image href="${bgUrl}" x="0" y="0" width="200" height="200"/>` : ""}
      <path d="${blobPath}" fill="${fill}" />
    </svg>`;
        navigator.clipboard.writeText(svgCode);
        alert("SVG code copied!");
    };

    // Download SVG as file
    const downloadSVG = () => {
        const svgCode = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="400" height="400">
      ${useBg && bgUrl ? `<image href="${bgUrl}" x="0" y="0" width="200" height="200"/>` : ""}
      <path d="${blobPath}" fill="${fill}" />
    </svg>`;
        const blob = new Blob([svgCode], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "blob.svg";
        a.click();
        URL.revokeObjectURL(url);
    };

    // When sliders change
    const handleGrowth = (e) => {
        setGrowth(Number(e.target.value));
        updateBlob(Number(e.target.value), edges);
    };
    const handleEdges = (e) => {
        setEdges(Number(e.target.value));
        updateBlob(growth, Number(e.target.value));
    };

    // Favorite toggle logic
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
            <div className=" bg-[#16283E] ">
                <div className="max-w-4xl mx-auto p-2">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
                        <div className="flex items-center gap-3 mb-2 sm:mb-0">
                            <span className="text-4xl text-indigo-400 mt-9">
                                <GiSlowBlob />
                            </span>
                            <span className="text-2xl font-bold text-white md:text-lg lg:text-2xl sm:text-lg mt-9">
                                SVG&nbsp;Blob&nbsp;Generator
                            </span>
                        </div>
                        <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 md:mt-6 lg:justify-end lg:gap-2">
                            <button
                                onClick={() => setShareOpen(true)}
                                className="flex items-center justify-center md:w-auto px-3 py-2 text-sm rounded-xl border  mb-2 md:mb-0 cursor-pointer bg-[#273D58] text-white"
                            >
                                <FiShare2 className="mr-2" size={18} />
                                Share
                            </button>
                            <button
                                className="flex items-center justify-center gap-2 w-full md:w-auto px-3 py-2 text-sm rounded-xl border  cursor-pointer transition text-white bg-[#273D58]"
                                onClick={() => setOpen(true)}
                            >
                                <FiAlertCircle className="text-white text-base" />
                                Report Bug
                            </button>
                            <button
                                onClick={onFavoriteToggle}
                                className={`px-3 py-2 rounded-xl border text-sm mt-2 md:mt-0 ml-0 cursor-pointer text-white bg-[#273D58]  ${isFavorite
                                    ? ""
                                    : ""
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

                    <div className="flex flex-col md:flex-row  rounded-xl shadow-lg p-6 gap-8 w-full max-w-3xl">
                        {/* Blob Display */}
                        <div className="flex-1 flex flex-col items-center">
                            <div className="bg-gray-100 rounded-lg flex items-center justify-center w-[300px] h-[350px] mb-4">
                                <svg
                                    ref={svgRef}
                                    viewBox="0 0 200 200"
                                    width={320}
                                    height={320}
                                    className="block"
                                >
                                    {useBg && bgUrl && (
                                        <image
                                            href={bgUrl}
                                            x="0"
                                            y="0"
                                            width="200"
                                            height="200"
                                            preserveAspectRatio="xMidYMid slice"
                                        />
                                    )}
                                    <path d={blobPath} fill={fill} />
                                </svg>
                            </div>
                            <div className="flex gap-4 mt-2">
                                <div className="flex flex-wrap gap-4  mt-6">
                                    <button
                                        className="cursor-pointer border  bg-[#273D58] text-white px-6 py-2 md:px-8 md:py-3 rounded-lg shadow transition text-sm md:text-base"
                                        onClick={shuffle}
                                    >
                                        Shuffle
                                    </button>
                                    <div className="relative">
                                        <button
                                            className="cursor-pointer border  bg-[#273D58] text-white px-6 py-2 md:px-8 md:py-3 rounded-lg shadow transition text-sm md:text-base"
                                            onClick={copySVG}
                                        >
                                            Copy SVG Code
                                        </button>
                                    </div>
                                    <button
                                        className="cursor-pointer  border  bg-[#273D58] text-white px-6 py-2 md:px-8 md:py-3 rounded-lg   shadow transition text-sm md:text-base"
                                        onClick={downloadSVG}
                                    >
                                        Download SVG
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Controls */}
                        <div className="flex-1 flex flex-col gap-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block text-white ">Blob Fill Color</label>
                                <input
                                    type="color"
                                    value={fill}
                                    onChange={(e) => setFill(e.target.value)}
                                    className="w-10 h-10 p-0 border-none bg-transparent text-white"
                                />
                                <input
                                    type="text"
                                    value={fill}
                                    onChange={(e) => setFill(e.target.value)}
                                    className="ml-3 border rounded p-1 w-32 text-white"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block text-white">
                                    Growth: {growth}
                                </label>
                                <input
                                    type="range"
                                    min={1}
                                    max={10}
                                    value={growth}
                                    onChange={handleGrowth}
                                    className="w-full accent-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block text-white">
                                    Edge Count: {edges}
                                </label>
                                <input
                                    type="range"
                                    min={3}
                                    max={12}
                                    value={edges}
                                    onChange={handleEdges}
                                    className="w-full accent-blue-500 "
                                />
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-white">
                                <input
                                    type="checkbox"
                                    checked={useBg}
                                    onChange={(e) => setUseBg(e.target.checked)}
                                    id="useBg"
                                />
                                <label htmlFor="useBg" className="text-sm">Use Image Background</label>
                            </div>
                            {useBg && (
                                <div className="flex gap-2 mt-2">
                                    <input
                                        type="text"
                                        placeholder="Background URL"
                                        value={bgUrl}
                                        onChange={(e) => setBgUrl(e.target.value)}
                                        className="border rounded p-1 flex-1 text-white"
                                    />
                                    <button
                                        className="cursor-pointer bg-[#273D58]  px-3 rounded text-white"
                                        onClick={() => setBgUrl(bgUrl)}
                                    >
                                        Set
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Comment />
        </>
    );
}
