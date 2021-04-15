import React, { useCallback, useEffect } from "react";
import { Container } from "react-bootstrap";

import { useDispatch, useSelector } from "app-base/app.context";

import * as actions from "./home.action";

const Home = ({ children }) => {
  const dispatch = useDispatch();
  const { config } = useSelector((state) => state.home);

  const getConfig = useCallback(async () => {
    const res = await actions.getConfig();

    dispatch(res);
  });

  useEffect(() => {
    if (!config) return getConfig();
  }, [config]);

  return (
    <section>
      <Container>{!config ? "Loading..." : children}</Container>
    </section>
  );
};

export default Home;
