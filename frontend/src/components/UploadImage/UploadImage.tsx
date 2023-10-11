import Image from "next/image";
import uploadIcon from "../../../public/images/upload.svg";
import { handleFileChange } from "../CreateProduct/utils";

const UploadImage = ({ setFiles }: { setFiles: Function }) => {
  return (
    <div>
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-[143px] bg-[#26545B] border-[1px] border-[#28DBD1] border-dashed rounded-[10px] cursor-pointer hover:bg-backgroundTertiary">
        <div className="flex flex-col items-center justify-center mt-[28px]">
          <Image alt="upload" src={uploadIcon} className="mb-[15px]" />
          <p className="mb-2 text-[16px] font-[600]">Upload image</p>
          <p className="mb-2 text-[14px] font-[400] font-fontSecondary">
                        Drop files directly here or
            <span className="text-[14px] font-[400] text-textPrimary underline"> browse </span>
                        from your device
          </p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={(e) => handleFileChange(e, setFiles)} />
      </label>
    </div>
  );
};

export default UploadImage;
