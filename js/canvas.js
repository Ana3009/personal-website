"use strict";

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ functions  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function drawBar(context, x, y, width, height, c) {
    context.fillStyle = c;
    context.fillRect(x, HEIGHT-y-height, width, height);
}

function drawBars(context, colours, scheme) {
    let numbars = 21;
    let width = WIDTH / numbars;
    for (let i = 0; i < numbars; ++i) {
        let height = heightArr[i] * 45;
        let colour
        if (i % 3 == 1) {
            colour = colours[scheme][0];
        }
        else if (i % 3 == 2) {
            colour = colours[scheme][1]; 
        }
        else {
            colour = colours[scheme][2];
        }
        drawBar(context, width * i, 0, width, height, colour);
    }
}

function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ variables and objects declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

let canvas = document.getElementById("data_canvas");
let context = canvas.getContext("2d");
let WIDTH = canvas.width;
let HEIGHT = canvas.height;
let heightArr = [4, 3, 1, 4, 2, 2, 6, 1, 2, 5, 2, 1, 3, 5, 2, 2, 6, 2, 4, 4, 1]
let activities = {
    "Coursework": 28,
    "Netflix": 23,
    "Exercising": 11
};
let colours = [["rgb(20, 160, 152)", "rgb(204, 204, 204)", "rgb(203, 45, 111)"], ["rgb(255, 255, 255)", "rgb(154, 150, 150)", "rgb(68, 66, 66)"],
                ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)"]];

//the code for the piechart was inspired from 
//https://code.tutsplus.com/tutorials/how-to-draw-a-pie-chart-and-doughnut-chart-using-javascript-and-html5-canvas--cms-27197 

let Piechart = function(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = context;
    this.colors = options.colors;
 
    this.draw = function(){
        let total = 0;
        let color_index = 0;
        for (let activity in this.options.categories) {
            let val = this.options.categories[activity];
            total += val;
        }
 
        let start_angle = 0;
        for (let activity in this.options.categories) {
            let val = this.options.categories[activity];
            let slice_angle = 2 * Math.PI * val / total;
 
            drawPieSlice(
                this.ctx,
                WIDTH / 2,
                HEIGHT /2,
                Math.min(WIDTH / 2, HEIGHT / 2),
                start_angle,
                start_angle + slice_angle,
                this.colors[color_index % this.colors.length]
            );
 
            start_angle += slice_angle;
            color_index++;
        }

        if (this.options.doughnutHoleSize){
            drawPieSlice(
                this.ctx,
                WIDTH / 2,
                HEIGHT /2,
                this.options.doughnutHoleSize * Math.min(WIDTH / 2, HEIGHT / 2),
                0,
                2 * Math.PI,
                "#0f292f"
            );
        }
 
    }
}

let myPiechartStart = new Piechart(
    {
        canvas: data_canvas,
        categories: activities,
        colors: ["#cb2d6f","#14a098", "#cccccc"]
    }
);

let myPiechartGreys = new Piechart(
    {
        canvas: data_canvas,
        categories: activities,
        colors: ["#ffffff","#9a9696", "#444242"]
    }
);

let myPiechartRgb = new Piechart(
    {
        canvas: data_canvas,
        categories: activities,
        colors: ["#ff0000","#00ff00", "#0000ff"]
    }
);

let myDoughnutchartStart = new Piechart(
    {
        canvas: data_canvas,
        categories: activities,
        colors: ["#cb2d6f","#14a098", "#cccccc"], 
        doughnutHoleSize: 0.5
    }
);

let myDoughnutchartGreys = new Piechart(
    {
        canvas: data_canvas,
        categories: activities,
        colors: ["#ffffff","#9a9696", "#444242"], 
        doughnutHoleSize: 0.5
    }
);

let myDoughnutchartRgb = new Piechart(
    {
        canvas: data_canvas,
        categories: activities,
        colors: ["#ff0000","#00ff00", "#0000ff"], 
        doughnutHoleSize: 0.5
    }
);

let bar = 1;
let donut = 0;
let pie = 0;

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ main program ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

drawBars(context, colours, 0);

//changing betweeen the vizualisations with the first three buttons

document.getElementById('pie').addEventListener('click', () => {
    document.getElementById("names").style.display = "none";
    context.clearRect(0, 0, WIDTH, HEIGHT);
    myPiechartStart.draw();
    pie = 1;
    bar = donut = 0;
    document.getElementById('pink').style.backgroundColor = "rgb(203, 45, 111)";
    document.getElementById('green').style.backgroundColor = "rgb(20, 160, 152)";
    document.getElementById('white').style.backgroundColor = "rgb(204, 204, 204)";
}); 

document.getElementById('bar').addEventListener('click', () => {
    document.getElementById("names").style.display = "block";
    context.clearRect(0, 0, WIDTH, HEIGHT);
    drawBars(context, colours, 0);
    bar = 1;
    pie = donut = 0;
    document.getElementById('pink').style.backgroundColor = "rgb(203, 45, 111)";
    document.getElementById('green').style.backgroundColor = "rgb(20, 160, 152)";
    document.getElementById('white').style.backgroundColor = "rgb(204, 204, 204)";
}); 

document.getElementById('doughnut').addEventListener('click', () => {
    document.getElementById("names").style.display = "none";
    context.clearRect(0, 0, WIDTH, HEIGHT);
    myDoughnutchartStart.draw(context);
    donut = 1;
    pie = bar = 0;
    document.getElementById('pink').style.backgroundColor = "rgb(203, 45, 111)";
    document.getElementById('green').style.backgroundColor = "rgb(20, 160, 152)";
    document.getElementById('white').style.backgroundColor = "rgb(204, 204, 204)";
}); 

//changing between the color scales with the other three buttons

document.getElementById('start').addEventListener('click', () => {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    if (!bar) {
        document.getElementById("names").style.display = "none";
        if (pie) {
            myPiechartStart.draw(context);
        }
        else {
            myDoughnutchartStart.draw(context);
        }
    }
    else {
        drawBars(context, colours, 0);
    }
    document.getElementById('pink').style.backgroundColor = "rgb(203, 45, 111)";
    document.getElementById('green').style.backgroundColor = "rgb(20, 160, 152)";
    document.getElementById('white').style.backgroundColor = "rgb(204, 204, 204)";
}); 

document.getElementById('greys').addEventListener('click', () => {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    if (!bar) {
        document.getElementById("names").style.display = "none";
        if (pie) {
            myPiechartGreys.draw(context);
        }
        else {
            myDoughnutchartGreys.draw(context);
        }
    }
    else {
        drawBars(context, colours, 1);
    } 
    document.getElementById('pink').style.backgroundColor = "rgb(255, 255, 255)";
    document.getElementById('green').style.backgroundColor = "rgb(154, 150, 150)";
    document.getElementById('white').style.backgroundColor = "rgb(68, 66, 66)";
}); 

document.getElementById('rgb').addEventListener('click', () => {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    if (!bar) {
        document.getElementById("names").style.display = "none";
        if (pie) {
            myPiechartRgb.draw(context);
        }
        else {
            myDoughnutchartRgb.draw(context);
        }
    }
    else {
        drawBars(context, colours, 2);
    }
    document.getElementById('pink').style.backgroundColor = "rgb(255, 0, 0)";
    document.getElementById('green').style.backgroundColor = "rgb(0, 255, 0)";
    document.getElementById('white').style.backgroundColor = "rgb(0, 0, 255)";   
}); 