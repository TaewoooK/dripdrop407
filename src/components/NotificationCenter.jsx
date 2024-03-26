import React, { useEffect, useState } from "react";
import { listNotifications } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";

const client = generateClient();

const NotificationCenter = () => {
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
      setNotifications(result.data.listNotifications.items[0]);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (currUser) {
      fetchNotifications();
    }
  }, [currUser]);

  return (
    <div>
      <h1>Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>{notification.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationCenter;
