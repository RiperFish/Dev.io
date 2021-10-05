import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia'
import '../../../../css/custom.css'
import Select from 'react-select'
import TextEditor from '@/Components/Editor/Editor';

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';

export default function CreatePost(props) {
    Quill.register('modules/imageResize', ImageResize);

    const [postBody, setPostBody] = useState('');
    const [PostContent, setPostContent] = useState({
        title: "",
        /* body: "", */
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
        Inertia.post('/posts', { PostContent, "body": postBody })
    }

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize']
        }
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
                                <label htmlFor="title">Title :</label>
                                <input id="title" value={PostContent.title} onChange={handleChange}
                                    className=" border " />
                            </div>
                            {/*   <div className="form_group flex flex-col">
                                <label htmlFor="body">Project description :</label>
                                <textarea rows="4" cols="50" id="body" value={PostContent.body} onChange={handleChange}
                                    className="shadow-sm border " />
                            </div> */}

                            <div className="my-5 h-editor editorContainer">
                                <label htmlFor="body">Post content :</label>
                                {/* < TextEditor /> */}
                                <ReactQuill theme="snow" value={postBody} onChange={setPostBody} modules={modules}
                                />
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
