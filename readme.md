# gh-star-repos [![Build Status](https://travis-ci.org/progrmoiz/gh-star-repos.svg?branch=master)](https://travis-ci.org/progrmoiz/gh-star-repos)

> Github user repo by star


## Install

```
$ npm install gh-star-repos
```


## Usage

```js
const ghStarRepos = require('gh-star-repos');

ghStarRepos('progrmoiz').then(repos => {
	repos.forEach(repo => {
		// repo object: https://api.github.com/users/:user/repos single item
		console.log(repo.name, repo.stargazers_count);
	});
	// python-snippets 172
	// simple-blockchain-implementation 3
	// wiki-viewer 2
	// knockoutjs-twitch-status 2
	// more item...
});
```


## API

### ghStarRepos(username, [opts])

#### username

Type: `string`

#### opts

##### token

Type: `string`<br>
Default: `''`

##### order

Type: `string`<br>
Posible Values: `'DESC'|'ASC'`
Default: `'DESC'`

## License

MIT © [Moiz](https://github.com/progrmoiz)
