export const IntentSenderAbi = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_settlementContract",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "ARBITRUM_SEPOLIA_CHAIN_ID",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "LIBERICHAIN_CHAIN_ID",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "lockedTokens",
    "inputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "settlementContract",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "submitIntent",
    "inputs": [
      { "name": "_token", "type": "address", "internalType": "address" },
      { "name": "_amount", "type": "uint256", "internalType": "uint256" },
      {
        "name": "_originChain",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_destinationChainId",
        "type": "uint32",
        "internalType": "uint32"
      },
      { "name": "_deadline", "type": "uint256", "internalType": "uint256" },
      { "name": "_minReceived", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "IntentSubmitted",
    "inputs": [
      {
        "name": "intentId",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "user",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "token",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "sourceChainId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "destinationChainId",
        "type": "uint32",
        "indexed": false,
        "internalType": "uint32"
      },
      {
        "name": "deadline",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "minReceived",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  { "type": "error", "name": "IntentExpired", "inputs": [] },
  { "type": "error", "name": "InvalidMinReceived", "inputs": [] },
  { "type": "error", "name": "InvalidSourceChain", "inputs": [] },
  { "type": "error", "name": "TransferFailed", "inputs": [] }
]
