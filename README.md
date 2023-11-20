1. 환경변수
- MYSQL_USERNAME
- MYSQL_PASSWORD
- MYSQL_DATABASE
- MYSQL_HOST
- SECRET_KEY

2. API 명세서 작성
https://docs.google.com/spreadsheets/d/106bWkTi0OlpEsZhSACYHDNCz4g1sMxgo9Eq3dnIiIS4/edit?usp=sharing

3. ERD 작성
https://www.erdcloud.com/d/JehGcpGhKWZNBMz3K


4. 더 고민해 보기


1) 단방향 암호화, 데이터베이스가 유출되었을 때 사용자의 비밀번호를 알 수가 없다.

2) Access Token이 노출되면 정보가 유출될 수 있다.
   Access Token의 유효기간을 짧게 지정한다.

3) 인증은 사용자의 신원을 검증하는 프로세스를 뜻하며 간단한 예시로는 ID와 PW를 통해 로그인하는
   행위를 의미한다.
   인가는 인증 이후의 프로세스를 말한다.
   인증된 사용자가 어떠한 자원에 접근할 수 있는지를 확인하는 절차가 바로 인가라고 말할 수 있다.
   인가라고 생각합니다. 미들웨어가 로그인을 한 후 사용 가능한 api를 확인하는 작업을 한다고 생각하기 때문입니다.

4) Http Status Code (200) : 클라이언트의 요청이 성공했을 때의 상태를 나타낸다.
   Http Status Code (201) : 어떠한 것을 생성할 때 성공했다는 상태를 나타낸다.
   Http Status Code (400) : 클라이언트의 요청이 오류라는 상태를 나타낸다.
   Http Status Code (401) : 클라이언트의 요청이 권한이 없는 부분인 상태를 나타낸다.
   Http Status Code (409) : 클라이언트의 요청이 데이터베이스에 존재하는 데이터와 충돌이
                            일어나는 상태를 나타낸다.

5) 데이터를 불러오는 부분에서 코드가 변경되었습니다.
   코드의 변형이 많았다고는 생각되지 않고, 데이터를 불러오는 코드와 다른 코드가 연관성이 적어지면
   DB를 변경했을 때 큰 변화가 없을 것이라 생각합니다.

6) pm2 startup + pm2 startup 명령의 결과로 출력된 명령(sudo env로 시작하는 명령) + pm2 save
   이 명령은 pm2로 실행할 서버를 항상 자동으로 시작하게끔 부트 스크립트에 등록하는 명령이라고 하는데
   확실한지는 잘 모르겠습니다.

7) nodemon : 노드가 실행하는 파일이 속한 디렉터리를 감시하고 있다가 파일이 수정되면 자동으로
             노드 애플리케이션을 재시작하는 확장 모듈이다.
             코드가 변경되었을 때 마다 app.js을 새로 실행시키는 번거로움이 사라졌습니다.
             
   일반: 전체가 아닌 특정 부분에 적용시키고 싶을 때 사용하는 프로그램 설치 방법
   글로벌: 한 어플에 제한되어 사용되는 것이 아닌 모듈이 시스템 전체에서 사용할 수 있는 일종의
           프로그램 설치 방법
   개발용: 개발하는 상황에만 적용하고 싶을 때 사용하는 프로그램 설치 방법

   nodemon은 일반옵션으로 설치해야 한다고 생각합니다.