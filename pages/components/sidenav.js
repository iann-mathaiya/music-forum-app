import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import Auth from './auth'
import Forum from './forum'
import SharePost from './sharePost'
import { supabase } from '../../utils/supabaseClient'
import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { ChatIcon, ShareIcon } from '@heroicons/react/solid'

export default function Sidenav() {
    const [profile, setProfile] = useState(null)
    const router = useRouter()

    const [session, setSession] = useState(null)

    //check if user is authenticated
    useEffect(() => {

        setSession(supabase.auth.session())

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        fetchProfile()
    }, [])

    //GET user data
    async function fetchProfile() {
        const profileData = await supabase.auth.user()
        if (!profileData) {
            router.push('/login')
        } else {
            setProfile(profileData)
        }
    }

    const [loading, setLoading] = useState(false)
    const [Posts, setPosts] = useState([])
    const [post, setPost] = useState({ postTitle: "", postedBy: "", description: "", postCategory: "Events", comments: "" })
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
        fetchComments
        setLoading(false)

    }

    const [Comments, setComments] = useState([])
    const [comment, setComment] = useState({ commentInfo: "" })
    const { commentInfo } = comment

    async function fetchComments() {
        const { data: Posts, error } = await supabase
            .from('Posts')
            .select(`comments ,Comments (id, commentInfo)`)
        setPosts()
    }

    async function createComment() {
        setLoading(true)
        const { data } = await supabase
            .from('Comments')
            .insert([
                { commentInfo },
            ]).single()
        setComment({ commentInfo: "" })
        setLoading(false)
        console.log("data: ", data)

    }


    if (!profile) return null

    return (
        <>

            {/* Box icons cdn for category icons */}
            <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />

            {/* Side navigation showing categories */}
            <div className="min-h-screen flex flex-row bg-indigo-100">
                <div className="flex flex-col w-56 bg-indigo-100 overflow-hidden hidden md:block">
                    <div className="flex items-center justify-center h-20">
                        <h1 className="text-xl text-indigo-800 font-bold underline">#Trending Topics</h1>
                    </div>
                    <ul className="flex flex-col py-0">
                        <li>
                            <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-orange-600">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-orange-600"><i className="bx bx-question-mark"></i></span>
                                <span className="text-sm font-medium">FAQ's</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-red-600">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-red-600"><i className="bx bxs-bell-ring"></i></span>
                                <span className="text-sm font-medium">Notifications</span>
                                <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">5</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-green-600">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-green-600"><i className="bx bxs-conversation"></i></span>
                                <span className="text-sm font-medium">Feedback</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex flex-row items-center h-12 transform translate-x-2 hover:-translate-x-2 transition-transform ease-in duration-200 text-fuchsia-600 hover:text-fuchsia-600">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-fuchsia-600"><i className="bx bxs-calendar-event bx-tada"></i></span>
                                <span className="text-sm font-medium">Events</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-blue-600">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-blue-600"><i className="bx bxs-paper-plane"></i></span>
                                <span className="text-sm font-medium">Announcements</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-indigo-600">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-indigo-600"><i className="bx bxs-upvote"></i></span>
                                <span className="text-sm font-medium">Vote for fave Artist</span>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Main Container showing posts */}
                <div className="container overflow-auto mx-auto my-auto py-10 md:w-4/5 w-11/12 px-6" id={styles.container}>

                    {/* Remove className [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
                    <div className="container overflow-auto w-full bg-white rounded border-dashed border-0 border-gray-300">
                        <div className="mx-16 py-10">
                            <div className="container">
                                {!session ? <Auth /> : <Forum key={session.user.id} session={session} />}
                            </div>

                            <div>
                                {

                                    Posts.map(post => (
                                        <div
                                            className="bg-indigo-50 mb-6 shadow-lg rounded-md p-3 hover:bg-indigo-200"
                                            key={post.id}>
                                            <h3
                                                className="font-bold text-2xl text-indigo-800 pb-2"
                                            >{post.postTitle}</h3>
                                            <h4
                                                className="italic text-md text-indigo-600 pb-2"
                                            >Hosted by: {post.postedBy}</h4>
                                            <p
                                                className="font-regular text-xl text-black pb-2"
                                            >{post.description}</p>

                                            <p
                                                className="font-regular text-lg text-gray-500 pb-2"
                                            >{post.comments}</p>

                                            <div>
                                                <div className="flex justify-start">
                                                    <ChatIcon className="block h-6 w-6 text-gray-400 hover:text-green-500">
                                                        onClick={ }
                                                    </ChatIcon>
                                                    <button>
                                                        <ShareIcon className="shareButton block h-6 w-6 mx-3 text-gray-400 hover:text-fuchsia-400">
                                                            {/* onClick={sharePost} */}
                                                        </ShareIcon>
                                                    </button>

                                                </div>

                                                <div>
                                                    <div className="my-3 relative rounded-md shadow-sm">
                                                        <input
                                                            name="comment"
                                                            id="comment"
                                                            className="focus:ring-indigo-800 focus:border-indigo-800 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                                            placeholder="Add Comment"
                                                            type="text"
                                                            value={commentInfo}
                                                            onChange={e => setComment({ ...comment, commentInfo: e.target.value })}
                                                        />
                                                        <div className="absolute inset-y-0 right-0 flex items-center">
                                                            <button
                                                                className="justify-items-start bg-indigo-800 hover:bg-white hover:border-2 border-white drop-shadow-md hover:drop-shadow-lg text-white hover:text-indigo-800 font-bold py-2 px-4 rounded-md inline-flex items-center"
                                                                type="button"
                                                                onClick={createComment}
                                                            >
                                                                <span className="px-2 overflow-hidden hidden md:block">Submit Comment</span>
                                                                <ChatIcon
                                                                    className="block h-6 w-6" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ian M. Deployed This Music Forum App on {' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>

                </a>
            </footer>



        </>
    )
}