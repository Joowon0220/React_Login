import React, {useState} from 'react'
import Axios from 'axios'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler =(event) => {
        setEmail(event.currentTarget.value) //이메일 내가 입력한대로 쳐짐
    }

    const onPasswordHandler =(event) => {
        setPassword(event.currentTarget.value)
    }

    const onsubmitHandler = (event) => {
        event.preventDefault(); //로그인 버튼 눌렀을때 자동 리프레쉬 방지

        

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
        .then(response => {
            if (response.payload.loginSuccess) { 
                props.history.push('/')//로그인 성공하면 랜딩페이지로 보내주기
            } else {
                alert('Error˝')
            }
        })


        
    }

    

    return (
                        
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection:'column'}}
                onSubmit={onsubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>

                <br/>
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
