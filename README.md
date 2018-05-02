# Embed SVGs

Takes an object with nested objects containing links to svgs, then retreives the contents of each svg and returns a new object. This is useful when you need to change svg properties or animate them.

Can be used in Node and Browser environments. `embedSvgs` is an async function, so use accordingly.

## Install

```
yarn add embed-svgs
```

OR

```
npm install embed-svgs
```

## Import & Usage

```
import embedSvgs from 'embed-svgs'
...
const dataWithEmbededSvgs = await embedSvgs(data, el, urlKey)
```

### Parameters

The default

1.  `data`:

* The data object that contains nested object(s) that match `el` (and it's nexted url property, `urlKey`).

2.  `el`

* The name of the nested object that contains the url (`urlKey`) to an svg
* Has a default value of `icon`
* Example

```
  {
  ...
    "icon": {
      "url": ...
    }
  ...
  }
```

3.  `urlKey`

* The key that contains the url value for an svg
* Has a default value of `url`

## Use case

You have a static site generator that pulls down all of your data during build. It gets this data from a CMS, where a user/client is able to upload SVGs as images (upposed to SVG markup – that's a poor user experience).

On the frontend you need the SVG markup (to change color, animate, etc.), and you're using a modern library like React and don't want to have to query the DOM for each view/page/component to get SVGs.

`embedSvgs` allows you to crawl all that data, fetch all the SVGs, and add an SVG property onto it's parent object. Then the SVG markup is ready for use in your components.
