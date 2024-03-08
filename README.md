# Interactive Prerequisite Flowchart

Welcome to the Interactive Prerequisite Flowchart!

- [Interactive Prerequisite Flowchart](#interactive-prerequisite-flowchart)
  - [Documentation](#documentation)
  - [Contribute](#contribute)
  - [Initialize](#initialize)
  - [Run](#run)
  - [Start](#start)

## Documentation

1. [Mermaid](https://mermaid.js.org/intro/)
   - Currently used for drawing the flowcharts to the webpages. Plans are to migrate from this to either Reaflow or Reagraph.
2. [Reaflow](https://reaflow.dev/?path=/docs/docs-introduction--docs) and/or [Reagraph](https://reagraph.dev/?path=/docs/docs-intro--docs)
   - Not yet in use, but will be migrated to soon.
3. [Coursedog Curriculum API](https://coursedogcurriculum.docs.apiary.io/#introduction/authentication/authentication-steps)
   - This project is made by and for UMN students.
   - The university is moving its data into Coursedog, making this API a solid choice for our data.
4. Graph generation from above data
   - `app/data/graphBuilder.ts` is responsible for building prerequisite graphs that show the prerequisite relationships encoded in the data, nesting all the way back to introductory level courses.
5. Generate json data files
   - `app/data/sources.js` is a script for generating all json data files.
   - Modify `sources.js` to fit your needs.
   - Use `pnpm sources` from the top-level directory to run the script.
6. Access json data files
   - Import `Access` from `app/data/access.js` or open the json files in folder `app/data/Dog` and `app/data/General` directly.

## Contribute

If you are not part of the main team, first fork and then clone the repository. Then setup and install dependencies as specified in [Initialize](#initialize) and [Run](#run).
All development should be based on the `development` branch, so base any changes off the latest version of development. This project uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). Use `pnpm lint` to check for linting errors or setup your editor to display them.
Once ready to be merged in, submit a pull request (specify what issue will be resolved by this PR).

## Initialize

Make sure to download and install the following:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

## Run

To run the project locally, follow these steps:

1. Install dependencies:
   ```
   pnpm install
   ```
2. Run the development server:
   ```
   pnpm dev
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
