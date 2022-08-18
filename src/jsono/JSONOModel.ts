/* eslint-disable */
import JSONModel from "sap/ui/model/json/JSONModel";

interface options {
  // call onAnyGet method? Must be defined in the dataObject passed to the JSONOModel
  callOnAnyGet?: boolean;
  // call onAnySet method?
  callOnAnySet?: boolean;
}

export class JSONOModel extends JSONModel {
  [x: string]: any;
  private _options: options;
  private proxies = new WeakMap();

  constructor(
    dataObject: any,
    options: options = {
      callOnAnyGet: false,
      callOnAnySet: false,
    }
  ) {
    super();
    this._options = options;
    const proxiedDataObject = this.makeProxyFor(dataObject);
    this.setData(proxiedDataObject);
  }

  private makeProxyFor(dataObject: any): typeof Proxy {
    const self = this;

    const interceptor = {
      get(target: any, propertyKey: string, receiver: any): any {
        if (
          !(target[propertyKey] instanceof Set) &&
          !(target[propertyKey] instanceof Map) &&
          typeof target[propertyKey] === "object" &&
          target[propertyKey] !== null
        ) {
          let proxy;

          if (self.proxies.has(target[propertyKey])) {
            proxy = self.proxies.get(target[propertyKey]);
          } else {
            proxy = new Proxy(target[propertyKey], interceptor);
            self.proxies.set(target[propertyKey], proxy);
          }

          return proxy;
        } else if (typeof target[propertyKey] !== "undefined") {
          if (
            self._options.callOnAnyGet === true &&
            typeof dataObject.onAnyGet === "function"
          ) {
            dataObject.onAnyGet(propertyKey);
          }

          return Reflect.get(target, propertyKey, receiver);
        }
      },

      set(target: any, propertyKey: string, value: any, receiver: any): any {
        const result = Reflect.set(target, propertyKey, value, receiver);

        if (
          self._options.callOnAnySet === true &&
          typeof dataObject.onAnySet === "function"
        ) {
          dataObject.onAnySet(propertyKey);
        }

        self.checkUpdate();
        return result;
      },
    };

    return new Proxy(dataObject, interceptor);
  }
}
