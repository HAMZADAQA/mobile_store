# Mobile Store

**Mobile Store** is a responsive web application developed as part of the Zara Challenge for "PRUEBA TÉCNICA MÓVILES 2024". The app allows users to browse, search, and manage a catalog of mobile phones, view detailed information about each device, and manage a persistent shopping cart.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Development](#development)
- [Production](#production)
- [Testing](#testing)
- [Linting](#linting)
- [Environment Variables](#environment-variables)
- [API Integration](#api-integration)
- [CI/CD Workflow](#cicd-workflow)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Phone Listing:**
  - Displays a grid of the first 20 mobile phones from the API.
  - Each card shows the phone’s image, name, brand, and base price.
  - Real-time search by name or brand with a result count indicator.
- **Detail View:**
  - Dynamic image changes based on the selected color.
  - Selectors for storage and color with live price updates.
  - Detailed technical specifications and a section for similar products.
  - "Add to Cart" button activates once both color and storage are selected.
- **Cart Management:**
  - Displays added phones with their selected specifications.
  - Options to remove individual items or clear the cart.
  - Shows the total price and a "Continue Shopping" button.
- **Responsive Design:**
  - Fully responsive layout for mobile, tablet, and desktop devices.
- **Environment-Specific Configuration:**
  - Separate settings for development and production.

## Tech Stack

- **Frontend:** React (>=17), TypeScript
- **Build Tool:** Vite
- **State Management:** React Context API
- **Styling:** CSS (or SASS/Styled Components)
- **Testing:** Jest, React Testing Library
- **Linting:** ESLint
- **API Integration:** Axios

## Installation

### Prerequisites

- Node.js (v18)
- npm

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/HAMZADAQA/mobile_store.git
   ```
