# TODOs Coding Exercise

This is the TODOs coding exercise base solution. It contains a .NET server along with an Angular client. If you have Visual Studio 2022, feel free to use it, however all the exercises can be completed with **VS Code** or any text editor along with the `dotnet` and `ng` command line tools.

## Prerequisites

- Visual Studio 2022, Visual Studio Code, or any text editor [Download VS Code](https://code.visualstudio.com/)
- .NET SDK [Download](https://dotnet.microsoft.com/download)
- Node LTS [Download](https://nodejs.org/en/)

## Using the command line interface

### Install dependencies

- In the project folder run: `dotnet restore`
- In the **/client** folder run: `npm ci`

### Run the server solution

- From the root run: `dotnet run --project src/Todos`
- Open a browser and navigate to http://localhost:4100/api/todos

### Run the server solution watching changes

- In the root run: `dotnet watch run --project src/Todos`

### Run the server tests

- In the root run: `dotnet test test/Todos.Tests`

### Run the client

- In the `/client` folder run `npm start`
- Open a browser and navigate to http://localhost:4200

### Run the client tests

- In the `/client` folder run `npm test`
