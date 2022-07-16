# Introduction

`redis pub/sub`을 이용하여 PDF 변환 시작 메시지를 `publish`하고, 도커로 시작되지 않은 다른 프로세스에서 해당 메시지를 `subscribe`하여 PDF 변환 작업을 시작하는 기능을 테스트하기 위한 예제입니다.

다음 스크린샷과 같이 두개의 프로세스가 돌아가게 되며 서로 레디스를 통해 연동됩니다.

https://user-images.githubusercontent.com/13586185/179343727-645379f2-2633-449a-b6a9-b9eb5680c99f.mov

레디스 서버를 통해 노드로 개발된 서버가 아니더라도, PUB/SUB을 통해 다른 언어로 만들어진 서버에 메시지를 전달할 수 있습니다. 따라서 유연한 확장이 가능합니다.

## Usage

before running the process, you need to install the following dependencies:

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
