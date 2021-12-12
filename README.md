# wander-api

> wander-api

## Wander Repositories
* [@corupta/wander-app](https://github.com/corupta/wander-app)
* [@corupta/wander-api](https://github.com/corupta/wander-api)
* [@corupta/wander-test-dashboard](https://github.com/corupta/wander-test-dashboard)
## Swagger Docs
[https://api.wanderapp.cf/docs](https://api.wanderapp.cf/docs)

## Bugs
Unfortunately, with the final feature we develop our server limit of 50MB for source code was finished (our source code built became 51MB)
So, we tried to deploy it to aws server in the last minute and it took some time. As a result we couldn't test this feature. 
There are tiny typo bugs regarding this feature, and can be fixed by applying patch from [wander-api-after-hackathon.patch](https://gist.github.com/corupta/1fcead044b7078b83a85f98fa32c0e50) to this repo. 
They will be committed to this repo after the hackathon evaluations end. 
* To do so, download [wander-api-after-hackathon.patch](https://gist.github.com/corupta/1fcead044b7078b83a85f98fa32c0e50) to repo main folder
* Type `git apply wander-api-after-hackathon.patch`
* Now, the repo should be patched correctly.
* Patch files are git diff results obtained by `git diff` You can google it to get to know it more.

Another version (AWS one) including this patch is deployed on [https://api2.wanderapp.cf/docs](https://api2.wanderapp.cf/docs) with the new feature working as well.

## Project Description
This project is the backend service for [@corupta/wander-app](https://github.com/corupta/wander-app) Please check out its readme for more detailed info.

## Deploy
Deployed to Vercel, a free service for deploying projects. Uses AWS Lambda internally, so each concurrent API call will run in parallel.

A free cluster from MongoDB Atlas was opened and connected as DB.

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

copy .env.sample to .env and fill in correct values

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/wander-api
    npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
