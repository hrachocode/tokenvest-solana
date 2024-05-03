import { CMS_API, CMS_CATEGORIES, POPULATE_ALL } from "@/constants/cms";
import { ICategory } from "@/interfaces/cmsinterace";
import { METHODS, handleRequest } from "@/utils/handleRequest";
import React, { useEffect, useState } from "react";

const TvTabCategory = ({ setCategory }: { setCategory: (category: string) => void }) => {
  const [ activeTab, setActiveTab ] = useState("all");
  const [ categories, setCategories ] = useState<ICategory[]>([]);

  useEffect(() => {
    (async () => {
      const { data: category = [] } = await handleRequest(`${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_CATEGORIES}${POPULATE_ALL}`, METHODS.GET) ?? {};
      if (category) {
        const newCategories = category.map((el: any) => el.attributes.title);
        if (newCategories) {
          setCategories([ "all", ...newCategories ]);
        }
      }
    })();
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setCategory(tab);
  };

  return (
    <div>
      <div className="flex space-x-4">
        {categories ? categories.map((category: any, i: number) => (
          <button
            key={i}
            className={`px-4 py-2 rounded capitalize ${activeTab === category ? "bg-[#28dbd1] text-white" : "bg-gray-300 text-gray-700"}`}
            onClick={() => handleTabClick(category)}
          >
            {category}
          </button>
        )) : null
        }
      </div>
    </div>
  );
};

export default TvTabCategory;
