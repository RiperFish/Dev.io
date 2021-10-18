
import React, { useState, useEffect } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, InertiaLink } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/Guest';
import NavLink from '@/Components/NavLink';
import { data } from 'autoprefixer';
import Moment from 'react-moment';
import { Inertia } from '@inertiajs/inertia'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTags, faList, faHeart } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard(props) {

    var post = props.post
    const [userAlreadyVoted, setUserAlreadyVoted] = useState(false)
    useEffect(() => {
        if (props.auth.user) {
            if (post.likes.some(likes => likes.user_id === props.auth.user.id)) {
                setUserAlreadyVoted(true)
            } else {
                setUserAlreadyVoted(false)
            }
        }

    });

    const [CommentContent, setCommentContent] = useState({
        commentBody: "",
        post_id: post.id,
        user_id: props.auth.user ? props.auth.user.id : ""
    })
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setCommentContent(CommentContent => ({
            ...CommentContent,
            [key]: value,
        }))
    }

    function SubmitComment(e) {
        e.preventDefault()
        Inertia.post('/comments', CommentContent)
        setCommentContent({
            commentBody: "",
            post_id: post.id,
            user_id: props.auth.user ? props.auth.user.id : ""
        },
            {
                preserveScroll: true,
                resetOnSuccess: false,
            }
        )
    }

    function SubmitLike(e) {
        e.preventDefault()
        Inertia.post('/likes', post)

    }
    return (

        <Authenticated
            auth={props.auth}
            errors={props.errors}

        >
            <div className="py-12 bg-wrapper">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex">
                    <div className=" px-5 pt-9 flex flex-col">
                        <div className="flex flex-col mb-7 items-center" >
                            <form onSubmit={SubmitLike} className="addProjectForm">
                                <div className="form_group ">
                                    <button type="submit"
                                        className={(userAlreadyVoted ?
                                            "text-red-700 border border-red-700 rounded-full px-3 py-1 pb-2 pt-3 " :
                                            "text-black px-3 py-1 pb-2 pt-3")}>
                                        <FontAwesomeIcon className=" w-full" icon={faHeart} size="lg" />

                                    </button>
                                </div>
                            </form>
                            <span className={(userAlreadyVoted ?
                                "text-red-700 " :
                                "text-black")}>{post.likes.length}
                            </span>
                        </div>
                        {/* <div className="flex flex-col mb-7 items-center " >
                            <a href="#">Save</a>
                            <span>Sum of Saves</span>
                        </div> */}
                    </div>
                    <div className="mx-5 flex-1 flex-col p-9 bg-white rounded-2xl shadow-custom">
                        <div className="flex items-center mb-6">
                            <div className="avatar w-8 h-8 rounded-full bg-customBlue mr-3"></div>
                            <div>
                                <h2 className=" font-semibold text-base text-gray-600">{post.user.name}</h2>
                                <p className=" text-xs text-gray-500">Posted on <Moment format="MMM D" withTitle>{post.created_at}</Moment> (<Moment fromNow>{post.created_at}</Moment>)</p>
                            </div>
                        </div>
                        <h1 className=" text-4xl font-extrabold my-4">{post.title}</h1>
                        <div className="tags flex mb-8">
                            {post.tags.map((tag) => (
                                <InertiaLink key={tag.id} href={route('tags.show', { tag: tag })} >
                                    <h1 className="mr-2 text-base text-gray-500">#{tag.name}</h1>
                                </InertiaLink>
                            ))}
                        </div>
                        <div className="mb-7" >
                            {/* <p className="text-lg"></p> */}
                            <div dangerouslySetInnerHTML={{ __html: post.body }} />

                        </div>

                        <hr />

                        <h2 className="font-bold text-xl mt-7 mb-5">Discussion ({props.comments.length})</h2>
                        <div className="flex mb-4">
                            <div className="avatar w-8 h-8 rounded-full bg-green-300 mr-3"></div>
                            <form onSubmit={SubmitComment} className="addProjectForm w-full">

                                <div className="form_group flex flex-col">
                                    <textarea placeholder="Add to the discussion" rows="4" cols="50" id="commentBody" value={CommentContent.commentBody} onChange={handleChange}
                                        className="shadow-sm border border-gray-200 rounded-2xl mb-2" />
                                </div>
                                <div className="form_group ">
                                    <button type="submit" className="border px-5 py-2 shadow-sm bg-customBlue rounded-full text-white">Submit</button>
                                </div>
                            </form>
                        </div>
                        <hr className=" mb-4" />
                        {/* // Comments */}
                        {props.comments.map((comment) => (
                            <div key={comment.id} className="flex mb-5">
                                <div className="avatar w-8 h-8 rounded-full bg-green-300 mr-3"></div>

                                <div className="form_group flex flex-col w-full shadow-sm border border-gray-200 bg-white rounded-2xl mb-4 p-5">
                                    <div className="flex items-center mb-4">
                                        <h2 className="font-bold text-base text-gray-600">{comment.user.name}</h2>
                                        <div className="avatar w-1 h-1 rounded-full bg-gray-400 mx-3"></div>
                                        <p className=" text-xs text-gray-500"><Moment format="MMM D" withTitle>{comment.created_at}</Moment></p>
                                    </div>

                                    <p >
                                        {comment.comment_content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-5 w-3/12">Author details</div>
                </div>
            </div>
        </Authenticated >
    );
}
