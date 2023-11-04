import 'dotenv/config';
import fs from 'fs';
import { Web3Storage, getFilesFromPath } from 'web3.storage';


async function deploy() {
  const { WEB3STORAGE_TOKEN } = process.env
  if (!WEB3STORAGE_TOKEN) {
    console.log('this script needs an env variable named WEB3STORAGE_TOKEN containing API token for web3.storage')
  }
  
  if (!fs.existsSync('./data')) {
    console.log('data folder not found. Try running this first: npm run build')
  }
  
  const web3Storage = new Web3Storage({ 
    token: WEB3STORAGE_TOKEN! 
  })

  console.log('Loading site files...')
  const files = await getFilesFromPath('./data')
  console.log(`Uploading ${files.length} files to Web3.Storage...`)
  const cid = await web3Storage.put(files, { wrapWithDirectory: false })
  console.log('Deployed to Web3.Storage!')
  console.log('Root cid: ', cid)
  console.log(`Gateway url: https://${cid}.ipfs.dweb.link`)
}

deploy().catch(console.error)