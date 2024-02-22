import React, { createContext, useState, useEffect } from 'react';
import AWS from "aws-sdk";

import { Amplify } from "aws-amplify";
import awsconfig from "./amplifyconfiguration.json";

Amplify.configure(awsconfig);

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchAllUsers();
    }, [])

    async function fetchAllUsers() {
        try {
            // Set Parameters for querying Users (pool Id and filter)
            let params = {
                UserPoolId: process.env.REACT_APP_USER_POOL_ID,
                AttributesToGet: [
                    "email", 
                    "sub"
                ]
            }

            // Establish credentials via Justin's IAM user before making AWS SDK API call
            AWS.config.update({
                region: process.env.REACT_APP_AWS_REGION,
                accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
                secretAccessKey: process.env.REACT_APP_SECRET_KEY
            });
            // Initialize the CognitoIdentityServiceProvider with AWS SDK
            const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
            const data = await cognitoIdentityServiceProvider.listUsers(params).promise();

            console.log('Users:', data.Users);
            setUsers(data.Users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    return (
        <UserContext.Provider value={{ users, setUsers }}>
            {children}
        </UserContext.Provider>
    );
};