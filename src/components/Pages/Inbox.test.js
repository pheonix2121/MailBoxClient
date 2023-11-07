import React from "react";
import { render, screen } from "@testing-library/react";
import Inbox from "./Inbox";

test("renders inbox component", () => {
  render(<Inbox />);
  const inboxElement = screen.getByText(/INBOX/i);
  expect(inboxElement).toBeInTheDocument();
});

test("displays emails in the inbox", () => {
  const mockEmails = [
    { id: "1", data: { subject: "Email 1", isRead: false } },
    { id: "2", data: { subject: "Email 2", isRead: true } },
  ];
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockEmails),
    })
  );

  render(<Inbox />);
  const emailElements = screen.getAllByTestId("email-box");
  expect(emailElements).toHaveLength(2);
});

test("updates blue dot when emails are marked as read", () => {
  const mockEmails = [
    { id: "1", data: { subject: "Email 1", isRead: false } },
    { id: "2", data: { subject: "Email 2", isRead: false } },
  ];
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockEmails),
    })
  );

  render(<Inbox />);
  const emailElements = screen.getAllByTestId("email-box");
  expect(emailElements).toHaveLength(2);

  const firstEmailElement = emailElements[0];
  const readButton = firstEmailElement.querySelector(".read-button");
  readButton.click();

  const updatedEmailElements = screen.getAllByTestId("email-box");
  const unreadEmailElements = updatedEmailElements.filter(
    (element) => !element.querySelector(".read-dot")
  );
  expect(unreadEmailElements).toHaveLength(1);
});