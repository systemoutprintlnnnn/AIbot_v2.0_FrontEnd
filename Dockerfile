#使用Node.js16Alpine作为基础镜像
FROM node:18.18.0 AS build

ENV NEXT_PUBLIC_API_HOST_URL="https://yunwenbot.top/api"

#设置工作目录
WORKDIR /app

#复制package.json和package-lock.json到容器中
COPY package*.json ./

#安装依赖
RUN npm install

#RUN echo "Contents of package.json:" && cat ./package.json \
#    && echo "Done" \

#将应用程序代码复制到容器中
COPY . .

#构建TypeScript代码
RUN npm run build

#使用多阶段构建
FROM node:18.18.0

WORKDIR /app

#从构建阶段复制构建的产物
COPY --from=build /app ./

#暴露3000端口
EXPOSE 3000


#启动应用程序
CMD ["npm","start"]

#CMD ["npm", "run", "dev"]