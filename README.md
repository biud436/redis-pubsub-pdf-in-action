# Introduction

This project allows you to communicate with process between PDF Server and PDF Client through a redis Pub/Sub system.

https://user-images.githubusercontent.com/13586185/179343727-645379f2-2633-449a-b6a9-b9eb5680c99f.mov

## Usage

before running the process, you need to install some dependencies using below command:

```bash
yarn install
```

and then next you need to start the pdf-server:

```bash
yarn pdf-server:start
```

if you want to start to convert with PDF, you have to start the main server, as belows:

```bash
yarn server:start
```
