
>  HTML Sitemap plugin for Assemble

Register the plugin with Assemble:

```js
assemble: {
  options: {
    plugins: ['grunt-assemble-html-sitemap', 'other/plugins/*']
  }
}
```

Visit the [plugins docs](http://assemble.io/plugins/) for more info or for help getting started.


## dest

Type: `String`

Default: `undefined`

Sitemap destination. If not set, fallback to assemble destination.

## homepage

Type: `String`

Default: `homepage` (from package.json)

Site URL

## exclusions

Type: `Array`

Default: `['404']`

Pages to omit from the sitemap.

```js
options: {
  sitemap: {
    exclusions: ["foo", "bar"],
  },
  files: {
    ...
  }
}
```

## relativedest

Type: `String` / `Boolean`

Default: `false`

Path to which the URLs in Sitemap and Robots should be relative to. `true` is equal to the destination path `dest` and `false` is equal to the root directory.

## Usage Examples

## Simple

To simplify might do something like:

```js
assemble: {
  blog: {
    options: {
      plugins: ['grunt-assemble-html-sitemap'],
    },
    files: {
      './blog/': ['./templates/blog/*.hbs']
    }
  }
}
```

## Result

```js
./blog/sitemap.html
```

## Advanced

```js
assemble: {
  blog: {
    options: {
      plugins: ['grunt-assemble-html-sitemap'],
      htmlSitemap: {
        homepage: 'http://assemble.io',
            exclude: ['50x', 'foo']
      }
    },
    files: {
      './blog/': ['./templates/blog/*.hbs']
    }
  }
}
```

## Result

```js
./blog/sitemap.html
```

## Roadmap
- Use Layout tempalte from site
- Check for page title

## Author

**Ashley Hitchcock**

+ [github/ashhitch](https://github.com/ashhitch)
+ [twitter/ash_hitchcock](http://twitter.com/ash_hitchcock)
+ [ashleyhitchcock.co.uk](http:/www.ashleyhitchcock.co.uk)

## License

Copyright © 2016 Ashley Hitchcock
Released under the MIT license.

## Credits
Based on the XML plugin:
+ [grunt-assemble-sitemap] https://github.com/assemble/grunt-assemble-sitemap
