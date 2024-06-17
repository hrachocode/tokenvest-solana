import { Dispatch, SetStateAction, useState } from "react";
import { Spinner } from "../TvSpiner/TvSpinner";
import { AUTH_LOG_OUT, AUTH_SIGN_IN, LOCAL_STORAGE } from "@/constants/auth";
import { useRouter } from "next/router";
import { HOME, SIGN_IN } from "@/constants/routes";
import { useIsRegistered } from "@/hooks/useIsRegistered";

interface IsAuthenticatedProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AuthenticationButton = ({ isOpen, setIsOpen }: IsAuthenticatedProps) => {
  const [ isShowAuthorizationUser, setIsShowAuthorizationUser ] = useState<boolean>(false);
  const { isLoading } = useIsRegistered(setIsShowAuthorizationUser);
  const router = useRouter();

  const handleLogOut = () => {
    localStorage.removeItem(LOCAL_STORAGE.JWT_TOKEN);
    setIsShowAuthorizationUser(false);
    router.push(HOME);
    setIsOpen(!isOpen);
  };

  const handleSignIn = () => {
    router.push(SIGN_IN);
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="hover:underline decoration-2 decoration-[#79FDFF] cursor-pointer underline-offset-[16px] text-[16px] md:text-[20px] p-2 md:p-4 hover:text-textPrimary"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        isShowAuthorizationUser
          ? <button onClick={handleLogOut}>{AUTH_LOG_OUT}</button>
          : <button onClick={handleSignIn}>{AUTH_SIGN_IN}</button>
      )}
    </div>
  );
};

export default AuthenticationButton;
