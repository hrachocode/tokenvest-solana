import { TvFeaturedProduct } from "@/components/TvFeaturedProduct/TvFeaturedProduct";
import { CMS_API, CMS_PRODUCTS, POPULATE_ALL } from "@/constants/cms";
import { ICMSProduct, IProduct } from "@/interfaces/cmsinterace";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { Box } from "@mui/material";

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
      isComplete: item.attributes.isComplete
    };
  }) || [];

  return {
    props: {
      products,
      featuredProduct: products?.[0] || {}
    }
  };
}

interface IHomeProps {
  products: IProduct[],
  featuredProduct: IProduct;
}

export default function Home({ products, featuredProduct }: IHomeProps) {
  return (
    <Box>
      <TvFeaturedProduct product={featuredProduct} />
    </Box>
  );
}
