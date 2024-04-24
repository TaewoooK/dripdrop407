import React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Button, View, withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../amplifyconfiguration.json";
import PostAndComment from "../components/PostAndComment";

Amplify.configure(awsconfig);

const FriendsOnly = () => {
  return (
    <View className="FriendsOnly">
      <div>
        <PostAndComment isFriendsOnly={true} />
      </div>
    </View>
  );
};

export default withAuthenticator(FriendsOnly);
