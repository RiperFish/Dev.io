/* import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link,InertiaLink } from '@inertiajs/inertia-react';
import NavLink from '@/Components/NavLink';
export default function Projects(props) {
    console.log(props)
    function test(x) {
        console.log(x)
    }
    return (

        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Projects Page</h2>}
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <InertiaLink href={route('projects.create')}>
                        Add project
                    </InertiaLink>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">


                        {props.data.map(({ id, title }) => (
                            <div key={id} className=" py-2 px-4 flex items-center justify-between bg-white border-b border-gray-200">
                                <h1>{title}</h1>
                                <Link
                                    tabIndex="-1"
                                    href={route('projects.edit', id)}
                                    className="py-1 px-3 border border-gray-400 rounded-md"
                                >
                                    Edit
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Authenticated>

    )
}
 */