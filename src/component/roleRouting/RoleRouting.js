import React from "react";
import { Route } from "react-router-dom";
import Home from "../content/Home";
import { useLoginContext } from "../loginContext/LoginContext";

function RoleRouting(props) {
  const { authGlobal } = useLoginContext();

  const { isAdmin, element: Component, ...restProps } = props;
  return (
    <Route
      {...restProps}
      render={(props) =>
        isAdmin ? (
          authGlobal.isAdmin ? (
            <Component {...props} />
          ) : (
            <Home {...props} />
          )
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default RoleRouting;
