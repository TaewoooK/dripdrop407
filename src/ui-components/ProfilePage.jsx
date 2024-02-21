import React, { useState, useEffect } from "react";
import awsconfig from "../aws-exports";
import { fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { listPosts } from "../graphql/queries";
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

const client = generateClient();

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [variables, setVariables] = useState({});

  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userAttributes = await fetchUserAttributes();
        console.log(userAttributes);
        setUser(userAttributes);
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
  }, [user]);

  let listofimages = [];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagePromises = posts.map(async (post) => {
          const postData = await getUrl({ key: post.postImageKey });
          return {
            description: post.description,
            imageUrl: postData.url,
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
          <h1 style={styles.heading}>Welcome!</h1>
          <h2 style={styles.info}>Email: {user.email}</h2>
          <h2 style={styles.info}>
            Email Verified: {user.email_verified ? "Yes" : "No"}
          </h2>
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
                  <Image src={item.imageUrl} alt="Post made from user" />
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
  },
  profile: {
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  info: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  error: {
    color: "red",
  },
};

export default ProfilePage;