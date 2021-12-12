const path = require('path');
const Jimp = require('jimp');
const { createCanvas } = require('canvas')

const baseSpellDir = path.join(__dirname,'..','..','public', 'assets','spells');

const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 320;
const ASPECT_RATIO = CANVAS_WIDTH / CANVAS_HEIGHT;
const CANVAS_MARGIN = 64;
const LINE_SIZE = 20;

const EPSILON = 1e-4;
const SIMILARITY_THRESHOLD = 0.15;

const transformPoint = (p, medX, medY, scale) => {

    const x = (p[0] - medX) * scale; // -1.5/2 to 1.5/2
    const y = (p[1] - medY) * scale; // -1/2 to 1/2
    // cord system is reversed for y in canvas, need to account for that as well.
    const cx = CANVAS_WIDTH * (1/2 + x/ASPECT_RATIO) + CANVAS_MARGIN + LINE_SIZE/2;
    const cy = CANVAS_HEIGHT * (1/2 - y) + CANVAS_MARGIN + LINE_SIZE/2;
    return [cx,cy];
}

const similarityCheck = async (points, spell) => {
    let min = points[0].map((x, i) => 
        Math.min(...points.map((p) => p[i]))
    );
    let max = points[0].map((x, i) => 
        Math.max(...points.map((p) => p[i]))
    );
    min.forEach((v, i) => {
        if (max[i] - v < EPSILON) {
            throw new Error('points are too close!');
        }
    })

    const scale = Math.min(ASPECT_RATIO/(max[0]-min[0]), 1/(max[1]-min[1]));
    const medX = (max[0]+min[0])/2;
    const medY = (max[1]+min[1])/2;

    const canvas = createCanvas(CANVAS_WIDTH+2*CANVAS_MARGIN, CANVAS_HEIGHT+2*CANVAS_MARGIN);
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(...transformPoint(points[0], medX, medY, scale));
    for (let i = 1; i < points.length;++i) {
        ctx.lineTo(...transformPoint(points[i], medX, medY, scale));
    }
    ctx.lineWidth = LINE_SIZE;
    ctx.strokeStyle='#9e9174';
    ctx.stroke();
    ctx.lineWidth = LINE_SIZE-4;
    ctx.strokeStyle='#0c3240';
    ctx.stroke();
    const buff = canvas.toBuffer('image/png', { compressionLevel: 3, filters: canvas.PNG_FILTER_NONE })

    const spellPath = path.join(baseSpellDir, spell.image.split('/').reverse()[0]);

    const spellImg = await Jimp.read(spellPath);
    const drawnImg = await Jimp.read(buff);
    // await drawnImg.writeAsync('lumossss.png');

    const distance = Jimp.distance(spellImg, drawnImg);
    const diff = Jimp.diff(spellImg, drawnImg).percent;
    // console.log('distance', distance, 'diff', diff);
    const isSimilar = distance <= SIMILARITY_THRESHOLD || diff <= SIMILARITY_THRESHOLD;
    return {
        buffer,
        isSimilar
    };
}

if (!module.parent) {
/**/
    const samplePoints = [[-0.5,-0.5],[0,0.5],[0.5,-0.5],[0.6,-0.6]];
    similarityCheck(samplePoints, {
        title: 'lumos',
        description: 'light up!',
        image: 'https://api.wanderapp.cf/assets/spells/lumos.png',
    }).then((res) => {
        console.log(res);
        process.exit(0);
    }).catch((e) => {
        console.error(e);
        process.exit(1);
    })
/*/
    const samplePoints = [];
    for (let i = 0; i < 10; ++i) {
        samplePoints.push([Math.random(), Math.random()]);
    }
    similarityCheck(samplePoints, {
        title: 'lumos',
        description: 'light up!',
        image: 'https://api.wanderapp.cf/assets/spells/lumos.png',
    }).then((res) => {
        console.log(res);
        process.exit(0);
    }).catch((e) => {
        console.error(e);
        process.exit(1);
    })
    /**/
}

exports.similarityCheck = similarityCheck;