import _ from "lodash";

import * as services from "./schedule.service";
import * as types from "./schedule.type";

const action = (result, type) => ({
  type,
  result,
  name: "schedule",
});

export const get = async () => {
  try {
    const [employees, shifts, roles] = await Promise.all([
      services.getEmployees(),
      services.getShifts(),
      services.getRoles(),
    ]);

    return action({ employees, shifts, roles }, types.GET);
  } catch (e) {
    return action(true, types.HAS_ERROR);
  }
};

export const getEmployees = async () => {
  try {
    const res = await services.getEmployees();

    return action(res, types.GET_EMPLOYEES);
  } catch (e) {
    return action(true, types.HAS_ERROR);
  }
};

export const getRoles = async () => {
  try {
    const res = await services.getRoles();

    return action(res, types.GET_ROLES);
  } catch (e) {
    return action(true, types.HAS_ERROR);
  }
};

export const getShifts = async () => {
  try {
    const res = await services.getShifts();

    return action(res, types.GET_SHIFTS);
  } catch (e) {
    return action(true, types.HAS_ERROR);
  }
};

export const getFlatData = (employees, shifts, roles) => {
  const newShifts = _.reduce(
    shifts,
    (c, a) => {
      if (c[a.employee_id]) c[a.employee_id].push(a);
      else c[a.employee_id] = [a];

      return c;
    },
    {}
  );

  return _.map(employees, (item) => {
    return Object.assign({}, item, {
      shifts: _.map(newShifts, (item) => {
        return _.map(item, (i) => {
          return Object.assign({}, i, {
            role: _.find(roles, (r) => r.id === i.role_id),
          });
        });
      }),
    });
  });
};
