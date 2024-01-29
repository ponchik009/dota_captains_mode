import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import styles from "./Home.module.css";

import LobbySettingBg from "../../assets/img/LobbySettingsBg.png";

import { ReactComponent as IconSettings } from "../../assets/icons/IconSettings.svg";
import { UserContext } from "../../App";

export const Home = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [startClicked, setStartClicked] = React.useState(false);

  const onSettingsClick = () => {
    setStartClicked(true);
  };

  const onStartClick = () => {
    // any logic of creating lobby
    navigate(`/play/${Math.floor(Math.random() * 100000)}`);
  };

  return (
    <div className={classNames("page", styles.homePage)}>
      <h2 className={styles.welcomeBlock}>
        Welcome back, {user ? user.profile.personaname : "{Username}"}!
      </h2>
      <button className={styles.playButton} onClick={onSettingsClick}>
        Become captain
      </button>
      <div
        className={classNames(styles.lobbySettingsWrapper, {
          [styles.lobbySettingsWrapperOpened]: startClicked,
        })}
        onClick={() => setStartClicked(false)}
      />
      <div
        className={classNames(styles.lobbySettings, {
          [styles.lobbySettingsOpened]: startClicked,
        })}
      >
        <form className={styles.lobbySettingsContent} onSubmit={onStartClick}>
          <img src={LobbySettingBg} alt="" className={styles.settingsBg} />
          <button className={classNames(styles.settingsTitle)}>
            <IconSettings />
            <h2>Lobby settings</h2>
          </button>
          <div className={styles.settingsInputGroup}>
            <h2>Lobby type</h2>
            <div className={styles.settingsInputs}>
              <label htmlFor="open" className={styles.inputWrapper}>
                Open
                <input type="radio" id="open" name="type" disabled />
              </label>
              <label htmlFor="close" className={styles.inputWrapper}>
                Close
                <input type="radio" id="close" name="type" />
              </label>
            </div>
          </div>
          <div className={styles.settingsInputGroup}>
            <h2>Side</h2>
            <div className={styles.settingsInputs}>
              <label htmlFor="radiant" className={styles.inputWrapper}>
                Radiant
                <input type="radio" id="radiant" name="side" />
              </label>
              <label htmlFor="dire" className={styles.inputWrapper}>
                Dire
                <input type="radio" id="dire" name="side" />
              </label>
              <label htmlFor="any" className={styles.inputWrapper}>
                Any
                <input type="radio" id="any" name="side" />
              </label>
            </div>
          </div>

          <button className={styles.playButton} type="submit">
            Start
          </button>
        </form>
      </div>
    </div>
  );
};
