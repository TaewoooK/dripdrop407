import React, { useState, useEffect } from "react";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { updatePost } from "../graphql/mutations";
import { MyIcon } from "../ui-components";
import "./ProfilePage.css";
import HidePeople from "./HidePeople";

import {
  Collection,
  Card,
  Heading,
  Image,
  View,
  Divider,
  Button,
} from "@aws-amplify/ui-react";
import { getUrl } from "aws-amplify/storage";
import EditProfileNew from "../components/EditProfileNew";
import { listPosts, listSavedPosts } from "../graphql/queries";
import toast, { Toaster } from "react-hot-toast";

const client = generateClient();

const modalContainerStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black background
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999, // higher z-index to ensure it's above other content
};

const modalStyles = {
  backgroundColor: "rgba(34, 34, 34, 1)",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
};

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showActionCenter, setShowActionCenter] = React.useState(false);
  const [hiddenSelect, setHiddenSelect] = useState([]);
  const [rerun, setReRun] = useState(false);

  const toggleActionCenter = (image) => {
    console.log(image);
    setSelectedImage(image);
    setHiddenSelect(image.hiddenPeople);
    setShowActionCenter(!showActionCenter);
  };

  const Modal = ({ onClose }) => {
    return (
      <div style={modalContainerStyles}>
        <div style={modalStyles}>
          <EditProfileNew onClickEvent={handleClickChild} />
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClickChild = async () => {
    console.log("Received click event");
    closeModal();
    const userAttributes = await fetchUserAttributes();
    setUser(userAttributes);
  };

  const handleViewSavedPosts = async () => {
    console.log(showingSavedPosts);
    if (showingSavedPosts) {
      setShowingSavedPosts(false);
      console.log("View posts by:", currUser.username);
      try {
        const postData = await client.graphql({ query: listPosts, variables });
        setPosts(postData.data.listPosts.items);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    } else {
      console.log("View saved posts for:", currUser.username);
      try {
        const savedPosts = await client.graphql({
          query: listSavedPosts,
          variables: { filter: { username: { eq: currUser.username } } },
        });
        const savedPostIds = savedPosts.data.listSavedPosts.items[0].postIds;
        console.log("Saved post ids:", savedPostIds);
        if (savedPostIds.length === 0) {
          // setPosts([]);
          toast.error("No saved posts found");
          setShowingSavedPosts(false);
        } else {
          // Fetch saved posts
          let filterMembers = savedPostIds.map((id) =>
            JSON.parse(`{"id": {"eq": "${id}"}}`)
          );
          let filter = { or: filterMembers };
          const savedPostsData = await client.graphql({
            query: listPosts,
            variables: { filter: filter },
          });
          setShowingSavedPosts(true);
          console.log("Saved posts data:", savedPostsData.data.listPosts.items);
          setPosts(savedPostsData.data.listPosts.items);
        }
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    }
  };

  const [user, setUser] = useState(null);
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setEdit] = useState(false);

  const [variables, setVariables] = useState({});

  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);

  const [showingSavedPosts, setShowingSavedPosts] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postData = await client.graphql({ query: listPosts, variables });
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

  const onSave = async () => {
    try {
      const todoDetails = {
        id: selectedImage.id,
        hiddenPeople: hiddenSelect,
      };

      const postData = await client.graphql({
        query: updatePost,
        variables: { input: todoDetails },
      });

      setReRun(true);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
    setShowActionCenter(false);
  };

  return (
    <div
      style={{
        maxWidth: "800px", // Increased maximum width
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "rgba(34, 34, 34, 1)",
        padding: "30px", // Increased padding for spacing
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div backgroundColor="rgba(0,0,0,0.5)">
        {isModalOpen && <Modal onClose={closeModal} />}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div style={styles.profile}>
          <Toaster position="top-right" reverseOrder={false} />

          <h1 style={styles.heading}>Welcome <span style={{color: "white"}}>{currUser.username}!</span></h1>
          <Button style={styles.editButton} onClick={openModal}>
            Edit Profile
          </Button>
          <span style={{ margin: "0 10px" }}></span>
          <Button style={styles.editButton} onClick={handleViewSavedPosts}>
            {showingSavedPosts ? "Show Posts" : "Saved Posts"}
          </Button>
          <h2 style={styles.info}>
            Preferred Username: <span style={{color: "white"}}>{user.preferred_username}</span>
          </h2>
          <h2 style={styles.info}>Email: <span style={{color: "white"}}>{user.email}</span></h2>
          <h2 style={styles.info}>
            Email Verified: <span style={{color: "white"}}>{user.email_verified ? "Yes" : "No"}</span>
          </h2>
          <h2 style={styles.info}>
            Name: <span style={{color: "white"}}>{user.name} {user.family_name}</span>
          </h2>
          <h2 style={styles.info}>Gender: <span style={{color: "white"}}>{user.gender}</span></h2>
        </div>
      ) : (
        <p style={styles.error}>
          Error fetching user data. Please try again later.
        </p>
      )}
      {showActionCenter && (
        <div className="overlay" onClick={toggleActionCenter}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <HidePeople
              selectedFriends={hiddenSelect}
              setSelectedFriends={setHiddenSelect}
            />
            <button onClick={() => onSave()}>Save</button>
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div>
          <Collection
            items={images}
            type="list"
            direction="row"
            wrap="wrap"
            isPaginated
            itemsPerPage={3}
          >
            {(item, index) => (
              <Button grow="1" key={index}>
                <Card
                  key={index}
                  borderRadius="medium"
                  maxWidth="20rem"
                  variation="outlined"
                >
                  <Image
                    src={item.imageUrl}
                    alt="Post made from user"
                    onClick={() => toggleActionCenter(item)}
                  />
                  <View padding="xs">
                    <Divider padding="xs" />
                    <Heading padding="medium">{item.title}</Heading>
                    <h3 variation="primary" isFullWidth>
                      {item.description}
                    </h3>
                  </View>
                </Card>
              </Button>
            )}
          </Collection>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    color: "white"
  },
  profile: {
    textAlign: "center",
    color: "white"
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    color: "#047d95"
  },
  info: {
    fontSize: "18px",
    marginBottom: "10px",
    textAlign: "left",
    color: "#047d95"
  },
  error: {
    color: "red",
  },
  editButton: {
    marginBottom: "20px",
    color: "white"
  },
};

export default ProfilePage;
