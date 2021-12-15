import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from './components/auth'
import Sidenav from './components/sidenav'
import Navbar from './components/navbar'
import Forum from './components/forum'
import { basePath } from '../utils/siteConfig'

export async function getServerSideProps() {
    const response = await fetch(`${basePath}/api/getUser`).then((response) =>
        response.json()
    );

    const { user } = response;

    if (!user) {
        return {
            redirect: { destination: "/login", permanent: false },
        };
    }
    return { props: { user } };
}

export default function Community({ user }) {

    const router = useRouter();
    const [isAuthed, setAuthStatus] = useState(false);

    useEffect(() => {
        fetch("./api/getUser")
            .then((response) => response.json())
            .then((result) => {
                setAuthStatus(result.user && result.user.role === "authenticated");
            });
    }, []);



    const [session, setSession] = useState(null)

    useEffect(() => {
        setSession(supabase.auth.session())

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <>

            <Navbar />

            <Sidenav />

            <div className="bg-white">
                <div>

                    <div>

                        <p>
                            Welcome {user.email}!{" "} 👋🏾
                        </p>{" "}

                        {!session ? <Auth /> : <Forum key={session.user.id} session={session} />}
                    </div>

                </div>
            </div>

        </>
    )
}