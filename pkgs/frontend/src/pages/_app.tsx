import "@/styles/globals.css";
import { getEnv } from "@/utils/getEnv";
import { PrivyProvider } from "@privy-io/react-auth";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ResponseData } from "./api/env";
import { Client, Provider, cacheExchange, fetchExchange, useQuery } from "urql";
import { GRAPHQL_API_ENDPOINT } from "@/utils/constants";
import { GlobalProvider } from "@/context/GlobalProvider";

// create client instance for GraphQL
const client = new Client({
  url: GRAPHQL_API_ENDPOINT,
  exchanges: [cacheExchange, fetchExchange],
});

/**
 * App Component
 * @param param0
 * @returns
 */
export default function App({ Component, pageProps }: AppProps) {
  const [env, setEnv] = useState<ResponseData>();

  useEffect(() => {
    const init = async () => {
      // get enviroment values
      const envData = await getEnv();
      setEnv(envData);
    };
    init();
  }, []);

  return (
    <>
      {env != undefined && (
        <GoogleReCaptchaProvider
          reCaptchaKey={env.RECAPTCHA_CLIENT_KEY}
          language="ja"
        >
          <PrivyProvider
            appId={env.PRIVY_APP_ID}
            config={{
              loginMethods: [
                "email",
                "wallet",
                "discord",
                "github",
                "google",
                "twitter",
              ],
              appearance: {
                theme: "light",
                accentColor: "#676FFF",
                logo: "/logo.png",
              },
              embeddedWallets: {
                createOnLogin: "users-without-wallets",
                noPromptOnSignature: true,
              },
            }}
          >
            <GlobalProvider>
              <Provider value={client}>
                <Component {...pageProps} />
              </Provider>
            </GlobalProvider>
          </PrivyProvider>
        </GoogleReCaptchaProvider>
      )}
    </>
  );
}
