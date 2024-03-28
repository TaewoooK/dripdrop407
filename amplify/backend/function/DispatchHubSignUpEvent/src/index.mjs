import Hub from "aws-amplify/utils";

export const handler = async (event) => {
  // Extract user details from the event
  const username = event.userName;

  // Emit "signUp" message using Hub
  Hub.dispatch("auth", {
    event: "ConfirmedSignUp",
    data: { username: username },
  });

  return event;
};
