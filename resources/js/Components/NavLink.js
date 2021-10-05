import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={
                active
                    ? 'inline-flex items-center  px-1 pt-1 font-light text-base  leading-5 text-black transition duration-150 ease-in-out'
                    : 'inline-flex items-center  px-1 pt-1 font-light text-base  leading-5 text-gray-700 transition duration-150 ease-in-out'
            }
        >
            {children}
        </Link>
    );
}
