import React, { useState } from "react";

const initialComments = [
  // ... your initial comments here ...
];

function getInitial(name) {
  return name ? name.charAt(0).toUpperCase() : "";
}

function ReportModal({ open, onClose, onSubmit }) {
  const [reason, setReason] = useState("");
  const [explanation, setExplanation] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    onSubmit(reason, explanation);
    setReason("");
    setExplanation("");
  };

  return (
    <div className="fixed inset-0 bg-black/30  flex items-center justify-center z-50">
      <div className="bg-[#16283E] border border-white rounded-lg p-6 w-96 shadow-lg">
        <h3 className="text-2xl font-bold text-white md:text-sm lg:text-2xl mb-3 sm:text-lg">Report Comment</h3>
        <select
          className="w-full mb-3 bg-[#273D58] border border-white rounded-2xl outline-none p-2"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        >
          <option value="">Reason</option>
          <option value="spam">Spam</option>
          <option value="abuse">Abusive</option>
          <option value="other">Other</option>
        </select>
        <textarea
          className="w-full border border-gray-500 rounded-2xl  p-2 mb-4"
          rows={3}
          placeholder="Explanation (Optional)"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded  text-white  bg-[#273D58]  border border-white text-white cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded text-white bg-[#273D58]  border border-white text-white cursor-pointer "
            onClick={handleSubmit}
            disabled={!reason}
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CommentsSection() {
  const [comments, setComments] = useState(initialComments);
  const [input, setInput] = useState("");
  const [reportIndex, setReportIndex] = useState(null);

  const handlePost = () => {
    if (input.trim() === "") return;
    setComments([
      ...comments,
      {
        avatar: "",
        name: "H",
        time: "just now",
        comment: input,
        color: "bg-green-700 text-white",
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handlePost();
  };

  const handleReport = (index) => {
    setReportIndex(index);
  };

  const handleCloseReport = () => {
    setReportIndex(null);
  };

  const handleSubmitReport = (reason, explanation) => {
    // Here you can handle the report (e.g., send to server)
    alert("Reported: " + reason + (explanation ? " - " + explanation : ""));
    setReportIndex(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 border border-gray-500 rounded-lg shadow p-8 bg-[#16283E]">
      <h2 className="text-3xl font-semibold text-white mb-3 ">Comments</h2>
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-white text-2xl font-bold">
          H
        </div>
        <input
          className="flex-1  rounded-lg px-4 py-3 bg-[#273D58] outline-none"
          placeholder="Comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="space-y-8">
        {comments.map((c, i) => (
          <div key={i} className="flex items-start gap-4">
            {c.avatar ? (
              <img
                src={c.avatar}
                alt={c.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : c.icon ? (
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                {c.icon}
              </div>
            ) : (
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${
                  c.color || "bg-gray-300 text-white"
                }`}
              >
                {getInitial(c.name)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">{c.name}</span>
                <span className="text-gray-400 text-xs">{c.time}</span>
                <span
                  className="text-gray-400 text-xs cursor-pointer hover:underline"
                  onClick={() => handleReport(i)}
                >
                  Report
                </span>
              </div>
              <div className="text-white text-sm">{c.comment}</div>
            </div>
          </div>
        ))}
      </div>
      <ReportModal
        open={reportIndex !== null}
        onClose={handleCloseReport}
        onSubmit={handleSubmitReport}
      />
    </div>
  );
}
