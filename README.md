So I wound up getting locked out of the CoinAPI service till midnight UTC. I did try registering a new account though they were smarter than that and other tokens did not work.

The application visualisations however were working before I was locked out and should render given an API response though I have not had a chance to test my latest updates. I've also used `localforage` to save the data to local storage to avoid the issue again.

## Installation and Setup

Run `yarn install` from the root and finally `yarn start` to run the dev server and compile the application.

Tests can be run with `yarn test`. I've used Snapshot tests which were quick to implement with high coverage, with `enzyme` shallow rendering to confine them to units.

## Other
I started out with `react-vis` a react/d3 module from Uber that I was interested in trying out. 
Whilst I made progress rendering candlesticks, I wound up going with `react-stockcharts` for an easier implementation.

Conforms to `eslint-config-airbnb` eslint rules. If you feel like downloading the `Code Spell Checker` plugin for vsCode I use that too and have extended the dictionary in the .vscode folder settings.

I've implemented `localforage` to save the fetched data to local storage to avoid being locked out again.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
