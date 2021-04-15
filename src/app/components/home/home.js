import React, { useCallback, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment-timezone";

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

    if (config.timezone) {
      moment.tz.setDefault(config.timezone);
    }
  }, [config]);

  return (
    <section>
      <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="my-nav" />
          <Navbar.Collapse id="my-nav">
            <Nav className="mr-auto">
              <Link to="/" className="nav-link">
                Schedule
              </Link>
              <Link to="/week" className="nav-link">
                Week Schedule
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {!config ? "Loading..." : children}
      </Container>
    </section>
  );
};

export default Home;
