
<p align="center">
  <img src="https://github.com/MortalHappiness/NMLab2020Fall-Final/blob/master/client/public/logo.png?raw=true" alt="Logo" width="80" height="80">
</p>
<h1 align="center">知識+ DApp on Ethereum</h3>

<p align="center">
  <img src="https://img.shields.io/github/v/release/MortalHappiness/NMLab2020Fall-Final?style=flat-square" alt="Release" />
  <img src="https://img.shields.io/github/contributors/MortalHappiness/NMLab2020Fall-Final?style=flat-square" alt="Contributors" />
  <img src="https://img.shields.io/github/license/MortalHappiness/NMLab2020Fall-Final?style=flat-square" alt="License" />
</p>

<p align="center">
  A decentralized question answering system on Ethereum Ropsten Network.
</p>
<p align="center">
  <a href="https://mortalhappiness.github.io/NMLab2020Fall-Final/">View DApp</a>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributors">Contributors</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## About the Project
![](https://i.imgur.com/V1wSNLF.png)
![](https://i.imgur.com/YnS1YzX.png)

This is a decentralized question answering system on **Ethereum Ropsten Network**. One can get answers and share knowledge with others.

Besides, one can rate the upvote / downvote answers and after several blocktime, the system will pay bounty to the best voted answer's provider.

The bounty in this system is called "csb", and can exchange with Etheruem.

### Built with

#### Frontend
* [React](https://reactjs.org/)
* [Material UI](https://material-ui.com/)
* [Web3](https://web3js.readthedocs.io/en/v1.3.0/)

#### Backend
* [Solidity](https://docs.soliditylang.org/en/v0.8.1/)
* [Truffle](https://www.trufflesuite.com/docs/truffle/overview)
* [Ganache](https://www.trufflesuite.com/ganache)


## Getting Start

### Prerequisite

* [NodeJS](https://nodejs.org/en/)
* [Truffle](https://www.trufflesuite.com/docs/truffle/overview)
* [Ganache](https://www.trufflesuite.com/ganache)

### Installation

```shell
$ cd client
$ npm install
```

## Usage

Make sure you have opened ganache and then type the following commands in the terminal.

```shell
$ truffle compile
$ truffle migrate
```

In another terminal

```shell
$ cd client
$ npm start
```

## Contributors
* [MortalHappiness](https://github.com/MortalHappiness)
* [Kenchu123](https://github.com/Kenchu123)
* [Jim-CTChen](https://github.com/Jim-CTChen)

## License
Distributed under the MIT License. See `LICENSE` for more information.
