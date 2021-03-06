
import React, { useEffect } from 'react';

import { Inertia } from '@inertiajs/inertia'
import Authenticated from '@/Layouts/Authenticated';
import { InertiaLink } from '@inertiajs/inertia-react';

import NavLink from '@/Components/NavLink';
import PostMenu from '@/Components/PostMenu';
import Moment from 'react-moment';
import Pluralize from 'react-pluralize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faTags, faList, faClipboard } from '@fortawesome/free-solid-svg-icons'


export default function Dashboard(props) {
    console.log(props)

    /*   window.onload = function () {
          document.querySelectorAll('.drop-down-btn').forEach(element => {
              element.addEventListener('click', (e) => {
                  console.log(this)
                  //document.querySelector('#menu-' + e.target.id).classList.toggle('hidden')
              })
          });
      }; */


    useEffect(() => {
        if (props.auth.user) {
            window.Echo.private(`App.Models.User.${props.auth.user.id}`).notification((notification)=>{
                console.log(notification)
            })
        }
      
    });

    function BookmarkPost(e) {
        e.preventDefault()
        //console.log(e.target.postId.value)
        Inertia.post('/bookmarks', { 'postId': e.target.postId.value },
            {
                preserveScroll: true,
                resetOnSuccess: false,
            })
    }
    function UnBookmarkPost(e) {
        e.preventDefault()
        Inertia.delete(`/bookmarks/${e.target.delPostId.value}`,
            {
                preserveScroll: true,
                resetOnSuccess: false,
                //preserveState : true
            })
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}

        >
            <div className="py-12 bg-wrapper">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-home">
                    <div className="side-nav flex flex-col">
                        {props.auth.user ?
                            <div className=" mb-4  pl-2">
                                <NavLink href={route('tags.index')} className="font-light text-lg">
                                    <FontAwesomeIcon className="mr-2 h-5 w-5" icon={faClipboard} />
                                    Dashboard
                                </NavLink>
                            </div>
                            :
                            null
                        }

                        <div className=" mb-4  pl-2">
                            <NavLink href={route('tags.index')} className="font-light text-lg">
                                <FontAwesomeIcon className="mr-2 h-5 w-5" icon={faTags} />
                                Tags
                            </NavLink>
                        </div>
                        <div className=" mb-2  pl-2">
                            <NavLink href={route('bookmarks.index')} className="font-light text-lg">
                                <FontAwesomeIcon className="mr-2 h-5 w-5" icon={faList} />
                                Bookmarks
                            </NavLink>
                        </div>
                        <div className="w-full text-center mb-2">. . .</div>
                        {props.auth.user ?
                            <div>
                                <div className=" mb-4">
                                    <h1 className="font-bold px-1 text-lg">My tags</h1>
                                </div>

                                <div className="flex flex-col">
                                    {props.auth.user.tags.map((tag) => (
                                        <div className=" mb-4" key={tag.id}>
                                            <NavLink href={route('bookmarks.index')} className="font-light text-lg">
                                                #{tag.name}
                                            </NavLink>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            :
                            null
                        }

                    </div>
                    <div className="mx-5">
                        {
                            props.posts.map((post) => (
                                <div key={post.id} className=" p-5 flex rounded-2xl relative shadow-custom  my-6 first:mt-0 bg-white"> {/* border border-gray-200 bg-white */}
                                    {props.auth.user ? post.user_id === props.auth.user.id ? <PostMenu post={post}></PostMenu> : null : null}
                                    <div className="avatar w-8 h-8 mt-1 p-2 rounded-full bg-green-300 mr-3"></div>

                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-col ">
                                            <h2 className=" font-semibold text-base text-gray-600">{post.user.name}</h2>
                                            <p className=" text-xs text-gray-500"><Moment format="MMM D" withTitle>{post.created_at}</Moment> (<Moment fromNow>{post.created_at}</Moment>)</p>
                                        </div>

                                        <InertiaLink href={route('posts.show', { post: post })} >
                                            <h1 className="text-2xl font-bold my-4">{post.title}</h1>
                                        </InertiaLink>


                                        <div className="tags flex mb-4">
                                            {post.tags.map((tag) => (
                                                <InertiaLink key={tag.id} href={route('tags.show', { tag: tag })} >
                                                    <h1 className="mr-2 text-xs text-gray-500">#{tag.name}</h1>
                                                </InertiaLink>
                                            ))}
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <div className="mr-auto flex items-center text-gray-500">
                                                {props.auth.user ?
                                                    post.likes.some(likes => likes.id === props.auth.user.id) ?
                                                        <a className="mr-7 text-red-400"><FontAwesomeIcon icon={faHeart} /> {post.likes_count}</a>
                                                        :
                                                        <a className="mr-7"><FontAwesomeIcon icon={faHeart} /> {post.likes_count}</a>
                                                    :
                                                    <a className="mr-7"><FontAwesomeIcon icon={faHeart} /> {post.likes_count}</a>
                                                }

                                                <div className="mr-7">
                                                    <FontAwesomeIcon className="mr-2" icon={faComment} />
                                                    {
                                                        post.comments_count == 0 ?
                                                            props.auth.user ?
                                                                <InertiaLink href={route('posts.show', { post: post })} >
                                                                    <span >Add comment</span>
                                                                </InertiaLink> :
                                                                <InertiaLink href={route('login', { post: post })} >
                                                                    <span >Add comment</span>
                                                                </InertiaLink>
                                                            : <span ><Pluralize singular={'Comment'} count={post.comments_count} /></span>
                                                    }
                                                </div>
                                                <span><FontAwesomeIcon className="mr-2" icon={faBookmark} /> {post.bookmarks_count}</span>
                                            </div>
                                            <div className="flex items-center">

                                                {props.auth.user ?
                                                    post.bookmarks.some(bookmarks => bookmarks.user_id === props.auth.user.id) ?
                                                        <form onSubmit={UnBookmarkPost} className="addProjectForm w-full">
                                                            <input type="hidden" name="delPostId" value={post.id} />
                                                            <div className="form_group ">
                                                                <button type="submit" className="px-6 py-2 bg-gray-200 shadow-custom text-gray-700 rounded-full font-semibold uppercase text-xs">Unsave</button>
                                                            </div>
                                                        </form>
                                                        :
                                                        <form onSubmit={BookmarkPost} className="addProjectForm w-full">
                                                            <input type="hidden" name="postId" value={post.id} />
                                                            <div className="form_group ">
                                                                <button type="submit" className="px-6 py-2 shadow-custom border border-gray-200 text-gray-600 rounded-full font-semibold uppercase text-xs">Save</button>
                                                            </div>
                                                        </form>
                                                    :
                                                    'Login to save'
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                    <div className=" p-5">right sidbar</div>
                </div>
            </div>
        </Authenticated >
    );
}
