import * as service from "app-service/base.service";

export const getConfig = async () => {
  const res = await service.get("/static/json/config.json");

  return res.data;
};
