import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { generateClient } from "aws-amplify/api";
import { UserContext } from '../../UserContext';
import "./board.css";
import { listPosts, listComments, listFriends, listFriendRequests } from "../../graphql/queries";
import { View, Text, Button } from "@aws-amplify/ui-react";

const client = generateClient();


// export default function Board() {
    
//     //const usernames = ["jtcoolio", "choij3163"];
//     const { allUsers } = useContext(UserContext);
//     const [posts, setPosts] = useState([]);
//     const [variables, setVariables] = useState({});
//     // Example data of users with their ranks
//     const exampleData = [
//       { username: "choij3163", totalDripPoints: 50, rank: 1},
//       { username: "lchee", totalDripPoints: 40, rank: 2},
//       { username: "heffe", totalDripPoints: 30, rank: 3},
//       { username: "salem9", totalDripPoints: 20, rank: 4},
//       { username: "idek", totalDripPoints: 10, rank: 5},
//       // Add more users as needed
//     ];

  
//     // State to hold the leaderboard entries
//     const [leaderboardEntries, setLeaderboardEntries] = useState([]);
//     const [selectedData, setSelectedData] = useState(exampleData); // Initialize with exampleData
//     const [rerun, setReRun] = useState(false);
  
//     // Function to fetch leaderboard entries from an API or database
//     const fetchLeaderboardEntries = () => {
//       // In this example, we're using the selectedData directly
//       setLeaderboardEntries(selectedData);
//     };
  
//     // Fetch leaderboard entries when the component mounts
//     useEffect(() => {
//       fetchLeaderboardEntries();
//     }, [selectedData]); // Trigger re-fetch when selectedData changes

//     async function getAllPostsRankedByDripPoints() {
//       try {
//           const postData = await client.graphql({ query: listPosts, variables });
//           const posts = postData.data.listPosts.items;
  
//           // Sort the posts by drip_points in descending order
//           posts.sort((a, b) => b.drip_points - a.drip_points);
  
//           return posts;
//       } catch (error) {
//           console.error('Error fetching and ranking posts:', error);
//           return [];
//       }
//     }

//     async function getTotalDripPointsForUser(username) {
//       let totalDripPoints = 0;
  
//       const postFetchVariables = {
//           filter: {
//               owner: {
//                   eq: username
//               }
//           },
//           limit: 10 // Adjust the limit as needed
//       };
  
//       let userPosts = await client.graphql({
//           query: listPosts,
//           variables: postFetchVariables
//       });
  
//       while (userPosts.data.listPosts.items.length > 0) {
//           let userPostsArr = userPosts.data.listPosts.items;
//           for (let i = 0; i < userPostsArr.length; i++) {
//               const post = userPostsArr[i];
//               totalDripPoints += post.drip_points || 0; // Adding drip points of each post
//           }
//           userPosts = await client.graphql({
//               query: listPosts,
//               variables: postFetchVariables
//           });
//       }
  
//       return totalDripPoints;
//   }


//   async function getUserDripPointsLeaderboard(allUsers) {
//     const userDripPointsList = [];

//     for (const user of allUsers) {
//         const username = user.Username;
//         const totalDripPoints = await getTotalDripPointsForUser(username);
//         userDripPointsList.push({ username, totalDripPoints });
//     }

//     // Sort the list by totalDripPoints in descending order
//     userDripPointsList.sort((a, b) => b.totalDripPoints - a.totalDripPoints);

//     // Assign ranks to each user
//     userDripPointsList.forEach((user, index) => {
//         user.rank = index + 1; // Adding 1 to make the ranks start from 1
//     });

//     return userDripPointsList;
// }



    
//   return (
//       <View className="leaderboard-container">
//         <View className="board">
//           <View className="board2">
//             <Text className="rank-text" children="Rank" />
//             <Text className="user-text" children="User" />
//             <Text className="point-text" children="Points" />
//             <hr className="separator" />
//             <div className="columns-container" style={{ overflow: "auto" }}>
//               {/* First, add a div to contain the columns */}
//               <View className="rank-column">
//                 {leaderboardEntries.map((entry, index) => (
//                   <h2 key={index} style={{ color: "white" }}>{entry.rank}</h2>
//                 ))}
//               </View>
//               <View className="user-column">
//                 {leaderboardEntries.map((entry, index) => (
//                   <h2 key={index} style={{ color: "white" }}>{entry.username}</h2>
//                 ))}
//               </View>
//               <View className="points-column">
//                 {leaderboardEntries.map((entry, index) => (
//                   <h2 key={index} style={{ color: "white" }}>{entry.totalDripPoints}</h2>
//                 ))}
//               </View>
//             </div>
//           </View>
//           <Text className="header-text">
//             <span style={{ color: "#047d95" }}>Leader</span>
//             <span>board</span>
//           </Text>
//           <Button
//             className="button-by-post"
//             variation="default"
//             onClick={async () => {
//               const data = await getAllPostsRankedByDripPoints();
//               setSelectedData(data);
//             }}
//           >
//             By Single Post
//           </Button>
//           <Button
//             className="button-by-user"
//             variation="default"
//             onClick={async () => {
//               const data = await getUserDripPointsLeaderboard(allUsers);
//               setSelectedData(data);
//             }}
//           >
//             By User total
//           </Button>

//         </View>
//       </View>
//   );    
// }

export default function Board() {
  const { allUsers } = useContext(UserContext);
  const [selectedData, setSelectedData] = useState([]); // Initialize with an empty array
  async function getTotalDripPointsForUser(username) {
      let totalDripPoints = 0;
  
      const postFetchVariables = {
          filter: {
              owner: {
                  eq: username
              }
          },
          limit: 10 // Adjust the limit as needed
      };
  
      let userPosts = await client.graphql({
          query: listPosts,
          variables: postFetchVariables
      });
  
      while (userPosts.data.listPosts.items.length > 0) {
          let userPostsArr = userPosts.data.listPosts.items;
          for (let i = 0; i < userPostsArr.length; i++) {
              const post = userPostsArr[i];
              totalDripPoints += post.drip_points || 0; // Adding drip points of each post
          }
          userPosts = await client.graphql({
              query: listPosts,
              variables: postFetchVariables
          });
      }
  
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
          const totalDripPoints = await getTotalDripPointsForUser(username);
          userDripPointsList.push({ username, totalDripPoints });
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



