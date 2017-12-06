'use strict';
const got = require('gh-got');

const PER_PAGE = 100;

module.exports = (username, {token = '', order = 'DESC'} = {}) => {
	if (typeof username !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof username}`);
	}
	if (order !== 'DESC' && order !== 'ASC') {
		throw new TypeError(`Expected a ASC|DESC, got ${order}`);
	}
	return new Promise((resolve, reject) => {
		got(`users/${username}`, {token})
		.then(res => {
			const {body} = res;
			const totalPages = Math.ceil(body.public_repos / PER_PAGE);
			return {
				totalPages
			};
		})
		.then(({totalPages}) => {
			const urlToFetch = [];
			for (let i = 1; i <= totalPages; i += 1) {
				urlToFetch.push(got(`users/${username}/repos?per_page=${PER_PAGE}&page=${i}`));
			}
			return Promise.all(urlToFetch);
		})
		.then(gotPromises => {
			let arr = [];
			gotPromises.forEach(element => {
				arr.push(element.body);
			});
			arr = arr.reduce((a, b) => [...a, ...b], []);
			return arr;
		})
		.then(repos => {
			repos.sort((a, b) => a.stargazers_count > b.stargazers_count ? 1 : -1);
			if (order === 'DESC') {
				resolve(repos.reverse());
			} else if (order === 'ASC') {
				resolve(repos);
			}
			reject(new Error('Invalid Order.'));
		})
		.catch(err => {
			console.log(err);
		});
	});
};
