import { Fragment } from "react";
import SignUp from "../features/SignUp/SignUp";
import { Notifications } from "../components/Notifications";

export default function SignUpPage() {
  return (
    <div className="bg-gray-50 h-full pb-40">
      <SignUp />

      {/* Absolute positioned elements */}
      <Fragment>
        <Notifications />
      </Fragment>
    </div>
  );
}
