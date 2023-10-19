import { IProduct } from "@/interfaces/cmsinterace";
import TvProductInfo from "../TvProductInfo/TvProductInfo";
import TvProductImage from "../TvProductImage/TvProductImage";

interface ITvProduct {
  product: IProduct;
  wide?: boolean;
}

export const TvProduct = ({
  product,
}: ITvProduct): JSX.Element => {
  const { image, title } = product;

  return (
    <div className="bg-backgroundTertiary rounded-[10px] m-[32px]">
      <TvProductImage image={image} title={title} />
      <TvProductInfo product={product} />
    </div>
  );
};
