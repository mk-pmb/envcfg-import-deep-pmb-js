import 'usnam-pmb';
import assert from 'assert';

import envcfgImportDeep from '..';

const importOpts = {
  inplace: true,
  ifPrefixProp: 'envOvrPrefix',
  env: {
    foo_bar: 122,
    test_foo_bar: 133,
    bar: 144,
  },
};


function test(envOvrPrefix, expectedBar) {
  const cfg = {
    foo: { bar: 111 },
    envOvrPrefix,
  };
  const result = envcfgImportDeep(cfg, importOpts);
  assert.strictEqual(result, cfg);
  assert.deepStrictEqual(cfg, {
    foo: { bar: expectedBar  },
    envOvrPrefix,
  });
};


test(false, 111);
test('', 111);
test('foo_', 111);
test('test_', 133);






console.log('+OK ifPrefixProp test passed.');
