import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia'
import '../../css/custom.css'
export default function CreateProject(props) {
    
    const [projectValues, setProjectValues] = useState({
        title: "",
        body: "",
    })
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setProjectValues(projectValues => ({
            ...projectValues,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post('store', projectValues)
    }

    return (

        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add a new project</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className=" overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="flex flex-col addProjectForm">
                            <div className="form_group flex flex-col">
                                <label htmlFor="title">Project title :</label>
                                <input id="title" value={projectValues.title} onChange={handleChange} className="shadow-sm border" />
                            </div>
                            <div className="form_group flex flex-col">
                                <label htmlFor="body">Project description :</label>
                                <textarea rows="4" cols="50" id="body" value={projectValues.body} onChange={handleChange} className="shadow-sm border" />
                            </div>

                            <div className="form_group ">
                                <button type="submit" className="border px-5 py-2 shadow-sm bg-customBlue rounded-xl text-white">Submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </Authenticated>

    )
}
