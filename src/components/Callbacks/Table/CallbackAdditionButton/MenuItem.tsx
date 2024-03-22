import React from "react";

export type onClickFn = (e: React.MouseEvent<HTMLDivElement>) => void;

export type MenuItemProps = {
  text: string;
  onClickFn: onClickFn;
};

const MenuItem = ({ text, onClickFn }: MenuItemProps) => {
  return (
    <div className={"menu-item"} onClick={onClickFn}>
      {text}
    </div>
  );
};

export default MenuItem;
