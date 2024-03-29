import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { generateClient } from "aws-amplify/api";
import { UserContext } from '../../UserContext';
import "./board.css";
import { listPosts, listComments, listFriends, listFriendRequests } from "../../graphql/queries";
import { View, Text, Button } from "@aws-amplify/ui-react";

const client = generateClient();


export default function Board() {
  const { allUsers } = useContext(UserContext);
  const [selectedData, setSelectedData] = useState([]); // Initialize with an empty array
  async function getTotalDripPointsForUser(username) {
    let totalDripPoints = 0;
    let nextToken = null; // Initialize pagination token

    do {
        const postFetchVariables = {
            filter: {
                owner: {
                    eq: username
                }
            },
            limit: 10, // Adjust the limit as needed
            nextToken: nextToken // Include the pagination token
        };

        const userPosts = await client.graphql({
            query: listPosts,
            variables: postFetchVariables
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
          const postData = await client.graphql({ query: listPosts });
          const posts = postData.data.listPosts.items;
  
          // Sort the posts by drip_points in descending order
          posts.sort((a, b) => b.drip_points - a.drip_points);
  
          // Convert the posts data into the desired format
          const convertedData = posts.map((post, index) => ({
              username: post.owner,
              totalDripPoints: post.drip_points,
              rank: index + 1 // Adding 1 to make the ranks start from 1
          }));
  
          return convertedData;
      } catch (error) {
          console.error('Error fetching and ranking posts:', error);
          return [];
      }
  }
  
  async function getUserDripPointsLeaderboard(allUsers) {
    const userDripPointsList = [];

    for (const user of allUsers) {
        const username = user.Username;
        console.log(username);
        try {
            const totalDripPoints = await getTotalDripPointsForUser(username);
            console.log(totalDripPoints);
            userDripPointsList.push({ username, totalDripPoints });
        } catch (error) {
            console.error(`Error fetching drip points for user ${username}:`, error);
        }
    }

    // Sort the list by totalDripPoints in descending order
    userDripPointsList.sort((a, b) => b.totalDripPoints - a.totalDripPoints);

    // Assign ranks to each user
    userDripPointsList.forEach((user, index) => {
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
                              <h2 key={index} style={{ color: "white" }}>{entry.rank}</h2>
                          ))}
                      </View>
                      <View className="user-column">
                          {selectedData.map((entry, index) => (
                              <h2 key={index} style={{ color: "white" }}>{entry.username}</h2>
                          ))}
                      </View>
                      <View className="points-column">
                          {selectedData.map((entry, index) => (
                              <h2 key={index} style={{ color: "white" }}>{entry.totalDripPoints}</h2>
                          ))}
                      </View>
                  </div>
              </View>
              <Text className="header-text">
                  <span style={{ color: "#047d95" }}>Leader</span>
                  <span>board</span>
              </Text>
              <Button
                  className="button-by-post"
                  variation="default"
                  onClick={async () => {
                      const data = await getAllPostsRankedByDripPoints();
                      setSelectedData(data);
                  }}
              >
                  By Single Post
              </Button>
              <Button
                  className="button-by-user"
                  variation="default"
                  onClick={async () => {
                      const data = await getUserDripPointsLeaderboard(allUsers);
                      setSelectedData(data);
                  }}
              >
                  By User total
              </Button>
          </View>
      </View>
  );    
}



