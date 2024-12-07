import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    supportFile: false, // если не используете файл поддержки
    chromeWebSecurity: false, // Отключаем ограничения безопасности
  },
});