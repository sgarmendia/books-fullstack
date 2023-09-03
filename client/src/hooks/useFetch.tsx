import { useState } from "react";

type FetchState<T> = {
	data: T | null;
	loading: boolean;
	error: Error | null;
};

function useFetch<T>(): [
	FetchState<T>,
	(url: string, options?: RequestInit) => void
] {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = async (url: string, options?: RequestInit) => {
		setLoading(true);
		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			const result: T = await response.json();
			setData(result);
		} catch (err) {
			if (err instanceof Error) {
				setError(err);
			} else {
				setError(new Error(String(err)));
			}
		} finally {
			setLoading(false);
		}
	};

	return [{ data, loading, error }, fetchData];
}

export default useFetch;
