var allexmodulenameresolver = require('allexmodulerecognitionsync');

var specialcharsre = /[.#~!]/;
var notmodulenamecharsre = /^[^.#~!]*/;

function toHtml (link) {
  var dcmpsd = link.split(specialcharsre);
  //console.log('dcmpsd', dcmpsd, dcmpsd.length);
  if (dcmpsd.length===1) {
    return link+'.html';
  }
  if (dcmpsd.length===2) {
    if (link.indexOf('#')>=0) {
      return dcmpsd[0]+'.html#.'+dcmpsd[1];
    }
    if (link.indexOf('.')>=0) {
      return link+'.html';
    }
  }
  if (dcmpsd.length===3) {
    if (link.indexOf('#')>=0) {
      return dcmpsd[0]+'.'+dcmpsd[1]+'.html#'+dcmpsd[2];
    }
  }
}

function testForAllex (stripped) {
  var colonindex = stripped.indexOf('://'),
    protocol,
    afterprotocol,
    modulename,
    root;

  if (colonindex<0) {
    return;
  }
  protocol = stripped.slice(0, colonindex);
  if (protocol !== 'allex') {
    return;
  }
  afterprotocol = stripped.slice(colonindex+3);
  modulename = notmodulenamecharsre.exec(afterprotocol);
  if (!modulename.length) {
    return;
  }
  modulename = allexmodulenameresolver(modulename[0]).modulename;
  root = '/';
  if (env.conf && env.conf.allex && env.conf.allex.root) {
    root = env.conf.allex.root;
    if (root[root.length-1] !== '/') {
      root += '/';
    }
  }
  return {
    url: root+modulename+'/'+toHtml(afterprotocol),
    linkText: afterprotocol
  };
}

module.exports = testForAllex;
