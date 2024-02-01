# Клиентская часть приложения CRM системы

## В проекте использутся такие технологии: как:

- React
- react-router-dom
- TypeScript
- ReduxToolKit
- RTKQuery
- Storybook

## За чистотой кода следят:

- EsLint
- StyleLint
- Prettier

## В проекте используется архитектура FSD

- Всё разбито по слоям
- нижележащий слой не может обращаться к вышестоящему

## Сборка проекта

- в качестве сборщика проекта используется Vite
- поддерживаются алиасы абсолютных путей через `@/`

например:

```ts
import { Button } from '@/shared/ui/Button'
```

## Запуск проекта

для запуска проекта необходимо:

склонировать репозиторий

```
git clone https://github.com/KirKol94/crm.git
```

запустить проект в режиме разработчика

```node
npm run dev
```

таким образом запустится client на порту `5173`

чтобы запустить бэк локально, необходимо перейти из `client` в папку `backend`

```
cd ../backend
```

и в этой папке выполнить команду

```
docker compose up -d
```

## дополнительные скрипты на проекте

```json
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build && echo '/* /index.html  200' | cat >dist/_redirects ",
    "lint": "concurrently \"yarn lint:ts\" \"yarn lint:style\"",
    "lint:ts": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0 --fix",
    "lint:prettier": "prettier --write ./src",
    "lint:style": "stylelint src/**/*.scss --fix",
    "preview": "vite preview"
  },
```

`dev` запускает клиент

`build` собирает проект в папке `dist` (html / css / js)

`lint` объединяет в себе команды:

- `lint:ts` запуск stylelint
- `lint:prettier` запуск prettier
- `lint:style` запуск stylelint

`preview` похожа на `build` за исключением того, что не создаётся папка `dist` и запускается сервер, который будет выглядеть так же, как будто бы запущены файлы из папки `dist`

## точка входа в приложение

всё начинается с файла`src/main.tsx`
