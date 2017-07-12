var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// Extracted from compiledCode.contracts[':MyBlog'].interface
var abi = JSON.parse('[{"constant":false,"inputs":[],"name":"getMessages","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getBlogName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"message","type":"bytes32"}],"name":"addPost","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"title","type":"bytes32"}],"payable":false,"type":"constructor"}]');
BlogContract = web3.eth.contract(abi);
// Extracted from myContract.address
blog = BlogContract.at('0x69c99b6a9dacb80df84d1fed7ea1555b802f09b8');

$(document).ready(function() {
    $container = $('#messages');
    getPosts();
});

function getPosts() {
    posts = blog.getMessages.call();

    // Print them
    $container.html('');
    for (var i = 0; i < posts.length; i++) {
        $container.append('<li>'+web3.toAscii(posts[i])+'</li>');
    }
}

function addPost() {
    $message = $('#message');
    blog.addPost($message.val(), {from: web3.eth.accounts[0]}, function() {
        alert('Success!');
        $message.val('');
        getPosts();
    })
}