FROM node:16

WORKDIR /my-app-backend

COPY . .

EXPOSE 4002

CMD ["npm" , "run" , "start" ]