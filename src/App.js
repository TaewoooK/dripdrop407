import React from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { View, withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "./amplifyconfiguration.json";
import {
  DripDropNavBarBasic,
 } from './ui-components';
import Home from "./pages/Home";
import Upload from "./pages/Upload";


Amplify.configure(awsconfig);

const App = ({ signOut }) => {
  let component
  switch (window.location.pathname) {
    case "/":
      component = <Home/>
      break
    case "/home":
      component = <Home/>
      break
    case "/upload":
      component = <Upload/>
      break
  }
  return (
    <View className="App">
      <div>
        {/* <UploadImage />
        <Button onClick={signOut}>Sign Out</Button> */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 0}}>
          <DripDropNavBarBasic style={{ marginRight: '20px' }} />
          <div style={{ display: 'flex', flexDirection: 'row', gap: 0 }}>
            {component}
            {/* <PostComponent/>
            <CommentComponent /> */}
          </div>
        </div>
        
      </div>
      
    </View>
  );
};

export default withAuthenticator(App);
