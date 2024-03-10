import type {NextApiRequest, NextApiResponse} from "next";

export type ResponseData = {
  BICONOMY_BUNDLER_KEY: string;
  BICONOMY_PAYMASTER_KEY: string;
  RECAPTCHA_SERVER_SECRET_KEY: string;
  RECAPTCHA_CLIENT_KEY: string;
  PRIVY_APP_ID: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const env: ResponseData = {
    BICONOMY_BUNDLER_KEY: process.env.BICONOMY_BUNDLER_KEY!,
    BICONOMY_PAYMASTER_KEY: process.env.BICONOMY_PAYMASTER_KEY!,
    RECAPTCHA_SERVER_SECRET_KEY: process.env.RECAPTCHA_SERVER_SECRET_KEY!,
    RECAPTCHA_CLIENT_KEY: process.env.RECAPTCHA_CLIENT_KEY!,
    PRIVY_APP_ID: process.env.PRIVY_APP_ID!,
  };

  res.status(200).json(env);
}
