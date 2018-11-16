# Restaurant Reviews - Stage 1 (P6)

## Description

The aim of this project was to incrementally convert a static webpage to a mobile-ready web application.That means: it is responsible (functions in mobile devices and desktop browsers), is accessible (has the right colors, is readable, is screen-reader friendly, can be used with the keyboards tab) and functions offline (has a service worker that caches files).

![Screenshot of Website in different devices](https://i.imgur.com/brOEAKq.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See **Running the tests** for notes on how to deploy the project on a live system.

### Prerequisites

#### Leaflet.js and Mapbox:

This repository uses [leafletjs](https://leafletjs.com/) with [Mapbox](https://www.mapbox.com/). You need to replace `<your MAPBOX API KEY HERE>` with a token from [Mapbox](https://www.mapbox.com/). Mapbox is free to use, and does not require any payment information.

#### Python

In this folder, start up a simple HTTP server to serve up the site files on your local computer. Python has some simple tools to do this, and you don't even need to know Python. For most people, it's already installed on your computer.

### Running the tests

In a terminal, check the version of Python you have: `python -V`. If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 9000` (or some other port, if port 8000 is already in use.) For Python 3.x, you can use `python3 -m http.server 9000`. If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.

## Deployment

With your server running, visit the site: `http://localhost:9000`.

## Things that could be improved

It is missing a 404-error image/page that informs the users if an URL has moved or does not exist.

## Authors

See CODEOWNERS.

## Distribution

Only for educational purposes.
