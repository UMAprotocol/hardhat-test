# Hardhat Testing Repo

## Intention

<p>This repo is intended to have scripts available to allow for testing with a mainnet fork. As these dependencies are applicable to multiple projects potentially, and since the dependencies are largely for development only, we believe it should be separate.</p>

## Get started

To start, install packages with:

```sh
$ yarn
```

Next, open another terminal in this repo and run the following command to start the hardhat blockchain instance:

```sh
$ yarn hardhat node --fork <infura-url>
```

There is an optional --fork-block-number if you want to fork off a particular block as opposed to the latest.

## Scripts

Once the hardhat instance is running, run any script you want with the following format:

```sh
$ HARDHAT_NETWORK=localhost node ./scripts/<file-name>
```

This will create the transactions on your local instance. If you run it without HARDHAT_NETWORK=localhost, the script will run but not be posted to your local server.

## Connecting in app

We will use MetaMask to actually post transactions from our application. Create a new network with the following fields:

Network Name: Hardhat

New RPC URL: http://127.0.0.1:8545/

Chain ID: 31337

## seedUmaToAccounts in MetaMask

With the terminal running, run the following script:

```sh
$ HARDHAT_NETWORK=localhost node ./scripts/seedUmaToAccounts.js
```

This will seed UMA to the first 3 accounts generated by default in the terminal.

Account #0: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (10000 ETH)

Account #1: 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 (10000 ETH)

Account #2: 0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc (10000 ETH)

Add these accounts in MetaMask (private keys are in your terminal), then add UMA's contract address to assets, and you should see the UMA transfered to these accounts.
