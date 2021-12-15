import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from './components/auth'
import Sidenav from './components/sidenav'
import Navbar from './components/navbar'
import Forum from './components/forum'

export default function Community() {

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
                        {!session ? <Auth /> : <Forum key={session.user.id} session={session} />}
                    </div>

                </div>
            </div>

        </>
    )
}