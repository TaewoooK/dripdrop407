import React from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Button, View, withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "./amplifyconfiguration.json";
// import UploadImage from "./ui-components/UploadImage";
import ProfilePage from "./ui-components/ProfilePage";

Amplify.configure(awsconfig);

const App = ({ signOut }) => {
  return (
    <View className="App">
      <ProfilePage />
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);
