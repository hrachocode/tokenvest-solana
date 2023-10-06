import Image from "next/image";
import tokenvest from "../../../public/images/tokenvest.png";

export const Footer = () => {
  return (
    <footer className='flex flex-col items-center mt-[200px]'>
      <Image alt='tokenvest' src={tokenvest} />
      <p className='text-[12px] text-textSecondary font-[400] p-[20px_0_27px_0] '>
        Copyright © 2023 Tokenvest. All Rights Reserved
      </p>
    </footer>
  );
};
