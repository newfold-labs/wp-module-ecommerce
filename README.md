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

### 3. Setup GitHub registry

Follow instructions at [GH Packages Setup](https://gist.github.com/aulisius/1a6e4961f17039d82275a6941331b021).

### 4. Install the `@newfold-labs/wp-module-ecommerce` npm package.

 ```bash
 npm install @newfold-labs/wp-module-ecommerce
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

## Steps to create new release for Ecommerce module

We have switched to GH packages for publishing newer versions of the ecommerce module. 

if you're doing something that will not break anything or not adding any new dependency. But, only doing basic stuff like bug fixes, copy changes etc. Change which doesn't really impact the plugin in bigger way you can put them under the last number of versions. 

If you're doing something, like adding a new library, or changing something in the way the plugin can use our module then it's better to upgrade the minor version which is the 2nd digit of version. 

In rare scenarios, like UI redesign where the change is bigger or a major refactor, we update the 1st digit of version. 

#### Changes to Ecommerce Module

1. Merge approved PRs into trunk branch

2. Do version update to new one in package.json 

3. Run, npm install (this will auto update version in package-lock.json) 

4. Commit above change in separate commit (commit message: Bump to new version value) 

5. Go to https://github.com/newfold-labs/wp-module-ecommerce/releases 

6. Click on Draft a new release button 

7. By default, you'll always create a release from target: trunk branch. In case we are making changes to crazydomains then we must switch to the legacy branch do the fixes there and create a release from target: legacy branch as it currently runs older version 

8. Give V dot version that you want to release and click on create a new tag. 

9. Click Generate release notes button it will basically collect all the pull requests that came in from the previous release to now and then just create a summary. (It won't track any direct comments to the trunk. It will just only track pull request) 

10. Keep Set as the latest release checkbox `checked` as it is by default. 

11. Click Publish a release button. 

12. Go to https://newfold-labs.github.io/satis/ Satis is a PHP registry for our packages. 

13. On above URL in `package` filter, you can search for ecommerce 

14. We have set up an integration within our workflow itself so once workflow completes, we trigger alert to Satis that newer version of ecommerce module is released and rebuild Satis so that it can show newer version in packages (Repo: https://github.com/newfold-labs/satis/actions) 

15. The newer version will appear in 5 to 10 minutes of rebuilding. 

16. We do not have permission to rerun Satis build, so in case it fails PRESS1 team can help. 

17. You can check the status of Statis build & Publish workflow here https://github.com/newfold-labs/wp-module-ecommerce/actions 

18. On successful completion you can see latest package here https://github.com/newfold-labs/wp-module-ecommerce/pkgs/npm/wp-module-ecommerce 

#### Changes to BlueHost plugin repo

1. In composer.json file, update version of newfold-labs/wp-module-ecommerce 

2. In package.json file, newfold-labs/wp-module-ecommerce : version number 

3. Run command, 
```npm i --legacy-peer-deps```  

4. Package-lock.json should auto update. 

5. Once Satis starts showing updated version run below command for composer update, 
```$ composer update newfold-labs/wp-module-ecommerce -W``` 

6. We need to create a branch (naming convention: dependencies/newfold-labs/wp-module-ecommerce-version_number). 

7. Currently we don't have the permission to publish directly to the BlueHost plugin So, we need to create a fork basically of the repo then push it to that fork and then create a pull request against the develop branch. 

8. The new release process is thus completed. 