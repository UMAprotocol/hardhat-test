# Hardhat Testing Repo

## Intention

<p>This repo is intended to have scripts available to allow for testing with a mainnet fork. As these dependencies are applicable to multiple projects potentially, and the dependencies are largely for development only, we believe it should be separate.</p>

## Get started

To start, install packages with:

$ npm i

If there are any artifacts / contracts to deploy for testing, run:

$ npx hardhat console

Next, open another terminal in this repo and run the following command to start the hardhat blockchain instance:

$ yarn hardhat node --fork <infura-url>

There is an optional --fork-block-number if you want to fork off a particular block as opposed to the latest.

## Scripts

Once the hardhat instance is running, run any script you want with the following format:

$ HARDHAT_NETWORK=localhost node ./scripts/<file-name>

This will create the transactions on your local instance. If you run it without HARDHAT_NETWORK=localhost, the script will run but not be posted to your local server.

## Connecting in app

We will use MetaMask to actually post transactions from our application. Create a new network with the following fields:

Network Name: Hardhat

New RPC URL: http://127.0.0.1:8545/

Chain ID: 31337
