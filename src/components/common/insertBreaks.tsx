import React from "react";

export const insertBreaks = (text: string) => {
  return text.split("\n").map((line, index) =>
    // 最後の行以外は改行要素を追加
    index === text.split("\n").length - 1 ? (
      line
    ) : (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    )
  );
};
