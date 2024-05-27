// data from https://chainid.network/chains.json


import Chains from "./chains.json"
import fs from 'fs';

console.log(Chains.length);


// @ts-ignore
const ensChains = Chains.filter(chain => chain?.ens?.registry);
console.log(ensChains.length);

// @ts-ignore
fs.writeFileSync('./chains/ensChains.json', JSON.stringify(ensChains, null, 2))
