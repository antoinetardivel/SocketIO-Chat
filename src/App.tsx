import SocketProvider from "./providers/socket/SocketProvider";
import styles from "./styles/global.module.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "./templates/Chat/Chat.template";
import Login from "./templates/Login/Login.template";

const App = () => {
  return (
    <>
      <Router>
        <SocketProvider>
          <div className={styles.App}>
            <header className="App-header"></header>
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route path="/chat">
                <Chat />
              </Route>
            </Switch>
          </div>
        </SocketProvider>
      </Router>
    </>
  );
};

export default App;
