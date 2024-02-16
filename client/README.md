[![](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/eHSuXe2rbs)

## В проекте использутся такие технологии: как:
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=black)
![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)

## За чистотой кода следят:

![](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![](https://img.shields.io/badge/stylelint-000?style=for-the-badge&logo=stylelint&logoColor=white)

Архитектура проекта стремится быть похожей на [FSD](https://feature-sliced.design/)

## Запуск проекта

для запуска проекта необходимо склонировать репозиторий

```
git clone https://github.com/KirKol94/crm.git
```

запустить проект в режиме разработчика

```node
npm run dev
```

таким образом запустится client на порту `5173`

Так же необходимо запустить бэк локально. Чтобы сделать это перейди в папку `backend` и выполни команду

```
docker compose up -d
```

## дополнительные скрипты на проекте

```json
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "concurrently \"tsc\" \"yarn lint:ts\" \"yarn lint:style\" \"yarn lint:prettier\"",
    "lint:ts": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0 --fix",
    "lint:prettier": "prettier --write ./src",
    "lint:style": "stylelint src/**/*.scss --fix",
    "preview": "vite preview",
    "new": "node ./scripts/createSlice/index.js"
  }
```

- `dev` запускает клиент
- `build` собирает проект в папке `dist` (html / css / js)
- `lint` проверяет код на наличие `ESLint` / `StyleLint` предупреждений и форматирует код с помощью `prettier` 
- `new` команда для создания FSD слайсов
