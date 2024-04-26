/* Amplify Params - DO NOT EDIT
	API_DRIPDROP407_GRAPHQLAPIENDPOINTOUTPUT
	API_DRIPDROP407_GRAPHQLAPIIDOUTPUT
	API_DRIPDROP407_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import crypto from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { default as fetch, Request } from 'node-fetch';

const GRAPHQL_ENDPOINT = process.env.API_DRIPDROP407_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const { Sha256 } = crypto;

const query = /* GraphQL */ `
  mutation CreateDoublePointsTime(
    $input: CreateDoublePointsTimeInput!
    $condition: ModelDoublePointsTimeConditionInput
  ) {
    createDoublePointsTime(input: $input, condition: $condition) {
      id
      date
      startTime
      createdAt
      updatedAt
      __typename
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const randomTime = generateRandomTime();
  const randomTimeStr = randomTime.toISOString().split('T')[1].split('.')[0];
  const dateStr = new Date().toISOString().split('T')[0];
  const timeSignature = `${dateStr}-${randomTimeStr}`;

  const variables = {
    input: {
      date: dateStr,
      startTime: randomTimeStr
    }
  }

  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
  });

  const requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query, variables }),
    path: endpoint.pathname
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message
        }
      ]
    };
  }

  return {
    statusCode,
    //  Uncomment below to enable CORS requests
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "*"
    // }, 
    body: JSON.stringify(body)
  };
};

function generateRandomTime() {
  const nineAM = new Date();
  nineAM.setHours(9, 0, 0, 0);
  const fivePM = new Date();
  fivePM.setHours(17, 0, 0, 0);
  return new Date(nineAM.getTime() + Math.random() * (fivePM.getTime() - nineAM.getTime()));
}
