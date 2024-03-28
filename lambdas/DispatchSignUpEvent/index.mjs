import Hub from "aws-amplify/utils";

export const handler = async (event) => {
  // Extract user details from the event
  const usernameAttributeNames = ["sub", "username", "preferred_username"];
  let username;
  for (const attributeName of usernameAttributeNames) {
    const attribute = event.request.userAttributes.find(
      (attr) => attr.Name === attributeName
    );
    if (attribute) {
      username = attribute.Value;
      break;
    }
  }

  // Perform any necessary operations here...

  // Emit "signUp" message using Hub
  Hub.dispatch("auth", { event: "signUp", username });

  return event;
};
