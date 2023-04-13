import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import utilStyles from 'util'
import { Layout } from '../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../redux/actions/counter';
import { startConfirmUser, endConfirmUser} from '../redux/actions/confirm';


export default function Home( { allPostsData }) {
  const counter = useSelector((state) => state.user);
  console.log(counter)
  const dispatch = useDispatch();
  var user = {
    name: 'hihi',
    phone: 'test'
  }
  return (
    <Layout>
        <Head>
          <title>Home</title>
        </Head>
        <main>
          <h1 className={styles.title}>
            This is Home
          </h1>
          <div>
            {/* <h1>Counter {counter}</h1> */}
            <button onClick={() => dispatch(startConfirmUser(user))}>Increment</button>
            <button onClick={() => dispatch(endConfirmUser())}>Decrement</button>
          </div>

        </main>
    </Layout>
  )
}
