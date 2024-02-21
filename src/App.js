import React from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import {
  Button,
  Grid,
  View,
  Image,
  Text,
  useTheme,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { Authenticator } from "@aws-amplify/ui-react";
import awsconfig from "./amplifyconfiguration.json";
import { DripDropNavBarBasic } from "./ui-components";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Friends from "./pages/Friends";
import NavBar from "./components/NavBar";
import ProfilePage from "./ui-components/ProfilePage";

Amplify.configure(awsconfig);

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
          <span style={{ color: "#047D95" }}>drip</span>
          <span>drop.</span>
        </Text>
      </View>
    );
  },
};

export default function App() {
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <Home />;
      break;
    case "/home":
      component = <Home />;
      break;
    case "/upload":
      component = <Upload />;
      break;
    case "/Friends":
      component = <Friends />;
      break;
    case "/profile":
      component = <ProfilePage />;
      break;
  }

  return (
    <Authenticator variation="modal" components={components}>
      {({ signOut, user }) => (
        <View className="App">
          <div>
            <Grid
              columnGap="0.5rem"
              rowGap="0.5rem"
              templateColumns="1fr 4fr"
              alignContent="center"
            >
              <NavBar columnStart="1" columnEnd="2" />

              <div columnStart="2" columnEnd="-1">
                {component}
              </div>
            </Grid>
          </div>
        </View>
      )}
    </Authenticator>
  );
}

//export default withAuthenticator(App);
