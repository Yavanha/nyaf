## Forms Module

Forms provide these basic features:

* UI control decorators (example: `@Hidden()` to suppress a property in a dynamic table).
* Validation decorators (example: `@MinLength(50)` or `@Required()` to manage form validation).
* Data Binding using a model declaration decorator called `@ViewModel` and a bind attribute named `n-bind`.

Form validation is a key part of any project. However, CSS frameworks require different strategies to handle errors and so on. Hence, the ****ny@f**/forms** library provides a simple way (just like a skeleton) to give you the direction, but the actual validation implementation logic is up to you to build.

Same for the UI decorators. It's a convenient way to add hidden properties to viewmodels. There is no logic to read these values, this is up to you to implement this. However, the decorators makes your life a lot easier.

The binding logic is almost complete and once you have a decorated model it's syncing the UI automagically.

### How it Works

For full support you need view models, the registration on top of the component, and access to the model binder.

1. View models are plain TypeScript classes with public properties enhanced by decorators.
2. The registration with the decorator `@ViewModel()` on top of the component's class.
3. The modelbinder comes through implementing the interface `IModel<ViewModelType>`.

### View Models in Components

For a nice looking view some decorators applied to class properties control the appearance. Use the decorator `@ViewModel<T>(T)` to define the model. The generic is the type, the constructor parameter defines the default values (it's **mandatory**). To get access to the model binder, just implement the interface `IModel` as show below:

~~~ts
export class Model {
  @Hidden()
  id: number = 0;

  @Required()
  name: string = '';
}

@CustomElement('app-main')
@ViewModel<Model>(Model)
export class MainComponent
        extends BaseComponent<{}>
        implements IModel<Model> {
  // ... omitted for brevity
}
~~~

Within the component, the model binder is present through the property `this.model`. That's the only property and it's added automatically by the decorator. The interface just helps the TypeScript transpiler to understand tha property exists.

~~~ts
this.model. ...// do something with it
~~~

An actual object is already assigned to the property by a so called model binder. At any time, in the constructor, in load life cycle, or anytime later on user action you can add a new model if you need. That's a rare condition, though. Use this code, then:

~~~ts
this.model.scope = new Model();
~~~

However, the `@ViewModel` decorator is doing exactly this for you, so in case of a new blank instance there is no need to assign a new object to the *scope* property.

It's not necessary to keep a reference to the instance, the model binder is doing this internally for you. The derived class is a `Proxy`. If you now bind the properties using `n-bind` as described below, the model is in sync with the user interface. If you want to programmatically access the current state, just retrieve the model:

~~~ts
let userName: string = this.model.scope.userName;
~~~

If you wish to access the `Proxy` at any time in code or not using the binding in templates, this would be sufficient:

~~~ts
private modelProxy: Model;

constructor() {
  super();
  this.modelProxy = this.model.scope;
}
~~~

The setter of `scope` takes an instance, wraps this into a `Proxy`, assigns the binders, and the getter returns the `Proxy`. Changes to the model will now reflect in bound HTML elements immediately.

~~~ts
let userName: string = 'Test';
this.model.scope.userName = userName; // immediately invoke binders
~~~

