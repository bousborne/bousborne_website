// nhl.route.js

const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const app = express();
const nhlRoutes = express.Router();
// Require nhl model in our routes module
// let nhl = require('../models/nhl');

// Defined store route
nhlRoutes.route('/nhlpost').post(function (req, res) {
  var datatop = {}

  let nhlUrl = req.body;
  console.log("on snap we here");
  debugger
  console.log("In nhl node service. req = ", req.body);
  console.log("In nhl node service. nhlUrl = ", nhlUrl);
  // const headers = new HttpHeaders({
  //   'Access-Control-Allow-Origin': '*',
  // });
    // return this
    //   .http
    //   .get(nhlurl);
const server = 'https://statsapi.web.nhl.com/api/v1/people/8471214.json';
// var jsonRes
// var jsonRes = {};
// fetch(server, { method: 'GET' })
//     .then((res) => {
//         console.log("res = ", res)
//         return res.json()
//     })
//     .then((json) => {
//       jsonRes = json;
//         console.log("fuck ", json)
//     })
// ovi = fetch(server).then(response => {
//   if (response.ok) {
//     console.log("hi")
//     return response
//   }
//   return Promise.reject(Error('error'))
// }).catch(error => {
//   return Promise.reject(Error(error.message))
// })

//   console.log("data = ", ovi)

fetch(server)
    .then(res => {
        const dest = fs.createWriteStream('./ovi.txt');
        res.body.pipe(dest);
    });
    console.log('re = ', res.body)


    async function getGithubData()
{
  let data = await fetch('https://api.github.com/users/KrunalLathiya');
  let datatop = await data.json();
  console.log("main", datatop);
  return datatop
}

let test = getGithubData();
console.log("again = ", test);

// ********************************888

var request = require('request');
var userDetails;
function initialize() {
	// Setting URL and headers for request
	var options = {
		url: server,
		headers: {
			'User-Agent': 'request'
		}
	};
	// Return new promise
	return new Promise(function(resolve, reject) {
		// Do async job
		request.get(options, function(err, resp, body) {
			if (err) {
				reject(err);
			} else {
				resolve(JSON.parse(body));
			}
		});
	});
}

initialize().then(function(data) {
  this.userDetails = data;
	console.log("userData =", data);
});
console.log("userData2 =", this.userDetails);


// const queryParameters = ['8471214', '', ''];

// const fetchPromises = queryParameters.map(queryParam => {
//   return fetch(`https://statsapi.web.nhl.com/api/v1/people?${queryParam}`)
//     .then(response => {
//       // parse response body as JSON
//       return response.json()
//     })
//     .then(response => {
//       // extract the URL property from the response object
//       let url = response.url;
//       console.log('Response from: %s', url);
//       return url;
//     });
// });

// Promise.all(fetchPromises).then(allUrls => {
//   console.log('The return values of all requests are passed as an array:');
//   console.log(allUrls);
// }).catch(error => {
//   console.error('A call failed:');
//   console.error(error.message);
// });

// ovi = fetch(server)
//   .then(response => response.json())
//   .then(data => {
//     return data
//     console.log(data)
//   });
//   console.log("data = ", ovi)
// fetch(server)
//   .then(response => response.text())
//   .then(data => {
//     console.log(data)
//   });

// function getUsers(url) {
//   return fetch(url)
// }

// const users = getUsers(server);

// users.then(response => response.json())
//      .then(arrayOfUsers => {
//           console.log(arrayOfUsers);
//      })
//      .catch(error => {
//           // handle error
//      });

//      console.log("data = ", users)
// return jsonRes;
// const url = 'https://statsapi.web.nhl.com/api/v1/people/8471214';
// fetch(url).then(data=>{return data.json()}).then(res=>{console.log(res)})
// test = this.http.get("https://statsapi.web.nhl.com/api/v1/people/8471214")
// console.log("test output = ", test);
});

// Defined get data(index or listing) route
nhlRoutes.route('/').get(function (req, res) {
  nhlurl = 'https://statsapi.web.nhl.com/api/v1/people/8471214';
  console.log("actually getting nhl");
  const httpOptions = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  });
  // return this
  // .http
  // .get(nhlurl, httpOptions);
  // nhl.find(function (err, nhls) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   else {
  //     res.json(nhls);
  //   }
  // });
});

module.exports = nhlRoutes;