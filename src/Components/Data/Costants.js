const confObj = {
  chainId: null,
  "from": "",
  "privateKey": "",
  "permission": "active",
}

// console.log('cc', confObj)

export const maxPayloadSize = 10000 // 429496 // 176 // 4294967294
export const costPerTx = 0.0001
export const chainId = confObj.chainId || 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906' // mainnet
export const wif = confObj.privateKey
export const from = confObj.from
export const permission = confObj.permission || 'active'