/*!
 * grunt-assemble-sitemap <https://github.com/ashhitch/grunt-assemble-html-sitemap.git>
 *
 * Copyright (c) 2016, Ashley Hitchcock.
 * Licensed under the MIT License.
 */

var jstohtml =  require('jstohtml');
var async = require('async');
var _ = require('lodash');
var path = require('path');

module.exports  = function (params, callback) {

  var assemble  = params.assemble;
  var grunt     = params.grunt;
  var pages     = assemble.options.pages;
  var options   = assemble.options.htmlSitemap || {};
  var sitemap   = [];
  var exclusion = ['404', '500', '403'];
  var pkg       = grunt.file.readJSON('package.json');

  options.homepage = options.homepage || pkg.homepage;
  options.dest = options.dest || path.dirname(pages[0].dest);

  // Only write if it actually changed.
  var write = function (file, content) {
    var msg;
    var old = grunt.file.exists(file) ? grunt.file.read(file) : '';

    if (old !== content) {
      grunt.file.write(file, content);
      msg = 'Created '.yellow + file.cyan;
    } else {
      msg = 'Keeping '.yellow + file.cyan;
    }
    return grunt.verbose.ok(msg);
  };

  // Return the relative destination if the option is enabled
  var getExternalFilePath = function (relativedest, file) {
    if(relativedest === true) {
      relativedest = options.dest;
    }
    return (relativedest ? file.dest.replace(relativedest + "/", "") : file.dest );
  };

  var url = options.homepage || '';
  var relativedest = options.relativedest;

  async.forEach(pages, function (file, next) {

    if (!_.isUndefined(options.exclude)) {
      exclusion = _.union([], exclusion, options.exclude || []);
    }

//push to array
    sitemap.push({
        t: 'li',
        c: [{
          t: 'a',
          href: url + '\\' + getExternalFilePath(relativedest, file),
            c: file.data.title || file.basename || getExternalFilePath(relativedest, file)
        }]
    });

    next();
  }, callback());

//build HTML
 var result = jstohtml([
    {
        t:'h1',
        c: 'Sitemap:'
    },
    {
        t: 'ul',
        cl: ['sitemap'],
        c: [sitemap]
    }
]);

  var sitemapDest = options.dest + '/sitemap.html';
  write(sitemapDest, result);

};

module.exports.options = {
  stage: 'render:pre:pages'
};
