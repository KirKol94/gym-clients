FROM node:21-bookworm
WORKDIR /app
COPY ./ /app
RUN yarn
EXPOSE 3000 5173
RUN apt update && apt install ca-certificates curl xdg-utils -y
ENTRYPOINT ["yarn", "dev:client", "--host"]
