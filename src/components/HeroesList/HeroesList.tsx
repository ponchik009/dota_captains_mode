import React from "react";

import classNames from "classnames";

import styles from "./HeroesList.module.css";
import { ReactComponent as IconArrowLeft } from "../../assets/icons/IconArrowLeft.svg";

import { Hero } from "../../types/data.types";
import { GroupedHeroes, PickBan } from "../../types/state.types";

interface IHeroesListProps {
  opened: boolean;
  onClose: () => void;

  heroes: Hero[];
  disabledHeroes: { id: number; type: PickBan }[];

  onHeroClick: (heroId: number) => void;
}

function groupHeroes(heroes: Hero[]) {
  return heroes.reduce<GroupedHeroes>(
    (acc, hero) => {
      acc[hero.primary_attr].push(hero);
      return acc;
    },
    {
      agi: [],
      str: [],
      all: [],
      int: [],
    }
  );
}

function sortHeroes(h1: Hero, h2: Hero) {
  return h1.localized_name.localeCompare(h2.localized_name);
}

export const HeroesList: React.FC<IHeroesListProps> = React.memo(
  ({ heroes, opened, onHeroClick, disabledHeroes, onClose }) => {
    const [groupedHeroes, setGroupedHeroes] = React.useState<GroupedHeroes>(
      groupHeroes(heroes)
    );

    const handleHeroClick = (id: number) => {
      const disabled = disabledHeroes.some((dh) => dh.id === id);

      if (!disabled) {
        onHeroClick(id);
      }
    };

    React.useEffect(() => {
      setGroupedHeroes(groupHeroes(heroes));
    }, [heroes]);

    React.useEffect(() => {
      setGroupedHeroes((prev) => {
        prev["agi"] = prev["agi"].sort(sortHeroes);
        prev["all"] = prev["all"].sort(sortHeroes);
        prev["str"] = prev["str"].sort(sortHeroes);
        prev["int"] = prev["int"].sort(sortHeroes);

        return prev;
      });
    }, [groupedHeroes]);

    return (
      <div
        className={classNames(styles.heroesWrapper, {
          [styles.heroesWrapperOpened]: opened,
        })}
      >
        <button className={styles.backButton} onClick={onClose}>
          <IconArrowLeft />
          Back
        </button>
        {Object.values(groupedHeroes).map((attrHeroes, index) => (
          <div className={styles.heroesList} key={index}>
            {attrHeroes.map((h) => {
              const disabledHero = disabledHeroes.find((db) => db.id == h.id);
              return (
                <div
                  className={classNames(styles.heroImageWrapper, {
                    [styles.heroBanned]: disabledHero?.type === "ban",
                  })}
                  key={h.id}
                >
                  <img
                    onClick={() => handleHeroClick(h.id)}
                    className={classNames(styles.heroImage, {
                      [styles.heroImageDisabled]: disabledHero,
                    })}
                    src={h.img}
                    alt={h.localized_name}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
);
