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
 import Comment from "../components/Comment";
import PostAndComment from "../components/PostAndComment";

Amplify.configure(awsconfig);

const Home = ({ signOut }) => {
  return (
    <View className="Home">
        {/* <Flex
          direction="row"
          justifyContent="center"
          gap="2rem"
        >
          <Post/>
          <Comment/>
        </Flex> */}
        <PostAndComment/>
    </View>
  );
};

export default withAuthenticator(Home);