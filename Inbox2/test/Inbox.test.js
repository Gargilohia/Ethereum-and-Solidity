const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require("../compile");

let accounts;
let inbox;

beforeEach(async ()=>{
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()

    //use one of those accounts to
    //deploy the contract

    inbox = await new web3.eth.Contract(JSON.parse(interface))
     .deploy({ data: bytecode, arguments:["Hi There"]})
     .send({ from: accounts[0], gas: '1000000'})
    
});

describe("Inbox Account" , ()=>{
    it('deploys a contract', ()=>{
        assert.ok(inbox.options.address);
    });

    it("Has a default message", async ()=>{
        const message = await inbox.methods.getMessage().call();
        assert.equal(message,"Hi There");
    });

    it("Modifies the message", async ()=>{
        await inbox.methods.setMessage("ABC").send({ from: accounts[0]})
        const message = await inbox.methods.getMessage().call()
        assert.equal(message, "ABC");
    });
});