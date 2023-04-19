import { TvProduct } from "@/components/TvProduct/TvProduct";
import { CMS_API, CMS_PRODUCTS, POPULATE_ALL } from "@/constants/cms";
import { ICMSProduct, IProduct } from "@/interfaces/cmsinterace";
import { Box } from "@mui/material";
import { Fragment } from "react";

export async function getStaticProps() {
  const res = await fetch(`${CMS_API}${CMS_PRODUCTS}${POPULATE_ALL}`);
  const data = await res.json();

  const products: IProduct[] = data?.data?.map((item: ICMSProduct) => {
    return {
      id: item.id,
      title: item.attributes.title,
      raiseGoal: item.attributes.raiseGoal,
      sharePercentage: item.attributes.sharePercentage,
      address: item.attributes.address,
      ownerAddress: item.attributes.ownerAddress,
      ownerName: item.attributes.ownerName,
      raisedAmount: item.attributes.raisedAmount,
      image: item.attributes.image?.data?.attributes?.url || null
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
    <Box>
      {products.length !== 0 ? products.map((item, index) =>
        <Fragment key={index + 1}>
          <TvProduct product={item} />
        </Fragment>
      ) : <></>}
    </Box>
  );
};

export default Products;
