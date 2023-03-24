import { cacheNames, clientsClaim } from 'workbox-core'
import { registerRoute, setCatchHandler, setDefaultHandler } from 'workbox-routing'
import type { StrategyHandler } from 'workbox-strategies'
import {
    NetworkFirst,
    NetworkOnly,
    Strategy
} from 'workbox-strategies'
import type { ManifestEntry } from 'workbox-build'

/// <reference path="


// Give TypeScript the correct global.
declare let self: WorkerGlobalScope

addEventListener('install', event => {
    // https://betterprogramming.pub/how-to-run-a-proxy-server-inside-your-browser-8b96ea2ef1ea
    // https://github.com/DannyMoerkerke/swopr/blob/master/swopr.js
    console.log("SW: intalled")
    // event.waitUntil(
    //   caches.open('v1').then(cache => {
    //     return cache.addAll(thingsToCache);
    //   })
    // );
});

addEventListener("navigation", (event) => {
    console.log("Nav event: ", event)
})

addEventListener("fetch", (event) => {
    console.log("fetch event: ", event)
});
