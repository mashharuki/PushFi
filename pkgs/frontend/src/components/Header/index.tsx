import { APP_DESCRIPTION, APP_TITLE } from "@/utils/constants";
import Head from "next/head";

/**
 * Header Component
 * @returns
 */
const Header = () => {
  return (
    <Head>
      <title>{APP_TITLE}</title>
      <meta name="description" content={APP_DESCRIPTION} />
    </Head>
  );
};

export default Header;
