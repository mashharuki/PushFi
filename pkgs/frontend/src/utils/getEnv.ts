/**
 * 環境変数を取得するためのメソッド
 */
export const getEnv = async() => {
  const res = await fetch('/api/env')
  const env  = await res.json()
  return env
}