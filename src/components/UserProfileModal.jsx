import React, { useState, useEffect } from "react";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { updatePost } from "../graphql/mutations";
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
import { MyIcon } from "../ui-components";
import { getUrl } from "aws-amplify/storage";
import EditProfileNew from "../components/EditProfileNew";
import {
  listPosts,
  listSavedPosts,
  getPost,
  commentsByPostId,
} from "../graphql/queries";
import toast, { Toaster } from "react-hot-toast";

const client = generateClient();

export default function UserProfileModal(props) {
  const { user } = props;

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
    marginTop: "0px"
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
