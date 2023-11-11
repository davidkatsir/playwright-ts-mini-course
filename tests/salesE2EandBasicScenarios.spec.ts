import { test } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";
import PageTitles from "../helpers/PageTitles";
import CheckoutYourInformationPage from "../pages/CheckoutYourInformationPage";
import LoginPage from "../pages/LoginPage";
import YourCartPage from "../pages/YourCartPage";
import ProductsPage from "../pages/productsPage/ProductsPage";
import ProductsPageData from "../pages/productsPage/ProductsPageData";

test.describe("Sales E2E and Basic Scenarios", () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let productsPageData: ProductsPageData;
  let yourCartPage: YourCartPage;
  let checkoutYourInfoPage: CheckoutYourInformationPage;
  const firstName = "David";
  const lastName = "Katsir";
  const postalCode = "17000";
  const emptyPostalCode = "";
  const expectedErrorMessage = "Error: Postal Code is required";
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    productsPageData = new ProductsPageData();
    yourCartPage = new YourCartPage(page);
    checkoutYourInfoPage = new CheckoutYourInformationPage(page);
  });

  //  Test Case 05:
  //  Login and navigate to Products Page
  //  Products Page =>  Add one item to basket => and in the same button =>
  //  Remove the item (without going to the cart) => verify that the shopping cart gets empty again
  test("Add and Remove item without going to the cart ", async ({ page }) => {
    await loginPage.loginToApplication();
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productsPage.validateTitle(PageTitles.INVENTORY_PAGE);
    // Add item to cart
    await productsPage.chooseProductByTitle(
      productsPageData.productsDefaultListNameAtoZ[0]
    );
    await productsPage.validateNumberOfItems("1");
    // Remove the same item from the cart
    await productsPage.chooseProductByTitle(
      productsPageData.productsDefaultListNameAtoZ[0]
    );
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
    await productsPage.validateTitle(PageTitles.INVENTORY_PAGE);
    // Add item to cart
    await productsPage.chooseProductByTitle(
      productsPageData.productsDefaultListNameAtoZ[0]
    );
    await productsPage.goToCart();
    await yourCartPage.validatePageUrl(ApplicationURL.YOUR_CART_PAGE_URL);
    await yourCartPage.validateTitle(PageTitles.YOUR_CART_PAGE);
    await yourCartPage.validateNumberOfItems(1);
    await yourCartPage.validateItemExistsInCart(
      productsPageData.productsDefaultListNameAtoZ[0]
    );
    await yourCartPage.continueShopping();
    // Add another item to cart
    await productsPage.chooseProductByTitle(
      productsPageData.productsDefaultListNameAtoZ[1]
    );
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

  // Test Case 07:
  // Login and navigate to Products Page
  // => Products Page =>  Add one item to basket => Go to shopping cart
  // => Click on 'Continue shopping'
  // => Add another item to basket => Go to shopping cart
  // => Varify you have correct items in the cart
  // => Click on 'Checkout' => Add all details
  // => Click on 'Cancel' => See that you got back to 'Your Cart' page
  // => See that the number of items in the shopping cart is correct (2)
  // => Remove one of the items => Validate cart content and number of items (1)
  // => Click on 'Checkout' => Add all details => Continue
  // => Validate the following 'Checkout: Overview' page fileds:
  // 'Cart content (Item decription)', 'Payment Information', 'Shipping Information',
  // 'Price Total' and 'Total'
  // => Click on 'Finish' button
  // => Validate 'Checkout: Complete!' page message ('Thank you for your order!')
  // => Click on 'Back Home' button
  // => Validate you got back to 'Products' page.
  test("Sales E2E plus fields validations ", async ({ page }) => {
    await loginPage.loginToApplication();
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productsPage.validateTitle(PageTitles.INVENTORY_PAGE);
    // Add item to cart
    await productsPage.chooseProductByTitle(
      productsPageData.productsDefaultListNameAtoZ[0]
    );
    await productsPage.goToCart();
    await yourCartPage.validatePageUrl(ApplicationURL.YOUR_CART_PAGE_URL);
    await yourCartPage.validateTitle(PageTitles.YOUR_CART_PAGE);
    await yourCartPage.validateNumberOfItems(1);
    await yourCartPage.validateItemExistsInCart(
      productsPageData.productsDefaultListNameAtoZ[0]
    );
    await yourCartPage.continueShopping();
    // Add another item to cart
    await productsPage.chooseProductByTitle(
      productsPageData.productsDefaultListNameAtoZ[1]
    );
    await productsPage.goToCart();
    await yourCartPage.validateNumberOfItems(2);
    await yourCartPage.validateItemExistsInCart(
      productsPageData.productsDefaultListNameAtoZ[0]
    );
    await yourCartPage.validateItemExistsInCart(
      productsPageData.productsDefaultListNameAtoZ[1]
    );
    await yourCartPage.goToCheckout();
    await checkoutYourInfoPage.validatePageUrl(
      ApplicationURL.CHECKOUT_YOUR_INFO_PAGE_URL
    );
    await checkoutYourInfoPage.validateTitle(
      PageTitles.CHECKOUT_YOUR_INFO_PAGE
    );
    await checkoutYourInfoPage.fillInformation(firstName, lastName, postalCode);
    await checkoutYourInfoPage.goToCheckoutOverview();
  });
});
