import React, { createContext, useState, useEffect } from "react";
import AWS from "aws-sdk";

import { Amplify } from "aws-amplify";
import awsconfig from "./amplifyconfiguration.json";
import { getCurrentUser } from "aws-amplify/auth";

import { Loader } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [myUser, setMyUser] = useState(null);

  const [loadingAllUsers, setLoadingAllUsers] = useState(true);
  const [loadingMyUser, setLoadingMyUser] = useState(true);

  useEffect(() => {
    fetchAllUsers();
    fetchMyUser();
  }, []);

  async function fetchAllUsers() {
    try {
      // Set Parameters for querying Users (pool Id and filter)
      let params = {
        UserPoolId: process.env.REACT_APP_USER_POOL_ID,
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

      console.log("Users:", data.Users);
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
    <UserContext.Provider value={{ allUsers, setAllUsers, myUser, setMyUser }}>
      {children}
    </UserContext.Provider>
  );
};