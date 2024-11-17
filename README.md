# SAPUI5/OpenUI5 JSONOModel

**!!! Just experimental, not battle tested !!!**

## Overview

Experimental JSON-based model using JS Proxy for state observation (will not work in IE).

## Idea

In UI5 the standard JSON Model can be set as "observable".

_The observation feature is experimental! When observation is activated, the application can directly change the JS objects without the need to call setData, setProperty or refresh. Observation does only work for existing properties in the JSON, it cannot detect new properties or new array entries._

So in short you pass an object and later work only with this object, without calling setProperty etc. and changes are reflected in bindings and UI fields.

```javascript
const dataObject = {
  someValue: "aabb",
};

const standardJSONModel = new JSONModel(dataObject, true);

this.getView().setModel(standardJSONModel, "standardJSON");

// later in code
dataObject.someValue = "newValue";
// newValue visible in the UI
```

JSONOModel is similar however handles new properties and new array items. It is based on JSON Model and can be used in a similar way.

## Usage

The only thing to remember is to get back and use a reference to the model data object after passing it to JSONOModel and work with this new, proxied reference.

```typescript
const dataObject = {
  someValue: ["a", "b"],
};

let simpleJSONOModel = new JSONOModel(dataObject);
this.getView().setModel(simpleJSONOModel, "simpleJSONOModel");
simpleJSONOModel = simpleJSONOModel.getData();
// later in code, new array values will be reflected in UI (as well as new properties), see sample app
dataObject.someValue.push("c");
```

Model data as a separate class (file model/AppViewModel.ts)

```typescript
export class AppViewModel {
  public getNameCounter = 0;

  private _name = "Bonifatzy";
  public address = { street: "3 Piggys Aveanue" };

  public description: { personality: string } = {
    personality: "Nervous",
  };

  public favorites = [
    { label: "French Fries", category: "Food" },
    { label: "Rubik Cube", category: "Hobby" },
  ];

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this.getNameCounter++;

    if (this.getNameCounter > 2) {
      throw new Error("You can't update more than 2 times");
    }

    this._name = name;
  }
}
```

In the controller:

```typescript
const separateJSONOModel = new JSONOModel(new AppViewModel());
this.getView().setModel(separateJSONOModel, "separateJSONOModel");
this.appViewModel = separateJSONOModel.getData();
```

Two hooks are provided and will be called if you configure them:

```typescript
new JSONOModel(new AppViewModel(), {
  callOnAnyGet: true,
  callOnAnySet: true,
});
```

Methods will be called if present in the object:

```typescript
public onAnyGet(propertyKey: string): void {
  console.log(`Property ${propertyKey} was read`);
}

public onAnySet(propertyKey: string): void {
  console.log(`Property ${propertyKey} was set`);
}
```

## Sample

Run _npm install_ && _npm start_ to play with examples and comparison.

## License

This plugin is licensed under the MIT license.

## Author

Feel free to contact me:

wozjac@zoho.com

Bluesky (<https://jacekwoz.bsky.social>)

LinkedIn (<https://www.linkedin.com/in/jacek-wznk>)
