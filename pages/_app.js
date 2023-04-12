import '../styles/globals.css';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import fetchJson from '../lib/fetchJson'
// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => {
            console.log(err)
          }
        }}>
        <Component {...pageProps} />  
    </SWRConfig>
  )
}