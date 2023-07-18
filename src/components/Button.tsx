import { MouseEventHandler } from "react";

import { Dispatch } from "redux";

type Props = {
  text: string;
  handleAction: MouseEventHandler<HTMLButtonElement> &
    ((arg1: string, arg2?: string) => Dispatch<any> | void);
  type: string;
};

const Button = ({ text, handleAction, type }: Props) => {
  return (
    <button onClick={handleAction} className={type}>
      {text}
    </button>
  );
};

export default Button;
