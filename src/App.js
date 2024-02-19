import React from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Button, View, Image, Text, useTheme, withAuthenticator } from "@aws-amplify/ui-react";
import { Authenticator } from '@aws-amplify/ui-react';
import awsconfig from "./amplifyconfiguration.json";
import UploadImage from "./ui-components/UploadImage";


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


    /*

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="DripDrop Logo"
          src={Logo}
        />
      </View>
    );
    */
    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text
        fontFamily="Inter"
        fontSize="48px"
        fontWeight="700"
        color="rgba(255,255,255,1)"
        lineHeight="24px"
        textAlign="center"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="center"
        top="49px"
        left="29px"
        padding={tokens.space.medium}
        whiteSpace="pre-wrap"
        >
        <span style={{ color: '#047D95' }}>drip</span>
        <span>drop.</span>
        </Text>
      </View>

    );
  }
};

export default function App() {
  return (
    <Authenticator variation="modal" components={components}>
      {({ signOut, user }) => (
        <View className="App">
          <UploadImage />
          <Button onClick={signOut}>Sign Out</Button>
        </View>
      )}
    </Authenticator>
  )
  
}

//export default withAuthenticator(App);
