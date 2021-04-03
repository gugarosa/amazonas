// Imports
const HDWalletProvider = require("truffle-hdwallet-provider");
require("dotenv").config();

// Environment constants
const TYPE_CONTRACT = process.env.TYPE_CONTRACT;
const METAMASK_SECRET = process.env.METAMASK_SECRET;
const API_KEY = process.env.API_KEY;

if (!METAMASK_SECRET || !API_KEY) {
    console.error(
        "Please, set METAMASK_SECRET or API_KEY in your environment file."
    );
    process.exit(0);
}

// Path constants
contractsPath = "./" + TYPE_CONTRACT + "/contracts";
contractsBuildPath = "./" + TYPE_CONTRACT + "/build";
migrationsPath = "./" + TYPE_CONTRACT + "/migrations";

// URL constants
const rinkebyURL = "https://eth-rinkeby.alchemyapi.io/v2/" + API_KEY;
const mainnetURL = "https://eth-mainnet.alchemyapi.io/v2/" + API_KEY;

// Gas constants
const gas = 5000000;
const gasPrice = 5000000000;

// Exports
module.exports = {
    contracts_directory: contractsPath,
    contracts_build_directory: contractsBuildPath,
    migrations_directory: migrationsPath,
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            gas: gas,
            network_id: "*",
        },
        rinkeby: {
            provider: function () {
                return new HDWalletProvider(METAMASK_SECRET, rinkebyURL);
            },
            gas: gas,
            gasPrice: gasPrice,
            network_id: "*",
        },
        live: {
            provider: function () {
                return new HDWalletProvider(METAMASK_SECRET, mainnetURL);
            },
            gas: gas,
            gasPrice: gasPrice,
            network_id: 1,
        },
    },
    mocha: {
        reporter: "eth-gas-reporter",
        reporterOptions: {
            currency: "USD",
        },
    },
    compilers: {
        solc: {
            version: "^0.5.0",
        },
    },
};