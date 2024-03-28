import React, { useState, useContext } from "react";
import { UserProvider, UserContext } from "./UserContext";

import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify, Auth } from "aws-amplify";
import {
  Button,
  Grid,
  View,
  Image,
  Text,
  useTheme,
  withAuthenticator,
  Tabs,
} from "@aws-amplify/ui-react";
import {
  Authenticator,
  useAuthenticator,
  CheckboxField,
} from "@aws-amplify/ui-react";
import awsconfig from "./amplifyconfiguration.json";
import { signUp, confirmSignUp, autoSignIn } from "aws-amplify/auth";

import { DripDropNavBarBasic } from "./ui-components";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
// import Friends from "./ui-components/FullFriends";
import Friends from "./pages/Friends";
import NavBar from "./components/NavBar";
import ProfilePage from "./ui-components/ProfilePage";
import FriendsOnly from "./pages/FriendsOnly";

import { generateClient } from "aws-amplify/api";
import { createPrivacy } from "./graphql/mutations";

import { getOverrideProps, useAuth } from "./ui-components/utils";

Amplify.configure(awsconfig);

const client = generateClient();

export default function App() {
  const [checked, setChecked] = useState(false);

  let component;
  // eslint-disable-next-line default-case
  switch (window.location.pathname) {
    case "/":
      component = (
        <Tabs
          spacing="equal"
          justifyContent="center"
          defaultValue={"Global Feed"}
          indicatorPosition="bottom"
          margin="10px"
          items={[
            {
              label: "Global Feed",
              value: "Global Feed",
              content: <Home />,
            },
            {
              label: "Friends Feed",
              value: "Friends Feed",
              content: <FriendsOnly />,
            },
          ]}
        />
      );
      break;
    case "/home":
      component = (
        <Tabs
          spacing="equal"
          justifyContent="center"
          defaultValue={"Global Feed"}
          indicatorPosition="bottom"
          margin="10px"
          items={[
            {
              label: "Global Feed",
              value: "Global Feed",
              content: <Home />,
            },
            {
              label: "Friends Feed",
              value: "Friends Feed",
              content: <FriendsOnly />,
            },
          ]}
        />
      );
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

  const services = {
    // 1. Sign Up with autoSignIn enabled
    // async handleSignUp({
    //   username,
    //   password,
    //   email,
    //   validationData,
    // }) {
    //   console.log("username:", username);
    //   console.log("password:", password);

    //   const { isSignUpComplete, userId, nextStep } = await signUp({
    //     username,
    //     password,
    //     options: {
    //       userAttributes: {
    //         email,
    //       },
    //       validationData,
    //       autoSignIn: true,
    //     },
    //   });
    // },

    // 2. Confirm Sign Up
    async handleConfirmSignUp({ username, confirmationCode }) {
      const { isSignUpComplete, userId, nextStep } = await confirmSignUp({
        username,
        confirmationCode,
      });

      // 3. Trigger autoSignIn event - will not be triggered automatically
      const { isSignedIn } = await autoSignIn();

      try {
        const newPrivacy = await client.graphql({
          query: createPrivacy,
          variables: {
            input: {
              Username: username,
              Private: false,
            },
          },
        });
        console.log("new privacy", newPrivacy);
      } catch (error) {
        console.log("error insert privacy record", error);
      }
    },
  };

  // const handleConfirmSignUpNextSteps = async (output) => {
  //   const { nextStep } = output;

  //   // eslint-disable-next-line default-case
  //   switch (nextStep.signUpStep) {
  //     case "COMPLETE_AUTO_SIGN_IN":
  //       const output2 = await autoSignIn();
  //       console.log("output2:", output2);
  //       break;
  //     case "DONE":
  //       console.log("Successful sign up.");
  //   }
  // };

  // choij3164

  // const formFields = {
  //   signUp: {
  //     username: {
  //       order: 1,
  //     },
  //     password: {
  //       order: 2,
  //     },
  //     confirm_password: {
  //       order: 3,
  //     },
  //     email: {
  //       order: 4,
  //     },
  //     "custom:private": {
  //       order: 5,
  //     },
  //   },
  // };

  // const components = {
  //   Header() {
  //     const { tokens } = useTheme();

  //     return (
  //       <View textAlign="center" padding={tokens.space.large}>
  //         <Text
  //           fontFamily="Inter"
  //           fontSize="48px"
  //           fontWeight="700"
  //           color="rgba(255,255,255,1)"
  //           lineHeight="24px"
  //           textAlign="center"
  //           display="block"
  //           direction="column"
  //           justifyContent="unset"
  //           width="unset"
  //           height="unset"
  //           gap="unset"
  //           alignItems="unset"
  //           position="center"
  //           top="49px"
  //           left="29px"
  //           padding={tokens.space.medium}
  //           whiteSpace="pre-wrap"
  //         >
  //           <span style={{ color: "#047D95" }}>drip</span>
  //           <span>drop.</span>
  //         </Text>
  //       </View>
  //     );
  //   },

  // };

  return (
    <Authenticator
      variation="modal"
      services={services}
      components={{
        Header() {
          const { tokens } = useTheme();

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

        // SignUp: {
        //   formFields: formFields.signUp,
        //   FormFields() {
        //     // const { setFieldValue } = useAuthenticator();

        //     return (
        //       <>
        //         {/* Re-use default `Authenticator.SignUp.FormFields` */}
        //         <Authenticator.SignUp.FormFields />

        //         {/* Add checkbox for "private" attribute */}
        //         <CheckboxField
        //           name="custom:private"
        //           value="yes"
        //           checked={checked}
        //           onChange={(e) => setChecked(e.target.checked)}
        //           label="Private"
        //         />
        //       </>
        //     );
        //   },
        // },
      }}
      signUpAttributes={["email", "username"]}
    >
      {({ signOut, user }) => (
        <UserProvider>
          <View className="App">
            <div style={{ backgroundColor: "rgb(24, 24, 24)" }}>
              <Grid
                columnGap="0.5rem"
                rowGap="0.5rem"
                templateColumns="1fr 8fr"
                alignContent="center"
              >
                <NavBar columnStart="1" columnEnd="2" />

                <div columnStart="2" columnEnd="-1">
                  {component}
                </div>
              </Grid>
            </div>
          </View>
        </UserProvider>
      )}
    </Authenticator>
  );
}

//export default withAuthenticator(App);
