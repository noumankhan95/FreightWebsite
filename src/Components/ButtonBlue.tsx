import React from "react";
import CustomLoader from "./CustomLoader";

function ButtonBlue(props: {
  text: string;
  onclick: () => void;
  customStyle?: string;
  isloading?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      className={`text-blue-400 hover:text-blue-700 text-black font-bold py-2 px-4 rounded-md ${props.customStyle}`}
      onClick={props.onclick}
      disabled={props.disabled}
    >
      {!props.isloading ? (
        props.text
      ) : (
        <CustomLoader customStyle="w-8 !h-12" height={18} />
      )}
    </button>
  );
}

export default ButtonBlue;
