import { Fragment, useEffect } from "react";
import { useDocumentList, useAccordionsList } from "../state";

const InitialClientEx = ({ data, children }) => {
  const setDocuments = useDocumentList((state) => state.setDocuments);
  const setAccordions = useAccordionsList((state) => state.setAccordions);

  const clearStateJustToBeSure = () => {
    setDocuments([]);
    setAccordions([]);
  };

  useEffect(() => {
    clearStateJustToBeSure();

    setDocuments(data.documentsList);
    setAccordions(data.accordionsList);
  }, []);

  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

export default InitialClientEx;
