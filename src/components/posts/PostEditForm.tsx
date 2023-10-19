import { useState, useCallback } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { FiImage } from "react-icons/fi";
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostProps } from 'pages/home';

export default function PostEditForm() {
    const params = useParams();
    const [post, setPost] = useState<PostProps | null>(null);
    const [content, setContent] = useState<string>('')
    const navigate = useNavigate()
    const handleFileUpload = () => {};

    const getPost = useCallback(async () => {
        if(params.id){
            const docRef = doc(db, "posts", params.id)
            const docSnap = await getDoc(docRef);
            setPost({...(docSnap?.data() as PostProps), id: docSnap.id})
            setContent(docSnap?.data()?.content)
        }
    }, [params.id])

    const onSubmit = async (e:any) => {
        e.preventDefault();
        try{
            if(post){
                const postRef = doc(db, "posts", post?.id);
                await updateDoc(postRef, {
                    content:content,
                    updatedAt:new Date()?.toLocaleDateString("ko",{
                        hour:"2-digit",
                        minute:"2-digit",
                        second: "2-digit",
                    }),
                });
            }
            toast.success('게시글을 수정 되었습니다.');
            navigate(`/posts/${post?.id}`)
        }catch(e){
            console.error(e);
            toast.error('게시글 수정에 실패 하였습니다.');
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

    useEffect(()=>{
        if(params?.id) getPost()
    }, [getPost])

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