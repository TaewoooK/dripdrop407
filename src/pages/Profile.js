import React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Button, View, withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../amplifyconfiguration.json";
import ProfilePage from "../ui-components/ProfilePage";

Amplify.configure(awsconfig);

const Profile = () => {
  return (
    <View className="Profile">
      <div>
        <ProfilePage />
      </div>
    </View>
  );
};

export default withAuthenticator(Profile);
