import dynamic from "next/dynamic";

const CreateProductPage = dynamic(() => import("../noSsrPages/CreateProduct/CreateProduct"), {
  ssr: false
});

const CreateProduct = () => {
  return <CreateProductPage />;
};

export default CreateProduct;
