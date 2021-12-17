const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const {interface, bytecode} = require("./compile");

const provider = new HDWalletProvider(
    "12 word mnemonic",
    "https://rinkeby.infura.io/v3/2a2cb5af5782499a9c78bb6681b0d6e1"
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account" , accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
     .deploy({ data: bytecode , arguments : ["Hi there"]})
     .send({ gas: "1000000", from: accounts[0]});

    console.log("Result deployed to" , result.options.address);
    provider.engine.stop();
};

deploy();
