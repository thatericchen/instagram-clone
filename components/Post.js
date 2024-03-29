import React from 'react'
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Moment from 'react-moment'

function Post({id, username, userImg, img, caption}) {
  const { data: session } = useSession();
  const [comment, setComment] = useState(''); 
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () => 
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'), 
          orderBy('timestamp', 'desc')
        ), 
        (snapshot) => setComments(snapshot.docs)
      ), 
    [db, id]
  );

  useEffect(
    () => 
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => (like.id === session?.user?.uid)) !== -1
      ),
    [likes]
  );
  
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment('');

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className = 'bg-white my-4 border rounded-md'>
        {/* Header */}
        <div className = 'flex items-center py-2.5 px-2'>
            <img src = {userImg} className = 'cursor-pointer rounded-full h-10 w-10 object-contain p-1 mr-3" alt='/>
            <p className = 'cursor-pointer flex-1 font-bold text-[14px] ml-1.5'>{username}</p>
            <DotsHorizontalIcon className = 'h-5 mr-1.5 cursor-pointer' />
        </div>

        {/* img */}
        <img src={img} className = 'object-cover w-full' alt=""/>

        {/* buttons */}
        {session && (
          <div className = 'flex justify-between px-2 pt-2 pb-0'>
            <div className = 'flex space-x-3'>
              {hasLiked ? (
                <HeartIconFilled onClick = {likePost} className = 'btn text-red-500'/>
              ) : (
                <HeartIcon onClick = {likePost} className = 'btn'/>
              )}
              <ChatIcon className = 'btn'/>
              <PaperAirplaneIcon className = 'btn'/>
            </div>
              <BookmarkIcon className = 'btn' />
          </div>
        )}
        
        {/* caption */}
        <p className = 'p-3 truncate text-sm'>
          {likes.length > 0 &&  (
            <p className = 'font-bold mb-1'> {likes.length} likes </p>
          )}

          <span className = 'font-bold mr-1'>{username}</span>
          {caption}
        </p>

        {/* comments */}
        {comments.length > 0 && (
          <div className = 'ml-3 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
            {comments.map((comment) => (
              <div key = {comment.id} className = 'flex items-center space-x-2 mb-3'>
                <img className = 'h-7 rounded-full' src={comment.data().userImage} alt=""/>
                <p className = 'text-sm flex-1'>
                  <span className = 'font-bold'>{comment.data().username}
                  </span>{" "}
                  {comment.data().comment}
                </p>

                <Moment fromNow className = 'pr-5 text-[10px]'>
                  {comment.data().timestamp?.toDate()}
                </Moment>
              </div>
            ))}
          </div>
        )}

        {/* input box */}
        {session && (
          <form className = 'flex items-center p-1.5'>
            <EmojiHappyIcon className = 'h-7 cursor-pointer'/>
            <input 
              type = 'text'
              value = {comment}
              onChange = {e => setComment(e.target.value)}
              placeholder = 'Add a comment...'
              className = 'text-sm border-none flex-1 focus:ring-0 outline-none'
            />
            <button 
              type = 'submit'
              disabled = {!comment.trim()} 
              onClick = {sendComment}
              className = 'text-[13.5px] mr-2 font-semibold text-blue-500'>Post</button>
          </form>
        )}
    </div>
  )
}

export default Post