export default class ProductsPageData {
  public pageTitleProducts: string;
  public productsDefaultListNameAtoZ: string[] = [];
  public productsListNameZtoA: string[] = [];
  public productsListPriceLowToHigh: string[] = [];
  public productsListPriceHighToLow: string[] = [];
  public dropdownOptions: string[] = [];

  constructor() {
    this.pageTitleProducts = "Products";
    this.productsDefaultListNameAtoZ = [
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Bolt T-Shirt",
      "Sauce Labs Fleece Jacket",
      "Sauce Labs Onesie",
      "Test.allTheThings() T-Shirt (Red)",
    ];
    this.productsListNameZtoA = [
      this.productsDefaultListNameAtoZ[5],
      this.productsDefaultListNameAtoZ[4],
      this.productsDefaultListNameAtoZ[3],
      this.productsDefaultListNameAtoZ[2],
      this.productsDefaultListNameAtoZ[1],
      this.productsDefaultListNameAtoZ[0],
    ];
    this.productsListPriceLowToHigh = [
      this.productsDefaultListNameAtoZ[4],
      this.productsDefaultListNameAtoZ[1],
      this.productsDefaultListNameAtoZ[2],
      this.productsDefaultListNameAtoZ[5],
      this.productsDefaultListNameAtoZ[0],
      this.productsDefaultListNameAtoZ[3],
    ];
    this.productsListPriceHighToLow = [
      this.productsDefaultListNameAtoZ[3],
      this.productsDefaultListNameAtoZ[0],
      this.productsDefaultListNameAtoZ[2],
      this.productsDefaultListNameAtoZ[5],
      this.productsDefaultListNameAtoZ[1],
      this.productsDefaultListNameAtoZ[4],
    ];
    this.dropdownOptions = [
      "az", // "Name (A to Z)"
      "za", // "Name (Z to A)"
      "lohi", // "Price (low to high)"
      "hilo", // "Price (high to low)"
    ];
  }
}
