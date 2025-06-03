import { useContext, useRef, useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Comment from "../Text tools/Comment";
// Register align format for Quill
Quill.register('formats/align', Quill.import('formats/align'), true);

// ... your frame and icon imports here ...
import frame1 from "../../image/frame1.png";
import frame2 from "../../image/frame2.png";
import frame3 from "../../image/frame3.png";
import frame4 from "../../image/frame4.png";
import frame5 from "../../image/frame5.png";
import frame6 from "../../image/frame6.png";
import frame7 from "../../image/frame7.png";
import frame8 from "../../image/frame8.png";
import frame9 from "../../image/frame9.png";
import frame10 from "../../image/frame10.png";
import frame11 from "../../image/frame11.png";
import frame12 from "../../image/frame12.png";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { FiShare2 } from "react-icons/fi";
import { FiAlertCircle } from 'react-icons/fi';
import {
  FaCheck,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaCopy,
  FaRegStar,
} from "react-icons/fa6";
import { MdShare } from "react-icons/md";
import { FavoritesContext } from "../../Context/FavoriteContext";

// ... fontOptions and paperFrames as in your code ...

const fontOptions = [
  { label: "Satisfy", value: "Satisfy" },
  { label: "Homemade Apple", value: "Homemade Apple" },
  { label: "Mansalva", value: "Mansalva" },
  { label: "Mali", value: "Mali" },
  { label: "Amatic SC", value: "Amatic SC" },
  { label: "Dancing Script", value: "Dancing Script" },
  { label: "Pacifico", value: "Pacifico" },
  { label: "Indie Flower", value: "Indie Flower" },
  { label: "Shadows Into Light", value: "Shadows Into Light" },
  { label: "Gloria Hallelujah", value: "Gloria Hallelujah" },
  { label: "Patrick Hand", value: "Patrick Hand" },
  { label: "Caveat", value: "Caveat" },
  { label: "Covered By Your Grace", value: "Covered By Your Grace" },
  { label: "Reenie Beanie", value: "Reenie Beanie" },
  { label: "Handlee", value: "Handlee" },
  { label: "Rock Salt", value: "Rock Salt" },
  { label: "Just Another Hand", value: "Just Another Hand" },
  { label: "Kalam", value: "Kalam" },
  { label: "Permanent Marker", value: "Permanent Marker" },
  { label: "Amarante", value: "Amarante" },
];

const paperFrames = [
  { label: "frame 1", value: "frame1", image: frame1 },
  { label: "frame 2", value: "frame2", image: frame2 },
  { label: "frame 3", value: "frame3", image: frame3 },
  { label: "frame 4", value: "frame4", image: frame4 },
  { label: "frame 5", value: "frame5", image: frame5 },
  { label: "frame 6", value: "frame6", image: frame6 },
  { label: "frame 7", value: "frame7", image: frame7 },
  { label: "frame 8", value: "frame8", image: frame8 },
  { label: "frame 9", value: "frame9", image: frame9 },
  { label: "frame 10", value: "frame10", image: frame10 },
  { label: "frame 11", value: "frame11", image: frame11 },
  { label: "frame 12", value: "frame12", image: frame12 },
];

const quillModules = {
  toolbar: [
    [
      { 'align': '' },
      { 'align': 'center' },
      { 'align': 'right' },
      { 'align': 'justify' }
    ],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['clean']
  ]
};

export default function HandwritingConverter({ id = "Text to Handwriting" }) {
  const { updateFavorites } = useContext(FavoritesContext);
  const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isFavorite, setIsFavorite] = useState(false);
  const [tabchange, setTabchange] = useState('textarea');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [editorValue, setEditorValue] = useState('');
  const [font, setFont] = useState('Satisfy');
  const [fontSize, setFontSize] = useState('18px');
  const [inkColor, setInkColor] = useState('#8B0000');
  const [frame, setFrame] = useState('frame2');
  const [imageLoaded, setImageLoaded] = useState(false);
  const previewRef = useRef(null);
  const selectedFrame = paperFrames.find(f => f.value === frame) || paperFrames[1];

  // const cardRef = useRef(null);
  const handleFontSizeChange = (e) => {
    let value = e.target.value.trim();
    if (/^\d+$/.test(value)) {
      value = `${value}px`;
    }
    if (/^\d+(px|em|rem|%|pt)?$/.test(value)) {
      setFontSize(value);
    }
  };

  const previewText = tabchange === 'textarea'
    ? (textAreaValue ? textAreaValue.replace(/\n/g, '<br/>') : 'Your handwriting text will appear here...')
    : (editorValue || 'Your handwriting text will appear here...');

  // Download as image
  //  const handleDownload = () => {
  //   if (!cardRef.current || !imageLoaded) {
  //     alert('Please wait for the frame image to load before downloading.');
  //     return;
  //   }
  //   const node = cardRef.current;
  //   const width = node.offsetWidth;
  //   const height = node.offsetHeight;

  //   toPng(node, {
  //     cacheBust: true,
  //     width,
  //     height,
  //     backgroundColor: null, 
  //   })
  //     .then((dataUrl) => {
  //       const link = document.createElement('a');
  //       link.download = 'handwriting-card.png';
  //       link.href = dataUrl;
  //       link.click();
  //     })
  //     .catch((err) => {
  //       alert('Could not generate image. Try again.');
  //       console.error(err);
  //     });
  // };

  // Download as PNG
  const handleDownloadImage = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current);
      const link = document.createElement("a");
      link.download = "handwriting-preview.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  // Download as PDF
  const handleDownloadPDF = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("handwriting-preview.pdf");
    }
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
      <div className="max-w-4xl mx-auto p-3">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-3 mb-2 sm:mb-0">
            <span className="text-3xl sm:text-4xl text-indigo-400">
              <BsLayoutTextSidebarReverse />
            </span>
            <span className="font-bold text-white text-lg sm:text-xl md:text-2xl lg:text-3xl">
              Text&nbsp;to&nbsp;Handwriting&nbsp;Converter
            </span>
          </div>
          <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 lg:justify-end lg:gap-2">
            <button
              onClick={() => setShareOpen(true)}
              className="flex items-center justify-center md:w-auto px-3 py-2 text-sm rounded-xl border border-white bg-[#273D58]  border border-white text-white mb-2 md:mb-0 cursor-pointer"
            >
              <FiShare2 className="mr-2" size={18} />
              Share
            </button>
            <button
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

        <div className="flex bg-[#f3f4fa] rounded-lg p-1 w-fit mx-auto mb-2">
          <button
            className={`flex items-center gap-2 px-6 py-2 rounded-md transition font-medium text-base
            ${tabchange === 'textarea'
                ? 'cursor-pointer bg-[#273D58]  border border-white text-white shadow'
                : 'text-[#7a7a9d]'
              }`}
            onClick={() => setTabchange('textarea')}
            style={{ border: 'none', outline: 'none', cursor: 'pointer' }}
          >
            <span role="img" aria-label="textarea" style={{ fontSize: 18 }}>📋</span>
            Text Area
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-2 rounded-md transition font-medium text-base ml-2
            ${tabchange === 'editor'
                ? 'cursor-pointer bg-[#273D58] shadow'
                : 'text-[#7a7a9d]'
              }`}
            onClick={() => setTabchange('editor')}
            style={{ border: 'none', outline: 'none', cursor: 'pointer' }}
          >
            <span style={{ fontStyle: 'italic', fontWeight: 700, fontSize: 18 }}>T</span>
            Text Editor
          </button>
        </div>

        {/* Text Input Section */}
        {tabchange === 'textarea' ? (
          <textarea
            className="w-full min-h-[120px] border border-gray-500 rounded px-3 py-2 outline-none"
            placeholder="Enter text here..."
            value={textAreaValue}
            onChange={e => setTextAreaValue(e.target.value)}
          />
        ) : (
          <ReactQuill
            theme="snow"
            value={editorValue}
            onChange={setEditorValue}
            modules={quillModules}
            placeholder="Type here..."
            style={{
              background: "#16283E",
              borderRadius: "8px",
              height: "300px",
              marginBottom: "8px",
            }}
          />
        )}

        {/* Controls: Font, Font Size, Ink Color, Frame */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-20">
          <select
            className="border border-gray-500 bg-[#16283E] rounded px-3 py-2 outline-none"
            value={font}
            onChange={e => setFont(e.target.value)}
          >
            {fontOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <input
            type="text"
            value={fontSize}
            onChange={handleFontSizeChange}
            placeholder="Font Size (e.g. 18px)"
            className="border border-gray-500 bg-[#16283E] rounded px-3 py-2 outline-none"
          />
          <input
            type="color"
            value={inkColor}
            onChange={e => setInkColor(e.target.value)}
            className="border border-gray-500 rounded outline-none"
          />
          <select
            className="border border-gray-500 text-white bg-[#16283E] rounded px-3 py-2 outline-none"
            value={frame}
            onChange={e => setFrame(e.target.value)}
          >
            {paperFrames.map(opt => (
              <option key={opt.value} value={opt.value} className='bottom-full'>{opt.label}</option>
            ))}
          </select>

        </div>
        <div className="flex gap-3 justify-start mt-4">
          <button
            onClick={handleDownloadImage}
            className="cursor-pointer bg-[#273D58]  border border-white text-white  px-8 py-2 rounded-lg shadow-md"
          >
            Download as Image
          </button>
          <button
            onClick={handleDownloadPDF}
            className="cursor-pointer bg-[#273D58]  border border-white text-white  px-8 py-2 rounded-lg shadow-md"
          >
            Download as PDF
          </button>
        </div>
        {/* Card Preview */}
        <div className="mt-8 flex flex-col items-center relative ">
          <div
            ref={previewRef}
            style={{
              backgroundImage: `url(${selectedFrame.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: 490,
              height: 750,
              maxWidth: '100%',
              borderRadius: 14,
              padding: '48px 36px',
              margin: '0 auto',
              position: 'relative',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              overflow: 'hidden',
              backgroundColor: '#fff',
            }}
          >
            {/* <div ref={previewRef} className="relative w-full p-4 bg-white shadow-md rounded-md">
          <div
            className="text-center"
            style={{
              fontFamily: font,
              fontSize: fontSize,
              color: inkColor,
              backgroundImage: `url(${selectedFrame.image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              minHeight: "400px",
              padding: "40px",
              lineHeight: 1.5,
            }}
            dangerouslySetInnerHTML={{ __html: previewText }}
          />
        </div> */}


            {/* Hidden image to detect load */}
            <img
              src={selectedFrame.image}
              alt="frame"
              style={{ display: 'none' }}
              onLoad={() => setImageLoaded(true)}
            />

            <div
              className="ql-editor container mx-auto "
              style={{
                width: 500,
                minHeight: 250,
                fontFamily: font,
                fontSize: fontSize,
                color: inkColor,
                wordBreak: 'break-word',
                padding: 0,
                border: 'none',
                background: 'transparent',
                marginTop: '50px',
                marginLeft: '30px',
              }}
              dangerouslySetInnerHTML={{ __html: previewText }}
            />
          </div>
        </div>
      </div>
      <Comment />
    </>
  );
}
