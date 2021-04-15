import React from "react";
import { Router, Route } from "react-router-dom";

import History from "./app.history";
import { Home, Schedule, ScheduleWeek } from "app-component";

const Routes = () => {
  return (
    <Router history={History}>
      <Home>
        <Route path="/" exact>
          <Schedule />
        </Route>
        <Route path="/week" exact>
          <ScheduleWeek />
        </Route>
      </Home>
    </Router>
  );
};

export default Routes;
