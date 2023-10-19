import { addDoc, collection } from 'firebase/firestore';
import { db } from 'firebaseApp';
import {useState} from 'react'
import { FiImage } from "react-icons/fi";
import { toast } from 'react-toastify';
import { useContext } from 'react';
import AuthContext from 'context/AuthContext';

export default function PostForm() {
    const [content, setContent] = useState<string>('')
    const {user} = useContext (AuthContext)
    const handleFileUpload = () => {};
    const onSubmit = async (e:any) => {
        e.preventDefault();
        try{
            await addDoc(collection(db, 'posts'), {
                content:content,
                createdAt:new Date()?.toLocaleDateString("ko",{
                    hour:"2-digit",
                    minute:"2-digit",
                    second: "2-digit",
                }),
                uid:user?.uid,
                email:user?.email
            });
            setContent('');
            toast.success('게시글을 생성했습니다.');
        }catch(e){
            console.error(e);
            toast.error('게시글 생성에 실패 하였습니다.');
        }

    };
    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        const{
            target:{name, value}
        } = e;

        if(name === 'content'){
            setContent(value);
        }
    };
    return (
        <form className="post-form" onSubmit={onSubmit}>
            <textarea
                className="post-form__textarea"
                required
                name="content"
                id="content"
                placeholder="What is happening?"
                onChange={onChange}
                value={content}
            />
            <div className="post-form__submit-area">
                <label htmlFor="file-input" className="post-form__file">
                    <FiImage className="post-form__file-icon" />
                </label>
                <input
                    type="file"
                    name="file-input"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                />
                <input type="submit" value="Tweet" className="post-form__submit-btn" />
            </div>
        </form>
    );
}