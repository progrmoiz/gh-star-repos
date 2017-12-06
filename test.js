import test from 'ava';
import m from '.';

test('username error checking', t => {
	const err = t.throws(() => {
		m(123);
	}, TypeError);
	t.is(err.message, 'Expected a string, got number');
});

test('opts.order error checking', t => {
	const err = t.throws(() => {
		m('progrmoiz', {order: 'ABC'});
	}, TypeError);
	t.is(err.message, 'Expected a ASC|DESC, got ABC');
});

test('return promise', t => {
	t.is(typeof m('progrmoiz').then, 'function');
});

test('fetched', async t => {
	const repos = await m('progrmoiz');
	t.is(typeof repos[0].stargazers_count, 'number');
});
