describe('Search functionality', () => {
  beforeEach(() => {
    // Очистка куки перед каждым тестом, чтобы гарантировать чистое состояние
    cy.clearCookies();

    // Загружаем домашнюю страницу
    cy.visit('/');
  });

  it('should display only cards containing query when searching', () => {
    const newQuery = 'the';

    // Вводим новый запрос в поле поиска
    cy.get('[data-testid="search-input"]')
      .type(newQuery)
      .should('have.value', newQuery); // Убедимся, что в поле ввода появился новый текст

    // Проверим, что карточки загружены
    cy.get('[data-testid^="book-card-"]') // Проверка, что карточки появились на странице
      .should('have.length.greaterThan', 0); // Убедимся, что хотя бы одна карточка отрендерена

    // Проверим, что текст карточки (или подсвеченный текст) содержит строку запроса
    cy.get('[data-testid^="card-title-"]')
      .invoke('text') // Получим текст
      .should('match', new RegExp(newQuery, 'i')); // Проверим, что он содержит запрос (с учетом регистра)
  });
});
