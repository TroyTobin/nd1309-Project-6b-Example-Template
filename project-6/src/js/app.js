App = {
    web3Provider: null,
    contracts: {},
    emptyAddress:          "0x0000000000000000000000000000000000000000",
    sku:                   0,
    upc:                   0,
    metamaskAccountID:     "0x0000000000000000000000000000000000000000",
    ownerID:               "0x0000000000000000000000000000000000000000",
    originFarmerID:        "0x0000000000000000000000000000000000000000",
    originFarmName:        null,
    originFarmInformation: null,
    originFarmLatitude:    null,
    originFarmLongitude:   null,
    productNotes:          null,
    productPrice:          0,
    distributorID:         "0x0000000000000000000000000000000000000000",
    retailerID:            "0x0000000000000000000000000000000000000000",
    consumerID:            "0x0000000000000000000000000000000000000000",

    // IDs to use as the msg.sender of the actions
    harvestID:  "0x0000000000000000000000000000000000000000",
    processID:  "0x0000000000000000000000000000000000000000",
    packID:     "0x0000000000000000000000000000000000000000",
    sellID:     "0x0000000000000000000000000000000000000000",
    buyID:      "0x0000000000000000000000000000000000000000",
    shipID:     "0x0000000000000000000000000000000000000000",
    receiveID:  "0x0000000000000000000000000000000000000000",
    purchaseID: "0x0000000000000000000000000000000000000000",
    events: [],
    eventsHashes: [],

    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku                   = $("#sku").val();
        App.upc                   = $("#upc").val();
        App.ownerID               = $("#ownerID").val();
        App.originFarmerID        = $("#originFarmerID").val();
        App.originFarmName        = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude    = $("#originFarmLatitude").val();
        App.originFarmLongitude   = $("#originFarmLongitude").val();
        App.productNotes          = $("#productNotes").val();
        App.productPrice          = $("#productPrice").val();
        App.distributorID         = $("#distributorID").val();
        App.retailerID            = $("#retailerID").val();
        App.consumerID            = $("#consumerID").val();

        App.harvestFarmerID         = $("#harvestFarmerID").val();
        App.harvestFarmName         = $("#harvestFarmName").val();
        App.harvestFarmInformation  = $("#harvestFarmInformation").val();
        App.harvestFarmLatitude     = $("#harvestFarmLatitude").val();
        App.harvestFarmLongitude    = $("#harvestFarmLongitude").val();
        App.harvestProductNotes     = $("#harvestProductNotes").val();

        App.harvestID  = $("#harvestID").val();
        App.processID  = $("#processID").val();
        App.packID     = $("#packID").val();
        App.sellID     = $("#sellID").val();
        App.buyID      = $("#buyID").val();
        App.shipID     = $("#shipID").val();
        App.receiveID  = $("#receiveID").val();
        App.purchaseID = $("#purchaseID").val();

        App.harvestUPC  = $("#harvestUPC").val();
        App.processUPC  = $("#processUPC").val();
        App.packUPC     = $("#packUPC").val();
        App.sellUPC     = $("#sellUPC").val();
        App.buyUPC      = $("#buyUPC").val();
        App.shipUPC     = $("#shipUPC").val();
        App.receiveUPC  = $("#receiveUPC").val();
        App.purchaseUPC = $("#purchaseUPC").val();

        App.sellPrice     = $("#sellPrice").val();
        App.buyPrice      = $("#buyPrice").val();
        App.receivePrice  = $("#receivePrice").val();
        App.purchasePrice = $("#purchasePrice").val();



        console.log(
            App.sku,
            App.upc,
            App.ownerID, 
            App.originFarmerID, 
            App.originFarmName, 
            App.originFarmInformation, 
            App.originFarmLatitude, 
            App.originFarmLongitude, 
            App.productNotes, 
            App.productPrice, 
            App.distributorID, 
            App.retailerID, 
            App.consumerID
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }

        App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            console.log('getMetaskID:',res);
            App.metamaskAccountID = res[0];

        })
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='../../build/contracts/SupplyChain.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            console.log('data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            
            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();

        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        App.readForm();
        
        App.fetchEvents();

        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));

        switch(processId) {
            case 1:
                await App.harvestItem(event);
                break;
            case 2:
                await App.processItem(event);
                break;
            case 3:
                await App.packItem(event);
                break;
            case 4:
                await App.sellItem(event);
                break;
            case 5:
                await App.buyItem(event);
                break;
            case 6:
                await App.shipItem(event);
                break;
            case 7:
                await App.receiveItem(event);
                break;
            case 8:
                await App.purchaseItem(event);
                break;
            case 9:
                await App.fetchItemBufferOne(event);
                break;
            case 10:
                await App.fetchItemBufferTwo(event);
                break;
            case 11:
                break;
        }
    },

    harvestItem: function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.harvestItem(
                App.harvestUPC, 
                App.harvestFarmerID, 
                App.harvestFarmName, 
                App.harvestFarmInformation, 
                App.harvestFarmLatitude, 
                App.harvestFarmLongitude, 
                App.harvestProductNotes, {from: App.harvestID});
        }).then(function(result) {
            console.log('harvestItem',result);
        }).catch(function(err) {
            console.log(err.message);
            alert(err.message);
        });
    },

    processItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.processItem(App.processUPC, {from: App.processID});
        }).then(function(result) {
            console.log('processItem',result);
        }).catch(function(err) {
            console.log(err.message);
            alert(err.message);
        });
    },
    
    packItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            console.log("pack", App.packUPC, {from: App.packID}) 
            return instance.packItem(App.packUPC, {from: App.packID});
        }).then(function(result) {
            console.log('packItem',result);
        }).catch(function(err) {
            console.log(err.message);
            alert(err.message);
        });
    },

    sellItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const productPrice = web3.utils.toWei(App.sellPrice.toString(), "ether");
            return instance.sellItem(App.sellUPC, productPrice, {from: App.sellID});
        }).then(function(result) {
            console.log('sellItem',result);
        }).catch(function(err) {
            console.log(err.message);
            alert(err.message);
        });
    },

    buyItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const walletValue = web3.utils.toWei(App.buyPrice.toString(), "ether");
            return instance.buyItem(App.buyUPC, {from: App.buyID, value: walletValue});
        }).then(function(result) {
            console.log('buyItem',result);
        }).catch(function(err) {
            console.log(err.message);
            alert(err.message);
        });
    },

    shipItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.shipItem(App.shipUPC, {from: App.shipID});
        }).then(function(result) {
            console.log('shipItem',result);
        }).catch(function(err) {
            console.log(err.message);
            alert(err.message);
        });
    },

    receiveItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            console.log("receivePrice", receivePrice)
            const walletValue = web3.utils.toWei(App.receivePrice.toString(), "ether");
            return instance.receiveItem(App.receiveUPC, {from: App.receiveID, value: walletValue});
        }).then(function(result) {
            console.log('receiveItem',result);
        }).catch(function(err) {
            console.log(err.message);
            alert(err.message);
        });
    },

    purchaseItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const walletValue = web3.utils.toWei(App.purchasePrice.toString(), "ether");
            return instance.purchaseItem(App.purchaseUPC, {from: App.purchaseID, value: walletValue});
        }).then(function(result) {
            console.log('purchaseItem',result);
        }).catch(function(err) {
            console.log(err.message);
            alert(err.message);
        });
    },

    fetchItemBufferOne: function () {
        App.upc = $('#upc').val();
        console.log('upc',App.upc);

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferOne(App.upc);
        }).then(function(result) {
          console.log(result);
          $("#sku").val(result['itemSKU']);
          $("#ownerID").val(result['ownerID']);
          $("#originFarmerID").val(result['originFarmerID']);
          $("#originFarmName").val(result['originFarmName']);
          $("#originFarmInformation").val(result['originFarmInformation']);
          $("#originFarmLatitude").val(result['originFarmLatitude']);
          $("#originFarmLongitude").val(result['originFarmLongitude']);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchItemBufferTwo: function () {
        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferTwo.call(App.upc);
        }).then(function(result) {
          console.log(result);
          $("#sku").val(result['itemSKU']);
          $("#productNotes").val(result['productNotes']);
          $("#productPrice").val(web3.utils.fromWei(result['productPrice']));
          $("#distributorID").val(result['distributorID']);
          $("#retailerID").val(result['retailerID']);
          $("#consumerID").val(result['consumerID']);

          switch(web3.utils.toBN(result['itemState']).toString()) {
            case "0":
                $("#productState").val("Harvested");
                break;
            case "1":
                $("#productState").val("Processed");
                break;
            case "2":
                $("#productState").val("Packed");
                break;
            case "3":
                $("#productState").val("ForSale");
                break;
            case "4":
                $("#productState").val("Sold");
                break;
            case "5":
                $("#productState").val("Shipped");
                break;
            case "6":
                $("#productState").val("Received");
                break;
            case "7":
                $("#productState").val("Purchased");
                break;
          }
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchEvents: async function() {
        let c = await App.contracts.SupplyChain.deployed();
        await c.getPastEvents().then(function(events){
            events.forEach ((x, i) => {
                if (!App.eventsHashes.includes(x.transactionHash)) {
                    App.events.push(x.event + ' - ' + x.transactionHash)
                    App.eventsHashes.push(x.transactionHash)
                }
            })
        });

        $("#ftc-events").empty();
        App.events.forEach ((x, i) => {
           $("#ftc-events").append('<li>' + x + '</li>');
           console.log(x)
        });
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
