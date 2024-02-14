import React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Button, View, withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../amplifyconfiguration.json";
import UploadImage from "../ui-components/UploadImage";


Amplify.configure(awsconfig);

const Upload = ({ signOut }) => {
  return (
    <View className="Upload">
      <div>
        <UploadImage />
        <Button onClick={signOut}>Sign Out</Button>
      </div>
    </View>
  );
};

export default withAuthenticator(Upload);