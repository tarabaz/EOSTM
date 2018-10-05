//import * as Eos from 'eosjs'
import  Eos from 'eosjs'
import React from 'react'
import { wif } from './Costants'
import { accountStore } from "./Data"


//import * as Eos from 'eosjs'
// import { splitString } from './utils'

import BigNumber from "bignumber.js"

const ScatterJS = require('scatter-js/dist/scatter.cjs')

const config = {
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  // chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
  keyProvider: [wif],
  httpEndpoint: 'https://api.eosnewyork.io',
  // httpEndpoint: 'http://jungle.cryptolions.io:18888',
  // TODO: changeable https://api.eosnewyork.io https://nodes.get-scatter.com https://api1.eosasia.one
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
}

const eos = Eos(config);


const network = {
  blockchain: 'eos',
  host: 'nodes.get-scatter.com',
  // host: 'jungle.cryptolions.io',
  port: 443,
  protocol: 'https',
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  // chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
};

export function sendEOS(destinatario,quantità, memo): Promise<any> {
  return new Promise((resolve: any) => {

    ScatterJS.scatter.connect("eosavatarimg").then((connected: any) => {
      if (!connected) {
        // User does not have Scatter Desktop or Classic installed. 
        // return false;
        console.error('Scatter not active')
      }

      ScatterJS.scatter.getIdentity({ accounts: [network] }).then((identity: any) => {
        const account = identity.accounts.find((acc: any) => acc.blockchain === 'eos');
        const eoss = ScatterJS.scatter.eos(network, Eos, { broadcast: true, chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906' }, "http");
        // const requiredFields = { accounts: [network] };
        // const options = {
        //   authorization: [`${account.name}@${account.authority}`]
        // }
        console.log(account)
        const options = {
          authorization: [`${account.name}@${account.authority}`]
        }

        eoss.transfer(account.name, destinatario, quantità + " EOS", memo, options).then(trx => {
          // That's it!
          console.log(`Transaction ID: ${trx.transaction_id}`);
        }).catch(error => { console.error(error) });

      });

    })

  })

}


export function getAccountInformazioni(): Promise<any> {
  return new Promise((resolve: any) => {

    ScatterJS.scatter.connect("eosavatarimg").then((connected: any) => {
      if (!connected) {
        // User does not have Scatter Desktop or Classic installed. 
        // return false;
        console.error('Scatter not active')
      }

      ScatterJS.scatter.getIdentity({ accounts: [network] }).then((identity: any) => {
        const account = identity.accounts.find((acc: any) => acc.blockchain === 'eos');
        const eoss = ScatterJS.scatter.eos(network, Eos, { broadcast: true, chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906' }, "http");
        // const requiredFields = { accounts: [network] };
        // const options = {
        //   authorization: [`${account.name}@${account.authority}`]
        // }
        console.log(account.name)
        const options = {
          authorization: [`${account.name}@${account.authority}`]
        }

        //eoss.transfer(account.name, 'tarabazeosio', '0.0001 EOS', 'memo', options).then(trx => {
          // That's it!
       //   console.log(`Transaction ID: ${trx.transaction_id}`);
       // }).catch(error => { console.error(error) });


      });

    })

  })

}


export function check(NomeAccount): Promise<any> {
  return new Promise((resolve: any) => {

    eos.getAccount(NomeAccount).then(result => console.log(result)).catch(error => console.error(error));


    //accountStore.setAccountBalance(result);

  })
}


export function fetchAvatar(account: string) {
  return new Promise((resolve, reject) => {
    // eos.getTableRows(true, 'eosavatarimg', 'eosavatarimg', 'profiles', 'account', account, 0, 1)
    const encAcc = new BigNumber(Eos.modules.format.encodeName(account, false))
    eos.getTableRows({
      code: 'eosavatarimg',
      json: true,
      limit: 1,
      lower_bound: encAcc.toString(),
      scope: 'eosavatarimg',
      table: 'profiles',
      upper_bound: encAcc.plus(1).toString()
    })
      .then((data: any) => {
        if (data.rows[0].avatar_data) {
          resolve(data.rows[0])
        } else {
          reject('empty avatar')
        }
      })
      .catch((err: any) => reject(err))
  })
}