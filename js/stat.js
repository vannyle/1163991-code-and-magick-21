"use strict";
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const MARGIN = 10;
const FONT_GAP = 20;

const HISTOGRAM_HEIGHT = 150;
const BAR_WIDTH = 40;
const barHeight = HISTOGRAM_HEIGHT - FONT_GAP;
const GAP = 50;
const MY_COLOR = `rgba(255, 0, 0, 1)`;
const TEXT_COLOR = `#000`;


const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = (ctx, names, times) => {
  renderCloud(ctx, CLOUD_X + MARGIN, CLOUD_Y + MARGIN, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#ffffff`);
  ctx.fillStyle = `#000000`;
  ctx.font = `16px PT Mono`;
  ctx.fillText(`Ура вы победили!`, CLOUD_X + MARGIN + FONT_GAP, CLOUD_Y + MARGIN + FONT_GAP);
  ctx.fillText(`Список результатов:`, CLOUD_X + MARGIN + FONT_GAP, CLOUD_Y + MARGIN + FONT_GAP + FONT_GAP);

  const maxTime = getMaxElement(times);


  for (let i = 0; i < names.length; i++) {
    const barH = (barHeight * times[i]) / maxTime;

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(
        names[i],
        CLOUD_X + FONT_GAP * 2 + (GAP + BAR_WIDTH) * i,
        CLOUD_Y + MARGIN + FONT_GAP * 4 + HISTOGRAM_HEIGHT
    );
    ctx.fillText(
        Math.round(times[i]).toString(),
        CLOUD_X + (FONT_GAP * 2) + (GAP + BAR_WIDTH) * i,
        CLOUD_Y + MARGIN + (FONT_GAP * 3) + barHeight - barH
    );

    if (names[i].toLowerCase() === `вы`) {
      ctx.fillStyle = MY_COLOR;
    } else {
      ctx.fillStyle = `hsl(250, ${Math.random() * 100}%, 50%)`;
    }
    ctx.fillRect(
        CLOUD_X + (FONT_GAP * 2) + (GAP + BAR_WIDTH) * i,
        CLOUD_Y + MARGIN + (FONT_GAP * 4) + barHeight - barH,
        BAR_WIDTH,
        barH
    );
  }
};
