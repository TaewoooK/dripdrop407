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

const BattlePending = (props) => {
  const { entry, image, setImage } = props;
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
        start your <span style={{ color: "#047d95" }}>battle</span>
      </h1>
      <h2 style={{ textAlign: "left", marginBottom: "20px", color: "white" }}>
        battling with <span style={{ color: "#047d95" }}>{entry.Player1}</span>
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
      ></div>
      {/* Added empty div for spacing */}
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

export default BattlePending;
