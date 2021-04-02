pragma solidity ^0.5.0;

import "./ERC1155Tradable.sol"; 

/**
 * @title Example
 * Example - a contract for my non-fungible creatures.
 */
contract Example is ERC1155Tradable {
    constructor(address _proxyRegistryAddress)
        public
        ERC1155Tradable("Example", "EEE", _proxyRegistryAddress)
    {
        _setBaseMetadataURI("https://creatures-api.opensea.io/api/creature/");
    }

    function contractURI() public pure returns (string memory) {
        return "https://creatures-api.opensea.io/contract/opensea-creatures";
    }
}
