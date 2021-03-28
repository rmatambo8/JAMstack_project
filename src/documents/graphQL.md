---
slug: "/documents/graphQL"
date: "2021-03-28"
title: "The History and Use of GraphQL"
id: "9997"
---
- What is GraphQL?
    - high level: GraphQL is a query language for APIs. GraphQL is actually a specification that describes its type system and query language. This specification can be implemented in any programming language. It's not specific to one application or architecture. There are server-side implementations of the GraphQL specification in many programming languages. These server-side implementations are called GraphQL servers.
    - Practically: The main principle of GraphQL is, that the code on the browser forms a query describing the data wanted, and sends it to the API with an HTTP POST request. Unlike REST, all GraphQL queries are sent to the same address, and their type is POST.
- What is a graphQL server?
    - servers that communicate with clients using http
    - servers that parse a request into an abstract syntax tree and then walk the tree to determine how to respond to the request.
    - once the GraphQL server has assembled the request, the request is returned to the client as a JSON object over HTTP.
- how does a frontend client interact with the GraphQL API?
    - How does it work?
        - GraphQL can use MANY different programming languages and follows a similar pattern.

            ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a554b2cf-41b1-4022-8713-c2140030e256/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a554b2cf-41b1-4022-8713-c2140030e256/Untitled.png)

        - describe your data

            ```graphql
            type Project {
            	name: String
            	tagline: String
            	likes: integer
            }

            ```

        - Ask for what you want

            ```graphql
            project(name: "GraphQL") { 
            	likes
            }
            // for variables, you can use $
            query ($name: String) {
            	project(name: $name) {
            		likes
            	}
            }

            // in the request body you send the query and the variables.
            ```

        - Get predictable results

            ```graphql
            {
            	"project": {
            		"likes": "5012"
            	}
            }
            ```

    - front end can query it based on the schema.
    - server returns data in a JSON Object.
- Why graphQL?
    - history
        - 1960 - Remote procedure calls - a client-server interaction model whereby a client causes a method to execute on a remote server. (lasted until 1960's
            - due to bandwidth difficulties this was the best we could do
            - Tradeoffs of RPC
                - Benefits
                    - minimal network overhead
                    - Request only what you need
                    - continuity between local and remote
                - Drawbacks
                    - tightly coupled between client and server(loss of boundary between local and remote)
                    - proliferation of api methods(too many external endpoints)
                    - lack of introspection
        - 1990s - Simple Object Access Protocol (SOAP) - a protocol fro exchanging structured information decoupled from its implementation(microsoft research)
            - one of the first movements towards structured data and resource oriented api
            - builds a bunch of structure on top of http for transport
            - messaging protocol for structured information
                - Benefits
                    - Removes coupling between frontend and backend code via declarative data
                    - Highly structured data
                    - introspection and tooling
                - Drawbacks
                    - Difficult to use without tooling(you need special tools for everything
                    - more data than you need
                    - complicated
        - 2000 - Representational State Transfer(REST) - a stateless architecture for requesting resources over http using URIs.
            - threw out the client-server contract, tooling, and xml headers and replaced it with http semantics and structure (just using get, put, post etc) and using uris to reference a hierarchy of data.
                - Benefits
                    - simple to use
                    - simple to understand
                - Drawbacks
                    - chatty - takes a lot of calls to get resources(devastating for mobile performance)
                        - latency → 2x wired latency is 4g latency - cannot be overcome
                        - 55ms latency * 8 requests to load a page on mobile
                            - 440ms of overhead (half a second just to load the main page)
                        - TCP Slow start - a server will send information progressively faster until a client starts failing and dropping information(HTTP 1.0)
                    - returns too much data
                        - rest sends a complete representation of all information
                        - most times, you may only need a percentage of the data.
                    - lacks in introspection
                        - because there is no contract between client and server,
                            - there is no real way to generate documentation
                            - any tooling that will allow you to interact with the data.
        - What would we want from an api that solves the rest problem?
            - minimal http traffic
            - minimal payloads
            - human readable
            - tooling rich
            - preserve local reasoning
    - How was it built?
        - start with the data in a format that represents what you want from the backend and is as naturally readable as possible and then work backwards
        - allow requests to be merged into one(intercepted and batch together)
            - this is what the dom does, it intercepts a bunch of dom manipulations and batches them together.
        - Allow for a typed schema which would allow for deep introspection and rich tooling.
            - earlier protocols got this right - the ability to publish a strongly typed schema that allowed for static analysis
- What are the drawbacks of GraphQL?
    - complex data can be difficult to manage
    - when part of graphql fails, rather than causing an error, it will return a partial result which can make error handling sometimes more sophisticated and harder to manage.
    - Organizing large schema is hard to manage.
    - running large queries can cut your cpu if not careful