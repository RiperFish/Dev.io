
import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, InertiaLink } from '@inertiajs/inertia-react';
import Guest from '@/Layouts/Guest';
import NavLink from '@/Components/NavLink';
import { data } from 'autoprefixer';
import Moment from 'react-moment';
import Pluralize from 'react-pluralize'
export default function Dashboard(props) {
    var tags = props.tags
    var colors = [];
    while (colors.length < tags.length) {
        do {
            var color = Math.floor((Math.random() * 1000000) + 1);
        } while (colors.indexOf(color) >= 0);
        colors.push("#" + ("000000" + color.toString(16)).slice(-6));
    }
    return (

        <Authenticated
            auth={props.auth}
            errors={props.errors}

        >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-4 gap-6 mt-6">

                {tags.map((tag, index) => (
                    <div key={tag.id} className=" overflow-hidden rounded-lg shadow-md">
                        <div className="h-3" style={{ backgroundColor: colors[index] }}></div>
                        <div className="p-5 pt-3">
                            <InertiaLink href={route('tags.show', { tag: tag })} >
                                <h1 className="mr-2 mb-5 mt-2 block text-lg font-bold text-gray-400">#<span className="text-gray-800">{tag.name}</span></h1>
                            </InertiaLink>

                            <p>{tag.description}</p>
                            <span className="text-gray-400 font-extralight text-sm"><Pluralize singular={'Post'} count={tag.posts_count} /> published</span>
                        </div>

                    </div>

                ))}

            </div>

        </Authenticated >
    );
}
