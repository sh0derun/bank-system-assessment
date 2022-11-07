# NFI deposit and withdrawal system assignment

## Getting start

- [Prerequisites](#prerequisites)
- [Setup](#setup)

### Prerequisites

Make sure you have these tools installed to be able to run the assignement

- Docker
- Node.js

### Setup

1. Install dependencies.
2. Run `docker compose up -d` to start docker containers in background.
3. Run `npm run db:migrate` to initiate database.
4. Run `npm run dev` to start the project.
5. Server will run on post `4000` but feel free to modify it in `.env` config file You should be able to send requests to three API end points from any rest client:
- Post `/bank/api/v1/userservice/register`
   - Request :  
   ```json
    {
        "name": "anass razik"
    }
   ```
   - Response :
   ```json
    {
        "id": "ae1ea7e0-efe4-465b-be86-ef5904b448b1",
        "name": "anass razik"
    }
   ```
- Put `/bank/api/v1/accountservice/deposit`
   - Request :  
   ```json
    {
        "userId": "92bf289a-fc8b-4152-9e4b-70d1c0cdd311",
        "amount":"1200"
    }
   ```
   - Response :
   ```json
    {
        "userId": "92bf289a-fc8b-4152-9e4b-70d1c0cdd311",
        "amount":"1200"//new account balance after deposit
    }
   ```
- Put `/bank/api/v1/accountservice/withdraw`
   - Request :  
   ```json
    {
        "userId": "92bf289a-fc8b-4152-9e4b-70d1c0cdd311",
        "amount":"300.45"
    }
   ```
   - Response :
   ```json
    {
        "userId": "92bf289a-fc8b-4152-9e4b-70d1c0cdd311",
        "amount": "940.83"//new balance after withdraw
    }
   ```