import React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { View, Flex, withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../amplifyconfiguration.json";
import NotificationCenter from "../components/NotificationCenter";

Amplify.configure(awsconfig);

const Activity = ({ signOut }) => {
  return (
    <View className="Activity">
      <NotificationCenter />
    </View>
  );
};

export default withAuthenticator(Activity);
