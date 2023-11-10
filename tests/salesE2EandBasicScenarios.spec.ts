import { test } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";
import PageTitles from "../helpers/PageTitles";
import CheckoutYourInformationPage from "../pages/CheckoutYourInformationPage";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/productsPage/ProductsPage";
import YourCartPage from "../pages/YourCartPage";

test.describe("products Page Dropdown Scenarios block", () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let yourCartPage: YourCartPage;
  let checkoutYourInfoPage: CheckoutYourInformationPage;
  const firstName = "David";
  const lastName = "Katsir";
  const emptyPostalCode = "";
  const expectedErrorMessage = "Error: Postal Code is required";
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    yourCartPage = new YourCartPage(page);
    checkoutYourInfoPage = new CheckoutYourInformationPage(page);
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
    await productsPage.validateCartIsEmpty();
  });

  //  Test Case 06:
  //  Login and navigate to Products Page
  //  Products Page =>  Add one item to basket => Go to shopping cart => Click on 'Continue shopping'
  //  => Add another item to basket =>
  //  Go to shopping cart => Click on 'Checkout' => Add all details except for Postal code =>
  //  See that you get error message: 'Error: Postal Code is required'
  test("On 'Checkout' do not Add all details => Check Error message ", async ({
    page,
  }) => {
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
    await yourCartPage.continueShopping();
    // Add another item to cart
    await productsPage.chooseProductByTitle(productsList[1]);
    await productsPage.goToCart();
    await yourCartPage.validateNumberOfItems(2);
    await yourCartPage.goToCheckout();
    await checkoutYourInfoPage.validatePageUrl(
      ApplicationURL.CHECKOUT_YOUR_INFO_PAGE_URL
    );
    await checkoutYourInfoPage.validateTitle(
      PageTitles.CHECKOUT_YOUR_INFO_PAGE
    );
    await checkoutYourInfoPage.fillInformation(
      firstName,
      lastName,
      emptyPostalCode
    );
    await checkoutYourInfoPage.goToCheckoutOverview();
    await checkoutYourInfoPage.validateErrorMessage(expectedErrorMessage);
  });

  //  Test Case 07:
  //  Login and navigate to Products Page
  //  Products Page =>  Add one item to basket => Go to shopping cart => Click on 'Continue shopping' => Add another item to basket =>
  //  Go to shopping cart => Varify you have correct items in the cart => Click on 'Checkout' => Add all details =>
  //  Click on 'Cancel' => See that you got back to 'Your Cart' page => See that the number of items in the shopping cart is correct (2) => Remove one of the items =>
  //  Validate cart content and number of items (1) => Click on 'Checkout' => Add all details => Continue => 
  //  Validate 'Checkout: Overview' page fileds: Cart content (Item decription), Payment Information, Shipping Information,
  //  Price Total and Total => Click on 'Finish' button => 
  //  Validate 'Checkout: Complete!' page message ('Thank you for your order!') => Click on 'Back Home' button => 
  //  Validate you got back to 'Products' page.
  // test("Product page ", async ({ page }) => {

  // });
});
