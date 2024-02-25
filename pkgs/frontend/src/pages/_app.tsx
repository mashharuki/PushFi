import '@/styles/globals.css';
import { PrivyProvider } from '@privy-io/react-auth';
import type { AppProps } from 'next/app';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

/**
 * App Component
 * @param param0 
 * @returns 
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
      language="ja"
    >
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
        config={{
          loginMethods: [
            'email', 
            'wallet', 
            'discord', 
            'github', 
            'google', 
            'twitter'
          ],
          appearance: {
            theme: 'light',
            accentColor: '#676FFF',
            logo: '/logo.png'
          },
          embeddedWallets: {
            createOnLogin: 'users-without-wallets',
            noPromptOnSignature: true
          }
        }}
      >
        <Component {...pageProps} />
      </PrivyProvider>
    </GoogleReCaptchaProvider>
  );
}
