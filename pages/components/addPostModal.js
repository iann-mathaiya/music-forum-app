import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'

export default function AddPostModal({session}) {

    const [loading, setLoading] = useState(false)
    const [Posts, setPosts] = useState([])
    const [post, setPost] = useState({ postTitle: "", postedBy: "", description: "", postCategory: "Events" })
    const { postTitle, postedBy, description, postCategory } = post

    useEffect(() => {
        fetchPosts()
    }, [session])

    async function fetchPosts() {
        setLoading(true)
        const { data } = await supabase
            .from('Posts').select()
        setPosts(data)
        console.log("data: ", data)
        setLoading(false)

    }

    async function createPost() {
        setLoading(true)
        const { data } = await supabase
            .from('Posts')
            .insert([
                { postTitle, postedBy, description, postCategory },
            ]).single()
        setPost({ postTitle: "", postedBy: "", description: "", postCategory: "Events" })
        fetchPosts()
        setLoading(false)
        console.log("data: ", data)
        closeModal()

    }

    let [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        fetchPosts()
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div className="inset-0 flex items-start justify-start">
                <button
                    className="mb-6 mr-4 justify-items-start bg-indigo-800 hover:bg-white hover:border-2 border-indigo-800  drop-shadow-md hover:drop-shadow-lg text-white hover:text-indigo-800 font-bold py-2 px-4 rounded-md inline-flex items-center"
                    type="button"
                    onClick={openModal}
                >
                    <span className="px-4">Start New Discussion</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hidden md:block" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Add a new post
                                </Dialog.Title>

                                <div className="form-widget">
                                    <div>
                                        <label htmlFor="title" className="mt-4 mb-2 block text-sm font-medium text-gray-700">Title</label>
                                        <input
                                            id="title"
                                            className="focus:ring-indigo-800 focus:border-indigo-800 block w-full sm:text-sm border-gray-300 rounded-md"
                                            type="text"
                                            value={postTitle}
                                            onChange={e => setPost({ ...post, postTitle: e.target.value })}

                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="mt-4 mb-2 block text-sm font-medium text-gray-700">Event description</label>
                                        <input
                                            id="description"
                                            className="focus:ring-indigo-800 focus:border-indigo-800 block w-full sm:text-sm border-gray-300 rounded-md"
                                            type="text"
                                            value={description}
                                            onChange={e => setPost({ ...post, description: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="username" className="mt-4 mb-2 block text-sm font-medium text-gray-700">Who's hosting?</label>
                                        <input
                                            id="username"
                                            className="focus:ring-indigo-800 focus:border-indigo-800 block w-full sm:text-sm border-gray-300 rounded-md"
                                            type="text"
                                            value={postedBy}
                                            onChange={e => setPost({ ...post, postedBy: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="category" className="mt-4 mb-2 block text-sm font-medium text-gray-700">Post Category</label>
                                        <input
                                            id="category"
                                            className="focus:ring-indigo-800 focus:border-indigo-800 block w-full sm:text-sm border-gray-300 rounded-md"
                                            type="text"
                                            value={"Events"}
                                            onChange={e => setPost({ ...post, postCategory: e.target.value })}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={createPost}
                                    >
                                        Add Post
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}