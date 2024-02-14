import React from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Button, View, withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "./amplifyconfiguration.json";
import UploadImage from "./ui-components/UploadImage";
import {
  DripDropNavBarBasic,
  CommentComponent, 
  PostComponent
 } from './ui-components';


Amplify.configure(awsconfig);

const App = ({ signOut }) => {
  return (
    <View className="App">
      <div>
        {/* <UploadImage />
        <Button onClick={signOut}>Sign Out</Button> */}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <DripDropNavBarBasic />
          <PostComponent />
          <CommentComponent />
          
        </div>
        
      </div>
      
    </View>
  );
};

export default withAuthenticator(App);
