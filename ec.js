/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

function envcfgImportDeep(cfg, opt) {
  if (!opt) { opt = false; }
  if (!cfg) { return cfg; }
  var copy = (opt.inplace !== true), sep = (opt.sep || '_'),
    env = (opt.env || process.env), envPrefix = opt.prefix;
  if (opt.ifPrefixProp) {
    envPrefix = cfg[opt.ifPrefixProp];
    if (!envPrefix) { return cfg; }
  }
  function scan(obj, pfx) {
    var modified = (copy ? null : obj);
    Object.keys(obj).forEach(function (key) {
      var val = obj[key], t = (val && typeof val), upd;
      if (t === 'object') {
        upd = scan(val, pfx + key + sep);
      } else {
        upd = env[pfx + key];
        if (!upd) { return; }
        upd = String(upd || '');
        if (upd.slice(0, 1) === '%') {
          upd = decodeURIComponent(upd.slice(1));
        }
      }
      switch (t) {
      case 'object':
        break;
      case 0:
      case 'number':
        upd = +upd;
        break;
      case false:
      case 'boolean':
        upd = upd.toLowerCase();
        upd = ((upd === '1')
          || (upd === '+')
          || (upd === 'on')
          || (upd === 'yes')
          || (upd === 'true')
          );
        break;
      }
      if (upd === val) { return; }
      if (!modified) {
        modified = ((Array.isArray(obj) && [])
          || {});
        Object.assign(modified, obj);
      }
      modified[key] = upd;
    });
    return (modified || obj);
  }
  return scan(cfg, (envPrefix || ''));
}

module.exports = envcfgImportDeep;
