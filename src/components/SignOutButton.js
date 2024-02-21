import React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Button, View, withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../amplifyconfiguration.json";


Amplify.configure(awsconfig);

const SignOutButton = ({ signOut }) => {
  return (
    <View className="SignOutButton">
      <div>
        <Button onClick={signOut} color="#FFFFFF">Sign Out</Button>
      </div>
    </View>
  );
};

export default withAuthenticator(SignOutButton);