import { CategoriesBrowser } from "@/components/CategoriesBrowser/CategoriesBrowser";
import { JoinUs } from "@/components/JoinUs/JoinUs";
import { TvFeaturedProduct } from "@/components/TvFeaturedProduct/TvFeaturedProduct";
import { CMS_API, CMS_CATEGORIES, CMS_PRODUCTS, POPULATE_ALL } from "@/constants/cms";
import { ICategory, ICMSCategory, ICMSProduct, IProduct } from "@/interfaces/cmsinterace";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { Box } from "@mui/material";
import { MAX_PRODUCTS_HOME } from "@/constants/general";
import { ProductsList } from "@/components/ProductsList/ProductsList";

export async function getStaticProps() {
  const { data: product = [] } = await handleRequest(`${CMS_API}${CMS_PRODUCTS}${POPULATE_ALL}`, METHODS.GET) ?? {};

  const products: IProduct[] = product.map((item: ICMSProduct) => {
    return {
      id: item.id,
      title: item.attributes.title,
      raiseGoal: item.attributes.raiseGoal,
      sharePercentage: item.attributes.sharePercentage,
      address: item.attributes.address,
      ownerAddress: item.attributes.ownerAddress,
      ownerName: item.attributes.ownerName,
      raisedAmount: item.attributes.raisedAmount,
      createdAt: item.attributes.createdAt,
      image: item.attributes.image?.data?.attributes?.url || null,
      description: item.attributes.description,
      days: item.attributes.days,
      isComplete: item.attributes.isComplete,
      isExpired: item.attributes.isExpired,
      isDraft: item.attributes.isDraft,
      isReady: item.attributes.isReady,
      category: item.attributes.category.data.attributes.title
    };
  }) || [];

  const featuredProducts: IProduct[] = products.filter((item: IProduct) =>
    item.image !== null && 
    item.isComplete === false && 
    item.isExpired === false) || [];

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
      products: featuredProducts.slice(0, MAX_PRODUCTS_HOME),
      featuredProduct: featuredProducts?.[0] || {},
      categories
    }
  };
}

interface IHomeProps {
  products: IProduct[],
  featuredProduct: IProduct;
  categories: ICategory[];
}

export default function Home({ products, featuredProduct, categories }: IHomeProps) {
  return (
    <Box>
      <TvFeaturedProduct product={featuredProduct} />
      <CategoriesBrowser categories={categories} />
      <ProductsList products={products} />
      <JoinUs product={featuredProduct} />
    </Box >
  );
}
