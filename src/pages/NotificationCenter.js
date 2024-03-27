import React, { useEffect, useState } from "react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import {
  View,
  Flex,
  Heading,
  Button,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import awsconfig from "../amplifyconfiguration.json";
import { listNotifications } from "../graphql/queries";
import { updateNotifications } from "../graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";

import Notification from "../components/Notification";
import "./NotificationCenter.css";

import { toast } from "react-hot-toast";

Amplify.configure(awsconfig);
const client = generateClient();

const NotificationCenter = ({ subsciberNotifications, signOut }) => {
  const [currUser, setCurrUser] = useState(null);
  const [notifications, setNotifications] = useState(subsciberNotifications);

  const fetchUserData = async () => {
    try {
      const currUserAttributes = await getCurrentUser();
      setCurrUser(currUserAttributes);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    setNotifications(subsciberNotifications);
    console.log("Notifications updated:", subsciberNotifications);
  }, [subsciberNotifications]);

  const handleClearNotifications = () => {
    return new Promise(async (resolve, reject) => {
      console.log("Clearing notifications");
      try {
        const userNotifications = await client.graphql({
          query: listNotifications,
          variables: { filter: { username: { eq: currUser.username } } },
        });
        if (userNotifications.data.listNotifications.items !== null) {
          // console.log("notifToPostOwner:", notifToRequestedUser);
          // const notifList = notifToRequestedUser.data.listNotifications.items[0];
          const input = {
            id: userNotifications.data.listNotifications.items[0].id,
            notificationsList: [],
          };
          const condition = { username: { eq: currUser.username } };
          await client.graphql({
            query: updateNotifications,
            variables: { input, condition },
          });
          console.log("Notifications cleared");
          resolve("Notifications cleared");
        } else {
          console.log("user not found");
          reject("user not found");
        }
      } catch (error) {
        console.error("Error clearing notifications: ", error);
        reject("Failed to clear notifications");
      }
    });
  };

  return (
    <View className="NotificationCenter">
      <Flex
        className="notifications_content_container"
        direction={"column"}
        alignItems={"center"}
        wrap={"nowrap"}
        gap={"1rem"}
      >
        <Flex
          direction={"row"}
          justifyContent={"space-between"}
          wrap={"nowrap"}
          gap={"1rem"}
        >
          <Heading level={3}>Notifications</Heading>
          <Button
            variation="destructive"
            onClick={() => {
              toast.promise(handleClearNotifications(), {
                pending: "Uploading...",
                success: "Notifications cleared",
                error: "Failed to clear notifications",
              });
            }}
          >
            Clear
          </Button>
        </Flex>
        {console.log("Notifications:", notifications)}
        {notifications.length === 0 ? (
          <p>No Notifications</p>
        ) : (
          <View
            width="380px"
            height="100%"
            display="block"
            gap="unset"
            alignItems="center"
            justifyContent="center"
            // overflow="auto" // Set overflow to "auto" for scrollbars only when needed
            position="relative"
            // top="50px"
            // left="0px"
            padding="0px 0px 0px 0px"
          >
            {notifications.map((notification, index) => {
              const topPosition =
                index === 0
                  ? 11
                  : notifications
                      .slice(0, index)
                      .reduce(
                        (acc, curr) => acc + (curr.length > 50 ? 90 : 60),
                        11
                      ); // Adjust the height accordingly
              console.log("Notification:", notification);
              return (
                <Notification
                  key={index}
                  index={index}
                  notification={notification}
                  topPosition={topPosition}
                  username={currUser.username}
                  client={client}
                />
              );
            })}
          </View>
        )}
      </Flex>
    </View>
  );
};

export default withAuthenticator(NotificationCenter);
