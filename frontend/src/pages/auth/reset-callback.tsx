import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { TvInput } from "@/components/TvInput/TvInput";
import { TvButton } from "@/components/TvButton/TvButton";
import { showNotification } from "@/utils/showNotification";
import { METHODS, handleRequest } from "@/utils/handleRequest";
import { CMS_API, CMS_AUTH, CMS_RESET_PASSWORD } from "@/constants/cms";
import { SIGN_IN } from "@/constants/routes";
import { AUTH_PASSWORDS_NO_MATCH, AUTH_RESET_ERROR, AUTH_RESET_PASSWORD, AUTH_RESET_SUCCESS } from "../../constants/auth";

export default function ResetCallback() {
  const [ newPassword, setNewPassword ] = useState<string>("");
  const [ confirmPassword, setConfirmPassword ] = useState<string>("");
  const [ isShowNewPassword, setIsShowNewPassword ] = useState<boolean>(false);
  const [ isShowConfirmPassword, setIsShowConfirmPassword ] = useState<boolean>(false);
  const router = useRouter();
  const { code } = router.query;

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
        <div className="relative">
          <TvInput
            value={newPassword}
            labelName="New Password"
            placeholderName="Enter your New Password"
            type={isShowNewPassword ? "text" : "password"}
            onChange={({ target: { value = "" } = {} }) => setNewPassword(value)}
          />
          <div
            className="absolute right-[10px] top-[46px] cursor-pointer "
            onClick={() => setIsShowNewPassword(!isShowNewPassword)}
          >
            <FontAwesomeIcon icon={isShowNewPassword ? faEyeSlash : faEye} />
          </div>
        </div>
        <div className="relative">
          <TvInput
            value={confirmPassword}
            labelName="Confirm New Password"
            placeholderName="Confirm Password"
            type={isShowConfirmPassword ? "text" : "password"}
            onChange={({ target: { value = "" } = {} }) => setConfirmPassword(value)}
          />
          <div
            className="absolute right-[10px] top-[46px] cursor-pointer "
            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
          >
            <FontAwesomeIcon icon={isShowConfirmPassword ? faEyeSlash : faEye} />
          </div>
        </div>
        <div className="flex justify-center">
          <TvButton animationBorderColor="#09202F" type="submit">{AUTH_RESET_PASSWORD}</TvButton>
        </div>
      </form>
    </div>
  );
}
