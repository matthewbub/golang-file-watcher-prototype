import { Fragment, useEffect } from "react";
import { useDocumentList } from "../state";

const InitialClientEx = ({ data, children }) => {
  const setDocuments = useDocumentList((state) => state.setDocuments);

  useEffect(() => {
    setDocuments(data);
  }, []);

  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

export default InitialClientEx;
