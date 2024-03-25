import React, { useState, useEffect, useContext } from "react";
import { generateClient } from "aws-amplify/api";
import { uploadData, getUrl } from "aws-amplify/storage";
import { createPost, updatePost } from "../graphql/mutations";
import { fetchUserAttributes } from "aws-amplify/auth";
import awsExports from "../aws-exports";
import { Message, Image } from "@aws-amplify/ui-react";
import { Loader } from "@aws-amplify/ui-react";
import HidePeople from "./HidePeople";
import { UserContext } from "../UserContext";

const client = generateClient();

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const [hiddenSelect, setHiddenSelect] = useState([]);

  const [succeeded, setSucceeded] = useState(0);

  const [user, setUser] = useState(null);

  const [imageUrl, setImageUrl] = useState(null);
  const { allUsers, myUser } = useContext(UserContext);

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

  const [isChecked, setIsChecked] = useState(false);

  // Handler function to toggle the checkbox state
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    console.log(!isChecked);
    console.log("comments checked/unchecked");
  };

  const handleSubmit = async () => {
    console.log("hiddenSelect:" + hiddenSelect);

    try {
      setSucceeded(2);
      // Handle post submission logic here
      console.log("Image:", image);
      console.log("Description:", description);
      let commentEnabled = isChecked;

      const currDate = new Date().toISOString();

      const response = await client.graphql({
        query: createPost,
        variables: {
          input: {
            owner: myUser.username,
            description: description,
            comments: String,
            drip_points: 0,
            createdAt: currDate,
            enable_comments: commentEnabled,
            postImageKey: "",
            hiddenPeople: hiddenSelect,
          },
        },
      });

      console.log("Logging response from createPost");
      console.log(response);

      const postContext = response.data.createPost;
      if (!postContext) {
        console.log("Failed to create post");
        return;
      }
      const imageUpload = await uploadData({
        key: `${myUser.username} + ${currDate}` + "image.png",
        data: image,
        options: {
          contentType: "image/png",
        },
      }).result;

      const updatePostDetails = {
        id: postContext.id,
        postImageKey: imageUpload?.key,
        enable_comments: commentEnabled,
      };

      const updatePostResponse = await client.graphql({
        query: updatePost,
        variables: { input: updatePostDetails },
      });

      const updatedPost = updatePostResponse.data.updatePost;
      // console.log("Logging response from updatePost")
      // console.log(updatedPost)
      if (!updatedPost.postImageKey) return;
      const signedURL = await getUrl({ key: updatedPost.postImageKey });
      console.log(signedURL);

      setSucceeded(1);
    } catch (error) {
      setSucceeded(3);
    }
  };

  console.log("In Upload Image: " + hiddenSelect);

  return (
    <div
      style={{
        maxWidth: "500px", // Increased maximum width
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#222222",
        padding: "30px", // Increased padding for spacing
        paddingTop: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "white" }}>
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
          color: "white"
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
      <div style={{ marginBottom: "30px" }}>
        <textarea
          placeholder="Enter description"
          value={description}
          onChange={handleDescriptionChange}
          style={{
            width: "100%",
            height: "150px", // Increased height of textarea
            marginBottom: "0px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            boxSizing: "border-box",
          }}
        ></textarea>

        <label>
          <input
            type="checkbox"
            checked={isChecked} // Bind the checkbox state to the isChecked variable
            onChange={handleCheckboxChange} // Call the handler function on checkbox change
            style={{ padding: "10px 0 20px 0" }}
          ></input>
          <span>Enable comments?</span>
        </label>
      </div>
      <div
        style={{
          padding: "10px", // Increased padding for spacing
        }}
      >
        <HidePeople
          selectedFriends={hiddenSelect}
          setSelectedFriends={setHiddenSelect}
        />
      </div>
      {/* Added empty div for spacing */}
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "#007bff",
          color: "white",
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
        {succeeded == 3 && (
          <Message
            colorTheme="error"
            heading="Upload Failed"
            isDismissible={true}
            onDismiss={() => {
              setSucceeded(false);
            }}
          >
            Upload has failed. Please check each item and try again.
          </Message>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
