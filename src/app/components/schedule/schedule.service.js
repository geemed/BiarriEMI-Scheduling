import * as service from "app-service/base.service";

export const getEmployees = async () => {
  const res = await service.get("/static/json/employees.json");

  return res.data;
};

export const getShifts = async () => {
  const res = await service.get("/static/json/shifts.json");

  return res.data;
};

export const getRoles = async () => {
  const res = await service.get("/static/json/roles.json");

  return res.data;
};
