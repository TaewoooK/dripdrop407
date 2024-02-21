import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { uploadData, getUrl } from "aws-amplify/storage";
import { createPost, updatePost } from "../graphql/mutations";
import { fetchUserAttributes } from "aws-amplify/auth";
import awsExports from "../aws-exports";
import { Message, Image } from "@aws-amplify/ui-react";
import { Loader } from "@aws-amplify/ui-react";

const client = generateClient();

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const [succeeded, setSucceeded] = useState(0);

  const [user, setUser] = useState(null);

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userAttributes = await fetchUserAttributes();
        console.log(userAttributes);
        setUser(userAttributes);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  console.log(user);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();

      // Define what happens when the file is loaded
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };

      // Read the uploaded file as a data URL
      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    setSucceeded(2);
    // Handle post submission logic here
    console.log("Image:", image);
    console.log("Description:", description);

    const currDate = new Date().toISOString();

    const response = await client.graphql({
      query: createPost,
      variables: {
        input: {
          owner: user.email,
          description: description,
          comments: String,
          drip_points: 0,
          createdAt: currDate,
          enable_comments: true,
          postImageKey: "",
        },
      },
    });

    const postContext = response.data.createPost;
    if (!postContext) {
      console.log("Failed to create post");
      return;
    }
    const imageUpload = await uploadData({
      key: `${user.email} + ${currDate}` + "image.png",
      data: image,
      options: {
        contentType: "image/png",
      },
    }).result;

    const updatePostDetails = {
      id: postContext.id,
      postImageKey: imageUpload?.key,
    };

    const updatePostResponse = await client.graphql({
      query: updatePost,
      variables: { input: updatePostDetails },
    });

    const updatedPost = updatePostResponse.data.updatePost;
    if (!updatedPost.postImageKey) return;
    const signedURL = await getUrl({ key: updatedPost.postImageKey });
    console.log(signedURL);

    setSucceeded(1);
  };

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
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
        Make a Post
      </h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{
          display: "block",
          marginBottom: "30px",
          width: "100%",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          boxSizing: "border-box",
        }}
      />
      {image && (
        <Image
          alt="Post Image"
          src={imageUrl}
          objectFit="initial"
          objectPosition="50% 50%"
          backgroundColor="initial"
          height="75%"
          width="75%"
          opacity="100%"
          onClick={() => alert("📸 Say cheese!")}
        />
      )}
      <textarea
        placeholder="Enter description"
        value={description}
        onChange={handleDescriptionChange}
        style={{
          width: "100%",
          height: "150px", // Increased height of textarea
          marginBottom: "30px",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          boxSizing: "border-box",
        }}
      ></textarea>
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "#007bff",
          color: "#ffffff",
          border: "none",
          padding: "15px 24px", // Increased padding for the button
          borderRadius: "5px",
          cursor: "pointer",
          display: "block",
          width: "100%",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Submit
      </button>
      <div style={{ height: "20px" }}></div> {/* Added empty div for spacing */}
      <div>
        {succeeded == 2 && <Loader size="large" />}
        {succeeded == 1 && (
          <Message
            colorTheme="success"
            heading="YES!"
            isDismissible={true}
            onDismiss={() => {
              setSucceeded(false);
            }}
          >
            Your new fit is uploaded!
          </Message>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
