import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";

import { Tabs } from "@aws-amplify/ui-react";

import Home from "./Home";
import Upload from "./Upload";
import Friends from "./Friends";
import ProfilePage from "../ui-components/ProfilePage";
import FriendsOnly from "./FriendsOnly";
import Board from "../components/Leaderboard/Board";

const Route = () => {
  const { myUser, usernameToPrivacy } = useContext(UserContext);

  // useEffect(() => {
  //   console.log("getDefaultTabPrivate:", getDefaultTabPrivate());
  // });

  const getDefaultTabPrivate = () => {
    if (usernameToPrivacy[myUser.username]?.Private) return "1";
    else return "2";
  };

  const getDisabledHomePrivate = () => {
    if (usernameToPrivacy[myUser.username]?.Private) return true;
    return false;
  };

  // eslint-disable-next-line default-case
  switch (window.location.pathname) {
    case "/upload":
      return <Upload />;
    case "/Friends":
      return <Friends />;
    case "/profile":
      return <ProfilePage />;
    case "/leaderboard":
      return <Board />;
      break;
    case "/":
    case "/home":
      return (
        <Tabs
          spacing="equal"
          justifyContent="center"
          defaultValue={getDefaultTabPrivate()}
          indicatorPosition="bottom"
          margin="10px"
          items={[
            {
              label: "Global Feed",
              value: "1",
              content: <Home />,
              isDisabled: getDisabledHomePrivate(),
            },
            {
              label: "Friends Feed",
              value: "2",
              content: <FriendsOnly />,
            },
          ]}
          isLazy
        />
      );
  }
};

export default Route;
