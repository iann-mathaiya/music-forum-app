import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'
import Navbar from './components/navbar'

function MyApp({ Component, pageProps }) {

  const [authenticatedState, setAuthenticatedState] = useState('not-authenticated')
  const router = useRouter()

  useEffect(() => {

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session)
      if (event === 'SIGNED_IN') {
        setAuthenticatedState('authenticated')
        router.push('/community')
      }
      if (event === 'SIGNED_OUT') {
        setAuthenticatedState('not-authenticated')
        router.push('/login')
      }
    })

    checkUser()
    return () => {
      authListener.unsubscribe()
    }

  }, [])

  async function handleAuthChange(event, session) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session })
    })
  }

  async function checkUser() {
    const user = await supabase.auth.user()
    if (user) {
      setAuthenticatedState('authenticated')
    }
  }

  return (
    <>
      {
        authenticatedState === 'not-authenticated' && <Navbar />
      }
      <div>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
