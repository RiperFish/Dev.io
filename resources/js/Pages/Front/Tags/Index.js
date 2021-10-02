
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
    return (

        <Authenticated
            auth={props.auth}
            errors={props.errors}

        >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-4">

                {tags.map((tag) => (
                    <a href="#" key={tag.id} className="mr-2 text-xs text-gray-500">#{tag.name}</a>
                ))}

            </div>

        </Authenticated >
    );
}
