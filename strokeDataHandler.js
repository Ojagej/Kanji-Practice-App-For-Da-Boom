const Bezier = require('bezier-js');

class StrokeDataHandler {
    constructor() {
        this.strokeData = {
            '九': {
                strokes: [
                    // First stroke - Main vertical with left curve
                    [
                        {type: 'M', x: 150, y: 80},
                        {type: 'C', x1: 150, y1: 110, x2: 150, y2: 140, x: 150, y: 170},
                        {type: 'C', x1: 150, y1: 190, x2: 130, y2: 210, x: 90, y: 220}
                    ],
                    // Second stroke - Crossing stroke with upward flick
                    [
                        {type: 'M', x: 90, y: 180},
                        {type: 'C', x1: 120, y1: 185, x2: 150, y2: 185, x: 180, y: 175},
                        {type: 'C', x1: 190, y1: 172, x2: 195, y2: 168, x: 200, y: 165}
                    ]
                ]
            },
            '五': {
                strokes: [
                    // First stroke - Top horizontal
                    [
                        {type: 'M', x: 50, y: 80},
                        {type: 'C', x1: 120, y1: 78, x2: 180, y2: 78, x: 250, y: 80}
                    ],
                    // Second stroke - Left vertical
                    [
                        {type: 'M', x: 70, y: 100},
                        {type: 'C', x1: 68, y1: 140, x2: 68, y2: 180, x: 70, y: 200}
                    ],
                    // Third stroke - Middle horizontal with wave
                    [
                        {type: 'M', x: 50, y: 150},
                        {type: 'C', x1: 100, y1: 140, x2: 150, y2: 150, x: 200, y: 160},
                        {type: 'C', x1: 220, y1: 165, x2: 240, y2: 160, x: 250, y: 150}
                    ],
                    // Fourth stroke - Bottom horizontal
                    [
                        {type: 'M', x: 50, y: 220},
                        {type: 'C', x1: 120, y1: 222, x2: 180, y2: 222, x: 250, y: 220}
                    ]
                ]
            },
            '八': {
                strokes: [
                    // First stroke - Left diagonal with curve
                    [
                        {type: 'M', x: 150, y: 80},
                        {type: 'C', x1: 140, y1: 120, x2: 120, y2: 160, x: 80, y: 220}
                    ],
                    // Second stroke - Right diagonal with curve
                    [
                        {type: 'M', x: 150, y: 80},
                        {type: 'C', x1: 160, y1: 120, x2: 180, y2: 160, x: 220, y: 220}
                    ]
                ]
            }
        };
    }

    getStrokeData(kanji) {
        return this.strokeData[kanji] || null;
    }

    convertToBezierPoints(strokeData, pointsPerCurve = 15) {
        const points = [];
        let lastPoint = null;

        strokeData.forEach(cmd => {
            if (cmd.type === 'M') {
                points.push({x: cmd.x, y: cmd.y});
                lastPoint = {x: cmd.x, y: cmd.y};
            } else if (cmd.type === 'C' && lastPoint) {
                const curve = new Bezier(
                    lastPoint.x, lastPoint.y,
                    cmd.x1, cmd.y1,
                    cmd.x2, cmd.y2,
                    cmd.x, cmd.y
                );
                const curvePoints = curve.getLUT(pointsPerCurve);
                curvePoints.forEach(p => points.push({x: p.x, y: p.y}));
                lastPoint = {x: cmd.x, y: cmd.y};
            }
        });

        return points;
    }

    getStrokePoints(kanji) {
        const data = this.getStrokeData(kanji);
        if (!data) return null;

        return data.strokes.map(stroke => this.convertToBezierPoints(stroke));
    }
}

module.exports = StrokeDataHandler;
