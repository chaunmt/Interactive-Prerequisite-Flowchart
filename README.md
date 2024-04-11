TODO general cleanup of each section (also insert pictures/examples and more detail on frontend-y stuff, we have plenty about backend already)

# Interactive Prerequisite Flowchart
Classes can have prerequisites which are typically listed at the bottom of a course description page. However, this textual description can be confusing when registering for classes, and near-impossible to use when planning for graduation. Inspired by the Fall 2022 project Prerequisite Flowchart, which itself was inspired by the Department of Computer Science and Engineering's [undergraduate prerequisite chart](https://cse.umn.edu/cs/ug-prerequisite-chart), Course Flowchart is a website which makes all departments and courses searchable, displaying a chart of the relationship between all classes in a department or the prerequisites of a course.

- [Interactive Prerequisite Flowchart](#interactive-prerequisite-flowchart)
  - [Details](#details)
  - [Technologies](#technologies)
  - [Work in progress](#work-in-progress)
  - [Contribute](#contribute)
  - [Getting started](#getting-started)
  - [Project structure](#project-structure)

## Details
The website relies on publically available data provided by the [Coursedog API](https://coursedog.docs.apiary.io/), a new [course catalog](https://umtc.catalog.prod.coursedog.com/courses) system adopted by the University of Minnesota in August 2023. From this API, department information and individual courses' information is scraped for the entire Twin Cities campus. The data is then assembled into JSON files which contain relevant information for displaying useful descriptions and building prerequisite charts.

### Technologies
The website is a [Next.js](https://nextjs.org/) project which makes use of the [Mermaid](https://mermaid.js.org/) library to present department/course prerequisite charts. The Coursedog API was used to build caches of course information stored in the repository.
1. [Mermaid](https://mermaid.js.org/intro/)
   - Currently used for drawing the flowcharts to the webpages. Plans are to migrate from this to either Reaflow or Reagraph.
2. [Reaflow](https://reaflow.dev/?path=/docs/docs-introduction--docs) and/or [Reagraph](https://reagraph.dev/?path=/docs/docs-intro--docs)
   - Not yet in use, but will be migrated to soon.
3. [Coursedog Curriculum API](https://coursedogcurriculum.docs.apiary.io/#introduction/authentication/authentication-steps)
   - This project is made by and for UMN students.
   - The university is moving its data into Coursedog, making this API a solid choice for our data.

### Work in progress
Development is intended to continue into the Spring 2024 semester as many ideas were tabled, such as:
- TODO UPDATE
- Selecting multiple classes to present in a single graph
- Displaying what classes take a selected class as a prerequisite
- Clickable graph nodes
- A planning tool/integration with Graduation Planner

### Contribute
If you are not part of the main team, first fork and then clone the repository. Then setup and install dependencies as specified in [Initialize](#initialize) and [Run](#run). All development should be based on the `development` branch, so base any changes off the latest version of development. This project uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). Use `pnpm lint` to check for linting errors or setup your editor to display them. Once ready to be merged in, submit a pull request (specify what issue will be resolved by this PR).

### Getting started
Make sure to download and install the following:
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- everything they need to install (prettier, eslint, etc.)

## Run
To run the project locally, follow these steps:
1. Install dependencies:
   `pnpm install`
2. Run the development server:
   `pnpm dev`

## Deployment
To deploy the project, follow these steps:
1. Build the project:
   `pnpm build`
2. Start the server:
   `pnpm start`

5. Generate json data files
   - `app/data/sources.js` is a script for generating all json data files.
   - Modify `sources.js` to fit your needs.
   - Use `pnpm sources` from the top-level directory to run the script.

4. Graph generation from above data
   - `app/data/graphBuilder.ts` is responsible for building prerequisite graphs that show the prerequisite relationships encoded in the data, nesting all the way back to introductory level courses.
6. Access json data files
   - Import `Access` from `app/data/access.js` or open the json files in folder `app/data/Dog` and `app/data/General` directly.
