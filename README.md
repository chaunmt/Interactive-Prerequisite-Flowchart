# Interactive Prerequisite Flowchart
Welcome to the Interactive Prerequisite Flowchart!
- [Interactive Prerequisite Flowchart](#interactive-prerequisite-flowchart)
  - [Documentation](#documentation)
  - [Initialize](#initialize)
  - [Run](#run)
  - [Start](#start)

## Documentation
1. [Mermaid](https://mermaid.js.org/intro/)
2. [Reaflow](https://reaflow.dev/?path=/docs/docs-introduction--docs)
3. [Reagraph](https://reagraph.dev/?path=/docs/docs-intro--docs)
4. [Coursedog Curriculum API](https://coursedogcurriculum.docs.apiary.io/#introduction/authentication/authentication-steps)
    + This project is made by and for UoMN students.
    + The university is moving its data into Coursedog, making this API a solid choice for our data.
5. Generate json data files
    + `app/data/sources.js` is responsible to generate all json data files. 
    + Modify `sources.js` to fit your needs.
    + Use node `sources.js` when in the same path as this file to run.
6. Access json data files
    + Import `Access` from `app/data/access.js` or open the json files in folder `Dog` and `General` directly.

## Initialize
Make sure to download and install the following:
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (required for patching a dependency - mermaid)

## Run
To run the project locally, follow these steps:
1. Install dependencies:
   ```
   pnpm install
   ```
2. Run the development server:
   ```
   pnpm run dev
   ```

## Start
To start the project, follow these steps:
1. Build the project:
   ```
   pnpm build
   ```
2. Start the server:
   ```
   pnpm start
   ```