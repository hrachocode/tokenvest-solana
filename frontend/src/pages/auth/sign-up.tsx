import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { TvInput } from "@/components/TvInput/TvInput";
import { TvButton } from "@/components/TvButton/TvButton";
import { showNotification } from "@/utils/showNotification";
import { METHODS, handleRequest } from "@/utils/handleRequest";
import { validatePassword } from "../../utils/validatePassword";
import { validateEmail } from "../../utils/validateEmail";
import { CMS_API, CMS_AUTH, CMS_LOCAL, CMS_REGISTER } from "@/constants/cms";
import { VALIDATION_EMAIL, VALIDATION_PASSWORD } from "@/constants/validation";
import { SIGN_IN } from "@/constants/routes";
import { AUTH_EMAIL_MESSAGE, AUTH_PASSWORDS_NO_MATCH, AUTH_SIGN_UP, AUTH_SIGN_UP_ERROR } from "../../constants/auth";

export default function SignUp() {
  const [ userName, setUserName ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ isShowPassword, setIsShowPassword ] = useState<boolean>(false);
  const [ confirmPassword, setConfirmPassword ] = useState<string>("");
  const [ isShowConfirmPassword, setIsShowConfirmPassword ] = useState<boolean>(false);
  const router = useRouter();

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      showNotification(AUTH_PASSWORDS_NO_MATCH, "error");
      return;
    } else if (!validateEmail(email)) {
      showNotification(VALIDATION_EMAIL, "error");
      return;
    } else if (!validatePassword(password)) {
      showNotification(VALIDATION_PASSWORD, "error");
      return;
    }

    const signUpInfo = {
      "username": userName,
      "email": email,
      "password": password,
    };

    try {
      const signUpResponse = await handleRequest(`${process.env.NEXT_PUBLIC_CMS_URL}${CMS_API}${CMS_AUTH}${CMS_LOCAL}${CMS_REGISTER}`, METHODS.POST, signUpInfo) ?? {};
      if (signUpResponse.error) {
        showNotification(AUTH_SIGN_UP_ERROR, "error");
        return;
      } else if (signUpResponse.user) {
        showNotification(AUTH_EMAIL_MESSAGE);

        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        router.push(SIGN_IN);
      }
    } catch (error) {
      showNotification(AUTH_SIGN_UP_ERROR, "error");
    }
  };

  return (
    <div className="secondaryFlex w-full pt-[60px]">
      <form onSubmit={handleSignUp} className="flex flex-col w-full md:w-[32%] px-4 mx-4 py-[32px] rounded-[24px] bg-backgroundTertiary">
        <p className="text-center text-[28px] sm:text-[32px] md:text-[48px] font-[500]">{AUTH_SIGN_UP}</p>
        <TvInput
          value={userName}
          labelName="Username"
          placeholderName="User Name"
          onChange={({ target: { value = "" } = {} }) => setUserName(value)}
        />
        <TvInput
          value={email}
          labelName="Email"
          placeholderName="Enter your Email"
          onChange={({ target: { value = "" } = {} }) => setEmail(value)}
        />
        <div className="relative">
          <TvInput
            value={password}
            labelName="Password"
            placeholderName="Enter your Password"
            type={isShowPassword ? "text" : "password"}
            onChange={({ target: { value = "" } = {} }) => setPassword(value)}
          />
          <div
            className="absolute right-[10px] top-[46px] cursor-pointer"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            <FontAwesomeIcon icon={isShowPassword ? faEyeSlash : faEye} />
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
        <div className="flex justify-center mt-4">
          <TvButton animationBorderColor="#09202F" type="submit">{AUTH_SIGN_UP}</TvButton>
        </div>
      </form>
    </div>
  );
}
