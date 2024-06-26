
import Login from '../components/login'
import Head from 'next/head';


import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() { 
  return (
    <div>
    <Head>
      <title>Anushka Kulkarni | Software Developer</title>
      <meta name = "description" content="generated by create next app" />
      <link rel="icon" href="/favicon.ico"/>
    </Head>
  
    <Login />

    </div>
  )
}
