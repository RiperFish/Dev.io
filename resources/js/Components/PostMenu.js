import React, { useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

export default function PostMenu({ post }) {
    const [showMenu, setShowMenu] = useState(false)

    function OpenMenu() {
        showMenu ? setShowMenu(false) : setShowMenu(true)
    }
    function CloseMenu() {
        setShowMenu(false)
    }
    return (
        <div className="dropdown absolute right-6" >
            <button onClick={OpenMenu} /* onBlur={CloseMenu} */ className="bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-full inline-flex items-center drop-down-btn" >
                ...
            </button>
            <ul className={showMenu ? "dropdown-content rounded-b absolute right-0 shadow-md block text-gray-700 mt-1 w-24" : "dropdown-content absolute hidden text-gray-700 pt-1"}>
                <li>
                    <InertiaLink className="rounded-t bg-gray-100 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap w-full"
                        href={route('posts.edit', { post: post })} only={['posts']}
                        method="get" as="button" type="button">

                        Edit
                    </InertiaLink>
                </li>

                <li>

                    <InertiaLink className="rounded-t bg-gray-100 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap w-full"
                        href={route('posts.destroy', { post: post })} only={['posts']}
                        method="delete" as="button" type="button"
                        onBefore={() => confirm('Are you sure you want to delete this post?')}>
                        Delete
                    </InertiaLink>
                </li>

            </ul>
        </div>
    );
}
