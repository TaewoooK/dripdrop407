import React, { useState } from "react";
import { Tabs } from "@aws-amplify/ui-react";

import UserProfileModal from "./UserProfileModal";
import FriendsProfileModal from "./FriendsProfileModal";

const ProfileModal = ({ user }) => {
  return (
    <div>
      <Tabs
        spacing="equal"
        justifyContent="center"
        defaultValue="User Profile"
        indicatorPosition="bottom"
        margin="10px"
        items={[
          {
            label: "User Profile",
            value: "User Profile",
            content: <UserProfileModal user={user} />,
          },
          {
            label: "Friends List",
            value: "Friends List",
            content: <FriendsProfileModal user={user} />,
          },
        ]}
      />
    </div>
  );
};

export default ProfileModal;
