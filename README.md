# E-Commerce Order Management System

## Project Overview

This project is an E-Commerce Order Management System developed using Angular for the frontend and Node.js for the backend. 
The application allows users to view their purchase history, manage orders, and process refunds seamlessly.

## Features

- **User Authentication:** Users can securely log in and manage their accounts using local storage.
- **Order Management:** Users can view their purchase history with detailed information about each order.
- **Responsive UI:** The application is built using Bootstrap for a modern and clean design.
- **Refund Process:** Users can request refunds for their orders, selecting from multiple predefined reasons.
- **Real-Time Updates:** The order list updates dynamically upon creation or modification of orders.

## Unique Aspects

- **Custom Modal for Refund Requests:** A modal window allows users to select refund reasons using checkboxes, enhancing user interaction.
- **Data Formatting:** Angular pipes are used to format dates and currency for better readability of order details.
- **Integration of Technologies:** The project uses Angular for the frontend and Node.js with Express for the backend, providing a full-stack development experience.
- **State Management:** Angular services manage state and facilitate communication between components.

## Technologies Used

- **Frontend:** 
  - Angular
  - TypeScript
  - Bootstrap
  - HTML
  - CSS

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB

- **Other Libraries:**
  - Generic HTTP service for making API calls
  - A response service for handling API responses

## Installation

Clone the repository, install the dependencies for both frontend and backend, start the backend server, and then the frontend application by running the following commands:

```bash
git clone <repository-url>
cd <repository-directory>
cd frontend
npm install
cd ../backend
npm install
cd ../backend
node index.js
cd ../frontend
ng serve
