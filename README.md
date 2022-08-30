<a href="https://newfold.com/" target="_blank">
    <img src="https://newfold.com/content/experience-fragments/newfold/site-header/master/_jcr_content/root/header/logo.coreimg.svg/1621395071423/newfold-digital.svg" alt="Newfold Logo" title="Newfold Digital" align="right" 
height="42" />
</a>

# wp-module-ecommerce

Next-generation WordPress eCommerce Experience for WordPress sites at Newfold Digital.

## Installation

### 1. Add the Newfold Satis to your `composer.json`.

 ```bash
 composer config repositories.newfold composer https://newfold.github.io/satis
 ```

### 2. Require the `newfold-labs/wp-module-ecommerce` package.

 ```bash
 composer require newfold-labs/wp-module-ecommerce
 ```

### 3. Install the `@newfold-labs/wp-module-ecommerce` npm package.

 ```bash
 npm install @newfold-labs/wp-module-ecommerce#v0.4.2
 ```
 
## Usage

In your React component you can import the eCommerce module as so,

```js
import "@newfold-labs/wp-module-ecommerce";
import "@newfold-labs/wp-module-ecommerce/bluehost.css";
import "@newfold-labs/wp-module-ecommerce/styles.scss";
```

This loads the module script and the associated styles and attaches the `NewfoldEcommerce` React Component to the `window` object. You can then it use in the following manner.

```js
const NewfoldECommerce = window.NewfoldECommerce;

function EcommercePage(props) {
  return <NewfoldECommerce {...props} />;
}
```

## Configuration

The new eCommerce Experience is available for customers who satisfy the following criteria

- The `plan_subtype` is one of `wc_standard`, `wc_premium`.
- The `signup_date` is on or after August 18th.

Upon satisfaction of both the conditions, the user will be redirected to the `#/home/store/general` page which kickstarts the new experience.

For local development, you can directly navigate to the `#/home/store/general` to view the new experience.

[More on NewFold WordPress Modules](https://github.com/newfold-labs/wp-module-loader)