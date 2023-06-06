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
 npm install @newfold-labs/wp-module-ecommerce#v1.0.0
 ```
 
## Usage

In your React component you can import the eCommerce module as so,

```jsx
import { NewfoldECommerce } from "@newfold-labs/wp-module-ecommerce";

function EcommercePage(props) {
  return <NewfoldECommerce {...props} />;
}
```

[More on NewFold WordPress Modules](https://github.com/newfold-labs/wp-module-loader)