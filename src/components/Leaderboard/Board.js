import { UserContext } from "../../UserContext";

import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { generateClient } from "aws-amplify/api";
import { View, Text, Button, SelectField } from "@aws-amplify/ui-react";
import "./board.css";

import {
  listPosts,
} from "../../graphql/queries";
import {
    onCreatePost,
    onDeletePost
} from "../../graphql/subscriptions"

const client = generateClient();

// DATE CONSTANTS
const currentDate = new Date();
const startOfDay = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate()
);
const endOfDay = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() + 1
);

export default function Board() {
  const { allUsers } = useContext(UserContext);
  const [user, setSelectedUser] = useState(); 
  const [selectedData, setSelectedData] = useState([]); // Initialize with an empty array

  const [time, setTime] = useState("alltime");
  const [boardState, setBoardState] = useState("");

  useEffect(() => {
    const subscriptions = [
      { subscriptionQuery: onCreatePost, action: fetchData },
      { subscriptionQuery: onDeletePost, action: fetchData },
    ];

    const subscriptionRefs = subscriptions.map(
      ({ subscriptionQuery, action }) => {
        return client
          .graphql({ query: subscriptionQuery })
          .subscribe({ next: action });
      }
    );

    return () => {
      subscriptionRefs.forEach((subscription) => subscription.unsubscribe());
    };
  }, [])

  useEffect(() => {
    fetchData();
  }, [time, boardState]);

  async function fetchData() {
    switch (boardState) {
      case "byPost":
        setSelectedData(await getAllPostsRankedByDripPoints());
        break;
      case "byUser":
        setSelectedData(await getUserDripPointsLeaderboard(allUsers));
        break;
      default:
    }
  }

  function getPostFetchVariables(username = "") {
    switch (boardState) {
      case "byPost":
        switch (time) {
          case "today":
            return {
              filter: {
                createdAt: {
                  between: [startOfDay.toJSON(), endOfDay.toJSON()],
                },
              },
              limit: 10, // Adjust the limit as needed
              nextToken: null, // Include the pagination token
            };
          // "allTime"
          default:
            return {
              limit: 10, // Adjust the limit as needed
              nextToken: null, // Include the pagination token
            };
        }
      // "byUser"
      default:
        switch (time) {
          case "today":
            return {
              filter: {
                owner: {
                  eq: username,
                },
                createdAt: {
                  between: [startOfDay.toJSON(), endOfDay.toJSON()],
                },
              },
              limit: 10, // Adjust the limit as needed
              nextToken: null, // Include the pagination token
            };
          // "allTime"
          default:
            return {
              filter: {
                owner: {
                  eq: username,
                },
              },
              limit: 10, // Adjust the limit as needed
              nextToken: null, // Include the pagination token
            };
        }
    }
  }

  async function getTotalDripPointsForUser(username) {
    let totalDripPoints = 0;
    let nextToken = null; // Initialize pagination token

    do {
      const userPosts = await client.graphql({
        query: listPosts,
        variables: getPostFetchVariables(username),
      });

      const posts = userPosts.data.listPosts.items;
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        totalDripPoints += post.drip_points || 0;
      }

      // Update the pagination token for the next iteration
      nextToken = userPosts.data.listPosts.nextToken;
    } while (nextToken); // Continue fetching until there are no more posts

    return totalDripPoints;
  }

  async function getAllPostsRankedByDripPoints() {
    try {
      const postData = await client.graphql({
        query: listPosts,
        variables: getPostFetchVariables(),
      });
      const posts = postData.data.listPosts.items;

      // Sort the posts by drip_points in descending order
      posts.sort((a, b) => b.drip_points - a.drip_points);

      // Convert the posts data into the desired format
      const convertedData = posts.map((post, index) => ({
        username: post.owner,
        totalDripPoints: post.drip_points,
        rank: index + 1, // Adding 1 to make the ranks start from 1
      }));

      return convertedData;
    } catch (error) {
      console.error("Error fetching and ranking posts:", error);
      return [];
    }
  }

  async function getUserDripPointsLeaderboard(allUsers) {
    const userDripPointsList = [];
  
    for (const user of allUsers) {
      const username = user.Username;
      try {
        const totalDripPoints = await getTotalDripPointsForUser(username);
        userDripPointsList.push({ username, totalDripPoints });
      } catch (error) {
        console.error(
          `Error fetching drip points for user ${username}:`,
          error
        );
      }
    }
  
    // Sort the list by totalDripPoints in descending order
    userDripPointsList.sort((a, b) => b.totalDripPoints - a.totalDripPoints);
  
    // Assign ranks to each user
    userDripPointsList.forEach((user, index) => {
      user.rank = index + 1; // Adding 1 to make the ranks start from 1
      user.rank = index + 1; // Adding 1 to make the ranks start from 1
    });
  
    return userDripPointsList;
  }

  useEffect(() => {
    setSelectedData([]);
  }, [allUsers]);

  return (
    <View className="leaderboard-container">
      <View className="board">
        <View className="board2">
          <Text className="rank-text" children="Rank" />
          <Text className="user-text" children="User" />
          <Text className="point-text" children="Points" />
          <hr className="separator" />
          <div className="columns-container" style={{ overflow: "auto" }}>
            {/* First, add a div to contain the columns */}
            <View className="rank-column">
              {selectedData.map((entry, index) => (
                <h2 key={index} style={{ color: "white" }}>
                  {entry.rank}
                </h2>
              ))}
            </View>
            <View className="user-column">
              {selectedData.map((entry, index) => (
                <h2 key={index} style={{ color: "white" }}>
                  {entry.username}
                </h2>
              ))}
            </View>
            <View className="points-column">
              {selectedData.map((entry, index) => (
                <h2 key={index} style={{ color: "white" }}>
                  {entry.totalDripPoints}
                </h2>
              ))}
            </View>
          </div>
        </View>
        <Text className="board-header-text">
          <span style={{ color: "#047d95" }}>Leader</span>
          <span>board</span>
        </Text>
        <SelectField
          className="time-select"
          variation="quiet"
          label="Time"
          labelHidden
          iconColor="white"
          value={time}
          onChange={async (e) => setTime(e.target.value)}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0)",
          }}
        >
          <option value="allTime">All Time</option>
          <option value="today">Today</option>
        </SelectField>
        <Button
          className="button-by-post"
          variation="default"
          onClick={() => setBoardState("byPost")}
        >
          By Single Post
        </Button>
        <Button
          className="button-by-user"
          variation="default"
          onClick={() => setBoardState("byUser")}
        >
          By User total
        </Button>
      </View>
    </View>
  );
}
