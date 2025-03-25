# Next.js Gauge Meter Project

This is a Next.js project that displays two interactive gauge meters using `react-plotly.js`. One gauge spans **270 degrees**, and the other spans **180 degrees**. Users can modify the gauge sections and change colors dynamically.

## Getting Started

To run the project locally, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your system.

### Installation
Clone the repository and install dependencies:
```bash
npm install
```

### Running the Development Server
Start the development server with the following command:
```bash
npm run dev
```
Then, open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## Project Overview

This project visualizes speedometer-style gauges using **Plotly.js** in a Next.js environment. It consists of two gauges:

1. **270-degree gauge**: A circular gauge that spans 270 degrees.
2. **180-degree gauge**: A half-circle gauge that spans 180 degrees.

Each gauge consists of:
- A **colored segmented dial**, which represents different sections.
- A **needle indicator**, which moves based on user input.
- A **numerical display**, showing the current value.

## Features
- **Dynamic Gauge Sections**: Users can define multiple sections in the gauge.
- **Customizable Colors**: Users can set custom colors for each section.
- **Interactive Needle**: The needle updates in real-time based on user input.
- **Two-way Binding**: A slider allows users to control the gauge value dynamically.

## Technologies Used
- **Next.js**: Framework for React applications.
- **React & TypeScript**: Frontend development.
- **Plotly.js**: For rendering the gauge meters.
- **Tailwind CSS**: For styling.

## Learn More
To explore more about the technologies used:
- [Next.js Documentation](https://nextjs.org/docs)
- [Plotly.js Documentation](https://plotly.com/javascript/)
- [React Documentation](https://reactjs.org/)


Enjoy customizing your gauge meters! 🚀

