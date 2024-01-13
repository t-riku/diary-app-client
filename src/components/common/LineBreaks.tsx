import React from "react";

interface LineBreaksProps {
  text: string;
}

const LineBreaks: React.FC<LineBreaksProps> = ({ text }) => {
  // テキストを改行して表示する関数
  const formatText = () => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return <div className="whitespace-pre-line">{formatText()}</div>;
};

export default LineBreaks;
