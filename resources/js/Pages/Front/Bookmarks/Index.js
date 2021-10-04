
import React from 'react';
import { Inertia } from '@inertiajs/inertia'
import Authenticated from '@/Layouts/Authenticated';
import { InertiaLink } from '@inertiajs/inertia-react';

import NavLink from '@/Components/NavLink';
import Moment from 'react-moment';
import Pluralize from 'react-pluralize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
export default function Dashboard(props) {
    var bookmarks = props.bookmarks
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}

        >

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
                    <h1 className="font-bold text-xl">Bookmarked posts : ({bookmarks.length})</h1>
                    <div className="flex">
                        <div className=" p-5 mr-5">
                            <InertiaLink href={route('tags.index')} >
                                <h1 className="mb-4 px-1 pt-1 font-light text-lg  leading-5 text-gray-500 transition duration-150 ease-in-out">all tags</h1>
                            </InertiaLink>
                            {bookmarks.map((post) => (

                                post.post.tags.map((tag) => (
                                    <InertiaLink key={tag.id} href={route('tags.show', { tag: tag })} >
                                        <h1 className="mb-4 px-1 pt-1 font-light text-lg  leading-5 text-gray-500 transition duration-150 ease-in-out">#{tag.name}</h1>
                                    </InertiaLink>
                                ))

                            ))}
                        </div>
                        <div className="mx-5 rounded-3xl p-5 flex-1 border border-gray-200 bg-white my-3">
                            {bookmarks.map((post) => (
                                <div key={post.post.id} className="flex mb-8">
                                    <div className="avatar w-8 h-8 rounded-full bg-green-300 mr-3"></div>
                                    <div>
                                        <InertiaLink href={route('posts.show', { post: post.post })} >
                                            <h1 className="font-bold text-lg mb-1">{post.post.title}</h1>
                                        </InertiaLink>
                                        <div className="flex items-center">
                                            <h2 className="font-bold text-sm text-gray-600 ">{post.post.user.name}</h2>
                                            <div className="dot h-1 w-1 rounded-full bg-gray-500 mx-4"></div>
                                            <p className=" text-sm text-gray-500"><Moment format="MMM D" withTitle>{post.post.created_at}</Moment> (<Moment fromNow>{post.post.created_at}</Moment>)</p>
                                            <div className="dot h-1 w-1 rounded-full bg-gray-500 mx-4"></div>
                                            {post.post.tags.map((tag) => (
                                                <InertiaLink key={tag.id} href={route('tags.show', { tag: tag })} >
                                                    <h1 className="mr-2 text-sm text-gray-500">#{tag.name}</h1>
                                                </InertiaLink>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </Authenticated >
    );
}
