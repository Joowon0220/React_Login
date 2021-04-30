# boiler-plate

MongoDB,Mongoose,Node토근로그인

1. node로 프로젝트 앱 만들기
2. MongoDB,Mongoose 연동하기
3. git연동하기
4. Postman활용하여 회원가입기능 구현
5. nodemon 설치를 통해 서버 자동 업데이트
6. MongoDB 접속 URI가 index에 들어있으면 Git에 공유시, 정보가 노출됨.
   > > 개발환경과 배포환경으로 설정을 나누고 Config 파일안에 넣어둠.
   > > 개발환경시, dev.js 파일안에 키값을 넣어두고 gitignore 파일을 활용하여, git업로드시에도 public에 노출되지 않도록 함.
7. bcrypt를 이용하여 비밀번호 암호화하기
8. jsonwebtoken을 이용하여 로그인 토근생성, 인증, 로그아웃하기
9. client단 만들기 시작
10. npx create react app .
11. React router dom을 이용하여 라우팅하기 (https://reactrouter.com/web/example/basic)
12. Client부분 React JS 부분 에서 Request를 보내면 되는데 AXIOS를 사용해서 보냄.
    > > npm install axios --save
    > > jQeury를 사용할때 AJAX라고 보면됨.
13. 서버와 클라이언트가 포트가 달라서 CORS (Cross-Origin Resource Sharing) 정책에 위반됨.
14. Proxy Server를 이용하여 문제해결.
    > > Proxy Server 사용이유:
    > >
    > > > > 1. 회사나 가정에서 인터넷 사용을 제어
    > > > > 2. 캐쉬를 이용하여 더 빠른 인터넷을 제공
    > > > > 3. 더 나은 보안 제공
    > > > > 4. 이용 제한된 사이트 접근 가능
15. Concurrently를 이용하여 백/프론트 한번에 실행시키기
16. Ant Design을 이용하여 CSS 완성하기 (http://ant.design)
    > > npm install antd --save
17. react-redux, redux, redux-promise, redux-thunk 다운로드
18. combine reducer를 활용하여 리듀서 관리
19. react ==> react hooks

    > > this.state={name: ""} ==> const[Name, setName] = useState("")
    > > componentDidMount() ==> useEffect()

20. React Redux 상태관리 이해 쏙쏙 (https://velog.io/@_jouz_ryul/React%EC%97%90%EC%84%9C-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC%EC%99%80-Redux)
