Canva Stickers Playground

Demo: https://drive.google.com/file/d/1KDQuvUpYbYyq9jGggkHfauiSrUq5eH-x/view?usp=sharing

Create React App: npx create-react-app app-name

Install Required Packages: npm install react-konva konva --save

Run the Project: npm start

Features:
- A 600×400 interactive canvas built with react-konva

- Three emoji/sticker buttons — click to add stickers to the canvas

- Draggable stickers — users can move them around freely

- Double-click to delete a sticker

- Snap to grid (optional bonus) for cleaner placement

- Download button to export the canvas as a PNG file

- Fully responsive design for both desktop and mobile

How It Works:

- Clicking a sticker button updates React state by adding a new sticker with x, y, id, and image properties.

- The canvas (<Stage>) renders all stickers inside a <Layer>, each as a draggable <Image>.

- A download button generates a PNG using stageRef.toDataURL() and triggers download via a temporary <a> element.

- The layout auto-adjusts for smaller screens using responsive width and height logic in React.
