pragma solidity ^0.4.11;

contract MyBlog {

  bytes32 private blogName;
  
  bytes32[] private messages;

  function MyBlog(bytes32 title) {
    blogName = title;
  }

  function addPost(bytes32 message) {
    messages.push(message);
  }

  function getMessages() returns (bytes32[]) {
    return messages;
  }

  function getBlogName() returns (bytes32) {
    return blogName;
  }

}