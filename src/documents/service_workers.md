---
slug: "/documents/service_workers"
date: "2021-03-28"
title: "Service Workers"
id: "9996"
---
- What is a service Worker
    - a client side programmable proxy between your web-app and the outside world.
    - it gives you fine control over network requests
        - can control caching behavior of a request.
        - example use: treat html differently from images
    - able to handle push messaging
    - type of webworker - an object that executes a script separately from the main browser thread
    - run independent of the application they are associated with and can receive messages when not active.
    - promised based - depend on two api to work effectively
        - fetch - for retrieving content across the network.
        - cache - persistent storage for application data.
            - independent from browser cache or network status
    - only available on secure networks using HTTPS
    - can be used with github pages to serve content.
- What can a service worker do
    - become idle when not in use, and restarts when next needed
    - if there is information that you need to persist and reuse, service workers can work with indexedDB databases
    - allow applications to control network requests, cache content to those requests to improve performance, provide offline access to cached content.
    - Caching uses
        - pre-cache assets during installation - cache assets when you first install a service worker.(at the core of application shell architecture)
        - fallback for offline access, using the fetch api, we can fetch requests and then modify the responses with content other than the object requested.
            - can provide alternate resources if the resources are unavailable in cache and the network is unreachable
    - Advanced features
        - Channel messaging api
            - allows service workers and web workers to communicate with each other.
            - and communicate with the host application.
            - Examples: new content notifications and updates that require user interaction
        - Notifications api
            - a way to send notifications from your app to the os' native notification system
        - Push API
            - a way for push services to send push messages to an application.
            - services can send messages at any time, even when the app is not running.
            - delivered to a service worker which can use the information in the message to update local state or display a notification to the user.
        - Background Sync
            - lets you defer actions until a user has stable connectivity.
            - ensures that what a user wants to send is actually sent.
            - also allows servers to send periodic updates to the app so that the app can update the next time it's online.
- What is the lifecycle of a service worker?
    - Visual

        ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/92bb7dd2-2a57-4376-84ba-30501d2c179e/Screen_Shot_2021-03-22_at_7.25.25_PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/92bb7dd2-2a57-4376-84ba-30501d2c179e/Screen_Shot_2021-03-22_at_7.25.25_PM.png)

    - Registration
        - tells the browser where the service worker is and to start installing it in the background.
        - example: a script in the application's entry point
        - you can attempt to register a new service worker on every time you load the application, it will only complete the registration of the service worker if the service worker is new or has been updated

        ```jsx
        if (!('serviceWorker' in navigator)) {
        	console.log('sw not supported');
        	return;
        }

        navigator.serviceWorker.register('/service-worker.js')
        	.then(registration => {
        		console.log('SW registered! Scope is:', registration.scope);
        	});
        ```

        - scope:
            - determines from which path the service worker will intercept requests.

                ```jsx
                navigator.serviceWorker.register(
                	'/service-worker.js', {
                		scope: '/app/' // can set an arbatrary scope from this and below
                	}
                );
                ```

            - default scope is the path to the service worker file and extends to all directories below it.
            - a service worker cannot have a scope above it's own path.
    - Installation
        - event happens once the browser registers a service worker.
        - triggers if there is a new service worker or if there is a byte difference between the current service worker and the previous one.

        ```jsx
        self.addEventListener('install', (event) => {
        	// do stuff during install
        	// usually a good time to cache app shell or static assets using the cache API
        	//
        });
        ```

        - if this is the first encounter with the service worker for this page, the page will transition to the activation phase.
    - Activation(good time to clean up stale data from existing caches)
        - Stage occurs after successful first installation
        - once activated, the service worker will control all pages that load within it's scope.
        - it will also intercept corresponding network requests.
        - pages open will not be under service worker's scope since the service worker was not loaded before those pages were requested.
        - to put currently open pages under service worker control you must reload the page.
        - until then, requests from this page will bypass the service worker and operate just like they normally would.
        - service workers remain operational as long as there are pages open that are dependent on that specific version. (ensures one version is running at any time).
        - **new service workers will not take over until old service workers are removed.**
        - service workers are deleted once all pages using it are closed.(allows new service workers to take control)
            - refreshing a page is not enough to remove an old service worker.
        - **you can force an activation of a new service worker by using `self.skipWaiting()`**

- Service Worker Events
    - installation and activation fire of subsequent events to which the service worker can respond.
    - types of non-functional events
        - install - prepare service worker for use by adding a cache and adding assets to it
        - activate - clean up old caches and anything associated with a previous version
    - types of functional events
        - fetch

            ```jsx
            self.addEventListener('fetch', (event) => { 
            	// returns the requested resource from the cache assuming it is there. 
            	event.respondWith(caches.match(event.request));
            });
            ```

        - (background)sync
            - later request of a one off sync.

                ```jsx
                navigator.serviceWorker.register(
                	'/service-worker.js'
                );

                navigator.serviceWorker.ready.then(swRegistration => {
                	return swRegistration.sync.register('foo')
                })

                //the service worker can listen for sync events
                ```

            - then

                ```jsx
                self.addEventListener('sync', event => {
                	if (event.tag === 'foo') {
                		event.waitUntil(doSomething());
                	}
                })
                ```

            - sync takes a promise and if it fulfills, the sync is complete, if it fails then another sync will be scheduled to retry.
                - retry syncs also wait for connectivity and employ an exponential backoff.
        - respond to push
            - initiated by backend servers through a browser's push service
            - options can be used to customize the notification

            ```jsx
            self.addEventListener('push', event => {
            	event.waitUntil(
            		self.registration.showNotification('Hello!', options);
            	);
            });
            ```

- What is the core use of service workers?
    - caching agent
    - handle network requests
    - store content for offline use
    - handle push messaging
    - navigate to the browser section to see