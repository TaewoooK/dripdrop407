import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import ProfilePage from "../ui-components/ProfilePage";

jest.mock("aws-amplify/auth", () => ({
  fetchUserAttributes: jest
    .fn()
    .mockResolvedValue({ email: "test@example.com", email_verified: true }),
  getCurrentUser: jest.fn().mockResolvedValue({ username: "test_user" }),
}));

jest.mock("aws-amplify/api", () => ({
  generateClient: jest.fn().mockResolvedValue({
    graphql: jest.fn().mockImplementation(async () => ({
      data: {
        listPosts: {
          items: [
            {
              description: "Test description",
              postImageKey: "test_image_key",
            },
          ],
        },
      },
    })),
  }),
}));

jest.mock("aws-amplify/storage", () => ({
  getUrl: jest.fn().mockResolvedValue({ url: "test_image_url" }),
}));

describe("ProfilePage Component", () => {
  test("renders ProfilePage component with user data", async () => {
    render(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText("Welcome test_user!")).toBeInTheDocument();
      expect(screen.getByText("Email: test@example.com")).toBeInTheDocument();
      expect(screen.getByText("Email Verified: Yes")).toBeInTheDocument();
    });
  });

  // Add more tests for other scenarios...
});
