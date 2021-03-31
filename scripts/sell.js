const opensea = require("opensea-js");
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;
const MnemonicWalletSubprovider = require("@0x/subproviders")
    .MnemonicWalletSubprovider;
const RPCSubprovider = require("web3-provider-engine/subproviders/rpc");
const Web3ProviderEngine = require("web3-provider-engine");

const MNEMONIC = process.env.MNEMONIC;
const NODE_API_KEY = process.env.INFURA_KEY || process.env.ALCHEMY_KEY;
const isInfura = !!process.env.INFURA_KEY;
const FACTORY_CONTRACT_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS;
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
const NETWORK = process.env.NETWORK;
const API_KEY = process.env.API_KEY || ""; // API key is optional but useful if you're doing a high volume of requests.

if (!MNEMONIC || !NODE_API_KEY || !NETWORK || !OWNER_ADDRESS) {
    console.error(
        "Please set a mnemonic, Alchemy/Infura key, owner, network, API key, nft contract, and factory contract address."
    );
    return;
}

if (!FACTORY_CONTRACT_ADDRESS && !NFT_CONTRACT_ADDRESS) {
    console.error("Please either set a factory or NFT contract address.");
    return;
}

const BASE_DERIVATION_PATH = `44'/60'/0'/0`;

const mnemonicWalletSubprovider = new MnemonicWalletSubprovider({
    mnemonic: MNEMONIC,
    baseDerivationPath: BASE_DERIVATION_PATH,
});
const network =
    NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
const infuraRpcSubprovider = new RPCSubprovider({
    rpcUrl: isInfura ?
        "https://" + network + ".infura.io/v3/" + NODE_API_KEY :
        "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY,
});

const providerEngine = new Web3ProviderEngine();
providerEngine.addProvider(mnemonicWalletSubprovider);
providerEngine.addProvider(infuraRpcSubprovider);
providerEngine.start();

const seaport = new OpenSeaPort(
    providerEngine, {
        networkName: NETWORK === "mainnet" || NETWORK === "live" ?
            Network.Main :
            Network.Rinkeby,
        apiKey: API_KEY,
    },
    (arg) => console.log(arg)
);

async function main() {
    // Example: simple fixed-price sale of an item owned by a user.
    console.log("Auctioning an item for a fixed price...");
    const fixedPriceSellOrder = await seaport.createSellOrder({
        asset: {
            tokenId: "1",
            tokenAddress: NFT_CONTRACT_ADDRESS,
        },
        startAmount: 0.05,
        expirationTime: 0,
        accountAddress: OWNER_ADDRESS,
    });
    console.log(
        `Successfully created a fixed-price sell order! ${fixedPriceSellOrder.asset.openseaLink}\n`
    );
}

main();