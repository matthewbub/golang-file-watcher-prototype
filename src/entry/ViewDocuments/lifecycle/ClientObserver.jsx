import { Fragment, useEffect } from "react";
import { useFilterBar } from '../state';

const ClientObserver = ({ children }) => {
  const searchValue = useFilterBar(state => state.searchValue);
  const categoryValue = useFilterBar(state => state.categoryValue);
  const dateValue = useFilterBar(state => state.dateValue);

  useEffect(() => {
    // console.log("ClientObserver observed a change in the filter bar state.", {
    //   searchValue,
    //   categoryValue,
    //   dateValue
    // });
  }, [searchValue, categoryValue, dateValue]);

  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

export default ClientObserver;
