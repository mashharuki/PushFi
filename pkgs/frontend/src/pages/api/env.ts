import type { NextApiRequest, NextApiResponse } from 'next'
 
export type ResponseData = {
  LIT_RELAY_API_KEY: string;
  BICONOMY_BUNDLER_KEY: string;
  BICONOMY_PAYMASTER_KEY: string;
  WEB3_AUTH_CLIENT_ID: string;
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const env: ResponseData = {
    LIT_RELAY_API_KEY: process.env.LIT_RELAY_API_KEY!,
    BICONOMY_BUNDLER_KEY: process.env.BICONOMY_BUNDLER_KEY!,
    BICONOMY_PAYMASTER_KEY: process.env.BICONOMY_PAYMASTER_KEY!,
    WEB3_AUTH_CLIENT_ID: process.env.WEB3_AUTH_CLIENT_ID!
  }

  res.status(200).json(env)
}