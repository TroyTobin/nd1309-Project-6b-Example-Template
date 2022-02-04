pragma solidity >=0.4.24;

import "../coffeeaccesscontrol/FarmerRole.sol";
import "../coffeeaccesscontrol/DistributorRole.sol";
import "../coffeeaccesscontrol/RetailerRole.sol";
import "../coffeeaccesscontrol/ConsumerRole.sol";

// Define a contract 'Supplychain'
contract SupplyChain is FarmerRole, DistributorRole, RetailerRole, ConsumerRole {

  // Define 'owner'
  address owner;

  // Define a variable called 'upc' for Universal Product Code (UPC)
  uint upc;

  // Define a variable called 'sku' for Stock Keeping Unit (SKU)
  uint sku;

  // Define a public mapping 'items' that maps the UPC to an Item.
  mapping (uint => Item) items;

  // Define a public mapping 'itemsHistory' that maps the UPC to an array of TxHash, 
  // that track its journey through the supply chain -- to be sent from DApp.
  mapping (uint => string[]) itemsHistory;
  
  // Define enum 'State' with the following values:
  enum State { 
    Harvested,  // 0
    Processed,  // 1
    Packed,     // 2
    ForSale,    // 3
    Sold,       // 4
    Shipped,    // 5
    Received,   // 6
    Purchased   // 7
  }

  State constant defaultState = State.Harvested;

  // Define a struct 'Item' with the following fields:
  struct Item {
    uint    sku;                    // Stock Keeping Unit (SKU)
    uint    upc;                    // Universal Product Code (UPC), generated by the Farmer, goes on the package, can be verified by the Consumer
    address ownerID;                // Metamask-Ethereum address of the current owner as the product moves through 8 stages
    address originFarmerID;         // Metamask-Ethereum address of the Farmer
    string  originFarmName;         // Farmer Name
    string  originFarmInformation;  // Farmer Information
    string  originFarmLatitude;     // Farm Latitude
    string  originFarmLongitude;    // Farm Longitude
    uint    productID;              // Product ID potentially a combination of upc + sku
    string  productNotes;           // Product Notes
    uint    productPrice;           // Product Price
    State   itemState;              // Product State as represented in the enum above
    address distributorID;          // Metamask-Ethereum address of the Distributor
    address retailerID;             // Metamask-Ethereum address of the Retailer
    address consumerID;             // Metamask-Ethereum address of the Consumer
  }

  // Define 8 events with the same 8 state values and accept 'upc' as input argument
  event Harvested(uint upc);
  event Processed(uint upc);
  event Packed(uint upc);
  event ForSale(uint upc);
  event Sold(uint upc);
  event Shipped(uint upc);
  event Received(uint upc);
  event Purchased(uint upc);

  // Define a modifer that checks to see if msg.sender == owner of the contract
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  // Define a modifer that verifies the Caller
  modifier verifyCaller (address _address) {
    require(msg.sender == _address); 
    _;
  }

  // Define a modifier that checks if the paid amount is sufficient to cover the price
  modifier paidEnough(uint value, uint _price) { 
    require(value >= _price); 
    _;
  }
  
  // Define a modifier that checks the price and refunds the remaining balance
  modifier checkValue(uint value, uint _upc) {
    _;
    uint _price = items[_upc].productPrice;
    uint amountToReturn = value - _price;

    address payable consumerID = payable(items[_upc].consumerID);
    consumerID.transfer(amountToReturn);
  }

  // Define a modifier that checks if an item.state of a upc is Harvested
  modifier isHarvested(uint _upc) {
    require(items[_upc].itemState == State.Harvested);
    _;
  }

  // Define a modifier that checks if an item.state of a upc is Processed
  modifier isProcessed(uint _upc) {
    require(items[_upc].itemState == State.Processed);
    _;
  }
  
  // Define a modifier that checks if an item.state of a upc is Packed
  modifier isPacked(uint _upc) {
    require(items[_upc].itemState == State.Packed);
    _;
  }

  // Define a modifier that checks if an item.state of a upc is ForSale
  modifier isForSale(uint _upc) {
    require(items[_upc].itemState == State.ForSale);
    _;
  }

  // Define a modifier that checks if an item.state of a upc is Sold
  modifier isSold(uint _upc) {
    require(items[_upc].itemState == State.Sold);
    _;
  }
  
  // Define a modifier that checks if an item.state of a upc is Shipped
  modifier isShipped(uint _upc) {
    require(items[_upc].itemState == State.Shipped);
    _;
  }

  // Define a modifier that checks if an item.state of a upc is Received
  modifier isReceived(uint _upc) {
    require(items[_upc].itemState == State.Received);
    _;
  }

  // Define a modifier that checks if an item.state of a upc is Purchased
  modifier isPurchased(uint _upc) {
    require(items[_upc].itemState == State.Purchased);
    _;
  }

  // In the constructor set 'owner' to the address that instantiated the contract
  // and set 'sku' to 1
  // and set 'upc' to 1
  constructor() payable {
    owner = msg.sender;
    sku = 1;
    upc = 1;
  }

  // Define a function 'kill' if required
  function kill() public {
    if (msg.sender == owner) {

      // Self destruct destroys the contract and sends all remaining ether to the specified address
      address payable owner_payable = payable(owner);
      selfdestruct(owner_payable);
    }
  }

  // Define a function 'harvestItem' that allows a farmer to mark an item 'Harvested'
  function harvestItem(uint _upc,
                       address _originFarmerID,
                       string memory _originFarmName,
                       string memory _originFarmInformation,
                       string memory _originFarmLatitude,
                       string memory _originFarmLongitude,
                       string memory _productNotes) public 
  {
    // Add the new item as part of Harvest
    Item memory i = Item(sku,
                         _upc,
                         msg.sender,
                         _originFarmerID,
                         _originFarmName,
                         _originFarmInformation,
                         _originFarmLatitude,
                         _originFarmLongitude,
                         _upc + sku,
                         _productNotes,
                         0,
                         State.Harvested,
                         address(0),
                         address(0),
                         address(0));
    
    items[_upc] = i;
    
    // Increment sku for the next harvest
    sku = sku + 1;

    // Emit the 'harvested' event
    emit Harvested(_upc);
  }

  // Define a function 'processtItem' that allows a farmer to mark an item 'Processed'
  function processItem(uint _upc) public 
    // Call modifier to check that the caller is a farmer
    onlyFarmer()
    // Call modifier to check if upc has been 'harvested'
    isHarvested(_upc)
    // Call modifier to verify caller of this function is the farmer that is able to act
    verifyCaller(items[_upc].originFarmerID)
  {
    // Update the state to be 'processed'
    items[_upc].itemState = State.Processed;
    
    // Emit the 'processed' event
    emit Processed(_upc);
  }

  // Define a function 'packItem' that allows a farmer to mark an item 'Packed'
  function packItem(uint _upc) public 
    // Call modifier to check that the caller is a farmer
    onlyFarmer()
    // Call modifier to check if upc has been 'processed'
    isProcessed(_upc)
    // Call modifier to verify caller of this function is the farmer that is able to act
    verifyCaller(items[_upc].originFarmerID)
  {
    // Update the state to be 'packed'
    items[_upc].itemState = State.Packed;
    
    // Emit the 'packed' event
    emit Packed(_upc);
  }

  // Define a function 'sellItem' that allows a farmer to mark an item 'ForSale'
  function sellItem(uint _upc, uint _price) public 
    // Call modifier to check that the caller is a farmer
    onlyFarmer()
    // Call modifier to check if upc has been 'packed'
    isPacked(_upc)
    // Call modifier to verify caller of this function is the farmer that is able to act
    verifyCaller(items[_upc].originFarmerID)
  {
    // Update the state to be 'for sale'
    items[_upc].itemState = State.ForSale;

    // Set the sale price
    items[_upc].productPrice = _price;
    
    // Emit the 'for sale' event
    emit ForSale(_upc);
  }

  // Define a function 'buyItem' that allows the disributor to mark an item 'Sold'
  // Use the above defined modifiers to check if the item is available for sale, if the buyer has paid enough, 
  // and any excess ether sent is refunded back to the buyer
  function buyItem(uint _upc) public payable 
    // Call modifier to check that the caller is a DistributorRole
    onlyDistributor()
    // Call modifier to check if upc has been listed forSale
    isForSale(_upc)
    // Call modifer to check if distributor has paid enough
    paidEnough(msg.value, items[_upc].productPrice)
    // Call modifer to send any excess ether back to buyer
    checkValue(msg.value, upc)
  {
    
    // The new owner is the distributor as they are the intermediary
    items[_upc].ownerID = msg.sender;

    // Distributor ID is the caller
    items[_upc].distributorID = msg.sender;

    // Item is now sold
    items[_upc].itemState = State.Sold;

    // Transfer money to farmer
    address payable farmer_address = payable(items[_upc].originFarmerID);
    farmer_address.transfer(items[_upc].productPrice);
    
    // emit the appropriate event
    emit Sold(_upc);
  }

  // Define a function 'shipItem' that allows the distributor to mark an item 'Shipped'
  // Use the above modifers to check if the item is sold
  function shipItem(uint _upc) public 
    // Call modifier to check that the caller is a DistributorRole
    onlyDistributor()
    // Call modifier to check if upc been bought
    isSold(_upc)
    // Call modifier to verify caller of this function
    verifyCaller(items[_upc].distributorID)
  {
    // Item is now shipped 
    items[_upc].itemState = State.Shipped;
    
    // Emit the appropriate event
    emit Shipped(_upc);
  }

  // Define a function 'receiveItem' that allows the retailer to mark an item 'Received'
  // Use the above modifiers to check if the item is shipped
  function receiveItem(uint _upc) public payable
    // Call modifier to check that the caller is a RetailerRole
    onlyRetailer()
    // Call modifier to check if upc has been shipped
    isShipped(_upc)
    // Call modifer to check if retailer has paid enough
    paidEnough(msg.value, items[_upc].productPrice)
    // Call modifer to send any excess ether back to buyer
    checkValue(msg.value, _upc)
    // Access Control List enforced by calling Smart Contract / DApp
  {
    // The new owner is the retailer as they are the intermediary
    items[_upc].ownerID = msg.sender;

    // Retailer ID is the caller
    items[_upc].retailerID = msg.sender;

    // Transfer money to distributor
    address payable distributor_address = payable(items[_upc].distributorID);
    distributor_address.transfer(items[_upc].productPrice);
    
    // Emit the appropriate event
    emit Received(_upc);
  }

  // Define a function 'purchaseItem' that allows the consumer to mark an item 'Purchased'
  // Use the above modifiers to check if the item is received
  function purchaseItem(uint _upc) public payable
    // Call modifier to check that the caller is a ConsumerRole
    onlyConsumer()
    // Call modifier to check if upc has been received
    isReceived(_upc)
    // Call modifer to check if consumer has paid enough
    paidEnough(msg.value, items[_upc].productPrice)
    // Call modifer to send any excess ether back to buyer
    checkValue(msg.value, _upc)
    // Access Control List enforced by calling Smart Contract / DApp
  {
    // The new owner is the consumer as they are the final endpoint
    items[_upc].ownerID = msg.sender;

    // Consumer ID is the caller
    items[_upc].consumerID = msg.sender;
    
    // Transfer money to the retailer
    address payable retailer_address = payable(items[_upc].retailerID);
    retailer_address.transfer(items[_upc].productPrice);

    // Emit the appropriate event
    emit Purchased(_upc);
  }

  // Define a function 'fetchItemBufferOne' that fetches the data
  function fetchItemBufferOne(uint _upc) public view returns (
    uint    itemSKU,
    uint    itemUPC,
    address ownerID,
    address originFarmerID,
    string memory  originFarmName,
    string memory  originFarmInformation,
    string memory  originFarmLatitude,
    string memory  originFarmLongitude
  ) 
  {
    // Assign values to the 8 parameters
    itemSKU               = items[_upc].sku;
    itemUPC               = items[_upc].upc;
    ownerID               = items[_upc].ownerID;
    originFarmerID        = items[_upc].originFarmerID;
    originFarmName        = items[_upc].originFarmName;
    originFarmInformation = items[_upc].originFarmInformation;
    originFarmLatitude    = items[_upc].originFarmLatitude;
    originFarmLongitude   = items[_upc].originFarmLongitude;
    
  return (
    itemSKU,
    itemUPC,
    ownerID,
    originFarmerID,
    originFarmName,
    originFarmInformation,
    originFarmLatitude,
    originFarmLongitude
    );
  }

  // Define a function 'fetchItemBufferTwo' that fetches the data
  function fetchItemBufferTwo(uint _upc) public view returns (
    uint    itemSKU,
    uint    itemUPC,
    uint    productID,
    string  memory productNotes,
    uint    productPrice,
    uint    itemState,
    address distributorID,
    address retailerID,
    address consumerID
  ) 
  {
    // Assign values to the 9 parameters
    itemSKU       = items[_upc].sku;
    itemUPC       = items[_upc].upc;
    productID     = items[_upc].productID;
    productNotes  = items[_upc].productNotes;
    itemState     = uint(items[_upc].itemState);
    distributorID = items[_upc].distributorID;
    retailerID    = items[_upc].retailerID;
    consumerID    = items[_upc].consumerID;
    
  return (
    itemSKU,
    itemUPC,
    productID,
    productNotes,
    productPrice,
    itemState,
    distributorID,
    retailerID,
    consumerID
    );
  }
}
