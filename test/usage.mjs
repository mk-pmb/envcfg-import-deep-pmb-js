import 'usnam-pmb';
import assert from 'assert';

// ¦mjsUsageDemo¦+
import envcfgImportDeep from '../';
// ¦mjsUsageDemo¦- importPkgName

// ¦mjsUsageDemo¦+
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
// ¦mjsUsageDemo¦-







console.log('+OK usage test passed.');
