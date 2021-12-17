 pragma solidity ^0.4.17; 

contract Inbox{

    string message;

    function Inbox(string newMessage) public {
        message = newMessage;
    }

    function setMessage(string NewMessage) {
        message = NewMessage;
    }

    function getMessage() public returns(string){
        return message;
    }
}