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

export const updateFavorites = async (
  userId: string,
  favorites: string[]
): Promise<string[]> => {
  try {
    const response = await fetch(
      `https://674f2c63bb559617b26e568b.mockapi.io/users/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Favorites: favorites, // Ключ совпадает со структурой MockAPI
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update favorites: ${response.statusText}`);
    }

    const updatedUser = await response.json();
    console.log('Updated Favorites:', updatedUser.Favorites);
    return updatedUser.Favorites; // Возвращаем обновлённый массив избранных
  } catch (error) {
    console.error('Error updating favorites:', error);
    throw error;
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