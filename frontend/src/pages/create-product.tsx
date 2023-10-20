import { CMS_CATEGORIES, POPULATE_ALL } from "@/constants/cms";
import { ICategory, ICMSCategory } from "@/interfaces/cmsinterace";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import CreateProductPage from "../components/CreateProduct/CreateProduct";

export async function getStaticProps() {
  const { data: category = [] } = await handleRequest(`${process.env.NEXT_PUBLIC_CMS_API}${CMS_CATEGORIES}${POPULATE_ALL}`, METHODS.GET) ?? {};

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
