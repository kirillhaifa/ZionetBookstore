//unversal method to fetch data
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

export const fetchBookById = async (id: string) => {
  try {
    const response = await fetch(`https://674f2c63bb559617b26e568b.mockapi.io/books/${id}`); // Используем id для запроса конкретной книги
    if (!response.ok) {
      throw new Error(`Failed to fetch book with ID ${id}. Status: ${response.status}`);
    }
    const book = await response.json();
    return book; // Возвращаем данные книги
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw error; // Пробрасываем ошибку дальше
  }
};