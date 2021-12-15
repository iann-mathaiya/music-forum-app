import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Router, { useRouter } from 'next/router'


export default function Home() {


  return (

    <>

      <Head>
        <title>Whip Music - Community</title>
        <html lang="en" />
        <meta name="description" content="Move with the sound of the beat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className={styles.container}>


        <main className={styles.main}>

          <div className="w-fit m-10 p-10 mx-10 bg-white rounded-lg shadow-lg">
            <h1 className="font-bold text-2xl text-indigo-800 pb-2">
              Hello, Friend. 😃👋🏾
            </h1>
            <h2 className="font-medium text-xl text-indigo-800 pb-4">
              Are you an music artist looking to engage with other artists? 🎶
            </h2>
            <h3 className="font-base text-md text-black pb-6">
              Well, Whip Africa Music is the platform for you.
              <br />
              Engage with other artists, work on collabs and even host events together.
            </h3>

            <button
              onClick={() => Router.push('/login')}
              className="justify-items-start bg-indigo-800 text-2xl hover:bg-white hover:border-2 border-indigo-800 drop-shadow-md hover:drop-shadow-lg text-white hover:text-indigo-800 font-bold py-2 px-4 rounded-md inline-flex items-center"
            >
              <span>Join Community 🧑🏼‍🎤</span>
            </button>

          </div>
        </main>


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
