# Mini Restaurant Finder (CRUD)
---
Mini Restaurant Finder (CRUD) web app project for Alpha Camp Semester 3

![Demo](/Demo.png)

## Getting Started
---
This mini web project is a web app for managing a personal collection of favorite restaurants. You can add, delete, sort, and search restaurants, or display restaurant information.[<sup>1</sup>](#1)

# Prerequisites
1. You have to install and run both MongoDB and Mongoose on your local computer.

# Initialization
---
To run this project, download the project and install the dependent packages using the console:

1. Download this project from GitHub:
```
    git clone https://github.com/zongronghuang/crud_restaurant_list.git crud_restaurant_list
``` 
2. Go to the **restaurant_list** folder.

3. Install the dependent packages:
```
    npm install
```

4. Launch MongoDB on your local computer. 

5. Seed default users and restaurants.
```
    npm run seed
```

6. Launch the local server:
```
    npm run dev
```

7. Open a web browser and enter the URL:
```
    localhost:3000
```

8. Now you can use the web app to view and search restaurants.

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