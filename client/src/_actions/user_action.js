//액션을 정의해 준다.
//Axios는 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리
//쉽게 말해서 백엔드랑 프론트엔드랑 통신을 쉽게하기 위해 Ajax와 더불어 사용
////GET : 입력한 url에 존재하는 자원에 요청을 합니다.  -->www.yourserver.com/login?id=Hnk&pw=1234 이런식으로 나옴
////POST : 새로운 리소스를 생성(create)할 때 사용합니다.
////DELETE : REST 기반 API 프로그램에서 데이터베이스에 저장되어 있는 내용을 삭제 목적
////PUT : REST 기반 API 프로그램에서 데이터베이스에 저장되어 있는 내용을 갱신 목적

import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';
export function loginUser(dataToSubmit){
    
    
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    return{
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {

    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}



export function auth() {

    const request = axios.get('/api/users/auth')
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}


