import { useApp } from "../context/AppContext";

export default function Notification() {
  const { notification, clearNotification } = useApp();

  if (!notification) return null;

  return (
    <div className={`notification notification-${notification.type}`}>
      <span>{notification.message}</span>
      <button onClick={clearNotification}>×</button>
    </div>
  );
}
