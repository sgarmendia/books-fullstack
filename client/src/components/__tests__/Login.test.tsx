import { render, fireEvent, act } from "@testing-library/react";
// import { jest, describe, expect } from "@jest/globals";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import Login from "../Login";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("react-cookie", () => ({
	useCookies: () => [[], jest.fn(), jest.fn()],
}));

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => jest.fn(),
}));

jest.mock("../../constants", () => ({
	BASE_URL: "http://someurl.com",
}));

describe("Login", () => {
	test("should submit form with email and password", async () => {
		mockedAxios.post.mockResolvedValueOnce({
			status: 200,
			data: { token: "token", email: "test@example.com" },
		});

		const { getByLabelText, getByText } = render(
			<BrowserRouter>
				<Login />
			</BrowserRouter>
		);
		const email = getByLabelText("Email address");
		const password = getByLabelText("Password");
		const submitButton = getByText("Submit");

		await act(async () => {
			fireEvent.change(email, { target: { value: "test@example.com" } });
			fireEvent.change(password, { target: { value: "password" } });
			fireEvent.click(submitButton);
		});

		expect(mockedAxios.post).toHaveBeenCalledWith(
			expect.stringContaining("/signup"),
			{ email: "test@example.com", password: "password" }
		);
	});
});
