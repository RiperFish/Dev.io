
import React, { useState, useEffect } from 'react';

import { Inertia } from '@inertiajs/inertia'
import Authenticated from '@/Layouts/Authenticated';
import { InertiaLink } from '@inertiajs/inertia-react';

import NavLink from '@/Components/NavLink';
import Moment from 'react-moment';
import Pluralize from 'react-pluralize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faTags, faList, faClipboard } from '@fortawesome/free-solid-svg-icons'


export default function Dashboard(props) {
    console.log(props)




    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}

        >

            <div className="py-12">

              {/*   {props.mytagsposts.map((tag) => (
                    tag.map((post) => (
                        <h1 key={post.id}>{post.title}</h1>
                    ))
                ))} */}
            </div>
        </Authenticated >
    );
}
