# Mini Restaurant Finder (CRUD)
---
Mini Restaurant Finder (CRUD) web app project for Alpha Camp Semester 3

![Demo](/Demo.png)

## Getting Started
---
This mini web project is a web app for managing a personal collection of favorite restaurants. You can add, delete, and search restaurants, or display restaurant information.[<sup>1</sup>](#1)

This project is dependent on the following packages:

+ **[Node.js](https://nodejs.org/en/)**: For creating a local server and a script designing server actions
+ **[Express](https://expressjs.com/)**: For setting up routing rules for directing users to specific webpages
+ **[Handlebars](https://www.npmjs.com/package/express-handlebars)**: For creating reusable webpage templates
+ **[body-parser](https://www.npmjs.com/package/body-parser)**: For analyzing data contained in request packets
+ **[mongoose](https://www.npmjs.com/package/mongoose)**: For manipulating data stored in MongoDB.
+ **[nodemon](https://www.npmjs.com/package/nodemon)**: For auto-launching the local server when its server scripts are updated.


# Prerequisites
1. You have to install and run both MongoDB and Mongoose on your local computer.

# Installing
---
To run this project, take the steps using the console:

1. Download this project from GitHub:
```
git clone https://github.com/zongronghuang/restaurant_list.git restaurant_list
``` 
2. Go to the **restaurant_list** folder.

3. Install Express using the console:
```
npm install express
```

4. Install Handlebars
```
npm install express-handlebars
```

5. Install body-parser
```
npm install body-parser
```

6. Install Mongoose
```
npm install mongoose
```

7. [Optional] Run the JavaScript file in the project folder to initialize the project. This act seeds the first batch of demo restaurants in MongoDB. You may skip this step if you do not wish to show the demo restaurants.
```
node restaurantSeeder.js
```

7. Launch the local server:
```
node app.js
```

8. Open a web browser and enter the URL:
```
localhost:3000
```

9. Now you can use the web app to view and search restaurants.

# Features
---
### Overview
1. The homepage lists all recorded restaurants and provides the restaurants' names, categories, and user ratings.

### Search by keyword (Beta):
1. Enter a keyword (English or Chinese) in the top search field. The keyword must be the exact match of a restaurant's name.
2. Press Enter or click the magnifying glass to find matched restaurants.   

### View details:
1. Click on a desired restaurant to show its defailed information (e.g., telephone, address, and description).

### Add a restaurant profile:
1. Click the top-right button (加入餐廳) to go to the restaurant profile page.
2. Provide required information.
3. Click the blue button (確定) to send out the profile to the database.

### Edit a restaurant profile:
1. On the homepage, click on (編輯) on a desired restaurant card.
2. Change information on the page.
3. Click the blue button (確定) to update the profile to the database.

### Delete a restaurant profile:
1. On the homepage, click on (刪除) on a desired restaurant card.


---
<a class="anchor" id="1">1</a>: The restaurant profiles and the project as well as the screenshot are only for educational purpose, with no intention of copyright infringement.