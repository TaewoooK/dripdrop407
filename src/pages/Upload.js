import React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Button, View, withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../amplifyconfiguration.json";
import UploadImage from "../ui-components/UploadImage.jsx";
import BattleRequest from "../components/Battle/BattleRequest.jsx";

Amplify.configure(awsconfig);

const Upload = () => {
  const openBattle = (event) => {
    return;
  };

  return (
    <View className="Upload">
      <div style={{ float: "right", padding: "15px 40px" }}>
        <a
          href="/battle-request"
          style={{
            backgroundColor: "#047d95",
            color: "white",
            border: "none",
            padding: "15px 24px", // Increased padding for the button
            borderRadius: "5px",
            cursor: "pointer",
            display: "block",
            width: "200px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          New Battle
        </a>
      </div>

      <div>
        <UploadImage />
      </div>
    </View>
  );
};

export default withAuthenticator(Upload);
