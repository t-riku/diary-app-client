import Image, { StaticImageData } from "next/image";

interface StepsProps {
  stepNumber: number;
  stepText: string;
  imageUrl: StaticImageData;
}

const Step: React.FC<StepsProps> = ({ stepNumber, stepText, imageUrl }) => {
  return (
    <>
      <p className="text-gray-700">{`Step.${stepNumber}`}</p>
      <p>{stepText}</p>
      <div className="relative w-4/5 h-80">
        <Image
          className="object-cover w-full"
          src={imageUrl}
          fill
          priority={true}
          alt="friend image"
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      </div>
    </>
  );
};

export default Step;
