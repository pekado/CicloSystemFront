import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TransitionSwitch from "react-router-transition-switch";
import Fader from "react-fader";
import Login from "./components/auth/Login";
import NewAccount from "./components/auth/NewAccount";
import Works from "./components/works/Works";
import Clients from "./components/clients/Clients";
import WorksState from "./context/works/worksState";
import TasksState from "./context/tasks/tasksState";
import AlertState from "./context/alerts/AlertState";
import AuthState from "./context/auth/authState";
import ClientState from "./context/clients/ClientState";
import RemindersState from "./context/reminders/RemindersState";
import tokenAuth from "./config/tokenAuth";
import PrivateRoute from "./components/routes/PrivateRoute";

//revisar si hay token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}
function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <ClientState>
      <WorksState>
        <RemindersState>
          <TasksState>
            <AlertState>
              <AuthState>
                <Router>
                  <TransitionSwitch component={Fader}>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/new-account" component={NewAccount} />
                    <PrivateRoute exact path="/works" component={Works} />
                    <PrivateRoute exact path="/clients" component={Clients} />
                  </TransitionSwitch>
                </Router>
              </AuthState>
            </AlertState>
          </TasksState>
        </RemindersState>
      </WorksState>
    </ClientState>
  );
}

export default App;
