import React from "react";

import styles from "./OrderSign.module.css";
import classNames from "classnames";

export type SignVertical = "top" | "middle" | "bottom";
export type SignHorizontal = "right" | "left";

interface IOrderSignProps {
  vertical: SignVertical;
  horizontal: SignHorizontal;
  num: number;
  active?: boolean;
}

export const OrderSign: React.FC<IOrderSignProps> = ({
  vertical = "middle",
  horizontal = "left",
  num,
  active = false,
}) => {
  return (
    <div
      className={classNames(styles.orderSign, {
        [styles["orderSign-bottom"]]: vertical === "bottom",
        [styles["orderSign-top"]]: vertical === "top",
        [styles["orderSign-middle"]]: vertical === "middle",
        [styles["orderSign-left"]]: horizontal === "left",
        [styles["orderSign-right"]]: horizontal === "right",
        [styles["orderSign-sm"]]: num > 9,
        [styles.orderSignActive]: active,
      })}
    >
      <hr />
      {num}
    </div>
  );
};
