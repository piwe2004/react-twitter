import { signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider   } from 'firebase/auth'
import { app } from 'firebaseApp'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function LoginForm() {
    const [error, setError] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate();
    const onsubmit = async (e:any) => {
        e.preventDefault();
        try{
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('로그인에 성공 하였습니다.');
            navigate('/');
        }catch(error){
            console.log(error)
            toast.success('형식을 확인해 주세요.');
        }
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if(name === 'email'){
            setEmail(value);
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(!value?.match(validRegex)){
                setError('이메일 형식이 올바르지 않습니다.');
            }else{
                setError('');
            }
        }
        if(name === 'password'){
            setPassword(value);
            if(value?.length > 6){
                setError('비밀번호는 6자리 이상 입력해 주세요.')
            }else{
                setError('');
            }
        }
    }

    const onClickSocialLogin = async (e: any) => {
        const {
            target : { name },
        } = e;
        let provider;
        const auth = getAuth(app)
        if(name === 'google'){
            provider = new GoogleAuthProvider();
        }else if(name === 'github'){
            provider = new GithubAuthProvider();
        }

        await signInWithPopup(
            auth, provider as GithubAuthProvider | GoogleAuthProvider
        ).then((result) => {
            console.log(result);
            toast.success('로그인 되었습니다.');
        })
        .catch((error)=>{
            console.error(error)
            toast.error('로그인에 실패 하였습니다.');
        })
}
    return (
        <form onSubmit={onsubmit} className='form form--lg'>
            <h2 className='form__title'>로그인</h2>
            <dl className='form__block'>
                <dt><label htmlFor="email">이메일</label></dt>
                <dd><input type="text" name="email" id="email" value={email} required onChange={onChange} /></dd>
            </dl>
            <dl className='form__block'>
                <dt><label htmlFor="password">비밀번호</label></dt>
                <dd><input type="password" name="password" id="password" value={password} required onChange={onChange} /></dd>
            </dl>
            {error && error?.length > 0 && (
                <div className='form__block'>
                    <p className='form__error'>{error}</p>
                </div>
            )}
            <div className='form__block'>
                <p>계정이 없으신가요?</p>
                <Link to="/users/signup" className='form__link'>회원가입</Link>
            </div>
            <div className='form__block'>
                <button type='submit' className='form__btn--submit' disabled={error?.length > 0}>로그인</button>
            </div>
            <div className='form__block'>
                <button type='button' name="google" className='form__btn--google' onClick={onClickSocialLogin} >구글로 로그인</button>
            </div>
            <div className='form__block'>
                <button type='button' name="github" className='form__btn--github' onClick={onClickSocialLogin} >깃헙으로 로그인</button>
            </div>
        </form>
    )
}
