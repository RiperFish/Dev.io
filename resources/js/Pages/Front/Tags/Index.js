
import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Inertia } from '@inertiajs/inertia'
import { Head, InertiaLink } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/Guest';
import NavLink from '@/Components/NavLink';
import { data } from 'autoprefixer';
import Moment from 'react-moment';
import Pluralize from 'react-pluralize'
export default function Dashboard(props) {
    /* console.log(props.auth.user.tags[0].pivot) */
    var tags = props.tags
    var colors = [];
    while (colors.length < tags.length) {
        do {
            var color = Math.floor((Math.random() * 1000000) + 1);
        } while (colors.indexOf(color) >= 0);
        colors.push("#" + ("000000" + color.toString(16)).slice(-6));
    }

    function FollowTag(e) {
        e.preventDefault()
        //console.log(e.target.postId.value)
        Inertia.post('/tags/follow', { 'tagId': e.target.tagId.value },
            {
                preserveScroll: true,
                resetOnSuccess: false,
            })
    }
    function UnFollowTag(e) {
        e.preventDefault()
        Inertia.delete(`/tags/${e.target.tagId.value}`,
            {
                preserveScroll: true,
                resetOnSuccess: false,
            })
    }
    return (

        <Authenticated
            auth={props.auth}
            errors={props.errors}

        >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-6 mt-6">

                {tags.map((tag, index) => (
                    <div key={tag.id} className=" overflow-hidden rounded-lg shadow-custom">
                        <div className="h-3" style={{ backgroundColor: colors[index] }}></div>
                        <div className="p-5 pt-3 h-full flex flex-col">
                            <InertiaLink href={route('tags.show', { tag: tag })} >
                                <h1 className="mr-2 mb-5 mt-2 block text-lg font-bold text-gray-400">#<span className="text-gray-800">{tag.name}</span></h1>
                            </InertiaLink>

                            <p>{tag.description}</p>
                            <span className="text-gray-400 font-extralight text-sm mb-auto"><Pluralize singular={'Post'} count={tag.posts_count} /> published</span>

                            <div className="mb-3">
                                {props.auth.user ?
                                    tag.users.some(myTags => myTags.pivot.user_id === props.auth.user.id) ?
                                        <form onSubmit={UnFollowTag} className="addProjectForm w-full">
                                            <input type="hidden" name="tagId" value={tag.id} />
                                            <div className="form_group ">
                                                <button type="submit" className="px-4 py-2 bg-gray-200 shadow-custom text-gray-700 rounded-lg">Unfollow</button>
                                            </div>
                                        </form>
                                        :
                                        <form onSubmit={FollowTag} className="addProjectForm w-full">
                                            <input type="hidden" name="tagId" value={tag.id} />
                                            <div className="form_group ">
                                                <button type="submit" className="px-4 py-2 shadow-custom border border-gray-200 text-gray-600 rounded-lg">Follow</button>
                                            </div>
                                        </form>
                                    :
                                    'Login to Follow'
                                }
                            </div>

                        </div>

                    </div>
                ))}
            </div>

        </Authenticated >
    );
}
