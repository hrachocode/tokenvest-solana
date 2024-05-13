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
  const { image, image1, title } = product;

  return (
    <div className="bg-backgroundTertiary rounded-[10px] h-full">
      <TvProductImage image={image1 ? image1 : image} title={title} />
      <TvProductInfo product={product} />
    </div>
  );
};
