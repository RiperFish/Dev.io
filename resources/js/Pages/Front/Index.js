
import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, InertiaLink } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/Guest';
import NavLink from '@/Components/NavLink';
import { data } from 'autoprefixer';
import Moment from 'react-moment';
import Pluralize from 'react-pluralize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
export default function Dashboard(props) {

    return (

        <Authenticated
            auth={props.auth}
            errors={props.errors}

        >

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-home">
                    <div className="border p-5">
                        <NavLink href={route('tags.index')} >
                            Tags
                        </NavLink>
                        <NavLink href="">
                            Reading list
                        </NavLink>
                    </div>
                    <div className="mx-5">
                        {props.posts.map((post) => (
                            <div key={post.id} className=" rounded-md p-5 flex flex-col shadow-md bg-white my-3 first:mt-0">
                                <div className="flex items-center">
                                    <div className="avatar w-8 h-8 rounded-lg bg-green-300 mr-3"></div>
                                    <div>
                                        <h2 className="font-bold text-base text-gray-600">{post.user.name}</h2>
                                        <p className=" text-xs text-gray-500"><Moment format="MMM D" withTitle>{post.created_at}</Moment>(<Moment fromNow>{post.created_at}</Moment>)</p>
                                    </div>
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
                                <div className="flex text-sm">
                                    <div className="mr-auto">
                                        <a href="#" className="mr-7"><FontAwesomeIcon icon={faHeart} /> {post.likes_count}</a>
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
                                    <div>
                                        <a href="#" className="px-3 py-1 bg-customBlue text-white rounded-md">Save</a>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                    <div className="border p-5">right sidbar</div>
                </div>
            </div>
        </Authenticated >
    );
}
