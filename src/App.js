import React from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Button, View, Image, useTheme, withAuthenticator } from "@aws-amplify/ui-react";
import { Authenticator } from '@aws-amplify/ui-react';
import awsconfig from "./amplifyconfiguration.json";
import UploadImage from "./ui-components/UploadImage";
import Logo from "./ui-components/logo.png";

Amplify.configure(awsconfig);
/*
const App = ({ signOut }) => {
  return (
    <View className="App">
      <UploadImage />
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};
*/
const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="DripDrop Logo"
          src={Logo}
        />
      </View>
    );
  }
};

export default function App() {
  return (
    <Authenticator components={components}>
      {({ signOut, user }) => (
        <View className="App">
          <UploadImage />
          <Button onClick={signOut}>Sign Out</Button>
        </View>
      )}
    </Authenticator>
  );
}

//export default withAuthenticator(App);
