import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css'

import { SWRConfig } from 'swr';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { allReducers } from '../redux/reducers';
import fetchJson from '../lib/fetchJson'

const store = createStore(allReducers);

export default function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => {
            console.log(err)
          }
        }}>
          <Provider store={store}>
              <Component {...pageProps} />
          </Provider>
    </SWRConfig>
  )
}