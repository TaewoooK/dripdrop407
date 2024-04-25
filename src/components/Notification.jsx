import { Card, Icon, Text, View } from "@aws-amplify/ui-react";
import { listNotifications } from "../graphql/queries";
import { updateNotifications } from "../graphql/mutations";

export default function Notification(props) {
  const { index, notification, topPosition, username, client } = props;

  const handleRemoveNotification = async () => {
    console.log("Clicked remove notif index: ", index);
    console.log("Clicked remove notif: ", notification);
    try {
      const userNotifications = await client.graphql({
        query: listNotifications,
        variables: { filter: { username: { eq: username } } },
      });
      if (userNotifications.data.listNotifications.items !== null) {
        // console.log("notifToPostOwner:", notifToRequestedUser);
        // const notifList = notifToRequestedUser.data.listNotifications.items[0];
        let newList = userNotifications.data.listNotifications.items[0].notificationsList;
        newList.splice(index, 1);
        const input = {
          id: userNotifications.data.listNotifications.items[0].id,
          notificationsList: newList,
        };
        const condition = { username: { eq: username } };
        await client.graphql({
          query: updateNotifications,
          variables: { input, condition },
        });
        console.log("Notifications cleared");
      } else {
        console.log("user not found");
      }
    } catch (error) {
      console.error("Error clearing notifications: ", error);
    }
  };

  const displayNotification = () => {
    switch (notification[0]) {
      case "FR":
        return `Friend request from ${notification[1]}`;
      case "Comment":
        return `${notification[1]} commented "${notification[3]}" on your post`;
      case "PD":
        return `Your post was removed by an admin for violating community guidelines!`;
      default:
        return `${notification[0]} Unknown notification`;
    }
  };

  return (
    <Card
      key={index}
      width="380px"
      height="auto"
      position="absolute"
      display="flex"
      backgroundColor="rgba(70,70,70,1)"
      top={`${topPosition}px`}
      left="10px"
      borderRadius="25px"
      variation="outline"
      style={{ margin: 10, display: "flex", alignItems: "center" }}
    >
      <Text
        width="330px"
        color="rgba(255,255,255,1)"
        style={{
          fontSize: 12,
          margin: 2,
          wordBreak: "break-word",
          textAlign: "left",
        }}
        children={displayNotification()}
      ></Text>
      <Icon
        width="22.5px"
        height="25px"
        viewBox={{ minX: 0, minY: 0, width: 22.5, height: 25 }}
        position="absolute"
        left="340px"
        style={{ cursor: "pointer" }} // Add cursor: pointer style
        onClick={() => handleRemoveNotification()} // Call the handler function on icon click
        paths={[
          {
            d: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
            stroke: "rgba(255,255,255,1)",
            fillRule: "nonzero",
            strokeLinejoin: "round",
            strokeWidth: 2,
          },
        ]}
      ></Icon>
    </Card>
  );
}
