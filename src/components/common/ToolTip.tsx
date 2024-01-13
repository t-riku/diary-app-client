import React from "react";

interface ToolTipProps {
  text: string;
}

const ToolTip: React.FC<ToolTipProps> = ({ text }) => {
  return (
    <div className="bg-zinc-800 p-2 rounded-md group-hover:flex hidden absolute -top-2 -translate-y-full left-1/2 -translate-x-1/2">
      <span className="text-zinc-400 whitespace-nowrap text-xs">{text}</span>
      <div className="bg-inherit rotate-45 p-1 absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2"></div>
    </div>
  );
};

export default ToolTip;
