import React, { Fragment } from "react";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import { AddNewMessage, ListMessages } from "../../features/LocalizationManager";

const LocalizationFormPage = () => {
  return (
    <DashboardLayout
      mainContent={() => (
        <Fragment>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Localization Manager</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ex obcaecati natus eligendi delectus,
          </p>
          <ListMessages />
        </Fragment>
      )}
      secondaryContent={AddNewMessage}
    />
  );
};

export default withPageAuthRequired(LocalizationFormPage);
