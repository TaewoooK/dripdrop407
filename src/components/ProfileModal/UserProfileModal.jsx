import React, { useState, useEffect } from "react";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { updatePost } from "../../graphql/mutations";
//import "./ProfilePage.css";
//import HidePeople from "./HidePeople";
import { motion, useAnimate } from "framer-motion";
import {
  Collection,
  Card,
  Heading,
  Image,
  View,
  Divider,
  Button,
  Flex,
  TextField,
  Icon,
  Text,
} from "@aws-amplify/ui-react";
import { MyIcon } from "../../ui-components";
import { getUrl } from "aws-amplify/storage";
import EditProfileNew from "../EditProfileNew";
import {
  listPosts,
  listSavedPosts,
  getPost,
  commentsByPostId,
} from "../../graphql/queries";
import toast, { Toaster } from "react-hot-toast";

const client = generateClient();

export default function UserProfileModal({ user }) {
  const [showComment, setShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsText, setCommentsText] = useState([]);

  const [rerun, setReRun] = useState(false);

  //const [user, setUser] = useState(null);
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [variables, setVariables] = useState({});

  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);
  const [drippoints, setDrippoints] = useState(0);

  const attributeMap = {};

  attributeMap["username"] = user.Username;

  for (let i in user.Attributes) {
    attributeMap[user.Attributes[i].Name] = user.Attributes[i].Value;
  }

  console.log("USER2: ");
  console.log(attributeMap);

  /*useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userAttributes = await fetchUserAttributes();
        const currUserAttributes = await getCurrentUser();
        console.log(userAttributes);
        console.log(currUserAttributes);
        console.log(currUserAttributes.signInDetails);
        setUser(userAttributes);
        setCurrUser(currUserAttributes);
        setVariables({ filter: { owner: { eq: userAttributes.email } } });
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);*/

  const handleCommentsExpansionClick = async (currPostID) => {
    const currPostFields = await client.graphql({
      query: getPost,
      variables: { id: currPostID },
    });
    console.log(currPostFields);
    let enableCommentsValue =
      currPostFields.data.getPost.enable_comments && !showComment;
    setShow(enableCommentsValue);
    if (enableCommentsValue) {
      const getComments = await client.graphql({
        query: commentsByPostId,
        variables: { postId: currPostID },
      });
      const commentsList = getComments.data.commentsByPostId.items;
      //console.log("COMMENTS HERE" + commentsList);
      const commentsTextArray = commentsList.map((comment) => comment.text);
      setComments(commentsList);
      setCommentsText(commentsTextArray);
      console.log(commentsList);
      //console.log(commentsText);
      //console.log(commentsTextArray);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postData = await client.graphql({
          query: listPosts,
          variables: { filter: { owner: { eq: attributeMap.username } } },
        });
        setPosts(postData.data.listPosts.items);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    if (user) {
      fetchPosts();
    }
    setReRun(false);
  }, [user, rerun]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagePromises = posts.map(async (post) => {
          const postData = await getUrl({ key: post.postImageKey });
          return {
            id: post.id,
            description: post.description,
            imageUrl: postData.url,
            hiddenPeople: post.hiddenPeople,
          };
        });

        const fetchedImages = await Promise.all(imagePromises);
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (posts.length > 0) {
      fetchImages();
    }
    setReRun(false);
  }, [posts, rerun]);

  const getTotalDripPointsForUser = async () => {
    let totalDripPoints = 0;
    //let nextToken = null; // Initialize pagination token

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      totalDripPoints += post.drip_points || 0;
    }

    setDrippoints(totalDripPoints);

    console.log("DRIP " + totalDripPoints);
    console.log(posts);

    return totalDripPoints;
  };

  useEffect(() => {
    getTotalDripPointsForUser();
  }, [posts]);

  return (
    <div
      style={{
        maxWidth: "500px", // Increased maximum width
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#d6d8db",
        padding: "30px", // Increased padding for spacing
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div style={styles.profile}>
          <Toaster position="top-right" reverseOrder={false} />
          <span style={{ margin: "0 10px" }}></span>
          <h1 style={styles.heading}>{attributeMap.username}</h1>
          <h2 style={styles.info}>Drip Points: {drippoints}</h2>
          <h2 style={styles.info}>
            Preferred Username: {attributeMap.preferred_username}
          </h2>
          <h2 style={styles.info}>Email: {attributeMap.email}</h2>
          <h2 style={styles.info}>
            Name: {attributeMap.name} {attributeMap.family_name}
          </h2>
          <h2 style={styles.info}>Gender: {attributeMap.gender}</h2>
        </div>
      ) : (
        <p style={styles.error}>
          Error fetching user data. Please try again later.
        </p>
      )}

      {images.length > 0 && (
        <div>
          <Collection
            items={images}
            type="list"
            direction="row"
            wrap="wrap"
            isPaginated
            itemsPerPage={1}
          >
            {(item, index) => (
              <View grow="1" key={index}>
                <Card
                  key={index}
                  borderRadius="medium"
                  maxWidth="20rem"
                  variation="outlined"
                  position="relative" // Set the position of the Card to relative
                  //display="flex" // Use flexbox layout for the Card container
                >
                  <MyIcon
                    position="absolute" // Position the icon absolutely within the Card
                    //top="0" // Align the icon to the top of the Card
                    //right="0" // Align the icon to the right of the Card
                    left="320"
                    className="chat-icon"
                    type="chat"
                    onClick={() => handleCommentsExpansionClick(item.id)}
                  ></MyIcon>
                  <Image src={item.imageUrl} alt="Post made from user" />
                  <View padding="xs">
                    <Divider padding="xs" />
                    <Heading padding="medium">{item.title}</Heading>
                    <h3 variation="primary" isFullWidth>
                      {item.description}
                      {console.log(item)}
                    </h3>
                  </View>
                </Card>
              </View>
            )}
          </Collection>
        </div>
      )}

      {showComment && (
        <motion.View
          className="comment-container"
          initial={{ x: "25vw" }}
          animate={{ x: 0 }}
        >
          <motion.Text
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            className="header-text"
          >
            Comments
          </motion.Text>
          <Flex className="text-field-container"></Flex>
          <View
            className="icon-container"
            width="40px"
            height="40px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            overflow="hidden"
            position="absolute"
            top="28px"
            left="292px"
            padding="0px 0px 0px 0px"
          >
            <Icon
              width="22.5px"
              height="25px"
              viewBox={{ minX: 0, minY: 0, width: 22.5, height: 25 }}
              paths={[
                {
                  d: "M23.2071 0.707107C23.5976 0.316583 23.5976 -0.316583 23.2071 -0.707107C22.8166 -1.09763 22.1834 -1.09763 21.7929 -0.707107L23.2071 0.707107ZM10 12.5L9.29289 11.7929C8.90237 12.1834 8.90237 12.8166 9.29289 13.2071L10 12.5ZM21.7929 25.7071C22.1834 26.0976 22.8166 26.0976 23.2071 25.7071C23.5976 25.3166 23.5976 24.6834 23.2071 24.2929L21.7929 25.7071ZM13.2071 0.707107C13.5976 0.316583 13.5976 -0.316583 13.2071 -0.707107C12.8166 -1.09763 12.1834 -1.09763 11.7929 -0.707107L13.2071 0.707107ZM0 12.5L-0.707107 11.7929C-1.09763 12.1834 -1.09763 12.8166 -0.707107 13.2071L0 12.5ZM11.7929 25.7071C12.1834 26.0976 12.8166 26.0976 13.2071 25.7071C13.5976 25.3166 13.5976 24.6834 13.2071 24.2929L11.7929 25.7071ZM21.7929 -0.707107L9.29289 11.7929L10.7071 13.2071L23.2071 0.707107L21.7929 -0.707107ZM9.29289 13.2071L21.7929 25.7071L23.2071 24.2929L10.7071 11.7929L9.29289 13.2071ZM11.7929 -0.707107L-0.707107 11.7929L0.707107 13.2071L13.2071 0.707107L11.7929 -0.707107ZM-0.707107 13.2071L11.7929 25.7071L13.2071 24.2929L0.707107 11.7929L-0.707107 13.2071Z",
                  stroke: "rgba(255,255,255,1)",
                  fillRule: "nonzero",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                },
              ]}
              display="block"
              gap="unset"
              alignItems="unset"
              justifyContent="unset"
              position="absolute"
              top="18.75%"
              bottom="18.75%"
              left="21.88%"
              right="21.88%"
            ></Icon>
          </View>
          <View
            width="280px"
            height="310px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            overflow="auto" // Set overflow to "auto" for scrollbars only when needed
            position="absolute"
            top="50px"
            left="0px"
            padding="0px 0px 0px 0px"
          >
            {commentsText.map((text, index) => {
              // Calculate the top position dynamically based on the height of previous cards
              const topPosition =
                index === 0
                  ? 11
                  : comments
                      .slice(0, index)
                      .reduce(
                        (acc, curr) => acc + (curr.length > 50 ? 90 : 60),
                        11
                      ); // Adjust the height accordingly
              return (
                <Card
                  key={index}
                  width="240px"
                  height="auto"
                  position="absolute"
                  display="flex"
                  backgroundColor="rgba(70,70,70,1)"
                  top={`${topPosition}px`}
                  left="10px"
                  borderRadius="25px"
                  variation="outline"
                  style={{ margin: 10, display: "flex", alignItems: "center" }}
                >
                  <Text
                    color="rgba(255,255,255,1)"
                    style={{ fontSize: 12, margin: 2, wordBreak: "break-word" }}
                  >
                    {text}
                  </Text>
                  {/*(currUser.username == posts[currentImageIndex].owner ||
                    currUser.username == comments[index].commentAuthorId) && (
                    <Icon
                      width="22.5px"
                      height="25px"
                      viewBox={{ minX: 0, minY: 0, width: 22.5, height: 25 }}
                      position="absolute"
                      left="210px"
                      style={{ cursor: "pointer" }} // Add cursor: pointer style
                      onClick={() => handleIconClick((index = { index }))} // Call the handler function on icon click
                      paths={[
                        {
                          d: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
                          stroke: "rgba(255,255,255,1)",
                          fillRule: "nonzero",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                        },
                      ]}
                    ></Icon>
                    )*/}
                </Card>
              );
            })}
          </View>
        </motion.View>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  profile: {
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "0px",
    marginTop: "0px",
  },
  info: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  error: {
    color: "red",
  },
  editButton: {
    marginBottom: "20px",
  },
};
