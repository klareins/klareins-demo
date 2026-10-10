/* Universal, undirected demo links. Business assignments stay on the records. */
(function (root) {
  'use strict';
  const key = (kind, id) => `${kind}:${id}`;
  const pair = (a, b) => [a, b].sort().join('|');
  const normalize = value => String(value ?? '').toLocaleLowerCase('de')
    .replace(/ä|ae/g, 'a').replace(/ö|oe/g, 'o').replace(/ü|ue/g, 'u')
    .replace(/ß/g, 'ss').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const tokenize = value => normalize(value).split(/[^a-z0-9@.]+/).filter(Boolean);
  function score(text, title, query) {
    const tokens = tokenize(query), hay = normalize(text), name = normalize(title);
    if (!tokens.every(token => hay.includes(token))) return -1;
    return tokens.reduce((n, token) => n + (name === token ? 100 : name.startsWith(token) ? 40 : name.includes(token) ? 20 : 1), 0);
  }
  function has(links, a, b) { return links.some(link => pair(link.a, link.b) === pair(a, b)); }
  function add(links, a, b, description = '') {
    if (a === b || has(links, a, b)) return false;
    links.push({ a, b, description: description.trim().slice(0, 160) });
    return true;
  }
  function remove(links, a, b) { return links.filter(link => pair(link.a, link.b) !== pair(a, b)); }
  const api = { key, pair, normalize, tokenize, score, has, add, remove };
  if (typeof module !== 'undefined') module.exports = api;
  root.KLAREINS_LINKS = api;
})(typeof window === 'undefined' ? globalThis : window);
