import React, { useState, useEffect } from "react";
import awsconfig from "../aws-exports";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { email, email_verified } = await fetchUserAttributes();
        const { username } = await getCurrentUser();
        console.log(`The username: ${username}`);
        console.log(`The email: ${email}`);
        console.log(`Email Verified: ${email_verified}`);
        setUser({ username, email, email_verified });
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div style={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div style={styles.profile}>
          <h1 style={styles.heading}>Welcome, {user.username}!</h1>
          <h2 style={styles.info}>Email: {user.email}</h2>
          <h2 style={styles.info}>
            Email Verified: {user.email_verified ? "Yes" : "No"}
          </h2>
        </div>
      ) : (
        <p style={styles.error}>Error fetching user data. Please try again later.</p>
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