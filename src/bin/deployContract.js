fs = require('fs');
Web3 = require('web3');
solc = require('solc');

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
code = fs.readFileSync('src/contract/MyBlog.sol').toString();
compiledCode = solc.compile(code);
abiDefinition = JSON.parse(compiledCode.contracts[':MyBlog'].interface);
console.log(compiledCode.contracts[':MyBlog'].interface);
MyBlogContract = web3.eth.contract(abiDefinition);
byteCode = compiledCode.contracts[':MyBlog'].bytecode;

// Get first account from the blockchain to deploy the contract
MyBlogContract.new("Demo Blog",{data: byteCode, from: web3.eth.accounts[0], gas: 4700000}, function(err, myContract){
    if(!err && myContract.address) {
        console.log(myContract.address);
        return;
    }
});
