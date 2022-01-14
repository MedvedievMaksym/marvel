import {useState, useCallback} from "react";

//хук для отправки запросов , обработки результатов и сохр. локальное состояние
export const useHttp = () => {
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(null);

	const request = useCallback(async (url, method = 'GET', body = null,
	                                   headers = {'Content_Type': 'application/json'}) => {
		setLoading(true);

		try {
			const response = await fetch(url, {method, body, headers});
			if(!response.ok) {
				throw new Error(`Could you fetch ${url}, status ${response.status}`);
			}

			const data = await response.json();

			setLoading(false);
			return data;
		} catch (e) {
			setLoading(true);
			setError(e.message);
			throw e;
		}

	}, []);

	//фун. для очистки ошибок
	const clearError = useCallback(() => setError(null), []);

	return {loading, request, error, clearError}
}