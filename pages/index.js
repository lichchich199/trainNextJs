import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import utilStyles from 'util'
import { Layout } from '../components/Layout';

export default function Home( { allPostsData }) {
  return (
    <Layout>
        <Head>
          <title>Home</title>
        </Head>
        <main>
          <h1 className={styles.title}>
            This is Home
          </h1>
        </main>
    </Layout>
  )
}
