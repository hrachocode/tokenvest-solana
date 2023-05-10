import { CMS_API, CMS_CATEGORIES, POPULATE_ALL } from "@/constants/cms";
import { ICategory, ICMSCategory } from "@/interfaces/cmsinterace";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import dynamic from "next/dynamic";

const CreateProductPage = dynamic(() => import("../noSsrPages/CreateProduct/CreateProduct"), {
  ssr: false
});

export async function getStaticProps() {
  const { data: category = [] } = await handleRequest(`${CMS_API}${CMS_CATEGORIES}${POPULATE_ALL}`, METHODS.GET) ?? {};

  const categories: ICategory[] = category.map((item: ICMSCategory) => {
    return {
      id: item.id,
      title: item.attributes.title,
      image: item.attributes.image?.data?.attributes?.url || null,
    };
  }) || [];

  return {
    props: {
      categories
    }
  };
}

const CreateProduct = ({ categories }: { categories: ICategory[] }) => {
  return <CreateProductPage categories={categories} />;
};

export default CreateProduct;
