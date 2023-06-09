import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'

import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { ETH_CHAINS } from '../utils/config'
// import { useColorMode } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'

import { mainnet, goerli } from '@wagmi/chains'

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY

interface Props {
    children: ReactNode
}

const { chains, provider, webSocketProvider } = configureChains(ETH_CHAINS, [
    alchemyProvider({ apiKey: ALCHEMY_API_KEY! }),
    publicProvider(),
])

export { provider }

const client = createClient({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
            chains,
            options: {
                appName: 'Blockframe',
            },
        }),
    ],
    provider,
    webSocketProvider,
})

export function Web3Provider(props: Props) {
    // const { colorMode } = useColorMode()
    return (
        <WagmiConfig client={client}>
            <ConnectKitProvider mode='auto'>
                {props.children}
            </ConnectKitProvider>
        </WagmiConfig>
    )
}
