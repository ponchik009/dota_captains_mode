import React from "react";

import styles from "./Timing.module.css";
import classNames from "classnames";

export type ActiveTime = "base" | "bonus";

interface ITimingProps {
  position: "left" | "right";
  baseTime: number;
  bonusTime: number;

  activeTime?: ActiveTime;

  active: boolean;
}

export const Timing = ({
  position,
  baseTime,
  bonusTime,
  activeTime = "base",
  active,
}: ITimingProps) => {
  return (
    <div
      className={classNames(styles.timing, {
        [styles.timingLeft]: position === "left",
        [styles.timingRight]: position === "right",
        [styles.timingActive]: active,
      })}
    >
      <span
        className={classNames(styles.bonusTime, {
          [styles.bonusTime_active]: activeTime === "bonus",
        })}
      >
        {bonusTime}
      </span>
      <span
        className={classNames(styles.baseTime, {
          [styles.bonusTime_active]: activeTime === "base",
        })}
      >
        {baseTime}
      </span>
    </div>
  );
};
