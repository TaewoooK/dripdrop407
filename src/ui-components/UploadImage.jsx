import React, { useState } from "react";
import { generateClient } from "aws-amplify/api";
import { uploadData } from "aws-amplify/storage";
import { createPost } from "../graphql/mutations";
import awsExports from "../aws-exports";

const client = generateClient();

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

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
        },
      }).result;
      console.log("Succeeded: ", result);
    } catch (error) {
      console.log("Error : ", error);
    }

    console.log(result);

    try {
      const newPost = await client.graphql({
        query: createPost,
        variables: {
          input: {
            name: "Lorem ipsum dolor sit amet",
            description: "Lorem ipsum dolor sit amet",
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
