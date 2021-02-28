# reaktor-exercise

The exercise was to create a simple web app for a client to use in their warehouses. The app needed to combine data from two legacy APIs and display that data on a frontend.

[Live deployment](https://vmuotka-reaktor.herokuapp.com/)

## Developing

To start developing locally, run npm install in both the root folder and the client folder. This installs the necessary node_modules to run the applications front end and backend.

To develop the backend code, run npm run dev in the root folder. This reloads the server every time changes are saved in the code. To develop the frontend code, just run npm start in the client folder.

## Building the application

To build the backend (compiling from TS to JS), run npm run tsc. This creates a build folder, which has the project files. NB. It didn't copy the package.json file.

To build the frontend, run npm run build in the client folder. This creates a build folder. You can place this folder in the build folder of the backend, or keep it as separate.