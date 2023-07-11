import React, { Fragment } from "react";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import { AddNewMessage, ListMessages } from "../../features/LocalizationManager";

const LocalizationFormPage = () => {
  return (
    <DashboardLayout
      mainContent={() => (
        <div className="bg-gray-50 p-5 rounded">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Localization Manager</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            <span className='font-semibold'>Note:</span> This is a list of all messages in the system. You can filter by payer, language, or search for a specific message.
          </p>
          <ListMessages />
        </div>
      )}
      secondaryContent={AddNewMessage}
    />
  );
};

export default withPageAuthRequired(LocalizationFormPage);
