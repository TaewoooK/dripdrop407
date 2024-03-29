import * as React from "react";
import { useEffect, useState } from "react";
import "./board.css";
import { View, Text, Button } from "@aws-amplify/ui-react";


export default function Board() {
    // Example data of users with their ranks
    const exampleData = [
      { rank: 1, user: "Alice", points: 100 },
      { rank: 2, user: "Bob", points: 90 },
      { rank: 3, user: "Charlie", points: 80 },
      { rank: 4, user: "Surya", points: 70 },
      { rank: 5, user: "Jeff", points: 60 },
      { rank: 6, user: "LJ", points: 50 },
      { rank: 7, user: "Eddie", points: 40 },
      { rank: 8, user: "Aurin", points: 30 },
      { rank: 9, user: "Justin", points: 20 },
      // Add more users as needed
    ];

    const exampleData2 = [
      { rank: 1, user: "a", points: 100 },
      { rank: 2, user: "b", points: 90 },
      { rank: 3, user: "c", points: 80 },
      { rank: 4, user: "s", points: 70 },
      { rank: 5, user: "j", points: 60 },
      { rank: 6, user: "LJ", points: 50 },
      { rank: 7, user: "e", points: 40 },
      { rank: 8, user: "a", points: 30 },
      { rank: 9, user: "j", points: 20 },
      // Add more users as needed
    ];
  
    // State to hold the leaderboard entries
    const [leaderboardEntries, setLeaderboardEntries] = useState([]);
    const [selectedData, setSelectedData] = useState(exampleData); // Initialize with exampleData
  
    // Function to fetch leaderboard entries from an API or database
    const fetchLeaderboardEntries = () => {
      // In this example, we're using the selectedData directly
      setLeaderboardEntries(selectedData);
    };
  
    // Fetch leaderboard entries when the component mounts
    useEffect(() => {
      fetchLeaderboardEntries();
    }, [selectedData]); // Trigger re-fetch when selectedData changes

    // async function handleDeletePosts() {
    //   const postFetchVariables = {
    //     filter: {
    //       owner: {
    //         eq: myUser.username
    //       }
    //     },
    //     limit: 10
    //   }
    //   let userPosts = await client.graphql({
    //     query: listPosts,
    //     variables: postFetchVariables
    //   });
    //   while (userPosts.data.listPosts.items.length > 0) {
    //     let userPostsArr = userPosts.data.listPosts.items
    //     for (let i = 0; i < userPostsArr.length; i++) {
    //       const post = userPostsArr[i]
    //       const deletePostInput = {
    //         input: {
    //           id: post.id
    //         }
    //       }
    //       console.log(i)
    //       console.log(deletePostInput)
    //       await remove({
    //         key: post.postImageKey
    //       })
    //       const deletedPost = await client.graphql({
    //         query: deletePost,
    //         variables: deletePostInput
    //       })
    //     }
    //     userPosts = await client.graphql({
    //       query: listPosts,
    //       variables: postFetchVariables
    //     });
    //   }
    // }


    
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
                {leaderboardEntries.map((entry, index) => (
                  <h2 key={index} style={{ color: "white" }}>{index + 1}</h2>
                ))}
              </View>
              <View className="user-column">
                {leaderboardEntries.map((entry, index) => (
                  <h2 key={index} style={{ color: "white" }}>{entry.user}</h2>
                ))}
              </View>
              <View className="points-column">
                {leaderboardEntries.map((entry, index) => (
                  <h2 key={index} style={{ color: "white" }}>{entry.points}</h2>
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
            onClick={() => setSelectedData(exampleData)}
          >
            By Post
          </Button>
          <Button
            className="button-by-user"
            variation="default"
            onClick={() => setSelectedData(exampleData2)}
          >
            By User
          </Button>
        </View>
      </View>
    );    
}
