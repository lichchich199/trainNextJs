import { Footer } from './Footer';
import Header from './Header';
import Head from 'next/head';

export { Layout };

function Layout({ children }) {
    return (

        <>
      <Head>
        <title>Excercise NextJs</title>
      </Head>
      <Header />
      <main>
        <div className="col-md-6 offset-md-3 mt-5">
            {children}
        </div>
      </main>
      <Footer/>
    </>
    );
}