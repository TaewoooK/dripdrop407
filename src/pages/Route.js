import { useContext } from "react";
import { UserContext } from "../UserContext";
import React from "react";

import { Tabs } from "@aws-amplify/ui-react";

import Home from "./Home";
import Upload from "./Upload";
import Friends from "./Friends";
import ProfilePage from "../ui-components/ProfilePage";
import FriendsOnly from "./FriendsOnly";
import NotificationCenter from "../pages/NotificationCenter";
import Board from "../components/Leaderboard/Board";

import BattleRequest from "../components/Battle/BattleRequest";
import BattleBoard from "../components/Battle/Battleboard";

import PostV2 from "../components/Battle/PostsV2";
import BattlePending from "../components/Battle/BattlePending";

const Route = (notifications) => {
  const { myUser, usernameToPrivacy } = useContext(UserContext);
  console.log("notifications", notifications);
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
    case "/activity":
      return <NotificationCenter notifications={notifications.notifications} />;
    case "/leaderboard":
      return <Board />;
    case "/battle":
      return <PostV2 />;
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
              label: "Friends Feed",
              value: "2",
              content: <FriendsOnly />,
            },
            {
              label: "Global Feed",
              value: "1",
              content: <Home />,
              isDisabled: getDisabledHomePrivate(),
            },
          ]}
          isLazy
        />
      );
    case "/battle-request":
      return <BattleRequest />;
    case "/battleboard":
      return <BattleBoard />;
  }
};

export default Route;
