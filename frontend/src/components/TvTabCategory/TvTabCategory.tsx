import React, { useState } from "react";

const TvTabCategory = ({ setCategory }: { setCategory: (category: string) => void }) => {
  const [ activeTab, setActiveTab ] = useState("all");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setCategory(tab);
  };

  return (
    <div>
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === "all" ? "bg-[#28dbd1] text-white" : "bg-gray-300 text-gray-700"}`}
          onClick={() => handleTabClick("all")}
        >
                    All
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "board game" ? "bg-[#28dbd1] text-white" : "bg-gray-300 text-gray-700"}`}
          onClick={() => handleTabClick("board game")}
        >
                    Board game
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "medical" ? "bg-[#28dbd1] text-white" : "bg-gray-300 text-gray-700"}`}
          onClick={() => handleTabClick("medical")}
        >
                    Medical
        </button>
      </div>
    </div>
  );
};

export default TvTabCategory;
