import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { TvButton } from "@/components/TvButton/TvButton";
import { showNotification } from "@/utils/showNotification";
import { METHODS, handleRequest } from "@/utils/handleRequest";
import { CMS_API, CMS_AUTH, CMS_RESET_PASSWORD } from "@/constants/cms";
import { SIGN_IN } from "@/constants/routes";
import { AUTH_PASSWORDS_NO_MATCH, AUTH_RESET_ERROR, AUTH_RESET_PASSWORD, AUTH_RESET_SUCCESS } from "../../constants/auth";
import { TvInputPassword } from "@/components/TvInputPassword/TvInputPassword";
import { GetServerSideProps } from "next";

interface ResetCallbackProps {
  code: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code } = context.query;

  if (!code) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      code: code,
    },
  };
};

export default function ResetCallback({ code }: ResetCallbackProps) {
  const [ newPassword, setNewPassword ] = useState<string>("");
  const [ confirmPassword, setConfirmPassword ] = useState<string>("");
  const router = useRouter();

  const handleResetPassword = async (event: FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      showNotification(AUTH_PASSWORDS_NO_MATCH, "error");
      return;
    }
    try {
      const resetPassword = {
        code,
        password: newPassword,
        passwordConfirmation: confirmPassword,
      };
      const result = await handleRequest(`${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_AUTH}${CMS_RESET_PASSWORD}`, METHODS.POST, resetPassword) ?? {};
      if (result.jwt) {
        showNotification(AUTH_RESET_SUCCESS);
        setNewPassword("");
        setConfirmPassword("");
        router.push(SIGN_IN);
      } else {
        showNotification(AUTH_RESET_ERROR, "error");
      }
    } catch (error) {
      showNotification(AUTH_RESET_ERROR, "error");
    }
  };

  return (
    <div className="secondaryFlex mt-[60px]">
      <form onSubmit={handleResetPassword} className="flex flex-col w-full md:w-[32%] px-4 mx-4 py-[32px] rounded-[24px] bg-backgroundTertiary">
        <p className="text-center text-[28px] sm:text-[32px] md:text-[48px] font-[500]">{AUTH_RESET_PASSWORD}</p>
        <TvInputPassword value={newPassword} setValue={setNewPassword} labelName="New Password" placeholderName="Enter your New Password" />
        <TvInputPassword value={confirmPassword} setValue={setConfirmPassword} labelName="Confirm New Password" placeholderName="Confirm Password" />
        <div className="flex justify-center">
          <TvButton animationBorderColor="#09202F" type="submit">{AUTH_RESET_PASSWORD}</TvButton>
        </div>
      </form>
    </div>
  );
}
