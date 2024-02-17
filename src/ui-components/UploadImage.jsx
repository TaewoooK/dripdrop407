import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { uploadData } from "aws-amplify/storage";
import { createPost } from "../graphql/mutations";
import awsExports from "../aws-exports";
import { fetchUserAttributes } from "aws-amplify/auth";

const client = generateClient();

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const [user, setUser] = useState(null);

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
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    // Handle post submission logic here
    console.log("Image:", image);
    console.log("Description:", description);

    let result = "test";

    try {
      result = await uploadData({
        key: new Date().toISOString() + image.name,
        data: image,
        bucket: awsExports.aws_user_files_s3_bucket,
        options: {
          accessLevel: "public", // defaults to `guest` but can be 'private' | 'protected' | 'guest'
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              console.log(
                `Upload progress ${
                  Math.round(transferredBytes / totalBytes) * 100
                } %`
              );
            }
          },
        },
      }).result;
      console.log("Succeeded: ", result);
    } catch (error) {
      console.log("Error : ", error);
    }

    console.log(result);

    // const postId = user.email + new Date().toISOString();

    try {
      const newPost = await client.graphql({
        query: createPost,
        variables: {
          input: {
            postId: "test PostId",
            owner: "test Owner",
            description: description,
            comments: String,
            drip_points: 0,
            createdAt: new Date().toISOString(),
            enable_comments: true,
            image: {
              bucket: awsExports.aws_user_files_s3_bucket,
              region: awsExports.aws_user_files_s3_bucket_region,
              key: result.key,
            },
          },
        },
      }).resultData;
      console.log("Succeeded: but where?", newPost);
    } catch (error) {
      console.log("Error : ", error);
    }
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
    </div>
  );
};

export default UploadImage;
