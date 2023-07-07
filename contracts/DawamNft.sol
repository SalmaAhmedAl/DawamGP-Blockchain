//SPDX-License-Indentifier: MIT
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

pragma solidity ^0.8.7;

error DawamNft__NotOwner();

contract DawamNft is  ERC721URIStorage, Ownable {
    uint256 private s_tokenCounter;
    string private TOKEN_URI;

    constructor(string memory uri) ERC721("DAWAM", "MKT"){
    TOKEN_URI=uri;
    }
  
    function mintNft() public onlyOwner{
        _safeMint(msg.sender, s_tokenCounter);
        _setTokenURI(s_tokenCounter, TOKEN_URI);
        s_tokenCounter = s_tokenCounter + 1;
    }
    
    
    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
    

}
