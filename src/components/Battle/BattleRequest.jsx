import React, { useState, useEffect, useContext } from "react";
import { generateClient } from "aws-amplify/api";
import { uploadData, getUrl } from "aws-amplify/storage";
import { createBattle, updateBattle } from "../../graphql/mutations";
import { fetchUserAttributes } from "aws-amplify/auth";
import awsExports from "../../aws-exports";
import { Message, Image } from "@aws-amplify/ui-react";
import { Loader } from "@aws-amplify/ui-react";
import { UserContext } from "../../UserContext";
import toast, { Toaster } from "react-hot-toast";
import AddUser from "../../ui-components/AddUser";

const client = generateClient();

const BattleRequest = () => {
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

  const handleSubmit = () => {
    return new Promise(async (resolve, reject) => {
      try {
        setSucceeded(2);
        // Handle post submission logic here
        console.log("Image:", image);

        const currDate = new Date().toISOString();

        const response = await client.graphql({
          query: createBattle,
          variables: {
            input: {
              Player1: myUser.username,
              Player2: hiddenSelect[0],
              Player1Status: "Ready",
              Player2Status: "Pending",
              Player1Score: 0,
              Player2Score: 0,
              Player1ImageKey: "null",
              Player2ImageKey: "null",
              createdAt: currDate,
            },
          },
        });

        console.log("Logging response from createPost");
        console.log(response);

        const postContext = response.data.createBattle;
        if (!postContext) {
          console.log("Failed to create post");
          return reject("Failed to create post");
        }
        const imageUpload = await uploadData({
          key: `${myUser.username} + ${currDate}` + "battle.png",
          data: image,
          drip_points: 0,
          options: {
            contentType: "image/png",
          },
        }).result;

        const updatePostDetails = {
          id: postContext.id,
          Player1ImageKey: imageUpload?.key,
        };

        const updatePostResponse = await client.graphql({
          query: updateBattle,
          variables: { input: updatePostDetails },
        });

        const updatedPost = updatePostResponse.data.updateBattle;
        // console.log("Logging response from updatePost")
        // console.log(updatedPost)
        if (!updatedPost.Player1ImageKey) return;
        const signedURL = await getUrl({ key: updatedPost.postImageKey });
        console.log(signedURL);

        setSucceeded(1);
        resolve("Battle created successfully");
      } catch (error) {
        setSucceeded(3);
        reject("Failed to create post");
      }
    });
  };

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
        create a <span style={{ color: "#047d95" }}>battle</span>
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
      <div
        style={{
          padding: "10px", // Increased padding for spacing
        }}
      >
        <AddUser
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
            error: "Failed to create post",
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
        Request
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

export default BattleRequest;