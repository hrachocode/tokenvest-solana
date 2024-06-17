import { LOCAL_STORAGE } from "@/constants/auth";
import { handleRequestAuth } from "@/utils/handleRequestAuth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useIsRegistered = (
  setIsShowAuthorizationUser: Dispatch<SetStateAction<boolean>>
) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE.JWT_TOKEN);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const res = await handleRequestAuth(authToken);
      if (res.confirmed) {
        setIsShowAuthorizationUser(true);
      } else {
        setIsShowAuthorizationUser(false);
      }
      setIsLoading(false);
    })();
  }, [ authToken, setIsShowAuthorizationUser ]);

  return { isLoading };
};
