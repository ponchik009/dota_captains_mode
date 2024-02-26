import React from "react";
import { Socket } from "socket.io-client";

import "./App.css";

import { Router } from "./components/Router/Router";
import { User } from "./types/data.types";
import {
  CaptainsApi,
  ClientToServerEvents,
  ServerToClientEvents,
  socket,
} from "./api/captainsApi";

export const UserContext = React.createContext<{
  user: User | null;
  userError: string;
  userLoading: boolean;
  onLogin: () => void;
}>({
  user: null,
  userError: "",
  userLoading: false,
  onLogin: () => {},
});

export const SocketContext = React.createContext<{
  connected: boolean;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}>({
  connected: false,
  socket: socket,
});

function App() {
  const [user, setUser] = React.useState<User | null>(null);
  const [userError, setUserError] = React.useState("");
  const [userLoading, setUserLoading] = React.useState(false);

  const [socketConnected, setSocketConnected] = React.useState(false);

  const onLogin = () => {
    setUserLoading(true);
    CaptainsApi.login()
      .then((user) => {
        setUserError("");
        setUser(user);
      })
      .catch(() => setUserError("У вас ошибка загрузки пользователя :)"))
      .finally(() => setUserLoading(false));
  };

  React.useEffect(() => {
    setUserLoading(true);
    CaptainsApi.auth()
      .then((user) => {
        setUserError("");
        setUser(user);
      })
      .catch(() => setUserError("У вас ошибка загрузки пользователя :)"))
      .finally(() => setUserLoading(false));
  }, []);

  React.useEffect(() => {
    socket.on("connect", () => {
      setSocketConnected(true);
    });

    socket.on("disconnect", () => {
      setSocketConnected(false);
    });
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connected: socketConnected }}>
      <UserContext.Provider value={{ user, userError, userLoading, onLogin }}>
        <div className="App">
          <Router />
        </div>
      </UserContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;
