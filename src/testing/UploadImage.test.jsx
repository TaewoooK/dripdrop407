import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import UploadImage from "../ui-components/UploadImage";

// Mock the fetchUserAttributes function
jest.mock("aws-amplify/auth", () => ({
  fetchUserAttributes: jest
    .fn()
    .mockResolvedValue({ email: "test@example.com" }),
}));

describe("UploadImage Component", () => {
  test("renders UploadImage component", async () => {
    await act(async () => {
      render(<UploadImage />);
    });

    const fileInput = screen.getByLabelText("Choose file");
    const descriptionInput = screen.getByPlaceholderText("Enter description");
    const submitButton = screen.getByText("Submit");

    expect(fileInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("handles image upload correctly", async () => {
    await act(async () => {
      render(<UploadImage />);
    });
    const file = new File(["(⌐□_□)"], "test.png", { type: "image/png" });
    const fileInput = screen.getByLabelText("Choose file");

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
      await waitFor(() => {
        const uploadedImage = screen.getByAltText("Post Image");
        expect(uploadedImage).toBeInTheDocument();
      });
    });
  });

  test("handles description change correctly", async () => {
    await act(async () => {
      render(<UploadImage />);
    });
    const descriptionInput = screen.getByPlaceholderText("Enter description");
    fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });

    expect(descriptionInput.value).toBe("Test Description");
  });
});
