import React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { View, withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../amplifyconfiguration.json";
import {
  CommentComponent, 
  PostComponent
 } from '../ui-components';
 import Post from "../components/Post";
 import Comment from "../components/Comment";

Amplify.configure(awsconfig);

const Home = ({ signOut }) => {
  return (
    <View className="Home">
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 0}}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 0 }}>
            <Post/>
            <Comment/>
          </div>
        </div>
      </div>
    </View>
  );
};

export default withAuthenticator(Home);