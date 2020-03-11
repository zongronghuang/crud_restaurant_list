# Mini Restaurant Finder (CRUD)
---
Mini Restaurant Finder (CRUD) web app project for Alpha Camp Semester 3

![Demo](/Demo.png)

## Getting Started
---
This mini web project is a web app for managing a personal collection of favorite restaurants. You can add, delete, sort, and search restaurants, or display restaurant information.[<sup>1</sup>](#1)

# Prerequisites
1. You have to install and run both MongoDB and Mongoose on your local computer.

# Installing Project and Dependent Packages
---
To run this project, take the steps using the console:

1. Download this project from GitHub:
```
git clone https://github.com/zongronghuang/crud_restaurant_list.git restaurant_list
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

6. Install method-override
```
npm install method-override
```

7. Install Mongoose
```
npm install mongoose
```

8. Install express-session
```
npm install express-session
```

9. Install bcryptjs
```
npm install bcryptjs
```

10. Install connect-flash
```
npm install connect-flash
```

11. Install dotenv
```
npm install dotenv
```

12. Install passport
```
npm install mongoose
```

13. Install passport-local
```
npm install passport-local
```

14. Install passport-facebook
```
npm install passport-facebook
```

8. **[Optional]** Launch MongoDB on your local computer. Then, initialize this project with default users and restaurants.
```
node ./models/seeds/userSeeder.js
node ./models/seeds/restaurantSeeder.js
```

9. Launch the local server:
```
npm run dev
```

9. Open a web browser and enter the URL:
```
localhost:3000
```

10. Now you can use the web app to view and search restaurants.

# Features
---
### Login
You may log in to this web app using a personal FaceBook account, a locally registered account, or a default user account:
```
user1@example.com/12345678
user2@example.com/12345678
```

The following managements are user-specific.

### View details:
1. Click on a desired restaurant to show its detailed information (e.g., telephone, address, and description).

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

### Search restaurants by name:
1. Enter a keyword (English or Chinese) in the top search field. The search is case-insensitive and allows fuzzy search. 
2. Press Enter or click the magnifying glass to find matched restaurants.

### Sort restaurants:
1. Go to the top-right dropdown menu and select a way to sort the restaurants. You can sort them by name, category, or location.
2. Click on the sort icon to reorder the restaurants.

---
<a class="anchor" id="1">1</a>: The restaurant profiles and the project as well as the screenshot are only for educational purpose, with no intention of copyright infringement.