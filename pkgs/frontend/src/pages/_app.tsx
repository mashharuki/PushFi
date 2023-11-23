import '@/styles/globals.css';
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
      <Component {...pageProps} />
    </GoogleReCaptchaProvider>
  );
}
