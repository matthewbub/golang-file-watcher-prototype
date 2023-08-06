import { Fragment, useEffect } from "react";

const ClientObserver = ({ children }) => {
  useEffect(() => {
    console.log("ClientObserver");
  }, []);

  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

export default ClientObserver;
