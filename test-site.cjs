// Run with: node test-site.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const listeners = {};
const element = (id) => ({
  value: '6', textContent: '', disabled: false,
  addEventListener: (event, fn) => { listeners[`${id}:${event}`] = fn; },
  setAttribute(name, value) { this[name] = value; },
});
const elements = Object.fromEntries(['#budget', '#budget-value', '#motion'].map(id => [id, element(id)]));
const properties = {};
const classes = new Set();
const preference = { matches: false, addEventListener: (_, fn) => { listeners.preference = fn; } };
vm.runInNewContext(fs.readFileSync('script.js', 'utf8'), {
  document: {
    querySelector: id => elements[id],
    documentElement: { style: { setProperty: (key, value) => { properties[key] = value; } } },
    body: { classList: { contains: key => classes.has(key), toggle: key => {
      if (classes.has(key)) { classes.delete(key); return false; }
      classes.add(key); return true;
    } } },
  },
  window: { matchMedia: () => preference },
});
for (const [steps, label, width] of [[1, '1 step', 100 / 9], [9, '9 steps', 100]]) {
  elements['#budget'].value = String(steps);
  listeners['#budget:input']();
  assert.equal(elements['#budget-value'].textContent, label);
  assert.ok(Math.abs(parseFloat(properties['--budget']) - width) < 1e-9);
}
listeners['#motion:click']();
assert.equal(elements['#motion']['aria-pressed'], 'true');
assert.ok(classes.has('paused'));
preference.matches = true;
listeners.preference();
assert.equal(elements['#motion'].disabled, true);
assert.equal(elements['#motion'].textContent, 'Reduced motion enabled');
preference.matches = false;
listeners.preference();
assert.equal(elements['#motion'].textContent, 'Resume animations');
listeners['#motion:click']();
assert.equal(elements['#motion']['aria-pressed'], 'false');
const html = fs.readFileSync('index.html', 'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"#:]+)"/g)) {
  if (!/^https?:/.test(match[1])) assert.ok(fs.existsSync(match[1]), `Missing ${match[1]}`);
}
for (const id of ['abstract', 'method', 'statistics', 'results', 'sim-to-real', 'conclusion', 'outlook']) {
  assert.ok(html.includes(`id="${id}"`), `Missing section ${id}`);
}
console.log('Budget endpoints, pause/resume, motion preference, assets and sections pass.');
