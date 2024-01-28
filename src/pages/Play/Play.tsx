import React from "react";
import classNames from "classnames";

import styles from "./Play.module.css";

import { ActiveTime, Timing } from "../../components/Timing/Timing";
import { HeroesList } from "../../components/HeroesList/HeroesList";
import { PickCard } from "../../components/PickCard/PickCard";
import { OrderSign } from "../../components/OrderSign/OrderSign";

import { PickedHero, SidesType } from "../../types/state.types";
import { Hero } from "../../types/data.types";

import { BONUS_TIME, DEFAULT_PHASE, FIRST_PHASE } from "../../const/timings";
import {
  maxPick,
  orderToPickBan,
  orderToSide,
  orderToStage,
  pickStages,
} from "../../const/stages";

import { OpenDotaApi } from "../../api/openDotaApi";

export const Play = () => {
  const [activeSide, setActiveSide] = React.useState<SidesType>("radiant");
  const [activeTime, setActiveTime] = React.useState<ActiveTime>("base");
  const [currentPick, setCurrentPick] = React.useState(1);

  const [radiantBaseTime, setRadiantBaseTime] = React.useState(FIRST_PHASE);
  const [radiantBonusTime, setRadiantBonusTime] = React.useState(BONUS_TIME);
  const [direBaseTime, setDireBaseTime] = React.useState(FIRST_PHASE);
  const [direBonusTime, setDireBonusTime] = React.useState(BONUS_TIME);

  const currentTimer = React.useRef<NodeJS.Timeout | null>(null);

  const [heroesListOpened, setHeroesListOpened] = React.useState(false);
  const [heroes, setHeroes] = React.useState<Hero[]>([]);
  const [pickBans, setPickBans] = React.useState<PickedHero[]>([]);

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

  const onPick = (cardOrder: number, random: boolean = false) => {
    if (currentPick === cardOrder) {
      if (random) {
        let randomHero = heroes[Math.floor(Math.random() * heroes.length)];
        // exclude already picked
        while (pickBans.some((pb) => pb.hero.id === randomHero.id)) {
          randomHero = heroes[Math.floor(Math.random() * heroes.length)];
        }

        onHeroClick(randomHero.id);
      } else {
        setHeroesListOpened(true);
      }
    }
  };

  const onHeroClick = (heroId: number) => {
    setHeroesListOpened(false);

    setPickBans((prev) => {
      const hero = heroes.find((h) => h.id === heroId)!;
      const order = currentPick;
      const side = activeSide;
      const type = orderToPickBan[order];

      prev.push({
        hero,
        order,
        side,
        type,
      });

      return prev;
    });

    setCurrentPick((prev) => {
      const nextValue = prev + 1;
      const nextSide = orderToSide[nextValue];

      setActiveSide(nextSide);

      return nextValue;
    });
  };

  React.useEffect(() => {
    OpenDotaApi.getHeroes().then(setHeroes);
  }, []);

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
        onPick(currentPick, true);
      }
    }
  }, [radiantBaseTime]);

  React.useEffect(() => {
    if (direBaseTime === 0) {
      if (direBonusTime > 0) {
        setActiveTime("bonus");
      } else {
        onPick(currentPick, true);
      }
    }
  }, [direBaseTime]);

  React.useEffect(() => {
    if (radiantBonusTime === 0) {
      resetTimer();
      // end bonus time logic
      onPick(currentPick, true);
    }
  }, [radiantBonusTime]);

  React.useEffect(() => {
    if (direBonusTime === 0) {
      resetTimer();
      // end bonus time logic
      onPick(currentPick, true);
    }
  }, [direBonusTime]);

  return (
    <div className={"page"}>
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
      <HeroesList
        opened={heroesListOpened}
        onClose={() => setHeroesListOpened(false)}
        heroes={heroes}
        disabledHeroes={pickBans.map((pb) => ({
          id: pb.hero.id,
          type: pb.type,
        }))}
        onHeroClick={onHeroClick}
      />
      <div className={styles.picks}>
        <div className={styles.stage}>
          <div className={classNames(styles.side, styles.radiant)}>
            <h2
              className={classNames({
                [styles["radiant-active"]]: activeSide === "radiant",
              })}
            >
              Radiant
            </h2>
          </div>
          <div className={classNames(styles.side, styles.dire)}>
            <h2
              className={classNames({
                [styles["dire-active"]]: activeSide === "dire",
              })}
            >
              Dire
            </h2>
          </div>
        </div>
        {pickStages.map((stage) => {
          const size = stage.type === "bans" ? "md" : "lg";
          return (
            <div className={styles.stage} key={stage.stage}>
              <div className={classNames(styles.side, styles.radiant)}>
                {stage.radiant.map((pickBan) => {
                  const hero = pickBans.find(
                    (pb) => pb.order === pickBan.order
                  );
                  return (
                    <PickCard
                      size={size}
                      active={currentPick === pickBan.order}
                      onClick={() => onPick(pickBan.order)}
                      banned={
                        stage.type === "bans" && currentPick > pickBan.order
                      }
                      key={pickBan.order}
                      img={hero?.hero.img}
                    >
                      <OrderSign
                        num={pickBan.order}
                        horizontal={"left"}
                        vertical={pickBan.vertical}
                        active={currentPick === pickBan.order}
                      />
                    </PickCard>
                  );
                })}
              </div>
              <div
                className={classNames(styles.side, styles.dire)}
                style={{ justifyContent: "flex-end" }}
              >
                {stage.dire.map((pickBan) => {
                  const hero = pickBans.find(
                    (pb) => pb.order === pickBan.order
                  );
                  return (
                    <PickCard
                      size={size}
                      active={currentPick === pickBan.order}
                      onClick={() => onPick(pickBan.order)}
                      banned={
                        stage.type === "bans" && currentPick > pickBan.order
                      }
                      key={pickBan.order}
                      img={hero?.hero.img}
                    >
                      <OrderSign
                        num={pickBan.order}
                        horizontal={"right"}
                        vertical={pickBan.vertical}
                        active={currentPick === pickBan.order}
                      />
                    </PickCard>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
