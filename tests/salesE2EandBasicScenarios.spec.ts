import { test } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import YourCartPage from "../pages/YourCartPage";
import PageTitles from "../helpers/PageTitles";

test.describe("products Page Dropdown Scenarios block", () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let yourCartPage: YourCartPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    yourCartPage = new YourCartPage(page);
  });
  const pageTitleProducts = "Products";
  const productsList: string[] = [
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Fleece Jacket",
    "Sauce Labs Onesie",
    "Test.allTheThings() T-Shirt (Red)",
  ];

  //  Test Case 05:
  //  Login and navigate to Products Page
  //  Products Page =>  Add one item to basket => and in the same button =>
  //  Remove the item (without going to the cart) => verify that the shopping cart gets empty again
  test("Add and Remove item without going to the cart ", async ({ page }) => {
    await loginPage.loginToApplication();
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productsPage.validateTitle(pageTitleProducts);
    // Add item to cart
    await productsPage.chooseProductByTitle(productsList[0]);
    await productsPage.validateNumberOfItems("1");
    // Remove the same item from the cart
    await productsPage.chooseProductByTitle(productsList[0]);
    await productsPage.ValidateCartIsEmpty();
  });

  //  Test Case 06:
  //  Login and navigate to Products Page
  //  Products Page =>  Add one item to basket => Go to shopping cart => Click on 'Continue shopping' 
  //  => Add another item to basket =>
  //  Go to shopping cart => Click on 'Checkout' => Add all details except for Postal code =>
  //  See that you get error message: 'Error: Postal Code is required'
  test("On 'Checkout' do not Add all details => Check Error message ", async ({ page }) => {
    await loginPage.loginToApplication();
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productsPage.validateTitle(pageTitleProducts);
    // Add item to cart
    await productsPage.chooseProductByTitle(productsList[0]);
    await productsPage.goToCart();
    await yourCartPage.validatePageUrl(ApplicationURL.YOUR_CART_PAGE_URL);
    await yourCartPage.validateTitle(PageTitles.YOUR_CART_PAGE);
    await yourCartPage.validateNumberOfItems(1);
    await yourCartPage.validateItemExistsInCart(productsList[0]);
    





  });

  //  Test Case 07:
  //  Login and navigate to Products Page
  //  Products Page =>  Add one item to basket => Go to shopping cart => Click on 'Continue shopping' => Add another item to basket =>
  //  Go to shopping cart => Click on 'Checkout' => Add all details =>
  //  Click on 'Cancel' => See that you got to 'Your Cart' page => See that the number of items in the shopping cart is correct.
  // test("Product page ", async ({ page }) => {

  // });
});
