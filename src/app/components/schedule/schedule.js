import React, { useCallback, useEffect } from "react";
import _ from "lodash";

import { useDispatch, useSelector } from "app-base/app.context";

import * as actions from "./schedule.action";

const Schedule = () => {
  const dispatch = useDispatch();
  const { employees, shifts, roles } = useSelector((state) => state.schedule);

  const getEmployees = useCallback(async () => {
    const res = await actions.get();

    dispatch(res);
  });

  useEffect(() => {
    if (!employees && !shifts && !roles) return getEmployees();

    const data = actions.getFlatData(employees, shifts, roles);

    debugger;
    // const res = employees.map((r) => {
    //   return Object.assign({}, r, {
    //     shifts: _.filter(shiftRoles, (s) => s.employee_id === r.id),
    //   });
    // });

    console.log(data);

    debugger;
  }, [employees, shifts, roles]);

  console.log(roles);

  return <div></div>;
};

export default Schedule;
