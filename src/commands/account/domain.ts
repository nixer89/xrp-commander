import { Options } from 'yargs'
import * as accountSet from './account-set-transaction';

export type Params = {
  domain?: string
}
export const command = 'domain [domain]'
export const describe = `Sets a domain on the XRP ledger account. Leave empty to delete your domain.`
export const builder: { [key: string]: Options } = {
  domain: {
    type: 'string',
    required: false,
    description: 'domain to set on your XRPL account'
  }
}

export async function handler ({ domain }: Params) {

  let result = await accountSet.execute({domain: domain ? domain : ''});

  console.log(JSON.stringify(result, null, 2))
  
  if (result.outcome.result === 'tesSUCCESS') {
    if(domain)
      console.log('\nDomain set to: ' + domain)
    else
      console.log('\nDomain deleted');
      
    process.exit(0)
  }
  process.exit(1)
}
