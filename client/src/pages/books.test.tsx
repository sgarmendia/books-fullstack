import axios from "axios";
import { jest, describe, expect, it, afterEach } from "@jest/globals";
import { render } from "@testing-library/react";
import { Genre } from "../types";
import Books from "./Books";

jest.mock("../constants", () => ({
	BASE_URL: "http://someurl.com",
}));

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Books", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("fetches and displays books on mount", async () => {
		const mockBooks = [
			{
				id: 1,
				title: "Test Book",
				author: "Test Author",
				genre: Genre.CHILDREN,
			},
		];
		mockedAxios.get.mockResolvedValueOnce({ data: mockBooks });

		const { findByText } = render(<Books />);
		const result = await findByText("Test Book");

		expect(result).toBeTruthy();
	});
});
