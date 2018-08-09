
<!--#echo json="package.json" key="name" underline="=" -->
envcfg-import-deep-pmb
======================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Overwrite parts of your config object with env vars, trying to be smart.
<!--/#echo -->



API
---

This module exports one function:

### envcfgImportDeep(baseCfg[, opts])

`baseCfg` is your original config object.
Returns `baseCfg` if there were no modifications to be made,
or a modified copy. Tries to keep the copy as shallow as possible
while still not modifying original objects.

`opts` is an optional options object that supports these keys:

* `env`: Which dictionary to use as environment. Default: `process.env`
* `prefix`: Prefix for env vars. Default: empty string
* `sep`: What string to append to the `prefix` in addition to the
  property name when diving. Default: `'_'`
* `inplace`: If set to `true`, don't copy anything, just modify it inplace.



Magic
-----

aka "trying to be smart":

* If the original value was a number, parse the env string as a number.
* If the original value was a boolean, interpret some magic strings like
  `'on'`/`'off'`,
  `'yes'`/`'no'`,
  `'true'`/`'false'`,
  `'+'`/`'-'`  or `'0'`/`'1'`.
* If the env value starts with `'%'`, strip that and URL-decode the remainder.



Usage
-----

from [test/usage.mjs](test/usage.mjs):

<!--#include file="test/usage.mjs" transform="mjsUsageDemo1802" -->
<!--#verbatim lncnt="47" -->
```javascript
import envcfgImportDeep from 'envcfg-import-deep-pmb';
const margherita = {
  size: 'small',
  crust_style: 'thin',
  crust_cheese: false,
  toppings: {
    bacon: 0,
    basil: 1,
    mozzarella: 1,
    onion: 0,
    tomato_sauce: 1,
  },
};

const unmodified1 = envcfgImportDeep(margherita, {
  env: {}, prefix: 'pizza_' });
assert.strictEqual(unmodified1, margherita);

const envRepeatsDefaults = { size: 'small' };
const unmodified2 = envcfgImportDeep(margherita,
  { env: envRepeatsDefaults, prefix: 'pizza_' });
assert.strictEqual(unmodified2, margherita);

const baconOnionEnv = {
  pizza_crust_cheese: 'yes',
  pizza_size: 'medium',
  pizza_toppings_bacon: '3',
  pizza_toppings_mozzarella: '0',
  pizza_toppings_onion: '2',
  pizza_toppings_unsupported_key: 'see issue #1',
};
const combined = envcfgImportDeep(margherita,
  { env: baconOnionEnv, prefix: 'pizza_' });
assert.deepEqual(combined, {
  size: 'medium',
  crust_style: 'thin',
  crust_cheese: true,
  toppings: {
    bacon: 3,
    basil: 1,
    mozzarella: 0,
    onion: 2,
    tomato_sauce: 1,
  },
});
```
<!--/include-->


<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
