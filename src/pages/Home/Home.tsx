import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import styles from "./Home.module.css";
import { SubmitHandler, useForm } from "react-hook-form";

import LobbySettingBg from "../../assets/img/LobbySettingsBg.png";

import { ReactComponent as IconSettings } from "../../assets/icons/IconSettings.svg";
import { UserContext } from "../../App";
import {
  CreateLobbyData,
  CreateLobbyTypeEnum,
  CreateLobbySideEnum,
} from "../../types/data.types";
import { CaptainsApi } from "../../api/captainsApi";

type CreateLobbyForm = {
  side: CreateLobbySideEnum;
  lobbyType: CreateLobbyTypeEnum;
};

const getRandomSide = () =>
  Math.random() > 0.5 ? CreateLobbySideEnum.DIRE : CreateLobbySideEnum.RADIANT;

export const Home = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLobbyForm>({
    defaultValues: {
      lobbyType: CreateLobbyTypeEnum.CLOSE,
      side: CreateLobbySideEnum.ANY,
    },
  });

  const { user } = useContext(UserContext);

  const [startClicked, setStartClicked] = React.useState(false);

  const onSettingsClick = () => {
    setStartClicked(true);
  };

  const onStartClick: SubmitHandler<CreateLobbyForm> = async (data) => {
    const lobbySettings: CreateLobbyData = {
      type: data.lobbyType,
      side: data.side === CreateLobbySideEnum.ANY ? getRandomSide() : data.side,
    };

    const lobby = await CaptainsApi.createLobby(lobbySettings);

    navigate(`/play/${lobby.id}`);
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
        <form
          className={styles.lobbySettingsContent}
          onSubmit={handleSubmit(onStartClick)}
        >
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
                <input
                  {...register("lobbyType")}
                  type="radio"
                  id="open"
                  name="lobbyType"
                  value={CreateLobbyTypeEnum.OPEN}
                  disabled
                />
              </label>
              <label htmlFor="close" className={styles.inputWrapper}>
                Close
                <input
                  {...register("lobbyType")}
                  type="radio"
                  id="close"
                  name="lobbyType"
                  value={CreateLobbyTypeEnum.CLOSE}
                />
              </label>
            </div>
          </div>
          <div className={styles.settingsInputGroup}>
            <h2>Side</h2>
            <div className={styles.settingsInputs}>
              <label htmlFor="radiant" className={styles.inputWrapper}>
                Radiant
                <input
                  {...register("side")}
                  type="radio"
                  id="radiant"
                  name="side"
                  value={CreateLobbySideEnum.RADIANT}
                />
              </label>
              <label htmlFor="dire" className={styles.inputWrapper}>
                Dire
                <input
                  {...register("side")}
                  type="radio"
                  id="dire"
                  name="side"
                  value={CreateLobbySideEnum.DIRE}
                />
              </label>
              <label htmlFor="any" className={styles.inputWrapper}>
                Any
                <input
                  {...register("side")}
                  type="radio"
                  id="any"
                  name="side"
                  value={CreateLobbySideEnum.ANY}
                />
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
