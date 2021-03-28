---
slug: "/documents/gatsby"
date: "2021-03-28"
title: "Gatsby"
id: "9995"
---

# Static Site Generators: Gatsby

# Static Site Generators: Gatsby

- an ssg is a tool that generates static sites.
    - takes in templates in some form, and generates html.
    - The most common template form is markdown
    - CMS(such as wordpress) produces HTML at runtime for each client request.
    - An SSG produces its static content at compile time(or build time, synonymous in this context), and avoids the performance penalty.
    - SSG creates a skeleton website that can be the basis for a more traditional dynamic website.
- Gatsby
    - an SSG that brings together common front-end development technologies into a cohesive whole, this includes React, GraphQL, and Webpack.
    - Uses the Notion of Starters to build sites.
        - prepackaged project with all the essential files for a particular type of website.
        - With Gatsby, there is a starter for all the essential files for a particular type of website.
    - Gatsby is a command-line tool that is easy to install and use.
        - the final output is a directory structure that contains, among other things, an HTML file. That file is the entry point to your website.
        - Any static resources that make up the website are also produced.
    - Gatsby uses GraphQL to read in data from a variety of sources, including Markdown, JSON, and more.
        - it merges that data into your template.
        - This is the Gatsby data processing layer(what makes static websites dynamic at compile time).
    - Gatsby websites are usually React websites
        - React is often used for Gatsby sites to the point where it would be unusual to not use it.
        - GraphQL is more optional with gatsby(even though you probably will use it)
    - Gatsby Project Structure
        - **/.cache** – This is a directory where Gatsby itself keeps internal data
        that is cached during its work for speed. You are not intended to edit
        anything here, and you shouldn’t check it into source control.
        - **/.git** – This is your Git configuration directory and is controlled by Git
        itself, not Gatsby.
        - **/node_modules** – This is where all the packages installed by NPM
        are stored. This is controlled by NPM and shouldn’t be checked into
        source control (a developer cloning and building your project for the
        first time would see this directory automatically generated).
        - **/public** – This is where the output of the build process goes and is
        where the content that is served when you start the development
        server. You should virtually never edit anything here directly.
        - **/src** – This directory is where the source of your website goes. Under
        it, you will find some subdirectories. First will be a components
        directory. This is where you’ll find React component definitions.
        There will also be an images directory, and I’ll give you just one guess
        what’s in that one! Finally, you’ll have a pages directory, and the files
        here will automatically become pages in your website, and the paths
        to them will be based on their filenames.
        - **gatsby-browser.js** – This file contains configuration for usages of
        the Gatsby browser API, which can be used to customize or extends
        default Gatsby settings that affect web browsers in some way.
        - **gatsby-config.js** – This is the primary Gatsby configuration file and
        certainly the one you’ll deal with the most (it may be the *only* one you
        ever deal with). Here, you can specify metadata about your website
        such as site title and description, what plugins you want Gatsby to
        use, and so on.
        - **gatsby-node.js** – This configuration file deals with usages of the
        Gatsby Node API, which allows you to tailor the build process to your
        needs (Gatsby uses Node in at least parts of the build process).
        - **gatsby-ssr.js** – The Gatsby Server-Side Rendering API can be
        incorporated if you need to use Server-Side Rendering, and this
        configuration file is how you control that.
        - **package.json** – This is an NPM/Node configuration file that contains
        information about your project that NPM and Node need to work.
        The most important thing here is the list of NPM packages that your
        project depends on.
        - **package-lock.json** – This is a file used internally by NPM to manage
        your dependencies, and as such, you should not touch it.

        In addition to the described directories and files, which should always be present,
        others may be present too, depending on the starter you use and your needs:

        - **/plugins** – You may sometimes need to have plugins that are local
        to your machine and not hosted as an NPM package. If that should
        happen, this directory will be present and will contain those plugins.
        - **.gitignore** – This is the standard file where you can specify files and
        directories that Git should ignore.
        - **.prettierrc** – Some starters use the Prettier tool to make their source
        code looks good. This configuration file controls that, if so.
        - **.prettierignore** – Like .gitignore, if you have files you don’t want
        Prettier to mess with, then you can specify them here.
        - **LICENSE** – This is a standard license file that most GitHub
        repositories contain.
        - **README.md** – Like license, this is a standard file often found in Git
        repositories and is intended to describe your repository and project
        (this is what you see on GitHub below the repository contents).
    - Starters
        - most fundamental concept in Gatsby.
        - **A boilerplate website that Gatsby copies and customizes to make the developer's website**
        - Gatsby community offers a whole host of other starters, and you can always make your own too.
        - gatsby new command will clone a Git site from somewhere, installs all the dependencies it specifies and starts you with a clear git history.
    - Plugins(3 types)
        - functional
            - extend what Gatsby can fundamentally do.
            - `gatsby-plugin-react-helmet` is an example that provides the capability to control the document head using react components.
        - Source
            - a source plugin is responsible for creating a series of file nodes - one per file in the project.
            - `gatsby-source-filesystem` is an example of this, a plugin that uses files on the local filesysystem that the project is in for creating file nodes.
        - Transformer
            - a plugin that is used to convert source data into a form Gatsby can use.
            - `gatsby-transformer-remark` is an example of this, it knows how to take in markdown file nodes produced from markdown files processed by a source plugin and converts it to MarkdownRemark, a form Gatsby can handle internally.
    - Themes
        - special type of plugins that add various types of preconfigured functionality and data sourcing, and/or UI code to a website.
        - themes abstract out of your own code default configuration and shared functionality into a sharable package.
        - Very beneficial when creating multiple websites - themes can be changed and that change filtered down into all the websites just by updating its dependencies..
    - What's the difference between starters, plugins, and themes?
        - the difference between them is how they are intended to be used.
        - Starters are meant to be a starting point for a website.
        - themes and plugins are installed into a website created from a starter.
        - Themes are intended to be responsible for some particular piece of a website.

    ### The Gatsby Build Process

    - at a high level, Gatsby takes source files, "builds" them in some way and produces the static html files we are ultimately after.
    - the `gatsby develop` command builds source files in development.
    - the `gatsby build` command gets the final artifacts and performs various optimizations and cleanups.
    - Gets code into final state where code is ready to deploy.
    - In development, previous html and css files aren't deleted which speeds things up, in the bootstrap phase(end of the process), gatsby starts up a dev server with the updated assets
    - In build mode, after the bootstrap phase(does include deleting the previous build files) instead of starting the server, it kicks off some webpack tasks.

    ### Webpack

    - Why Webpack?
        - we use a lot of libraries and tools for development
        - what we build is more complex and has far more moving parts with many things that need to be included
        - scripts need to be loaded in the proper order, everything that one script depends on is both included and loaded before it's used and that code that references other code can find one another at runtime.
        - **Works off of the notion of bundles**
            - Bundle - conglomeration of various resources that a web page needs to function.
            - usually a single file and usually just a single request across the network.
            - bundles can allow code minification and compression
    - What is webpack all about?
        - ability to bundle code
        - ability to ensure dependencies are loaded
        - ability to transpile code and work with react and it's unique typescript files.

    - Branches of webpack(in gatsby)
        - **MetaData** - ****The siteMetadata branch contains common pieces of data that will be used throughout your website. You’ll see how this is used very soon.
        - **Plugins -** The plugins branch is where the plugins Gatsby requires to build your website are specified. Some plugins, like `gatsby-transformer-sharp` (which is responsible for creating nodes from image types that are supported by the Sharp image processing library) and `gatsby-plugin-sharp` (which exposes several image processing functions provided by the Sharp image processing library), don’t require any configuration details. Others, like `gatsby-plugin-react-helmet`, require configuration details and so have an options element associated with it.
        - **pathPrefix** – Sites sometimes aren’t hosted at the root of a domain,
        and in those cases, you may need a prefix on the URLs. This branch
        allows you to specify those.
        - **polyfill** – Gatsby code uses ES6 Promises. However, not all browsers
        support that. You can, therefore, provide your own polyfill for it by
        setting this to false and providing the polyfill elsewhere.
        - **proxy** – This allows you to configure the development server to proxy
        unknown requests to your specified server.
        - **developMiddleware** – This is associated with usage of the proxy
        branch and allows you to configure Express middleware. The
        development server is a Node web server built using the popular
        Express library. That library offers the notion of middleware, which is basically little bits of code that can execute as part of the request servicing pipeline to do various things like parsing the request for JSON data, or log the request, and so on. This branch lets you set that
        up, if needed.
        - **mapping** – As part of Gatsby building your site, nodes are created to represent files and other important pieces of information. You may sometimes need to manipulate the mappings between the various node types, and this branch allows you to do that.

    ### **GraphQL**

    - It’s a specification of a query language (that’s what the QL means) only.
    - There are two types of Queries in Gatsby
        - Page("normal") queries and static queries
        - page queries can be dynamic by taking a variable
        - static queries cannot take variables
            - these are more prevalent and are used in specific components.
        - **try not to do dynamic queries in gatsby.**