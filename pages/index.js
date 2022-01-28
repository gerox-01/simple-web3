import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useCallback  } from 'react'
import styles from '../styles/Home.module.css'
import { useWeb3React } from '@web3-react/core'
import { connector } from '../config/web3/index'

export default function Home() {
  const { active, activate, deactivate, error, account, chainId } = useWeb3React()
  
  const connect = useCallback(() => {
    activate(connector)
    localStorage.setItem('previouslyConnected', true)
  }, [activate])

  useEffect(() => {
    if(localStorage.getItem('previouslyConnected') === 'true') {
       connect()
    }
  }, [connect])

  

  const disconnect = () => {
    deactivate()
    localStorage.removeItem('previouslyConnected')
  }

  if(error){
    return (
      <div>
        <Head>
          <title>Error</title>
        </Head>
        <div className={styles.container}>
          <h1>Error</h1>
          <p>{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1>Web3 demo app</h1>
      {
        active ? (
          <>
            <p> You are connected to {chainId}</p>
            <p>Your account: {account}</p>
            <button onClick={disconnect}>Disconnect</button>
          </>
        ) : (
          <>
            <p>You are not connected</p>
            <button onClick={connect}>Connect</button>
          </>
        )
      }
      <button onClick={connect}>Connect with Wallet</button>
    </div>
  )
}
