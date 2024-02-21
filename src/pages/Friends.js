import React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { View, withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../amplifyconfiguration.json";
import { FullFriends } from '../ui-components';

Amplify.configure(awsconfig);

const Friends = () => {
  return (
    <View className="Friends">
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0}}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 0 }}>
            <FullFriends/>
          </div>
        </div>
      </div>
    </View>
  );
};

export default withAuthenticator(Friends);