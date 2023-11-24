import DiscoverInnovative from "@/components/DiscoverInnovative/DiscoverInnovative";
import ReadyGetStarted from "@/components/ReadyGetStarted/ReadyGetStarted";
import { TvButton } from "@/components/TvButton/TvButton";
import { TvProduct } from "@/components/TvProduct/TvProduct";
import { CMS_API, CMS_PRODUCTS, POPULATE_ALL } from "@/constants/cms";
import { PRODUCTS } from "@/constants/routes";
import { ICMSProduct, IProduct } from "@/interfaces/cmsinterace";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import Link from "next/link";
import RoundedShadow from "@/components/RoundedShadow/RoundedShadow";
import ParticlesCanvas from "@/components/ParticlesCanvas/ParticlesCanvas";
export async function getStaticProps() {
  const { data: product = [] } = await handleRequest(`${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_PRODUCTS}${POPULATE_ALL}`, METHODS.GET) ?? {};

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
    <div className="relative">
      <DiscoverInnovative />
      <div className="primaryFlex flex-wrap gap-[32px] mt-[80px] lg:mt-[250px] z-50">
        {
          products.length !== 0 && products.map((item) =>
            <Link href={`${PRODUCTS}/${item.id}`} key={item.id} className="z-10">
              <TvProduct product={item} />
            </Link>
          )
        }
      </div>
      <div className="primaryFlex relative mt-[64px]">
        <TvButton
          customVariant="secondaryButton"
          animationCustomVariant="animationSecondaryButton"
          animationBorderColor="#09202F">
          Load More
        </TvButton>
        <RoundedShadow customVariant="tertiaryRoundedShadow" />
      </div>
      <ReadyGetStarted title="Have Any Project?" background="readyGetStartedSecondary" />
      <ParticlesCanvas width="20%" height="20%" left="0" top="0" id="particlesProducts" />
    </div >
  );
};

export default Products;
