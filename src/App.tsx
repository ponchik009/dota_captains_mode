import React from "react";
import classNames from "classnames";

import "./App.css";

import { PickCard } from "./components/PickCard/PickCard";
import { OrderSign } from "./components/OrderSign/OrderSign";
import { ActiveTime, Timing } from "./components/Timing/Timing";

import { maxPick, orderToSide, orderToStage, pickStages } from "./const/stages";
import { BONUS_TIME, DEFAULT_PHASE, FIRST_PHASE } from "./const/timings";
import { SidesType } from "./types/state.types";

function App() {
  const [activeSide, setActiveSide] = React.useState<SidesType>("radiant");
  const [activeTime, setActiveTime] = React.useState<ActiveTime>("base");
  const [currentPick, setCurrentPick] = React.useState(1);

  const [radiantBaseTime, setRadiantBaseTime] = React.useState(FIRST_PHASE);
  const [radiantBonusTime, setRadiantBonusTime] = React.useState(BONUS_TIME);
  const [direBaseTime, setDireBaseTime] = React.useState(FIRST_PHASE);
  const [direBonusTime, setDireBonusTime] = React.useState(BONUS_TIME);

  const currentTimer = React.useRef<NodeJS.Timeout | null>(null);

  const updateTime = () => {
    if (activeSide === "radiant") {
      if (activeTime === "base") {
        setRadiantBaseTime((prev) => prev - 1);
      } else {
        setRadiantBonusTime((prev) => prev - 1);
      }
    } else {
      if (activeTime === "base") {
        setDireBaseTime((prev) => prev - 1);
      } else {
        setDireBonusTime((prev) => prev - 1);
      }
    }
  };

  const updateTimer = () => {
    if (currentTimer.current) {
      clearInterval(currentTimer.current);
    }

    if (currentTimer) {
      currentTimer.current = setInterval(function update() {
        updateTime();
      }, 1000);
    }
  };

  const resetTimer = () => {
    if (currentTimer.current) {
      clearInterval(currentTimer.current);
    }
  };

  const onPick = (cardOrder: number) => {
    if (currentPick === cardOrder) {
      setCurrentPick((prev) => {
        const nextValue = prev + 1;
        const nextSide = orderToSide[nextValue];

        setActiveSide(nextSide);

        return nextValue;
      });
    }
  };

  React.useEffect(() => {
    updateTimer();

    return () => {
      resetTimer();
    };
  }, [activeTime, activeSide]);

  React.useEffect(() => {
    if (currentPick > maxPick) {
      resetTimer();
    } else {
      setActiveTime("base");
      const currentStage = orderToStage[String(currentPick)];

      if (activeSide === "dire") {
        setDireBaseTime(currentStage === 1 ? FIRST_PHASE : DEFAULT_PHASE);
      } else {
        setRadiantBaseTime(currentStage === 1 ? FIRST_PHASE : DEFAULT_PHASE);
      }
    }
  }, [currentPick]);

  React.useEffect(() => {
    if (radiantBaseTime === 0) {
      if (radiantBonusTime > 0) {
        setActiveTime("bonus");
      } else {
        onPick(currentPick);
      }
    }
  }, [radiantBaseTime]);

  React.useEffect(() => {
    if (direBaseTime === 0) {
      if (direBonusTime > 0) {
        setActiveTime("bonus");
      } else {
        onPick(currentPick);
      }
    }
  }, [direBaseTime]);

  React.useEffect(() => {
    if (radiantBonusTime === 0) {
      resetTimer();
      // end bonus time logic
      onPick(currentPick);
    }
  }, [radiantBonusTime]);

  React.useEffect(() => {
    if (direBonusTime === 0) {
      resetTimer();
      // end bonus time logic
      onPick(currentPick);
    }
  }, [direBonusTime]);

  return (
    <div className="App">
      <Timing
        position="left"
        baseTime={radiantBaseTime}
        bonusTime={radiantBonusTime}
        activeTime={activeTime}
        active={activeSide === "radiant"}
      />
      <Timing
        position="right"
        baseTime={direBaseTime}
        bonusTime={direBonusTime}
        activeTime={activeTime}
        active={activeSide === "dire"}
      />
      <div className="picks">
        <div className="stage">
          <div className="side radiant">
            <h2
              className={classNames({
                "radiant-active": activeSide === "radiant",
              })}
            >
              Radiant
            </h2>
          </div>
          <div className="side dire">
            <h2
              className={classNames({
                "dire-active": activeSide === "dire",
              })}
            >
              Dire
            </h2>
          </div>
        </div>
        {pickStages.map((stage) => {
          const size = stage.type === "bans" ? "md" : "lg";
          return (
            <div className="stage" key={stage.stage}>
              <div className="side radiant">
                {stage.radiant.map((pickBan) => (
                  <PickCard
                    size={size}
                    active={currentPick === pickBan.order}
                    onClick={() => onPick(pickBan.order)}
                    banned={
                      stage.type === "bans" && currentPick > pickBan.order
                    }
                    key={pickBan.order}
                  >
                    <OrderSign
                      num={pickBan.order}
                      horizontal={"left"}
                      vertical={pickBan.vertical}
                      active={currentPick === pickBan.order}
                    />
                  </PickCard>
                ))}
              </div>
              <div className="side dire" style={{ justifyContent: "flex-end" }}>
                {stage.dire.map((pickBan) => (
                  <PickCard
                    size={size}
                    active={currentPick === pickBan.order}
                    onClick={() => onPick(pickBan.order)}
                    banned={
                      stage.type === "bans" && currentPick > pickBan.order
                    }
                    key={pickBan.order}
                  >
                    <OrderSign
                      num={pickBan.order}
                      horizontal={"right"}
                      vertical={pickBan.vertical}
                      active={currentPick === pickBan.order}
                    />
                  </PickCard>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
