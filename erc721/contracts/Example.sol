pragma solidity ^0.5.0;

import "./ERC721Tradable.sol";

/**
 * @title Example
 * Example - a contract for my non-fungible examples.
 */
contract Example is ERC721Tradable {
    constructor(address _proxyRegistryAddress)
        public
        ERC721Tradable("Example", "EEE", _proxyRegistryAddress)
    {}

    function baseTokenURI() public pure returns (string memory) {
        return "https://creatures-api.opensea.io/api/creature/";
    }

    function contractURI() public pure returns (string memory) {
        return "https://creatures-api.opensea.io/contract/opensea-creatures";
    }
}
