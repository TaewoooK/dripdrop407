import React, { useEffect, useState } from "react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { View, Flex, Heading, Button, withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../amplifyconfiguration.json";
import { listNotifications } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";
import "./NotificationCenter.css";

Amplify.configure(awsconfig);
const client = generateClient();

const NotificationCenter = ({ signOut }) => {
  const [currUser, setCurrUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const fetchUserData = async () => {
    try {
      const currUserAttributes = await getCurrentUser();
      setCurrUser(currUserAttributes);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  const fetchNotifications = async () => {
    const result = await client.graphql({
      query: listNotifications,
      variables: { filter: { username: { eq: currUser.username } } },
    });
    if (result.data.listNotifications.items.length === 0) {
      console.log("No notifications found");
      setNotifications([]);
    } else {
      // const sortedNotifications = result.data.listNotifications.items[0].notificationsList.sort(
      //   (a, b) => b[2] - a[2]
      // );
      console.log("normal", result.data.listNotifications.items[0].notificationsList);
      setNotifications(result.data.listNotifications.items[0].notificationsList.reverse());
      console.log("revversed", result.data.listNotifications.items[0].notificationsList.reverse());
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (currUser) {
      fetchNotifications();
      console.log("Notifications fetched");
    }
  }, [currUser]);

  const handleClearNotifications = async () => {
    console.log("Clearing notifications");
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
          <Button variation="destructive" onClick={handleClearNotifications}>
            Clear
          </Button>
        </Flex>
        {notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          <ul>
            {notifications.map((notification) => {
              switch (notification[0]) {
                case "FR":
                  return (
                    <li key={notification[1]}>
                      Friend request from {notification[1]}
                    </li>
                  );
                case "Comment":
                  return (
                    <li key={notification[1]}>
                      {notification[1]} commented "{notification[3]}" on your
                      post
                    </li>
                  );
                default:
                  return <li key={notification[1]}>Unknown notification</li>;
              }
            })}
          </ul>
        )}
      </Flex>
    </View>
  );
};

export default withAuthenticator(NotificationCenter);
