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

перейти в папку fe-dev (основная ветка для разработки клиентской части на данный момент)

```
git checkout fe-dev
```

запустить проект в режиме разработчика

```node
npm run dev
```

таким образом запустится client на порту `5173` и фейковый бэк `json-server` на порту `3002`

## дополнительные скрипты на проекте

```json
  "scripts": {
    "dev": "concurrently \"yarn dev:client\" \"yarn dev:server\"",
    "dev:client": "vite",
    "dev:server": "[ -f db.json ] && echo '{\"users\":[{\"email\":\"admin@admin.ru\",\"password\":\"$2a$10$5Ne37HXDhSLVZA.iggAGG.KhaMbBF3lrsKm9dTxjRFSCe5Nshs4o2\",\"name\":\"admin\",\"surname\":\"adminov\",\"patronymic\":\"adminovich\",\"id\":1}]}' > db.json || echo '{\"users\":[{\"email\":\"admin@admin.ru\",\"password\":\"$2a$10$5Ne37HXDhSLVZA.iggAGG.KhaMbBF3lrsKm9dTxjRFSCe5Nshs4o2\",\"name\":\"admin\",\"surname\":\"adminov\",\"patronymic\":\"adminovich\",\"id\":1}]}' > db.json && json-server-auth --watch db.json --port 3001",
    "build": "tsc && vite build && echo '/* /index.html  200' | cat >dist/_redirects ",
    "lint": "concurrently \"yarn lint:ts\" \"yarn lint:style\"",
    "lint:ts": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0 --fix",
    "lint:prettier": "prettier --write ./src",
    "lint:style": "stylelint src/**/*.scss --fix",
    "preview": "vite preview"
  },
```

`dev` запускает и фронт и бэк
`dev:client` запускает клиент
`dev:server` запускает бэк и создаёт файл `db.json` cо стандартными данными для авторизации

```json
{ "email": "admin@admin.ru", "password": "12341234" }
```

`build` собирает проект в папке `dist` (html / css / js)

`lint` объединяет в себе команды:

- `lint:ts` запуск stylelint
- `lint:prettier` запуск prettier
- `lint:style` запуск stylelint

`preview` похожа на `build` за исключением того, что не создаётся папка `dist` и запускается сервер, который будет выглядеть так же, как будто бы запущены файлы из папки `dist`

## точка входа в приложение

всё начинается с файла`src/main.tsx`
