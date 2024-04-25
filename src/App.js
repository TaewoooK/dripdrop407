import React, { useEffect } from "react";
import { UserProvider } from "./UserContext";

import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify, graphqlOperation } from "aws-amplify";
import { fetchAuthSession } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import {
  Button,
  Grid,
  View,
  Image,
  Text,
  useTheme,
} from "@aws-amplify/ui-react";
import { listNotifications } from "./graphql/queries";
import { createNotifications } from "./graphql/mutations";
import { Authenticator } from "@aws-amplify/ui-react";
import awsconfig from "./amplifyconfiguration.json";
import { toast, Toaster } from "react-hot-toast";

import Route from "./pages/Route";
import NavBar from "./components/NavBar";
import { onUpdateNotifications } from "./graphql/subscriptions";

import { getOverrideProps, useAuth } from "./ui-components/utils";

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

const client = generateClient();

const UserNotificationSubscriber = ({
  user,
  signOut,
  setIsDev,
  setNotifications,
}) => {
  useEffect(() => {
    const generateNotifs = async (currUser) => {
      try {
        console.log("fetching notif list for user");
        const result = await client.graphql({
          query: listNotifications,
          variables: { filter: { username: { eq: currUser.username } } },
        });
        if (result.data.listNotifications.items.length === 0) {
          console.log("creating notification list ");
          await client.graphql({
            query: createNotifications,
            variables: {
              input: { username: currUser.username, notificationsList: [] },
            },
          });
          console.log("created notification list");
          setNotifications([]);
          return 0;
        } else {
          console.log(
            "notification list already exists:",
            result.data.listNotifications.items
          );
          setNotifications(
            result.data.listNotifications.items[0].notificationsList
          );
          return result.data.listNotifications.items[0].notificationsList
            .length;
        }
      } catch (error) {
        console.error("Error fetching notification list:", error);
      }
    };

    const getIsDev = async () => {
      try {
        const { tokens } = await fetchAuthSession();
        const groups = tokens?.idToken.payload["cognito:groups"];
        console.log("groups:", groups);
        setIsDev(groups.includes("dev"));
      } catch (error) {
        console.error("Error fetching current authenticated user:", error);
      }
    };

    let notifSubscription;

    if (user) {
      var internal_notif_length = generateNotifs(user);
      getIsDev();

      notifSubscription = client
        .graphql({
          query: onUpdateNotifications,
          variables: { filter: { username: { eq: user.username } } },
        })
        .subscribe({
          next: (notificationData) => {
            // console.log("notificationData:", notificationData);
            const notifList =
              notificationData.data.onUpdateNotifications.notificationsList;
            // console.log("notifList:", notifList);
            // console.log("notifications:", notifications, notifications.length);
            if (
              notifList.length !== 0 &&
              notifList.length > internal_notif_length
            ) {
              const newNotif = notifList[0];
              // console.log("newNotif:", newNotif);
              // console.log(
              //   "newNotif[0]:",
              //   newNotif[0] === "FR"
              // );
              // console.log("newNotif type:", typeof newNotif);
              switch (newNotif[0]) {
                case "Comment":
                  toast(
                    `${newNotif[1]} commented "${newNotif[3]}" on your post!`,
                    {
                      icon: "🔔",
                    }
                  );
                  break;
                case "FR":
                  console.log("Friend request received");
                  toast(
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ marginRight: "10px" }}>
                        {newNotif[1]} sent you a friend request!
                      </p>
                      {/* <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "right",
                        }}
                      >
                        <Button
                          variation="primary"
                          colorTheme="success"
                          size="small"
                          style={{
                            padding: "5px",
                            fontSize: "10px",
                            marginBottom: "5px",
                          }}
                          onClick={() => {
                            console.log("Accepted");
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          variation="destructive"
                          size="small"
                          style={{ padding: "5px", fontSize: "10px" }}
                          onClick={() => {
                            console.log("Denied");
                          }}
                        >
                          Deny
                        </Button>
                      </div> */}
                    </div>,
                    {
                      icon: "👋",
                    }
                  );

                  break;
                case "PD":
                  toast(
                    `Your post was removed by an admin for violating community guidelines!`,
                    {
                      icon: "❌",
                    }
                  );
                  break;
                default:
                  break;
              }
            }
            // console.log("notifList:", notifList);
            setNotifications(notifList);
            internal_notif_length = notifList.length;
          },
        });
      console.log("subscribed to notifications for:", user.username);
    } else {
      console.log("no user signed in");
    }
  }, [user]);

  // const handleSignOut = () => {
  //   console.log("signing out");
  //   signOut();
  // }
  return null;
};

export var isDevGlobal = false;

export default function App() {
  const [notifications, setNotifications] = React.useState([]);
  const [isDev, setIsDev] = React.useState(false);

  useEffect(() => {
    console.log("isDev app:", isDev);
    if (isDev) {
      isDevGlobal = true;
    }
  }, [isDev]);

  return (
    <Authenticator
      variation="modal"
      components={components}
      signUpAttributes={["email", "username"]}
    >
      {({ signOut, user }) => (
        <UserProvider>
          <View className="App">
            <div style={{ minHeight: '100vh', backgroundColor: "rgb(24, 24, 24)" }}>
              <UserNotificationSubscriber
                user={user}
                signOut={signOut}
                setIsDev={setIsDev}
                setNotifications={setNotifications}
              />
              <Toaster position="top-right" reverseOrder={false} />
              <Grid
                columnGap="0.5rem"
                //minHeight="100vh"
                rowGap="0.5rem"
                templateColumns="1fr 8fr"
                alignContent="center"
              >
                <NavBar columnStart="1" columnEnd="2" />{" "}
                {/* NavBar spans only 1 column */}
                <div style={{ gridColumn: "2 / span 1" }}>
                  {" "}
                  {/* Content div spans only 1 column */}
                  <Route notifications={notifications} />
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