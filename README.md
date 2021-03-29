A little project that is seeing what JAMstack is all about.

for the curious:
React, gatsby(ssg), netlify(hosting and netlify functions), fauna db


the big lessons here were:
  - J - javascript - refers to how one can use javascript after the initial compilation of all static assets at build time.
  - A - APIs - refers to how one can use asynchronous calls to create dynamic content, access microservices, and also run a serverless architecture
  - M - Markup - refers to how actual markup is deployed at build - this means the server will actually render the static assets that will be served.
  - Gatsby takes about 10 seconds or more to do the initial build for deployment. JAMstack would definitely not be a good option for a site that would have extremely frequent major changes(maybe like a news site).
When on the JAMstack, sites tend to be served on cdn's and this allows for global deployment in minutes. These can be deployed from a source-code-management system(SCM) like Git and webhooks can be configured to listen for commit, push and pull requests(among other changes) to a repository.

because JAMstack focuses on the three pillars, there is no specific frameworks or stack that MUST be used to qualify an app or a website as being on the JAMstack.
Overall, when one hears the term JAMstack, there are 3 ideas that should come up.
1. Serving static html on the server side(server side rendering)
2. manipulating the page dynamically at runtime using Javascript.
3. Interacting with remote servers using API calls in functions - and yes this does refer to serverless computing.

Narrowing in:

Although there is no official stack in this area, some popular tools to note in this area are:
1. React - React is probably the most popular front end framework today.
2. Gatsby - the most popular static site generator at the moment, Gatsby builds static sites using plugins, templates, and themes that work on top of React
3. GraphQL - A query language that can can be used to mitigate over and underfetching of data - gatsby uses GraphQL to retrieve data.
4. Netlify - Popular hosting platform for all static sites that also offers serverless functions that can be accessed and defined from within front end code 
5. FaunaDB - A flexible, developer-friendly, transactional database delivered to you as a secure cloud API. Extremely friendly to Netlify development.
6. GitHub - ... yea.

