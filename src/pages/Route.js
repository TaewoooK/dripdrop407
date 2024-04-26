import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import React from "react";

import { Tabs, Flex, CheckboxField, Button } from "@aws-amplify/ui-react";

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

  const [tags, setTags] = useState({
    americana: false,
    athleisure: false,
    earthtones: false,
    experimental: false,
    fall: false,
    formal: false,
    gorpcore: false,
    highfashion: false,
    minimalist: false,
    monochrome: false,
    spring: false,
    streetwear: false,
    summer: false,
    winter: false,
    workwear: false,
    y2k: false,
  });

  const handleSetTagDict = (tagName) => {
    tags[tagName] = !tags[tagName];
    //setTags(tags);
    console.log(tags);
  };

  const tagsDictToList = () => {
    let list = [];
    for (const key in tags) {
      if (tags[key]) {
        list.push(key);
      }
    }

    return list;
  };

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
        <div>
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
          <h3 style={{ textAlign: "right", color: "white", paddingRight: 100 }}>
            Filter by Tag
          </h3>
          <Flex justifyContent="right" paddingRight={10}>
            <CheckboxField
              name="tags-controlled"
              value="yes"
              onChange={(e) => handleSetTagDict("americana")}
              label="Americana"
            />
            <CheckboxField
              name="tags-controlled"
              value="yes"
              onChange={(e) => handleSetTagDict("athleisure")}
              label="Athleisure"
            />
            <CheckboxField
              name="tags-controlled"
              value="yes"
              onChange={(e) => handleSetTagDict("earthtones")}
              label="Earth Tones"
            />
          </Flex>
          <Flex justifyContent="right" paddingRight={10}>
            <CheckboxField
              name="tags-controlled"
              value="yes"
              onChange={(e) => handleSetTagDict("experimental")}
              label="Experimental"
            />
            <CheckboxField
              name="tags-controlled"
              value="yes"
              onChange={(e) => handleSetTagDict("fall")}
              label="Fall"
            />
            <CheckboxField
              name="tags-controlled"
              value="yes"
              onChange={(e) => handleSetTagDict("formal")}
              label="Formal"
            />
            <CheckboxField
              name="tags-controlled"
              value="yes"
              onChange={(e) => handleSetTagDict("gorpcore")}
              label="Gorpcore"
            />
          </Flex>
          <Flex justifyContent="right" paddingRight={10}>
            <CheckboxField
              name="tags-controlled"
              value="yes"
              onChange={(e) => handleSetTagDict("highfashion")}
              label="High Fashion"
            />
            <CheckboxField
              name="tags-controlled"
              value="yes"
              onChange={(e) => handleSetTagDict("minimalist")}
              label="Minimalist"
            />
            <CheckboxField
              name="tags-controlled"
              value="yes"
              onChange={(e) => handleSetTagDict("monochrome")}
              label="Monochrome"
            />
            <CheckboxField
              name="tags-controlled"
              value="yes"
              onChange={(e) => handleSetTagDict("spring")}
              label="Spring"
            />
          </Flex>
          <Flex justifyContent="right" paddingRight={10}>
            <CheckboxField
              name="tags-controlled"
              value="yes"
              onChange={(e) => handleSetTagDict("streetwear")}
              label="Streetwear"
            />
            <CheckboxField
              name="tags-controlled"
              value="yes"
              onChange={(e) => handleSetTagDict("summer")}
              label="Summer"
            />
            <CheckboxField
              name="tags-controlled"
              value="yes"
              onChange={(e) => handleSetTagDict("winter")}
              label="Winter"
            />
            <CheckboxField
              name="tags-controlled"
              value="yes"
              onChange={(e) => handleSetTagDict("workwear")}
              label="Workwear"
            />
            <CheckboxField
              name="tags-controlled"
              value="yes"
              onChange={(e) => handleSetTagDict("y2k")}
              label="Y2K"
            />
          </Flex>
          <button
            style={{
              backgroundColor: "#047d95",
              color: "white",
              border: "none",
              padding: "10px 18px", // Increased padding for the button
              borderRadius: "5px",
              cursor: "pointer",
              //display: "block",
              //width: "100%",
              fontSize: "16px",
              fontWeight: "bold",
              float: "right",
              marginRight: "10px",
            }}
          >
            Filter
          </button>
        </div>
      );
    case "/battle-request":
      return <BattleRequest />;
    case "/battleboard":
      return <BattleBoard />;
  }
};

export default Route;
