// Import variables
const Migrations = artifacts.require("../contracts/Migrations.sol");

module.exports = function (deployer) {
    // Deploys the Migrations contract as the only task
    deployer.deploy(Migrations);
};
