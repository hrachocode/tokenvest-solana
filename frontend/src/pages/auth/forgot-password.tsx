import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { TvInput } from "@/components/TvInput/TvInput";
import { TvButton } from "@/components/TvButton/TvButton";
import { showNotification } from "@/utils/showNotification";
import { METHODS, handleRequest } from "@/utils/handleRequest";
import { CMS_API, CMS_AUTH, CMS_FORGOT_PASSWORD } from "@/constants/cms";
import { HOME } from "@/constants/routes";
import { AUTH_EMAIL_MESSAGE, AUTH_FORGOT_PASSWORD, AUTH_FORGOT_PASSWORD_ERROR, AUTH_RESET_EMAIL } from "../../constants/auth";

export default function ForgotPassword() {
  const [ email, setEmail ] = useState<string>("");
  const router = useRouter();

  const handleForgotPassword = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const result = await handleRequest(`${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_AUTH}${CMS_FORGOT_PASSWORD}`, METHODS.POST, { email }) ?? {};
      if (result.ok) {
        showNotification(AUTH_EMAIL_MESSAGE);
        setEmail("");
        router.push(HOME);
      } else {
        showNotification(AUTH_FORGOT_PASSWORD_ERROR, "error");
      }
    } catch (error) {
      showNotification(AUTH_FORGOT_PASSWORD_ERROR, "error");
    }
  };

  return (
    <div className="secondaryFlex pt-[60px]">
      <form onSubmit={handleForgotPassword} className="flex flex-col w-full md:w-[32%] px-4 mx-4 py-[32px] rounded-[24px] bg-backgroundTertiary">
        <p className="text-center text-[28px] sm:text-[32px] md:text-[48px] font-[500]">{AUTH_FORGOT_PASSWORD}</p>
        <TvInput
          value={email}
          labelName="Email"
          placeholderName="Enter your Email"
          onChange={({ target: { value = "" } = {} }) => setEmail(value)}
        />
        <div className="flex justify-center">
          <TvButton animationBorderColor="#09202F" type="submit">{AUTH_RESET_EMAIL}</TvButton>
        </div>
      </form>
    </div>
  );
}
