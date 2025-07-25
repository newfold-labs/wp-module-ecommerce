<a href="https://newfold.com/" target="_blank">
    <img src="https://newfold.com/content/experience-fragments/newfold/site-header/master/_jcr_content/root/header/logo.coreimg.svg/1621395071423/newfold-digital.svg" alt="Newfold Logo" title="Newfold Digital" align="right" 
height="42" />
</a>

# wp-module-ecommerce

Next-generation WordPress eCommerce Experience for WordPress sites at Newfold Digital.


## Module Responsibilities

* Ecommerce module displays `Home or Dashboard` page for Brand plugin, with below options:
  1. Live site preview for both, live and coming soon mode for WordPress site with view & edit site options
  2. Next steps to setup your site helps customers to complete below tasks: 
      * To add store info 
      * Setup online payment options like PayPal, Stripe, RazorPay. Also choose offline payment options like, check payments, bank transfers & C.O.D
      * Setup shipping options like Shippo.
      * Configure tax settings
      * Add/import products
      * Customers who have selected `novice` as WordPress experience level will have access to Signup to BlueHost WP academy / Yoast academy for learning purpose. 
      * There is also link for Customers to view list of `Completed tasks`
* Ecommerce module also displays `Store` option which gives snapshot of recent customer activity with details like total sales, net sales, recent orders, products sold, visitors, views and also a link to detailed `Analytics` page of Woocommerce plugin.
* `Store` page also, allows customers to Purchase/Enable/Manage and learn more about YITH extended plugins like: 
  1. YITH Booking and Appointment for WooCommerce
  2. YITH WooCommerce AJAX Search
  3. YITH WooCommerce Gift Cards
  4. YITH WooCommerce Wishlist
  5. YITH WooCommerce Customize My Account Page 
  6. YITH WooCommerce Ajax Product Filter.
* Under Store we have a `Products & Services` submenu option which provides following options: 
  1. Easy access to Add new product/Import CSV of products into your store. 
  2. Option to setup bookings & appointments or offer gift cards on purchases via YITH extended plugins.
* Next submenu under Store is `Sales & Promotions`where customer can setup different promotional offers on products in their store. 
  1. Here we display 13 different campaign setup options offered by `WonderCart` plugin under `All Campaigns` tab. 
  2. There is also a `Settings` tab where users can customize look & feel of how sales campaigns are displayed on their Store page.
* Next submenu under Store is `Payments` where we store owner can setup payments option accepted on purchases at Store. 
  1. There 3 online payment options via payments gateways like PayPal, Stripe & RazorPay(only for India location). 
  2. We also offer offline payments option via cheque, bank transfer or cash on delivery.
* Final submenu under Store is `Store details` with following options:
  1. Store location and complete address, email address of store owner and currency in which products/services are displayed on the store.
  2. Under `shipping option` tab on the store details page you can connect to Shipping partner like, Shippo (based on your store location).
  3. Under `tax settings` tab, store owner can choose to enable/disable sales tax. 


## Critical Paths

* `Store` page should give a brief overview of `recent customer activity` on Ecommerce website. 
* `Store` page displays section to setup `Ecommerce features` where users can purchase/enable/manage YITH extended plugins. 
* It is required to install & activate `WooCommerce` plugin for below plugins to work,
  1. `YITH PayPal Payment` plugin for - facilitating payments via PayPal, 
  2. `WonderCart`plugin for - creating sales & promotional campaigns, 
  3. `YITH Stripe Payments` plugin for - facilitating payments via Stripe  
  4. `Ecomdash` plugin for - managing marketplace and ecommerce website sales.
* `Home` page should display warnings `enabled but not effective, requires WooCommerce in order to work.` for above YITH plugins, incase WooCommerce isn't setup.
* If `WooCommerce` plugin isn't setup, `Store` tab should ask users to first install & activate `WooCommerce` till then all the sub-menu options under `Store` menu should be disabled.
* `Products & Services` tab should provide customers access to purchase services offered by YITH extended plugins like: YITH Booking and Appointment for WooCommerce and YITH WooCommerce Gift Cards.
* `Sales & Promotions` submenu allows customers to install `WonderCart` plugin if it is not already installed & activated. Once `WonderCart` is activated it offers option to setup different promotional campaigns.
* `Payments` tab facilitates Customers to connect their accounts to receive payments via popular online payment options like PayPal, Stripe and RazorPay. Customers can also choose to accept offline payment via options like: check payments, bank transfers & C.O.D.
* `Store details` tab facilitates setup of `Shippo` third party shipping software for e-commerce businesses.


## Installation

### 1. Add the Newfold Satis to your `composer.json`.

 ```bash
 composer config repositories.newfold composer https://newfold-labs.github.io/satis
 ```

### 2. Require the `newfold-labs/wp-module-ecommerce` package.

 ```bash
 composer require newfold-labs/wp-module-ecommerce
 ```

### 3. Install the `@newfold/wp-module-ecommerce` npm package.

Previously, this module's package was hosted at github and these instructions were required [GH Packages Setup](https://gist.github.com/aulisius/1a6e4961f17039d82275a6941331b021). Now the package is hosted at npmjs and this referenced setup is no longer relevant. Find the npmjs package at https://www.npmjs.com/package/@newfold/wp-module-ecommerce and install just as any other public package. Note the `newfold` org namespace for npmjs and the `newfold-labs` org namespace for github and satis.

 ```bash
 npm install @newfold/wp-module-ecommerce
 ```
 
## Usage

In your React component you can import the eCommerce module as so,

```jsx
import { NewfoldECommerce } from "@newfold/wp-module-ecommerce";

function EcommercePage(props) {
  return <NewfoldECommerce {...props} />;
}
```

[More on Newfold WordPress Modules](https://github.com/newfold-labs/wp-module-loader)

## Release Updates

Run the `Newfold Prepare Release` github action to automatically bump the version (either patch, minor or major version), and update build and language files all at once. It will create a PR with changed files for review. Using this workflow, we can skip all the manual steps below (steps 1-6).

### Manual Release Steps

1. Merge approved PRs into trunk branch.

2. Update version numbers (in both package.json and bootstrap.php files).

3. Create a fresh build: `npm run build`.

4. Update language/translation/i18n files: `composer run i18n`.

5. Commit above change in new branch `release/x.y.z` matching the version number.

6. Create release PR. 

7. Get approval on releaes PR. Merge.

8. Issue a release via github.

   - By default, you'll always create a release from target: trunk branch. In case we are making changes to crazydomains then we must switch to the legacy branch do the fixes there and create a release from target: legacy branch as it currently runs older version.
   - Click Generate release notes button it will basically collect all the pull requests that came in from the previous release to now and then just create a summary.
   - The Satis workflow will trigger an alert to Satis that newer version of ecommerce module is released and rebuild Satis (https://github.com/newfold-labs/satis/)
   - The release workflow will publish the latest js package on npmjs (https://www.npmjs.com/package/@newfold/wp-module-ecommerce)

### Plugin update

Note: if no plugin changes are required we can let dependabot create a PR for the php module and the js package. If any plugin changs are required, please do the following in a branch on the respective plugin repo:

1. In composer.json file, update version of `newfold-labs/wp-module-ecommerce` to latest

2. In package.json file, `@newfold/wp-module-ecommerce` version number to latest

3. Run command, `npm i --legacy-peer-deps`

4. Package-lock.json should auto update.

5. Once Satis starts showing updated version run below command for composer update, `$ composer update newfold-labs/wp-module-ecommerce -W`

6. We need to create a branch (naming convention: dependencies/newfold-labs/wp-module-ecommerce-version_number). 

7. Currently we don't have the permission to publish directly to the BlueHost plugin so, we need to create a fork basically of the repo then push it to that fork and then create a pull request against the develop branch. 

8. The new release process is thus completed. 
