import React, { useState, useEffect, useContext } from "react";
import { generateClient, post } from "aws-amplify/api";
import { uploadData, getUrl } from "aws-amplify/storage";
import { createPost, updatePost } from "../graphql/mutations";
import { listPosts } from "../graphql/queries";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import awsExports from "../aws-exports";
import { Message, Image } from "@aws-amplify/ui-react";
import { Loader } from "@aws-amplify/ui-react";
import HidePeople from "./HidePeople";
import { UserContext } from "../UserContext";
import toast, { Toaster } from "react-hot-toast";
import { render } from "@testing-library/react";

const client = generateClient();

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const [hiddenSelect, setHiddenSelect] = useState([]);

  const [succeeded, setSucceeded] = useState(0);

  const [user, setUser] = useState(null);

  const [imageUrl, setImageUrl] = useState(null);
  const { allUsers, myUser } = useContext(UserContext);

  const [variables, setVariables] = useState({});
  const [uploadedToday, setUploadedToday] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userAttributes = await fetchUserAttributes();
        console.log(userAttributes);
        setUser(userAttributes);
        const currUserAttributes = await getCurrentUser();
        const currDate = new Date();
        const yesterday = new Date(currDate.getTime() - 24 * 60 * 60 * 1000);
        setVariables({
          filter: {
            owner: { eq: currUserAttributes.username },
            createdAt: { between: [yesterday.toJSON(), currDate.toJSON()] },
          },
        });
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      console.log("User:", user);
      const postData = await client.graphql({ query: listPosts, variables });
      console.log("postData:", postData.data.listPosts.items);
      if (postData.data.listPosts.items.length > 0) {
        console.log("You have already posted today");
        setUploadedToday(true);
      }
    }

    if (user) {
      fetchData();
    }
  }, [user]);

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

  const handleSubmit = () => {
    return new Promise(async (resolve, reject) => {
      console.log("hiddenSelect:" + hiddenSelect);
      try {
        setSucceeded(2);
        // Handle post submission logic here
        console.log("Image:", image);
        console.log("Description:", description);
        let commentEnabled = isChecked;

        if (uploadedToday) {
          console.log("You have already posted today");
          reject("You have already posted today");
          return;
        }

        const currDate = new Date();

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
              actionedUsers: [],
            },
          },
        });

        console.log("Logging response from createPost");
        console.log(response);

        const postContext = response.data.createPost;
        if (!postContext) {
          console.log("Failed to create post");
          reject("Failed to create post");
          return;
        }
        const imageUpload = await uploadData({
          key: `${myUser.username} + ${currDate}` + "image.png",
          data: image,
          drip_points: 0,
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

        setUploadedToday(true);
        setSucceeded(1);
        resolve("Post created successfully");
      } catch (error) {
        setSucceeded(3);
        reject("Error creating post: " + error);
      }
    });
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
      <h1 style={{ textAlign: "left", marginBottom: "30px", color: "white" }}>
        make a <span style={{ color: "#047d95" }}>post</span>
      </h1>
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
          color: "white",
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
            resize: "none",
          }}
        ></textarea>

        <label>
          <input
            type="checkbox"
            checked={isChecked} // Bind the checkbox state to the isChecked variable
            onChange={handleCheckboxChange} // Call the handler function on checkbox change
            style={{ padding: "10px 0 20px 0" }}
          ></input>
          <span style={{ textAlign: "left", color: "white" }}>
            Enable comments?
          </span>
        </label>
      </div>
      <div
        style={{
          padding: "10px", // Increased padding for spacing
        }}
      >
        <HidePeople
          style={{ position: "absolute", left: "0" }}
          selectedFriends={hiddenSelect}
          setSelectedFriends={setHiddenSelect}
        />
      </div>
      {/* Added empty div for spacing */}
      <button
        // onClick={handleSubmit}
        onClick={() => {
          toast.promise(handleSubmit(), {
            pending: "Uploading...",
            success: "Post created successfully",
            error: (err) => `${err.toString()}`,
          });
        }}
        style={{
          backgroundColor: "#047d95",
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
        Post
      </button>
      <div style={{ height: "20px" }}></div> {/* Added empty div for spacing */}
      {/* <div>
        {succeeded === 2 && <Loader size="large" />}
        {succeeded === 1 && (
          // <Message
          //   colorTheme="success"
          //   heading="YES!"
          //   isDismissible={true}
          //   onDismiss={() => {
          //     setSucceeded(false);
          //   }}
          // >
          //   Your new fit is uploaded!
          // </Message>
          toast.success("Your new fit is uploaded!")
        )}
        {succeeded === 3 && (
          // <Message
          //   colorTheme="error"
          //   heading="Upload Failed"
          //   isDismissible={true}
          //   onDismiss={() => {
          //     setSucceeded(false);
          //   }}
          // >
          //   Upload has failed. Please check each item and try again.
          // </Message>
          toast.error("Upload has failed. Please check each item and try again.")
        )}
      </div> */}
    </div>
  );
};

export default UploadImage;
