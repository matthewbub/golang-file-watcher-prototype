# How to use

If using a component wrapped in the `DashboardLayout`, the notifications will be
automatically rendered. If not, you will need to render the `Notifications`
component.

```jsx
import { useAtom } from "jotai";
import { notifications } from "../../stores/jotai";
import { Notifications, newNotification } from "../Notifications";
import { useUser } from "@auth0/nextjs-auth0/client";

// use me if not in `DashboardLayout`
const ParentComponent = () => {
  return (
    <div>
      {/* Notifications are absolutely positioned, so it doesn't matter where you put them */}
      <Notifications />
      <ChildComponent />
    </div>
  );
};

const ChildComponent = () => {
  const {user} = useUser();
  const [appNotifications, setAppNotifications] = useAtom(notifications);

  const handleNotification = () => {
    setAppNotifications([
      ...appNotifications,
      newNotification({
        title: "New Notification",
        message: "This is a new notification",
        type: "success",
        authorId: user.sub,
        log: {
          scope: "sample",
          action: "sample",
        }
      })
    ]);
  };

  return (
    <div>
      <button onClick={handleNotification}>Add Notification</button>
    </div>
  );
};
}
```
