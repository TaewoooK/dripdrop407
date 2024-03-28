import * as React from "react";
import "./board.css";
import { View, Text, Button } from "@aws-amplify/ui-react";

export default function Board() {
  return (
    <View className="leaderboard-container">
      <View className="board">
        <View className="board2">
          <Text className="rank-text" children="Rank" />
          <Text className="user-text" children="User" />
          <Text className="point-text" children="Points" />
          <hr className="separator" />
          <View className="rank-column" />
          <View className="other-column" />
        </View>
        <Text className="header-text">
          <span style={{ color: "#047d95" }}>Leader</span>
          <span>board</span>
        </Text>
        <Button className="button-by-post" variation="default">
          By Post
        </Button>
        <Button className="button-by-user" variation="default">
          By User
        </Button>
      </View>
    </View>
  );
}
