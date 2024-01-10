import React from "react";
import Image from "next/image";
import nextjsLogo from "public/assets/logo/nextjs.webp";
import nodejsLogo from "public/assets/logo/nodejs.png";
import supabaseLogo from "public/assets/logo/supabase.jpeg";
import prismaLogo from "public/assets/logo/prisma.webp";
import { formattedDiarySeveralWays } from "../context/options";

const FormLeftContent = () => {
  return (
    <>
      <div className="flex items-center gap-6 text-xs font-bold">
        <div className="relative aspect-square h-28 hover:animate-spin">
          <Image
            className="object-cover w-8 h-8 rounded-full"
            src={supabaseLogo}
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
            src={prismaLogo}
            fill
            priority={true}
            alt="friend image"
            sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
          />
        </div>
      </div>
      <span className="text-[28px] font-bold font-mono mt-10 text-gray-700 animate-pulse">
        {formattedDiarySeveralWays}通りの設定項目がある中で
        <br />
        自由に自分好みの日記を作ってみよう!
      </span>
    </>
  );
};

export default FormLeftContent;
