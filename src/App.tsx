import React from "react";

import "./App.css";

import { Router } from "./components/Router/Router";
import { User } from "./types/data.types";
import { CaptainsApi } from "./api/captainsApi";

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

function App() {
  const [user, setUser] = React.useState<User | null>(null);
  const [userError, setUserError] = React.useState("");
  const [userLoading, setUserLoading] = React.useState(false);

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

  return (
    <UserContext.Provider value={{ user, userError, userLoading, onLogin }}>
      <div className="App">
        <Router />
      </div>
    </UserContext.Provider>
  );
}

export default App;
