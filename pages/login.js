import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from './components/auth'
import Sidenav from './components/sidenav'
import Navbar from './components/navbar'
import Forum from './components/forum'

export default function Welcome() {

    return (
        <>

        <Navbar />

        <Auth />
    
        </>
    )
}


