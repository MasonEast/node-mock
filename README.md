# 一个基于node和sqlite开发的数据mock平台

## 技术栈

本项目主要基于服务端渲染nextjs框架开发， 不要问为什么用nextjs， 任性， 用了之后感觉没什么卵用。。。这里场景其实并不是很符合。主要是想学习下nextjs开发。

**nextjs适合那些需要首屏加载快， 强依赖seo的项目。**

使用数据库为sqlite3， 不要问为什么使用该数据库， 任性。


**nextjs + koa + sqlite3 + sequelize**

## feature
---
1. 有一个进行接口配置的页面， 可以配置请求url， 方法， 参数等；

2. 使用sqlite数据库进行数据持久化， 方便一次配置， 多次使用；

3. 做一个mock数据的api， 方便开发者进行数据mock

4. ......

## 使用方法

1. 部署到我的服务器上

2. clone源码到本地， 在本地起node服务

## 流程
 
新建项目（project_id） 
-> 
新建接口（url， method， headers， body， data） 
-> 
本地项目代理接口的域名 
-> 
对创建的接口发起请求（ http://host/mock/project_id/xxxxxx）
-> 
koa解析请求获取参数（url， method， body， headers） 
-> 
通过路由判断请求参数匹配对应的接口 
-> 
根据project_id去接口数据表里查找对应的数据并返回给本地项目

## 项目启动

```js
npm i

node app.js
```

