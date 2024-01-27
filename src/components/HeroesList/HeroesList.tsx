import React from "react";

import classNames from "classnames";

import styles from "./HeroesList.module.css";

import { Hero } from "../../types/data.types";
import { GroupedHeroes } from "../../types/state.types";

interface IHeroesListProps {
  opened: boolean;

  heroes: Hero[];

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
  ({ heroes, opened, onHeroClick }) => {
    const [groupedHeroes, setGroupedHeroes] = React.useState<GroupedHeroes>(
      groupHeroes(heroes)
    );

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
        {Object.values(groupedHeroes).map((attrHeroes) => (
          <div className={styles.heroesList}>
            {attrHeroes.map((h) => (
              <img
                onClick={() => onHeroClick(h.id)}
                className={styles.heroImage}
                key={h.id}
                src={h.img}
                alt={h.localized_name}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
);
