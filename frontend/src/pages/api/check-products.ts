import { CMS_API, CMS_NOTIFICATIONS, CMS_PRODUCTS, POPULATE_ALL } from "@/constants/cms";
import { ICMSProduct, IProduct, IProductDate } from "@/interfaces/cmsinterace";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler({ body: { } = {} }: NextApiRequest, res: NextApiResponse) {
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
      category: item.attributes.category.data.attributes.title,
      isExpired: item.attributes.isExpired,
      isDraft: item.attributes.isDraft,
      isReady: item.attributes.isReady,
    };
  }) || [];

  const activeProducts: IProduct[] = products.filter((item: IProduct) =>
    item.isComplete === false && item.isExpired === false) || [];

  const dates: IProductDate[] = activeProducts.map((item: IProduct) => {
    const startDate = new Date(Date.parse(item.createdAt));
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + Number(item.days)
    ).getTime();
    return {
      id: item.id,
      ownerAddress: item.ownerAddress,
      endDate
    };
  });

  dates.forEach(async (item: IProductDate) => {
    if (item.endDate <= Date.now()) {
      const putRes = await handleRequest(`${CMS_API}${CMS_PRODUCTS}/${item.id}`, METHODS.PUT, {
        "data": {
          "isExpired": true,
        }
      });
      if (putRes.data) {
        await handleRequest(`${CMS_API}${CMS_NOTIFICATIONS}`, METHODS.POST, {
          "data": {
            "message": `Time has expired for product N: ${item.id.toString()}`,
            "address": item.ownerAddress,
            "isOpened": false,
            "productId": item.id.toString()
          }
        });
      };
    };
  });

  res.json("Check finished");
};
