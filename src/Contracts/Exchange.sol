// contracts/Exchange.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Exchange {
    struct Offer {
        address seller;
        uint256 amount;
        uint256 price;
        string cvu;
        string alias;
        bool isFrozen;
    }

    mapping(uint256 => Offer) public offers;
    uint256 public offerCount;
    mapping(address => uint256) public frozenBalances;

    event OfferCreated(uint256 offerId, address seller, uint256 amount, uint256 price, string cvu, string alias);
    event OfferAccepted(uint256 offerId, address buyer);
    event PaymentConfirmed(uint256 offerId, address buyer);

    function createOffer(uint256 amount, uint256 price, string memory cvu, string memory alias) public {
        require(amount > 0, "Amount must be greater than zero");
        require(frozenBalances[msg.sender] >= amount, "Insufficient balance to create offer");

        offerCount++;
        offers[offerCount] = Offer({
            seller: msg.sender,
            amount: amount,
            price: price,
            cvu: cvu,
            alias: alias,
            isFrozen: true
        });

        frozenBalances[msg.sender] -= amount;

        emit OfferCreated(offerCount, msg.sender, amount, price, cvu, alias);
    }

    function acceptOffer(uint256 offerId) public {
        Offer storage offer = offers[offerId];
        require(offer.isFrozen, "Offer is not available");

        emit OfferAccepted(offerId, msg.sender);
    }

    function confirmPayment(uint256 offerId) public {
        Offer storage offer = offers[offerId];
        require(offer.seller == msg.sender, "Only seller can confirm payment");

        offer.isFrozen = false;
        frozenBalances[offer.seller] += offer.amount;

        emit PaymentConfirmed(offerId, msg.sender);
    }

    function deposit() public payable {
        frozenBalances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        require(frozenBalances[msg.sender] >= amount, "Insufficient balance");
        frozenBalances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
}
