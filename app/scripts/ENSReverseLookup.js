import ENS from "ethereum-ens";
import Eth from "ethjs";

const provider = new Eth.HttpProvider("https://mainnet.infura.io");
const eth = new Eth(provider);

export default class ENSReverseLookup {
    constructor() {
        this.ens = new ENS(provider);
    }

    async resolve(address) {
        try {
            let test = await this.ens.reverse(address).name();
            return test;
        } catch (e) {
            // console.log(e);
        }
    }
}
