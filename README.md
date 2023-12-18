# palpatines-test

This is a small API that converts an encrypted file over to a decrypted and formated file displaying some star wars information.

# Server

## Running the server

To run the server in development mode, run:

```bash
npm run dev

# To decrypt the file
http://localhost:3000/api/citizen

# To write the file
http://localhost:3000/api/citizen/write
```

## ENV Variables

create a folder called .env.me at the root of the project and add the provided variables

once added run the following command to pull the necessary variables into the .env file

```bash
npx dotenv-vault@latest pull
```
