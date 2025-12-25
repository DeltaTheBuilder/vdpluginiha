import { registerForegroundService } from "@notifee/react-native";
import notifee, { AndroidImportance } from "@notifee/react-native";

const PLUGIN_NAME = "PersistentIndicator";
const NOTIFICATION_ID = "persistent-discord-mod";

export default {
  onLoad: async () => {
    await notifee.createChannel({
      id: "discord-mod",
      name: "Mod Indicator",
      importance: AndroidImportance.HIGH,
    });
    
    registerForegroundService(() => async (notification) => {
      await notifee.displayNotification({
        id: NOTIFICATION_ID,
        title: "Discord Mod",
        body: "запущен клиент",
        android: {
          channelId: "discord-mod",
          ongoing: true,
          visibility: AndroidVisibility.PUBLIC,
          pressAction: { id: "default" },
          smallIcon: "ic_launcher",
        },
        ios: {
          foregroundPresentationOptions: {
            alert: true,
            badge: true,
            sound: false,
          },
        },
      });
    });

    // запусчиха
    await notifee.displayNotification({
      id: NOTIFICATION_ID,
      title: "Discord Mod Active",
      body: "бесконечное уведомление",
      android: {
        channelId: "discord-mod",
        ongoing: true,
        autoCancel: false,
      },
    });
  },

  onUnload: async () => {
    await notifee.cancelNotification(NOTIFICATION_ID);
  },
};
