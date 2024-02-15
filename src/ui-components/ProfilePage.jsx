import React, { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
import { fetchUserAttributes } from "aws-amplify/auth";

Amplify.configure(awsconfig);

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userAttributes = await fetchUserAttributes();
        console.log(userAttributes);
        setUser(userAttributes);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  console.log(user);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <h1>Welcome, {user.email}!</h1>
          <h2>Email Verified: {user.email_verified}!</h2>
          {/* Add more user profile information here */}
        </div>
      ) : (
        <p>Error fetching user data. Please try again later.</p>
      )}
    </div>
  );
};

export default ProfilePage;
