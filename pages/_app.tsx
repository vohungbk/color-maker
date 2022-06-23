import type { AppProps } from 'next/app'
import Head from 'next/head'
import { LazyMotion, domAnimation } from 'framer-motion'
import { Provider } from 'react-redux'

import '../scss/app.scss'
import store from '../redux/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{`Color maker`}</title>
        <meta name="title" content="Color maker" />
        <meta name="description" content="Color maker" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Color maker" />
        <meta property="og:description" content="Color maker" />
        <meta property="og:image" content="/images/avatar.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Color maker" />
        <meta property="twitter:description" content="Color maker" />
        <meta property="twitter:image" content="/images/avatar.png" />

      
      </Head>
      <LazyMotion features={domAnimation}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </LazyMotion>
    </>
  )
}

export default MyApp
