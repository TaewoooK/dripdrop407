import React, { createContext, useState, useEffect } from "react";
import AWS from "aws-sdk";

import { Amplify } from "aws-amplify";
import { Hub } from "aws-amplify/utils";
import awsconfig from "./amplifyconfiguration.json";
import { getCurrentUser } from "aws-amplify/auth";

import { Loader } from "@aws-amplify/ui-react";

import { generateClient } from "aws-amplify/api";
import { listPrivacies } from "./graphql/queries";
import { createPrivacy } from "./graphql/mutations";

Amplify.configure(awsconfig);

const client = generateClient();

Hub.listen("auth", (data) => {
  // console.log(
  //   "A new auth event has happened: ",
  //   data.payload.data?.username + " has " + data.payload.event
  // );

  switch (data.payload.event) {
    case "signedIn":
      setPrivacyOnSignIn(data.payload.data.username);
      break;
    default:
      break;
  }
});

const setPrivacyOnSignIn = async (username) => {
  try {
    const privacyData = await client.graphql({
      query: listPrivacies,
      variables: {
        filter: {
          Username: { eq: username },
        },
      },
    });

    const privacies = privacyData.data.listPrivacies.items;
    if (privacies.length > 0) {
      console.log("Privacy already set.");
      return;
    } else {
      console.log("Privacy is not yet set.");
    }
  } catch (error) {
    console.log("error querying privacy records", error);
  }

  try {
    const newPrivacy = await client.graphql({
      query: createPrivacy,
      variables: {
        input: {
          Username: username,
          Private: false,
        },
      },
    });
  } catch (error) {
    console.log("error inserting privacy record", error);
  }
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [myUser, setMyUser] = useState(null);

  const [loadingAllUsers, setLoadingAllUsers] = useState(true);
  const [loadingMyUser, setLoadingMyUser] = useState(true);
  const [usernameToPrivacy, setUsernameToPrivacy] = useState({});

  useEffect(() => {
    fetchAllUsers();
    fetchMyUser();
  }, []);

  const getUsernameToPrivacy = async (users) => {
    let privacies;

    try {
      const privacyData = await client.graphql({
        query: listPrivacies,
      });

      privacies = privacyData.data.listPrivacies.items;
    } catch (error) {
      console.log(error);
    }

    const tempUsernameToPrivacy = {};

    users.forEach((user) => {
      const userPrivacy = privacies.find(
        (privacy) => privacy.Username === user.Username
      );

      tempUsernameToPrivacy[user.Username] = userPrivacy;
    });

    setUsernameToPrivacy(tempUsernameToPrivacy);
    console.log("usernameToPrivacy:", tempUsernameToPrivacy);
  };


  async function fetchAllUsers() {
    try {
      const currentEnv = process.env.REACT_APP_ENVIRONMENT_NAME;

      let userPoolId;

      switch (currentEnv) {
        case "dev ":
          userPoolId = process.env.REACT_APP_USER_POOL_ID_DEV;
          break;
        case "prod ":
          userPoolId = process.env.REACT_APP_USER_POOL_ID_PROD;
          break;
        default:
          userPoolId = process.env.REACT_APP_USER_POOL_ID_PROD;
      }

      // Set Parameters for querying Users (pool Id and filter)
      let params = {
        UserPoolId: userPoolId,
      };

      // Establish credentials via IAM user before making AWS SDK API call
      AWS.config.update({
        region: process.env.REACT_APP_AWS_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_SECRET_KEY,
      });
      // Initialize the CognitoIdentityServiceProvider with AWS SDK
      const cognitoIdentityServiceProvider =
        new AWS.CognitoIdentityServiceProvider();
      const data = await cognitoIdentityServiceProvider
        .listUsers(params)
        .promise();

      // Add privacy records to username to privacy map
      getUsernameToPrivacy(data.Users);

      console.log("All users:", data.Users);
      setAllUsers(data.Users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoadingAllUsers(false);
    }
  }

  async function fetchMyUser() {
    try {
      const userAttributes = await getCurrentUser();
      console.log("MyUser: ", userAttributes);
      setMyUser(userAttributes);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    } finally {
      setLoadingMyUser(false);
    }
  }

  if (loadingAllUsers || loadingMyUser) {
    return <Loader size="Large" />;
  }

  return (
    <UserContext.Provider
      value={{
        allUsers,
        setAllUsers,
        myUser,
        setMyUser,
        usernameToPrivacy,
        setUsernameToPrivacy
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
