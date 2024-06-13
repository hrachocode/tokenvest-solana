import { CMS_API, CMS_USER, CMS_USERS } from "@/constants/cms";

export const handleRequestAuth = async (authToken: any) => {
  try {
    const dataRes = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_USERS}${CMS_USER}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await dataRes.json();
    return res;
  } catch (error) {
    console.log("You are not authorized");
  }
};
