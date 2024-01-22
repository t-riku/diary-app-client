import Image, { StaticImageData } from "next/image";
import { insertBreaks } from "./insertBreaks";

interface Props {
  stepNumber?: number;
  exampleNumber?: number;
  text?: string;
  imageUrl?: StaticImageData;
  type?: "Summary" | "Supplemental";
  height?: number;
}

const Description: React.FC<Props> = ({
  stepNumber,
  exampleNumber,
  text,
  imageUrl,
  type,
  height = 25,
}) => {
  return (
    <div className="py-4">
      {type === "Summary" && (
        <h1 className="relative inline-block pr-3 pl-7 py-2 bg-gray-700 text-white rounded-l-[100vh] text-sm mb-2">
          <span className="absolute top-1/2  left-[10px] transform -translate-y-1/2 w-[8px] h-[8px] bg-white rounded-full"></span>
          概要
        </h1>
      )}
      {type === "Supplemental" && (
        <h1 className="relative inline-block pr-3 pl-7 py-2 bg-yellow-700 text-white rounded-l-[100vh] text-sm mb-2">
          <span className="absolute top-1/2 left-[10px] transform -translate-y-1/2 w-[8px] h-[8px] bg-white rounded-full"></span>
          補足
        </h1>
      )}
      {stepNumber && (
        <p className="relative inline-block pr-2 pl-5 py-1 bg-red-500 text-white rounded-l-[100vh] text-xs mb-1">
          <span className="absolute top-1/2 left-[10px] transform -translate-y-1/2 w-[4px] h-[4px] bg-white rounded-full"></span>
          {`Step.${stepNumber}`}
        </p>
      )}
      {exampleNumber && (
        <p className="relative inline-block pr-2 pl-5 py-1 bg-blue-500 text-white rounded-l-[100vh] text-xs mb-1">
          <span className="absolute top-1/2 left-[10px] transform -translate-y-1/2 w-[4px] h-[4px] bg-white rounded-full"></span>
          {`例.${exampleNumber}`}
        </p>
      )}
      {text && <p className="mb-1">{insertBreaks(text)}</p>}
      {imageUrl && (
        <div
          className={`relative w-full max-h-[${height}rem] h-[${height}rem] mt-3`}
        >
          <Image
            className="object-cover w-full h-full rounded-md"
            src={imageUrl}
            fill
            priority={true}
            alt="friend image"
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </div>
      )}
    </div>
  );
};

export default Description;
