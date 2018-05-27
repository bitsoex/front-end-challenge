# BITSO FRONT-END CHALLENGE

![Front End Challenge Image](https://github.com/bitsoex/front-end-challenge/blob/master/bann_bfec.jpg)


## Prerequisites

- npm 5.5.1 or higher
- [less](https://github.com/less/less.js) if you wanna compiler less
## Installation


Install the necessary packets:

```bash
npm install
```

To run in a local server [http://localhost:3000/](http://localhost:3000/)

```bash
npm start
```

## Compile less
Just go to the path /src/ and run:

```bash
lessc less/wireframe.main.less styles.css
```

## General information
I developed the challenge using two tecnologies [ReactiveX for Javascript][rxjs] and [Redux-Observable][rdx] because both library can be integrated to generate a reactive application. The asynchronous programming allow us understand and write how the data streams and the propagation of change, integrated with redux for flow the data to the components who need to know the change.
With Rxjs we can write amazing codes for async events, we have many of methods to do more fun to handle concurrency, async methods, user actions, etc.






## Troubleshooting
If you have problems to run on Chrome Windows can run execute:

```bash
chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
```

or on OSX, open Terminal and run
```bash
open -a Google\ Chrome --args --disable-web-security --user-data-dir
```

## Prototype Wireframe 
![Wireframe - Image](https://github.com/amars84/front-end-challenge/blob/master/Assets/wireframe-bitso.png)



[rdx]: https://github.com/reduxjs/redux
[rxjs]: http://reactivex.io/intro.html