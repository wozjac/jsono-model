import Controller from "sap/ui/core/mvc/Controller";
import AppComponent from "../Component";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
import { JSONOModel } from "../jsono/JSONOModel";
import { AppViewModel } from "../model/AppViewModel";
import MessageBox from "sap/m/MessageBox";

interface Favorite {
  label: string;
  category: string;
}

interface ModelData {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  address: any;
  favorites: Favorite[];
  description: {
    personality: string;
  };
}

/**
 * @namespace jwozniczak.io.jsonomodel.controller
 */
export default class AppController extends Controller {
  private dataForStandardJSONModel: ModelData = {
    name: "Bonifatzy",
    address: { street: "3 Piggys Aveanue" },
    favorites: [
      { label: "French Fries", category: "Food" },
      { label: "Rubik Cube", category: "Hobby" },
    ],
    description: {
      personality: "Nervous",
    },
  };

  private dataForSimpleJSONOModel: ModelData = {
    name: "Bonifatzy",
    address: { street: "3 Piggys Aveanue" },
    favorites: [
      { label: "French Fries", category: "Food" },
      { label: "Rubik Cube", category: "Hobby" },
    ],
    description: {
      personality: "Nervous",
    },
  };

  private appViewModel: AppViewModel;

  public onInit(): void {
    this.getView().addStyleClass(
      (this.getOwnerComponent() as AppComponent).getContentDensityClass()
    );

    // STANDARD JSON MODEL
    const standardJSONModel = new JSONModel(
      this.dataForStandardJSONModel,
      true
    );

    this.getView().setModel(standardJSONModel, "standardJSON");

    // JSONO Model (SIMPLE)
    const simpleJSONOModel = new JSONOModel(this.dataForSimpleJSONOModel);
    this.getView().setModel(simpleJSONOModel, "simpleJSONOModel");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.dataForSimpleJSONOModel = simpleJSONOModel.getData();

    // JSONO Model from a separate file with property methods
    const separateJSONOModel = new JSONOModel(new AppViewModel(), {
      callOnAnyGet: false,
      callOnAnySet: true,
    });

    this.getView().setModel(separateJSONOModel, "separateJSONOModel");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.appViewModel = separateJSONOModel.getData();
  }

  // STANDARD JSON MODEL EVENT HANDLERS
  public onPressUpdateNameForStandard(): void {
    this.dataForStandardJSONModel.name =
      this.dataForStandardJSONModel.name === "Fibonacci"
        ? "Bonifatzy"
        : "Fibonacci";

    MessageToast.show("It works");
  }

  public onPressAddCityForStandard(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.dataForStandardJSONModel.address.city = "Atlantis";

    MessageToast.show(
      "A property was added to JSON data object (address.city), but it is not reflected in the UI field..."
    );
  }

  public onPressDisplayPersonalityForStandard(): void {
    MessageToast.show(this.dataForStandardJSONModel.description.personality);
  }

  onPressUpdateArrayForStandard(): void {
    this.dataForStandardJSONModel.favorites[0].label =
      this.dataForStandardJSONModel.favorites[0].label === "Strawberries"
        ? "French Fries"
        : "Strawberries";

    MessageToast.show("It works");
  }

  public onPressAddToArrayForStandard(): void {
    this.dataForStandardJSONModel.favorites.push({
      label: "Pancakes",
      category: "Food",
    });

    MessageToast.show(
      "'Pancakes' item was added to the data object array, but it is not reflected in the table"
    );
  }

  public onPressRemoveFromArrayForStandard(): void {
    this.dataForStandardJSONModel.favorites.shift();

    MessageToast.show(
      "The first item in the data object array was removed, strange things happen"
    );
  }

  // JSONO MODEL (SIMPLE) EVENT HANDLERS
  public onPressUpdateNameForSimpleJSONO(): void {
    this.dataForSimpleJSONOModel.name =
      this.dataForSimpleJSONOModel.name === "Fibonacci"
        ? "Bonifatzy"
        : "Fibonacci";

    MessageToast.show("It works");
  }

  public onPressAddCityForSimpleJSONO(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.dataForSimpleJSONOModel.address.city = "Atlantis";

    MessageToast.show(
      "A property was added to JSON data object (address.city), it is reflected in the UI field..."
    );
  }

  public onPressDisplayPersonalityForSimpleJSONO(): void {
    MessageToast.show(this.dataForSimpleJSONOModel.description.personality);
  }

  onPressUpdateArrayForSimpleJSONO(): void {
    this.dataForSimpleJSONOModel.favorites[0].label =
      this.dataForSimpleJSONOModel.favorites[0].label === "Strawberries"
        ? "French Fries"
        : "Strawberries";

    MessageToast.show("It works");
  }

  public onPressAddToArrayForSimpleJSONO(): void {
    this.dataForSimpleJSONOModel.favorites.push({
      label: "Pancakes",
      category: "Food",
    });

    MessageToast.show(
      "'Pancakes' item was added to the data object array, it is reflected in the table"
    );
  }

  public onPressRemoveFromArrayForSimpleJSONO(): void {
    this.dataForSimpleJSONOModel.favorites.shift();

    MessageToast.show(
      "The first item in the data object array was removed, it is reflected in the table"
    );
  }

  // JSONO MODEL (FROM A SEPARATE FILE) EVENT HANDLERS
  public onPressUpdateNameForSeparateJSONO(): void {
    try {
      this.appViewModel.name =
        this.appViewModel.name === "Fibonacci" ? "Bonifatzy" : "Fibonacci";

      MessageToast.show(
        `It works. get name() method was called which and counter increased to ${this.appViewModel.getNameCounter}` +
          ` set name() method was called too (try to update 3 times)`
      );
    } catch (error) {
      MessageBox.error((error as Error).message);
    }
  }

  public onPressAddCityForSeparateJSONO(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.appViewModel.address.city = "Atlantis";

    MessageToast.show(
      "A property was added to JSON data object (address.city), it is reflected in the UI field..."
    );
  }

  public onPressDisplayPersonalityForSeparateJSONO(): void {
    MessageToast.show(this.appViewModel.description.personality);
  }

  onPressUpdateArrayForSeparateJSONO(): void {
    this.appViewModel.favorites[0].label =
      this.appViewModel.favorites[0].label === "Strawberries"
        ? "French Fries"
        : "Strawberries";

    MessageToast.show("It works");
  }

  public onPressAddToArrayForSeparateJSONO(): void {
    this.appViewModel.favorites.push({
      label: "Pancakes",
      category: "Food",
    });

    MessageToast.show(
      "'Pancakes' item was added to the data object array, it is reflected in the table"
    );
  }

  public onPressRemoveFromArrayForSeparateJSONO(): void {
    this.appViewModel.favorites.shift();

    MessageToast.show(
      "The first item in the data object array was removed, it is reflected in the table"
    );
  }
}
