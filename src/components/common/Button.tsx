// Button.tsx

import React from "react";
import { MdDelete } from "react-icons/md";
import button from "../../styles/Button.module.css";
import { IoIosSend } from "react-icons/io";

interface ButtonProps {
  onClick: any;
  loading: boolean;
  text: string;
  type: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, loading, text, type }) => {
  const btnColor = type;
  const btnGradientColor = "gradient__" + type;
  return (
    <button className={button.button} onClick={onClick} disabled={loading}>
      <span
        className={`${button.decor} ${btnColor} ${
          loading ? "translate-x-0" : "transform -translate-x-full"
        }`}
      ></span>
      <div className={`${button.content} ${btnColor}`}>
        <div className={`${button.icon} ${btnGradientColor}`}>
          {type === "send" ? (
            <MdDelete />
          ) : type === "check" ? (
            <IoIosSend />
          ) : null}
        </div>
        <span
          className={`${button.text} ${loading ? "text-white" : "text-black"}`}
        >
          {loading ? `${text}中` : text}
        </span>
      </div>
    </button>
  );
};

export default Button;
