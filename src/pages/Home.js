import React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { View, Flex, withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../amplifyconfiguration.json";
import {
  CommentComponent, 
  PostComponent
 } from '../ui-components';
 import Post from "../components/Post";

Amplify.configure(awsconfig);

const Home = ({ signOut }) => {
  return (
    <View className="Home">
        <Flex
          direction="row"
          justifyContent="center"
        >
          <Flex
            direction="column"
            alignContent="center"
          > 
            <Post/>
          </Flex>
        </Flex>
    </View>
  );
};

export default withAuthenticator(Home);