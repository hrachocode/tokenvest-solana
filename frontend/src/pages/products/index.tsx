import DiscoverInnovative from "@/components/DiscoverInnovative/DiscoverInnovative";
import ReadyGetStarted from "@/components/ReadyGetStarted/ReadyGetStarted";
import { TvButton } from "@/components/TvButton/TvButton";
import { TvProduct } from "@/components/TvProduct/TvProduct";
import { CMS_API, CMS_PRODUCTS, POPULATE_ALL } from "@/constants/cms";
import { PRODUCTS } from "@/constants/routes";
import { ICMSProduct, IProduct } from "@/interfaces/cmsinterace";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import Link from "next/link";

export async function getStaticProps() {
  const { data: product = [] } = await handleRequest(`${CMS_API}${CMS_PRODUCTS}${POPULATE_ALL}`, METHODS.GET) ?? {};

  const products: IProduct[] = product.map((item: ICMSProduct) => {
    return {
      id: item.id,
      title: item.attributes.title,
      raiseGoal: item.attributes.raiseGoal,
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

  return {
    props: {
      products
    }
  };
}

const Products = ({ products }: { products: IProduct[] }) => {
  return (
    <div>
      <DiscoverInnovative />
      <div className="flex flex-wrap justify-center gap-[32px] mt-[417px] mx-[122px]">
        {
          products.length !== 0 && products.map((item) =>
            <Link href={`${PRODUCTS}/${item.id}`} key={item.id}>
              <TvProduct product={item} />
            </Link>
          )
        }
      </div>
      <div className="flex justify-center mt-[64px]">
        <TvButton customVariant="secondaryButton">Load More</TvButton>
      </div>
      <ReadyGetStarted title="Have Any Project?" />
    </div>
  );
};

export default Products;
