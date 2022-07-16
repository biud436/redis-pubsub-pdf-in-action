# Introduction

도커 내에서 `redis pub/sub`을 이용하여 PDF 변환 시작 메시지를 `publish`하고, 도커로 시작되지 않은 다른 프로세스에서 해당 메시지를 `subscribe`하여 PDF 변환 작업을 시작하는 기능을 테스트하기 위한 예제입니다.

다음 스크린샷과 같이 두개의 프로세스가 돌아가게 되며 서로 레디스를 통해 연동됩니다.

<img width="1088" alt="image" src="https://user-images.githubusercontent.com/13586185/179341934-bbae59f7-45ed-4e0c-ab53-cc51c43c1522.png">

```bash
yarn install
yarn pdf-server:start
yarn server:start
```

레디스가 6379 포트에 매핑되어있고, 레디스 서버가 실행된 상태라면 메시지 큐를 통해 다중 프로세스 통신이 가능합니다. 예제는 도커 기반이 아니지만 호스트만 변경하여 레디스 연결에 성공한다면 잘 동작할 것으로 예상됩니다.

본래 이것은 다른 언어로 개발된 프로세스와 연동하기 위해 고안되었습니다.
