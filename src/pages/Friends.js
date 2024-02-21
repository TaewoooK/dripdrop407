import React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Flex, View, withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../amplifyconfiguration.json";
import { FullFriends } from '../ui-components';

Amplify.configure(awsconfig);

const Friends = () => {
  return (
    <View className="Friends">
        <Flex
            direction="row"
            justifyContent="center"
            gap="2rem"
        >
            <FullFriends/>
        </Flex>
    </View>
  );
};

export default withAuthenticator(Friends);