import { observable, action } from "mobx";
import Eos from "eosjs";
import { wif } from "./Costants";
//const ScatterJS = require('scatter-js/dist/scatter.cjs')

const config = {
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
  // chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
  keyProvider: [wif],
  httpEndpoint: "https://api.eosnewyork.io",
  // httpEndpoint: 'http://jungle.cryptolions.io:18888',
  // TODO: changeable https://api.eosnewyork.io https://nodes.get-scatter.com https://api1.eosasia.one
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
};

const eos = Eos(config);

//let dati = [];
var DatiAccount 

interface IAccount {
  name: string;
  eosBalance: string;
  eosCpu: number;
  eosFCpu: number;
  eosRam: number;
  eosFRam: number;
  eosBandwidth: number;
  eosFBandwidth: number;
  eosRamUsed: number;
  eosCpuUsed: number;
  eosBandwidthUsed: number;
  Created: string;
  ScatterPermission: string;
  Avatar: string;
}

class AccountStore {
  @observable account: IAccount | null = null;

  @action
  setAccount(account: any) {
    this.account = account;

    if (account) {
      this.account.ScatterPermission = account.authority;
      eos
        .getCurrencyBalance("eosio.token", this.account.name, "EOS")
        .then(result => {
          // console.log(result)
          this.account.eosBalance = result;
        })
        .catch(error => console.error(error));

      eos
        .getAccount(this.account.name)
        .then(AccInfo => {
          //console.log(AccInfo)
          //dati = AccInfo;
          DatiAccount=AccInfo
          this.account.eosCpu = AccInfo.cpu_limit.max;
          this.account.eosFCpu = AccInfo.cpu_limit.available;
          this.account.eosRam = (AccInfo.ram_quota / 1024).toFixed(2);
          this.account.eosFRam = (
            AccInfo.ram_quota / 1024 -
            AccInfo.ram_usage / 1024
          ).toFixed(2);
          this.account.eosBandwidth = (AccInfo.net_limit.max / 1024).toFixed(2);
          this.account.eosFBandwidth = (
            AccInfo.net_limit.available / 1024
          ).toFixed(2);
          this.account.eosRamUsed = (AccInfo.ram_usage / 1024).toFixed(2);
          this.account.eosCpuUsed =
            AccInfo.cpu_limit.max - AccInfo.cpu_limit.available;
          this.account.eosBandwidthUsed = (
            AccInfo.net_limit.max / 1024 -
            AccInfo.net_limit.available / 1024
          ).toFixed(2);
          this.account.Created = AccInfo.created.slice(0, 10);

          //var data = new Identicon(this.account.name + "000", 420).toString();

          //var randomNumber = Math.floor(Math.random() * 1001) + 110;

          //var hash = "X48b" + this.account.name;
          //var options = {
          //foreground: [0, 0, 0, 255],               // rgba black
          //background: [255, 255, 255, 255],         // rgba white
          //margin: 0, // 20% margin
          //size: 100 // 420px square
          //format: 'svg'                             // use SVG instead of PNG
          //};
          //var data = new Identicon(hash, options).toString();

          //this.account.Avatar = "data:image/png;base64," + data;
          //console.log(this.account.Avatar);
        })
        .catch(error => console.error(error));
      ///this.account.eosCpu = AccInfo
    }
  }
  @action
  setAccountBalance(bilancio) {
    this.account.eosBalance = bilancio;
  }
}
export const accountStore = new AccountStore();
