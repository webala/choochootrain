console.log("script loaded");

// Create a PixiJS application.
const app = new PIXI.Application();

// Asynchronous IIFE
(async () => {
  // Intialize the application.
  await app.init({ background: "#021f4b", resizeTo: window });

  // Then adding the application's canvas to the DOM body.
  document.body.appendChild(app.canvas);
  addStars(app);
  addMoon(app);
  addMountains(app);
  addTrees(app);
})();

function addStars(app) {
  const starCount = 20;
  const graphics = new PIXI.Graphics();

  for (let index = 0; index < starCount; index++) {
    const x = (index * 0.78695 * app.screen.width) % app.screen.width;
    const y = (index * 0.9382 * app.screen.height) % app.screen.height;
    const radius = 2 + Math.random() * 3;
    const rotation = Math.random() * Math.PI * 2;

    graphics
      .star(x, y, 5, radius, 0, rotation)
      .fill({ color: 0xffdf00, alpha: radius / 5 });
  }

  app.stage.addChild(graphics);
}

export function addMoon(app) {
  // Create a moon graphics object from an SVG code.
  const graphics = new PIXI.Graphics()
    .svg(`<svg width="111" height="126" viewBox="0 0 111 126" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
        d="M9.99794 104.751C44.7207 104.751 72.869 76.6028 72.869 41.8801C72.869 25.9516 66.9455
        11.4065 57.1812 0.327637C87.3034 4.98731 110.363 31.0291 110.363 62.4566C110.363 97.1793
        82.2144 125.328 47.4917 125.328C28.6975 125.328 11.8294 117.081 0.308472 104.009C3.46679
        104.498 6.70276 104.751 9.99794 104.751Z" fill="#FFDF00"/>
    <path fill-rule="evenodd" clip-rule="evenodd"
        d="M57.4922 0.682129C75.7709 10.9731 88 29.7256 88 51.1529C88 83.6533 59.8656 110 25.16
        110C16.9934 110 9.19067 108.541 2.03273 105.887C1.44552 105.272 0.870627 104.646 0.308472
        104.008C3.46679 104.497 6.70276 104.75 9.99794 104.75C44.7207 104.75 72.869 76.6018 72.869
        41.8791C72.869 26.1203 67.0711 11.7158 57.4922 0.682129Z" fill="#DEC61A"/>
</svg>`);

  // Position the moon.
  graphics.x = app.screen.width / 2 + 100;
  graphics.y = app.screen.height / 8;

  // Add the moon to the stage.
  app.stage.addChild(graphics);
}

export function addMountains(app) {
  /** -- INSERT CODE HERE -- */
  const group1 = createMountainGroup(app);
  const group2 = createMountainGroup(app);

  group2.x = app.screen.width;
  app.stage.addChild(group1, group2);
  app.ticker.add((time) => {
    const dx = time.deltaTime * 0.5;

    group1.x -= dx;
    group2.x -= dx;

    if (group1.x <= -app.screen.width) {
      group1.x += app.screen.width * 2;
    }
    if (group2.x <= -app.screen.width) {
      group2.x += app.screen.width * 2;
    }
  });
}

function createMountainGroup(app) {
  /** -- INSERT CODE HERE -- */
  const graphics = new PIXI.Graphics();
  const width = app.screen.width / 2;
  const startY = app.screen.height;
  const startXLeft = 0;
  const startXMiddle = Number(app.screen.width) / 4;
  const startXRight = app.screen.width / 2;
  const heightLeft = app.screen.height / 2;
  const heightMiddle = (app.screen.height * 4) / 5;
  const heightRight = (app.screen.height * 2) / 3;
  const colorLeft = 0xc1c0c2;
  const colorMiddle = 0x7e818f;
  const colorRight = 0x8c919f;

  graphics
    // Draw the middle mountain
    .moveTo(startXMiddle, startY)
    .bezierCurveTo(
      startXMiddle + width / 2,
      startY - heightMiddle,
      startXMiddle + width / 2,
      startY - heightMiddle,
      startXMiddle + width,
      startY
    )
    .fill({ color: colorMiddle })

    // Draw the left mountain
    .moveTo(startXLeft, startY)
    .bezierCurveTo(
      startXLeft + width / 2,
      startY - heightLeft,
      startXLeft + width / 2,
      startY - heightLeft,
      startXLeft + width,
      startY
    )
    .fill({ color: colorLeft })

    // Draw the right mountain
    .moveTo(startXRight, startY)
    .bezierCurveTo(
      startXRight + width / 2,
      startY - heightRight,
      startXRight + width / 2,
      startY - heightRight,
      startXRight + width,
      startY
    )
    .fill({ color: colorRight });

  return graphics;
}

export function addTrees(app) {
  /** -- INSERT CODE HERE -- */
  const treeWidth = 200;
  const y = app.screen.height - 20;
  const spacing = 15;
  const count = app.screen.width / (treeWidth + spacing) + 1;
  const trees = [];

  for (let index = 0; index < count; index++) {
    const treeHeight = 225 + Math.random() * 50;
    const tree = createTree(treeWidth, treeHeight);

    tree.x = index * (treeWidth + spacing);
    tree.y = y;

    app.stage.addChild(tree);
    trees.push(tree);
  }

  app.ticker.add((time) => {
    const dx = time.deltaTime * 3;

    trees.forEach((tree) => {
      tree.x -= dx;

      if (tree.x <= -(treeWidth / 2 + spacing)) {
        tree.x += count * (treeWidth + spacing) + spacing * 3;
      }
    });
  });
}

function createTree(width, height) {
  /** -- INSERT CODE HERE -- */

  const trunkWidth = 30;
  const trunkHeight = height / 4;
  const trunkColor = 0x563929;
  const graphics = new PIXI.Graphics()
    .rect(-trunkWidth / 2, -trunkHeight, trunkWidth, trunkHeight)
    .fill({ color: trunkColor });

  const crownHeight = height - trunkHeight;
  const crownLevels = 4;
  const crownLevelHeight = crownHeight / crownLevels;
  const crownWidthIncrement = width / crownLevels;
  const crownColor = 0x264d3d;

  for (let index = 0; index < crownLevels; index++) {
    const y = -trunkHeight - crownLevelHeight * index;
    const levelWidth = width - crownWidthIncrement * index;
    const offset = index < crownLevels - 1 ? crownLevelHeight / 2 : 0;

    graphics
      .moveTo(-levelWidth / 2, y)
      .lineTo(0, y - crownLevelHeight - offset)
      .lineTo(levelWidth / 2, y)
      .fill({ color: crownColor });
  }

  return graphics;
}
