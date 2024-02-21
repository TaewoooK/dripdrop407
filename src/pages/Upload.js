import React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Button, View, withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../amplifyconfiguration.json";
import UploadImage from "../ui-components/UploadImage.jsx";


Amplify.configure(awsconfig);

const Upload = () => {
  return (
    <View className="Upload">
      <div>
        <UploadImage />
      </div>
    </View>
  );
};

export default withAuthenticator(Upload);