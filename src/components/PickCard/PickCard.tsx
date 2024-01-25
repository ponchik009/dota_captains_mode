import React from "react";
import classNames from "classnames";

import styles from "./PickCard.module.css";

export type CardSize = "md" | "lg";

interface IPickCardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: CardSize;
  active?: boolean;
  banned?: boolean;
}

export const PickCard: React.FC<IPickCardProps> = ({
  size = "md",
  active = false,
  banned = false,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={classNames(
        styles.card,
        {
          [styles["card-lg"]]: size === "lg",
          [styles["card-md"]]: size === "md",
          [styles["card-active"]]: active,
          [styles["card-banned"]]: banned,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
