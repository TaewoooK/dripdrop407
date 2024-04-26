import React, { useState } from "react";
import { Tabs } from "@aws-amplify/ui-react";

import LeaderUser from "./LeaderUser";

const BoardProfile = ({ user }) => {
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
            content: <LeaderUser user={user} />,
          },
        ]}
      />
    </div>
  );
};

export default BoardProfile;
