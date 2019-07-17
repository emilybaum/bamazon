# bamazon
An Amazon-like storefront with the MySQL. The app will take in orders from customers and deplete stock from the store's inventory. This app will also track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.

**Starting command line actions:**
Input into the command line to enter the application
* node bamazonCustomer.js
* node bamazonManager.js

## Functionality for bamazonCustomer.js 
### _Customer View_
What happens:
1. Running this applicaiton will propt you first enter the *bamazon store, and then displays all the items in the store within the command line (aka, table details from the mySQL database)

1. Then, you are propmted which item you want to buy and what quantity. 

1. The request is then processed if enough quantiy of that item is available, otherwise the user is notoified that there is not enough quantity and to update their order. 

1. After an order is processed, the total price for the item and quantity is displayed to the user

1. Lastly, the user is prompted if they would like to make another order, or exit the store.



## Functionality for bamazonManager.js
### _Manager View_