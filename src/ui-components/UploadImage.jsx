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
        key: image.name,
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

    const postId = user.email + new Date().toISOString();

    try {
      const newPost = await client.graphql({
        query: createPost,
        variables: {
          input: {
            postId: postId,
            owner: user.email,
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
    <div>
      <h2>Make a Post</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <textarea
        placeholder="Enter description"
        value={description}
        onChange={handleDescriptionChange}
      ></textarea>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default UploadImage;
