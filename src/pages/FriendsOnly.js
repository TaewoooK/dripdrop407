import React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Button, View, withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../amplifyconfiguration.json";
import FriendsOnlyPage from "../components/FriendsOnlyPage";

Amplify.configure(awsconfig);

const FriendsOnly = () => {
  return (
    <View className="FriendsOnly">
      <div>
        <FriendsOnlyPage />
      </div>
    </View>
  );
};

export default withAuthenticator(FriendsOnly);
