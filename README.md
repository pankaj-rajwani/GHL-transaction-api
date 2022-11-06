# GHL-transaction-api
REST API backend built over Node.js + Express.js + Mongoose for Go High Level's wallet transaction assignment

### Package manager
This project is using [Yarn](https://yarnpkg.com/en/docs/install) as package manager, if you do not have this installed on your machine please start by looking at the [Yarn docuentation and tutorials](https://classic.yarnpkg.com/en/docs). After installing the package manager the following commands will be availible for you:
- `yarn install` - Installing dependencies
- `yarn start` - Starting the project without nodemom
- `yarn start:dev` - Starting the project for development with nodemon

### Yarn
Project uses [Yarn](https://yarnpkg.com/en/docs/install) package manager.
- To add package use `yarn add package-name` command. Append `-D` before `package-name` if it is for development purposes
- To restore packages use `yarn` command.

### Database
Project uses [MongoDB](https://www.mongodb.com/try/download/community) as database


# REST APIs

The REST APIs to the transaction app are described below.

## Setup Wallet

### Request

`POST /wallet/setup`

    curl -i -H 'Accept: application/json' http://localhost:4200/api/v1/wallet/setup

### Body

    {
    "name": "Test Wallet",
    "balance": 100
    }

### Response

    {
    "status": true,
    "message": "Wallet successfully created with balance: 100",
    "data": {
        "name": "Test Wallet",
        "balance": 100,
        "_id": "6367b6a701cad97b05f4ae16",
        "createdAt": "2022-11-06T13:29:11.507Z",
        "updatedAt": "2022-11-06T13:29:11.548Z",
        "__v": 0
      }
    }

## Get wallet details

### Request

`GET /:id`

    curl -i -H 'Accept: application/json' http://localhost:4200/api/v1/wallet/6367b6a701cad97b05f4ae16

### Response

    {
    "status": true,
    "data": {
        "_id": "6367b6a701cad97b05f4ae16",
        "name": "Test Wallet",
        "balance": 100,
        "createdAt": "2022-11-06T13:29:11.507Z",
        "updatedAt": "2022-11-06T13:29:11.548Z",
        "__v": 0
      }
    }

## Credit transaction

### Request

`POST /transactions/transact/:id`

    curl -i -H 'Accept: application/json' http://localhost:4200/api/v1/transactions/transact/6367b6a701cad97b05f4ae16

### Body

    {
      "amount": 20,
      "description": "Test credit"
    }

### Response

    {
    "status": true,
    "message": "Transaction successful.",
    "data": {
        "balance": 120,
        "transactionId": "6367b92001cad97b05f4ae1d"
      }
    }
    
## Debit transaction

### Request

`POST /transactions/transact/:id`

    curl -i -H 'Accept: application/json' http://localhost:4200/api/v1/transactions/transact/6367b6a701cad97b05f4ae16

### Body

    {
      "amount": -20,
      "description": "Test debit"
    }

### Response

    {
    "status": true,
    "message": "Transaction successful.",
    "data": {
        "balance": 100,
        "transactionId": "6367b92001cad97b05f4ae1d"
      }
    }

## Get list of tranactions

### Request

`GET /transactions`

    curl -i -H 'Accept: application/json' -d 'walletId=6367b6a701cad97b05f4ae16&skip=0&limit=10' http://localhost:4200/api/v1/transactions

### Response

    {
    "status": true,
    "message": "Transactions fetched successfully.",
    "data": {
        "trnxs": [
            {
                "_id": "6367b6a701cad97b05f4ae18",
                "type": "CREDIT",
                "description": "Wallet Setup",
                "amount": 100,
                "walletId": "6367b6a701cad97b05f4ae16",
                "balanceBefore": 0,
                "balanceAfter": 100,
                "createdAt": "2022-11-06T13:29:11.532Z",
                "updatedAt": "2022-11-06T13:29:11.532Z",
                "__v": 0
            },
            {
                "_id": "6367b92001cad97b05f4ae1d",
                "type": "CREDIT",
                "description": "Test credit",
                "amount": 20,
                "walletId": "6367b6a701cad97b05f4ae16",
                "balanceBefore": 100,
                "balanceAfter": 120,
                "createdAt": "2022-11-06T13:39:44.166Z",
                "updatedAt": "2022-11-06T13:39:44.166Z",
                "__v": 0
            },
            {
                "_id": "6367b98701cad97b05f4ae21",
                "type": "DEBIT",
                "description": "Test debit",
                "amount": -20,
                "walletId": "6367b6a701cad97b05f4ae16",
                "balanceBefore": 120,
                "balanceAfter": 100,
                "createdAt": "2022-11-06T13:41:27.161Z",
                "updatedAt": "2022-11-06T13:41:27.161Z",
                "__v": 0
            }
        ],
        "totalPages": 3
      }
    }
