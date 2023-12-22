import React from "react";
import Image from "next/image";
import mongodbLogo from "public/assets/logo/mongodb.svg";
import expressLogo from "public/assets/logo/express.webp";
import nextjsLogo from "public/assets/logo/nextjs.webp";
import nodejsLogo from "public/assets/logo/nodejs.png";
import { formattedDiarySeveralWays } from "../context/options";

const FormLeftContent = () => {
  return (
    <>
      <div className="flex items-center gap-6 text-xs font-bold">
        <div className="relative aspect-square h-28 hover:animate-spin">
          <Image
            className="object-cover w-8 h-8 rounded-full"
            src={mongodbLogo}
            fill
            priority={true}
            alt="friend image"
            sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
          />
        </div>
        <div className="relative aspect-square h-28 hover:animate-spin">
          <Image
            className="object-cover w-8 h-8 rounded-full"
            src={expressLogo}
            fill
            priority={true}
            alt="friend image"
            sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
          />
        </div>
        <div className="relative aspect-square h-28 hover:animate-spin">
          <Image
            className="object-cover w-8 h-8 rounded-full"
            src={nextjsLogo}
            fill
            priority={true}
            alt="friend image"
            sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
          />
        </div>
        <div className="relative aspect-square h-28 hover:animate-spin">
          <Image
            className="object-cover w-8 h-8 rounded-full"
            src={nodejsLogo}
            fill
            priority={true}
            alt="friend image"
            sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
          />
        </div>
      </div>
      <h3 className="text-xs font-bold text-gray-600 mb-[10px] flex items-start  gap-7 my-8">
        <div>
          <span className="text-5xl text-[#13AA53] p-1">M</span>
          (MongoDB)
        </div>
        <div>
          <span className="text-5xl text-[#323232] p-1">E</span>
          (Express)
        </div>
        <div>
          <span className="text-5xl text-[#fefefe] text-stroke-black text-stroke-2 p-1">
            R
          </span>
          (Next.js)
        </div>
        <div>
          <span className="text-5xl text-[#6DC34B] p-1">N</span>
          (Node.js)
        </div>
      </h3>
      <span className="text-[28px] font-bold font-mono mt-10 text-gray-700 animate-pulse">
        {formattedDiarySeveralWays}通りの設定項目がある中で
        <br />
        自由に自分好みの日記を作ってみよう!
      </span>
    </>
  );
};

export default FormLeftContent;
