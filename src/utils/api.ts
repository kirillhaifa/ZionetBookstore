// utils/api.js
export const fetchData = async (url, onSuccess, onError) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    if (onError) {
      onError(error);
    } else {
      console.error('Fetch error:', error);
    }
  }
};
