import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { TvInput } from "@/components/TvInput/TvInput";
import { TvButton } from "@/components/TvButton/TvButton";
import { showNotification } from "@/utils/showNotification";
import { METHODS, handleRequest } from "@/utils/handleRequest";
import { CMS_API, CMS_AUTH, CMS_LOCAL } from "@/constants/cms";
import { FORGOT_PASSWORD, HOME, SIGN_UP } from "@/constants/routes";
import { AUTH_FORGOT_PASSWORD, AUTH_SIGN_IN, AUTH_SIGN_IN_ERROR, AUTH_SIGN_IN_SUCCESS, AUTH_SIGN_UP, AUTH_SUCCESS_VERIFACATION, CREATE_ACCOUNT, LOCAL_STORAGE } from "../../constants/auth";
import { TvInputPassword } from "@/components/TvInputPassword/TvInputPassword";

export default function SignIn() {
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const { from } = router.query;
    if (from) {
      showNotification(AUTH_SUCCESS_VERIFACATION, "success");
    }
  }, [ router.query ]);

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const signInInfo = {
        "identifier": email,
        "password": password,
      };
      const signInResponse = await handleRequest(`${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_AUTH}${CMS_LOCAL}`, METHODS.POST, signInInfo) ?? {};
      if (signInResponse.jwt && signInResponse.user) {
        localStorage.setItem(LOCAL_STORAGE.JWT_TOKEN, signInResponse.jwt);
        showNotification(AUTH_SIGN_IN_SUCCESS);
        setEmail("");
        setPassword("");
        router.push(HOME);
      } else if (signInResponse.error) {
        showNotification(AUTH_SIGN_IN_ERROR, "error");
        return;
      }
    } catch (error) {
      showNotification(AUTH_SIGN_IN_ERROR, "error");
    }
  };

  return (
    <div className="secondaryFlex pt-[60px]">
      <form onSubmit={handleSignIn} className="flex flex-col w-full md:w-[32%] px-4 mx-4 py-[32px] rounded-[24px] bg-backgroundTertiary">
        <p className="text-center text-[28px] sm:text-[32px] md:text-[48px] font-[500]">{AUTH_SIGN_IN}</p>
        <TvInput
          value={email}
          labelName="Username or Email"
          placeholderName="Enter your Username or Email"
          onChange={({ target: { value = "" } = {} }) => setEmail(value)}
        />
        <TvInputPassword value={password} setValue={setPassword} labelName="Password" placeholderName="Enter your Password" />
        <div className="flex justify-between items-center">
          <Link href={FORGOT_PASSWORD} className="hover:text-textPrimary">
            {AUTH_FORGOT_PASSWORD}
          </Link>
          <TvButton animationBorderColor="#09202F" type="submit">{AUTH_SIGN_IN}</TvButton>
        </div>
        <div className="mt-5 text-[14px]">
          <span className="pr-2">{CREATE_ACCOUNT}</span>
          <Link href={SIGN_UP} className="text-textPrimary">
            {AUTH_SIGN_UP}
          </Link>
        </div>
      </form>
    </div >
  );
}
