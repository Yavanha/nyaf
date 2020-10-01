## Components

Components are the core ingredients. You write components as classes, decorated with the decorator `CustomElement`. This defines a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components). The component must be registered, then. This is done by calling the static method `GlobalProvider.bootstrap`.

### Registration Support

To support the registration as mentioned before we use decorators. This makes it quite easy to define a component without knowing the details of the browser's API. The name is determined by `@CustomElement('my-name')`. This is mandatory. The name shall follow the common rules of Web Components, that means, it must have at least one dash '-' so there is no risk of a collision with common HTML element names.

~~~tsx
import JSX, { CustomElement } from '@nyaf/lib';

@CustomElement('app-main')
export class MainComponent extends BaseComponent<{}> {

  constructor() {
    super();
  }

  render() {
    return (
      <>
        <h1>Demo</h1>
      </>
    );
  }

}
~~~

Let's go step by step through this simple component.

First, the import includes not only the decorator, but the type `JSX` too. That's necessary, if you want to use JSX (or TSX) and let the TypeScript compiler translate the HTML syntax properly. The supporting class comes from **@nyaf/lib** and has absolutely no relation to React. It has, in some details, a different behavior compared with the JSX used in React. The import is necessary, even if there is no explicit usage in the module. Both, the TypeScript transpiler and linter (such as *TSLint*) know about this and will not complain.

Second, the component has a base class. All **@nyaf** components are derived from `HTMLElement`. Currently we don't support inheriting from other element types.

Note also the usage of a base class, which gets a generic that later controls the access to the attributes.

Now, that the component is defined, it must be registered. In a file called *main.ts* (or wherever your app is bootstrapped) call this:

~~~ts
import { GlobalProvider } from '@nyaf/lib';
import { MainComponent } from './components/main.component';

GlobalProvider.bootstrap({
  components: [MainComponent]
});
~~~

That's it, the component works now. Use it in the HTML part, usually called *.index.html*:

~~~html
<body class="container">
  <app-main></app-main>
</body>
~~~

Once you have more components, it may look like this:

~~~js
GlobalProvider.bootstrap({
  components: [
    ButtonComponent,
    TabComponent,
    TabsComponent,
    MainComponent
  ]
});
~~~

## The First Component

This section describes how to bring the component to live. I assume that you have already a typical TypeScript setup with *tsconfig.json*, *package.json*, and your favorite packer.

Create a file `main.ts` in the *src* folder that looks like this:

~~~ts
import { GlobalProvider } from '@nyaf/lib';

import { MainComponent } from './main.component';

GlobalProvider.bootstrap({
  components: [MainComponent],
});
~~~

Create file *main.component.tsx* in the same folder (It must be _*.tsx_ if you use JSX). Fill this content in:

~~~tsx
import JSX, { BaseComponent, CustomElement } from '@nyaf/lib';

@CustomElement('app-main')
export class MainComponent extends BaseComponent {

	constructor() {
		super();
	}

	render() {
		return (
			<section>
        <h2>Demo</h2>
        <p>Hello nyaf</p>
			</section>
		);
	}

}
~~~

> Watch the default import for *JSX* - this *is* required, even if there is no explicit call. The TypeScript transpiler needs this when handling JSX files. It's always `JSX`, even if we use _*.tsx_-files.

Create a file named *index.html* in the very same folder and fill it like this:

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Hello nyaf</title>
</head>
<body>
  <h1>Hello nyaf</h1>
  <app-main></app-main>
  <!-- script goes here, either by packer or manually -->
</body>
</html>
~~~

Your app starts in line 10.

Using the packer configuration you get the *index.html* file in the *./dist* folder, a bundle, and a reference to this bundle to load the script. If you pack manually or keep the scripts separately add the script tags before the closing `<body>` element.
