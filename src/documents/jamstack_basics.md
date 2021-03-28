---
slug: "/documents/jamstack_basics"
date: "2021-03-28"
title: "Basic Jamstac"
id: "9994"
---

# Pros and Cons of JAMstack

- Advantages of JAMstack
    - scalability - A JAMstack app doesnt require a server to run
        - hosted easily and cheaply on CDNs.
        - light in terms of resources on the server side of the equation.
        - JAMstack offers "serverless" setup - you don't have to concern yourself with the infrastructure involved in hosting your website, someone else does that for you.
    - Cost - JAMstack sites usually require far less delivery-side resources in terms of servers and databases and such.
        - hosting them is cheaper.
        - varies depending on what the website must do to function(typically true)
    - Security - Much of the exploits suffered by websites these days are due to flaws on the server side.
        - there is a whole class of exploits that are client-side in nature.
        - Mitigates the issue of Cross-site scripting by not generating HTML pages on the fly.
        - JAMstack sites are almost always more secure than are non-JAMstack sites.
        - JAMstack reduces the attack surface of your app.
    - Performance - performance is significantly better on the JAMstack than on more server-bound applications.
        - Note: depends on the client performing well as well(true regardless of jamstack).
        - What the server has to do is essentially eliminated and performance will increase because of that.
        - JAMstack boasts an almost instantaneous time-to-first-byte advantage over more traditional server-based architectures.
    - Developer Experience - most developers that work with JAMstack for even a little while will inevitably tell you that things are just simpler and more straightforward for them.
        - Client side doesn't change(since it's static content when served)
        - eliminates a lot of questions from the debugging cycle.
        - Easier to comprehend the "bigger picture"
            - build and hosting concerns are decoupled
            - developers do not need to figure out when content gets rendered, what renders it, and when content gets rendered.
            - since content is not put together in realtime, it is easier to understand for a developer.
        - 
    - SEO - JAMstack websites are just static content. Static content is much easier for SE spiders to crawl and index(better SEO value)
        - still have work to do to make sure the right terms make it into the index.
        - dynamically rendered sites present challenges to indexers that a purely static-content site doesn't
- Disadvantages of JAMstack
    - Developers are required - a developer must be involved for any content update because it involves rebuilding the entire site.
        - developers aren't cheap
        - someone who knows what they are doing needs to be there.
    - Update frequency - JAMstack isn't a great choice when you're dealing with a website that needs to be updated frequently.
        - JAMstack would be bad for news sites.
        - Bad when you want content creators to be able to upload content directly to the system in some fashion.
        - server based approaches would be better here.
    - Steep Learning Curve - "highly debatable". Some perceive a steep learning curve to JAMstack.
        - Most people anticipate JAMstack to be something that it is not and as a result have a hard time with it.
- Misconception(s) about JAMstack
    - people think JAMstack websites can't be dynamic.
    - They are dynamic through the A in JAMstack.
    - You can make AJAX requests after the page is loaded to get some data back