import '../styles/globals.css'
import {getLibrary as getLibraryWeb3} from '../config/web3/index'
import { Web3ReactProvider } from '@web3-react/core'

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibraryWeb3}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default MyApp
