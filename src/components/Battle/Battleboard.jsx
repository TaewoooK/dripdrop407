import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { generateClient } from "aws-amplify/api";
import { UserContext } from "../../UserContext";
import "./board.css";
import {
  listPosts,
  listBattles,
  listFriends,
  listFriendRequests,
} from "../../graphql/queries";
import { View, Text, Button } from "@aws-amplify/ui-react";

const client = generateClient();

export default function BattleBoard() {
  const { allUsers, myUser } = useContext(UserContext);
  const [selectedData, setSelectedData] = useState([]); // Initialize with an empty array
  const [battles, setBattles] = useState([]);

  async function getAllPostsRankedByDripPoints(username) {
    let nextToken = null; // Initialize pagination token

    let battleData = [];

    do {
      const postFetchVariables = {
        filter: {
          Player1: {
            eq: username,
          },
          and: [
            { Player1Status: { eq: "Ready" } },
            { Player2Status: { eq: "Ready" } },
          ],
        },
        limit: 10, // Adjust the limit as needed
        nextToken: nextToken, // Include the pagination token
      };

      const userPosts = await client.graphql({
        query: listBattles,
        variables: postFetchVariables,
      });

      const posts = userPosts.data.listBattles.items;

      battleData.push(...posts);

      // Update the pagination token for the next iteration
      nextToken = userPosts.data.listBattles.nextToken;
    } while (nextToken); // Continue fetching until there are no more posts

    console.log(battleData);

    setSelectedData(battleData);
  }

  useEffect(() => {
    getAllPostsRankedByDripPoints(myUser.username);
  }, [allUsers]);

  return (
    <View className="leaderboard-container">
      <View className="board">
        <View className="board2">
          <Text className="rank-text" children="Player 1" />
          <Text className="user-text" children="Player 2" />
          <Text className="point-text" children="Percentage" />
          <hr className="separator" />
          <div className="columns-container" style={{ overflow: "auto" }}>
            {/* First, add a div to contain the columns */}
            <View className="rank-column">
              {selectedData.map((entry, index) => (
                <h2 key={index} style={{ color: "white" }}>
                  {entry.Player1}
                </h2>
              ))}
            </View>
            <View className="user-column">
              {selectedData.map((entry, index) => (
                <h2 key={index} style={{ color: "white" }}>
                  {entry.Player2}
                </h2>
              ))}
            </View>
            <View className="points-column">
              {selectedData.map((entry, index) => (
                <h2 key={index} style={{ color: "white" }}>
                  {entry.Player1Score + " | " + entry.Player2Score}
                </h2>
              ))}
            </View>
          </div>
        </View>
        <Text className="board-header-text">
          <span style={{ color: "#047d95" }}>Battle</span>
          <span>board</span>
        </Text>
        <Button className="button-by-post" variation="default">
          Pending Battle(s)
        </Button>
        <Button
          className="button-by-user"
          variation="default"
          onClick={() => {
            window.location.href = "/battle-request";
          }}
        >
          New Battle
        </Button>
      </View>
    </View>
  );
}
