import _ from 'lodash';

// https://gist.github.com/odykyi/7c6ef7b58eecb08c7b748f1d3ee31343
// https://lodash.com/docs/4.17.5#orderBy

/**
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 36 }
];

// Sort by `user` in ascending order and by `age` in descending order.
_.orderBy(users, ['user', 'age'], ['asc', 'desc']);
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
*/

export default function pagination(items, page, limit, orderBy) {
	var page = page || 1
  var limit = limit || 100
  return !_.isArray(items) ? [] : _(items)
          .orderBy(orderBy) // sort by ascendind
          .drop((page - 1) * limit)  // page in drop function starts from 0
          .take(limit)  // item per page
          .value();
}
