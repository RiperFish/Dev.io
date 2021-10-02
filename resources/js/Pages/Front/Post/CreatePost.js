import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia'
import '../../../../css/custom.css'
import Select from 'react-select'
export default function CreatePost(props) {
    const [PostContent, setPostContent] = useState({
        title: "",
        body: "",
        tags: []
    })
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setPostContent(PostContent => ({
            ...PostContent,
            [key]: value,
        }))
    }
    function handleTags(selectedOption) {
        //console.log(`Option selected:`, );
        setPostContent(PostContent => ({
            ...PostContent,
            tags: selectedOption.map(x => x.value),
        }))
    }
    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post('/posts', PostContent)
    }

    var tags = []
    props.tags.forEach(element => {
        tags.push({ 'value': element.id, 'label': element.name.charAt(0).toUpperCase() + element.name.slice(1) })
    });

    return (

        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create a new post</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className=" shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="flex flex-col addProjectForm">
                            <div className="form_group flex flex-col">
                                <label htmlFor="title">Project title :</label>
                                <input id="title" value={PostContent.title} onChange={handleChange}
                                    className="shadow-sm border " />
                            </div>
                            <div className="form_group flex flex-col">
                                <label htmlFor="body">Project description :</label>
                                <textarea rows="4" cols="50" id="body" value={PostContent.body} onChange={handleChange}
                                    className="shadow-sm border " />
                            </div>

                            <div className="form_group flex flex-col">
                                <label htmlFor="tags">Tags :</label>
                                <Select
                                    id="tags"
                                    closeMenuOnSelect={false}
                                    onChange={handleTags}
                                    isMulti
                                    options={tags}
                                />
                            </div>
                            <div className="form_group ">
                                <button type="submit" className="border px-5 py-2 shadow-sm bg-customBlue rounded-md text-white">Submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </Authenticated>

    )
}
