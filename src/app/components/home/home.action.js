import * as services from "./home.service";
import * as types from "./home.type";

const action = (result, type) => ({
  type,
  result,
  name: "home",
});

export const getConfig = async () => {
  try {
    const res = await services.getConfig();

    return action(res, types.GET_CONFIG);
  } catch (e) {
    return action(true, types.HAS_ERROR);
  }
};
