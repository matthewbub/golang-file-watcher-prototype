# How to use

```jsx
import { useAtom } from "jotai";
import { notifications } from "../../stores/jotai";
import { newNotification } from "../Notifications";
import { useUser } from "@auth0/nextjs-auth0/client";


const Sample = () => {
  const [user] = useUser();
  const [appNotifications, setAppNotifications] = useAtom(notifications);

  const handleNotification = () => {
    setNotifications([
      ...appNotifications,
      newNotification({
        title: "New Notification",
        message: "This is a new notification",
        type: "success",
        user: user.sub,
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
