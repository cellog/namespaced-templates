#Namespaced Templates for Meteor Spacebars

This is a meteor package, which can be installed via

> meteor add cellog:namespaced-templates

that provides directory-based naming of spacebars templates.  This allows two templates with
the same name in different directories to exist, with the ability to easily change to another
template.  This allows quick switching between template trees and even "sub-classing" template
trees to allow using a large template tree and replace a small portion of the tree.

##How to declare namespaced templates

Your namespaced templates must have a file extension of `.ns.html` and be in the spacebars
templating language.

###Requirements

All namespaced templates must be declared using double quotes for attributes as in:

```html
<template name="templatename">
```

and never with single quotes:

```html
<template name='templatename'>
```

##What is a namespaced template?

If a file is in `client/views/fancytemplate/mine.ns.html` and declares:

```html
<template name="mine">
Mine template
</template>
```

This will be compiled into `client/views/fancytemplate/mine.html` like this:

```html
<template name="fancytemplate_mine">
Mine template
</template>
```

A second template can be created in `client/views/another/mine.ns.html`

```html
<template name="mine">
Another template
</template>
```

This will be compiled into `client/views/another/mine.html` like this:

```html
<template name="another_mine">
Another template
</template>
```

##How do I reference a namespaced template?

You should reference a namespaced template using the `{{>>templatename}}` operator

If a file is in `client/views/fancytemplate/mine.ns.html` and declares:

```html
<template name="mine">
${{>mine_subtemplate arg1name=arg1 arg2name="arg2"}}
</template>
```

This will compile into:

```html
<template name="fancytemplate_mine">
{{>___goto __template__="mine_subtemplate" arg1name=arg1 arg2name="arg2"}}
</template>
```

`___goto` is a global helper that dynamically determines the template to include based on
the current template path and calls it using `Template.dynamic`, any arguments you pass will become the template's context

###Template helpers and events

You will need to declare template helpers and events as before, with the full path to the template.
Thus for the fancytemplate mine template:

```Javascript
Template.fancytemplate_mine.helpers({
  helper1: function(){/*...*/}
})

Template.fancytemplate_mine.events({
  'click #thing': function(e) {/*...*/}
})
```

###Template path

The template path can be set in your top-level template using this simple helper:

```html
<template name="body">
{{set_template_path "fancytemplate:another"}}
</template>
```

This is used to resolve the templates.  With this template:

```html
<template name="mine">
${{>subtemplate}}
</template>
```

if template `fancytemplate_subtemplate` exists, it will be used.
If it doesn't, then if template `another_subtemplate` exists, it will be used.  Finally, if neither exists, then
`subtemplate` will be called.  If this template does not exist, an exception will be raised.

In this manner, default templates can be provided for widgets, and multiple template trees can be constructed.

##Example

If a website is in the development stage, and multiple designs are being considered, it can cut down time to have
the agility to quickly substitute a template in the middle of the design tree, but be able to switch back and forth
to compare the differences.

For example, a page visualizing a short list of items might choose to visualize them as a simple list, or as a graphical
representation, but both should click through to the same display of individual items.  You can create a top-level template
like this:

in file `client/views/main/index.ns.html`
```html
<template name="index">
<h1>List of things</h1>
  ${{>things}}
</template>
```

in file `client/views/main/things.ns.html`
```html
<template name="things">
<ul>
  {{#each things}}
  <li id="{{this.id}}">{{this.summary}}</li>
  {{#each}}
<ul>
</template>
```

To add the ability to display each thing graphically, all we need to do is create a new template.

in file `client/views/graphical/things.ns.html`
```html
<template name="things">
<svg id="thingsvg">{{#each things}}{{dosvg this}}{{/each}}</svg>
</template>
```

Then in our primary template:

```html
<template name="body">
{{set_template_path "graphical:main"}}
</template>
```

This will display the graphical template instead of the list template, assuming we have a template helper
named `dosvg` defined as follows:

```Javascript
Template.graphical_things.helpers({
  dosvg: function(thing) {
    // generate svg and return it
  }
})
```

To switch back to displaying the list template, simply change the template path to:


```html
<template name="body">
{{set_template_path "main:graphical"}}
</template>
```

or remove the template path.

##Future road map

Currently, the code to parse .ns.html is a copy/paste of the template parsing code from meteor spacebars.  It would be
best if meteor provides a way to grab this without copy/paste that is not documented yet.  If so, this will be used.