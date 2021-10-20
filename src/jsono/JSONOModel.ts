/* eslint-disable */
import JSONModel from "sap/ui/model/json/JSONModel";

export class JSONOModel extends JSONModel {
  constructor(dataObject: any) {
    super();
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
          return new Proxy(target[propertyKey], interceptor);
        } else if (typeof target[propertyKey] !== "undefined") {
          return Reflect.get(target, propertyKey, receiver);
        }
      },

      set(target: any, propertyKey: string, value: any, receiver: any): any {
        const result = Reflect.set(target, propertyKey, value, receiver);
        self.checkUpdate();
        return result;
      },
    };

    return new Proxy(dataObject, interceptor);
  }
}
