// Contracts
const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
    // Deploys the Migrations contract as the only task
    deployer.deploy(Migrations);
};
