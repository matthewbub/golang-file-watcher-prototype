import { Fragment, useEffect } from "react";
import { useDocumentList, useAccordionsList, useCategoryList } from "../state";

const InitialClientEx = ({ data, children }) => {
  const setDocuments = useDocumentList((state) => state.setDocuments);
  const setAccordions = useAccordionsList((state) => state.setAccordions);
  const setCategories = useCategoryList((state) => state.setCategories);

  const clearStateJustToBeSure = () => {
    setDocuments([]);
    setAccordions([]);
    setCategories([]);
  };

  useEffect(() => {
    clearStateJustToBeSure();

    setDocuments(data.documentsList);
    setAccordions(data.accordionsList);
    setCategories(data.categoriesList);
  }, []);

  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

export default InitialClientEx;
