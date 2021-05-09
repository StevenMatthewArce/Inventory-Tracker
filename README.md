<p align="center">
  <img width="500" height="500" src="./GYST.png">
</p>

# GYST - Get Your Stats Together 
Inventory, Order, & Expense Tracking for Small Business 

---

## About 
GYST is a dynamic inventory tracker catered towards small businesses. We used Electron to make the desktop application cross platform and we used React for the interface with libraries such as Semantic UI and Victory for visualization. For the backend, we used Firebase to incorporate authentication and firestore to create a NoSQL based database.

Some key features of our application include image recognition, inventory, order, sales and expense tracking. We used Tesseract to implement image recognition so the user can automatically input their items rather than entering it manually. We also incorporated the fundamentals of react by implementing hooks, lifecycle methods, and using class and functional components.

This desktop application was created as part of CSULB CECS 445 Software Design & Architecture. As part of this class this project won `Best Data Story Award`.
> Rationale: This was my easiest decision. Team SAAD blew me away with how they captured so many metrics into a cohesive, tight and digestible story. From breaking down their development into strategic phases, combining & complimenting metrics into refined visualizations and incorporating data justifications in their lessons learned via new concepts, such as feature complexity, this was Fortune 500/McKinsey/Bain/BCG professional level data analytics work. I was so engrossed in their charts that I even forgot to provide the team a time check! Simply outstanding.

---
## Features

- [x] Organizing inventory by raw materials & finished goods
- [x] Automatic inventory alerts when items fall below a threshold
- [x] Track current and completed orders
- [x] Automatic alerts when order deadlines approach
- [x] Automatic calculation of order costs
- [x] Scan receipts to import raw materials & track expenses 
- [x] Automatically track sales on completed orders
- [x] Intuitive dashboard to view major statistics at a glance

---
## Supported Platforms

* Windows
* macOS

---
## Installation 

#### On Windows:

#### On macOs:


#### For Development:
This program requires `Node Version 14.16.1 LTS`
This program requires `.env` file inside of project directory as shown below:

```
inventory-tracker
├── node_modules
├── public
├── src
├── .env
├── package.json
└── README.md
```

In the project directory, run:
1. `npm install`

2.  `npm start`
This starts the program in the development enviorment.

---
## Known Issues
<ul>
<li>Signing out from Dashboard causes an error</li>
<ul>
<li>Fix: Click the X in the top right of error and continue normal operation. Application will continue as normal.</li>
</ul>
<li>NaN for cost/total-cost of certain items/recipes.</li>
<li>No feedback if you entered wrong password on login screen.</li>
<li>Expenses shown in dashboard graph only shown expenses from receipts. </li>
</ul>