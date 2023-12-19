import React, { InputHTMLAttributes } from "react";
import { RefCallBack } from "react-hook-form";

export type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: InputHTMLAttributes<HTMLInputElement>["id"];
  refCallback: RefCallBack;
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const ImageInput: React.FC<Props> = ({
  onChange,
  id,
  fileInputRef,
  refCallback,
  ...rest
}) => {
  return (
    <input
      ref={(e) => {
        refCallback(e);
        fileInputRef.current = e;
      }}
      id={id}
      type="file"
      accept="image/*"
      onChange={onChange}
      hidden
      {...rest}
    />
  );
};
