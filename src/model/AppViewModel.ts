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

  public onAnyGet(propertyKey: string): void {
    console.log(`Property ${propertyKey} was read`);
  }

  public onAnySet(propertyKey: string): void {
    console.log(`Property ${propertyKey} was set`);
  }

  public onNameSet(): void {
    console.log("Name was changed");
  }

  public onNameGet(): void {
    console.log("Name was read");
  }
}
