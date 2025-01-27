const { getKanjiData } = require('@kanji-database/kanji-database');
const Bezier = require('bezier-js');
const svgPathParser = require('svg-path-parser');

class KanjiVGHandler {
    constructor() {
        this.cache = new Map();
    }

    async loadKanjiStrokes(kanji) {
        try {
            if (this.cache.has(kanji)) {
                return this.cache.get(kanji);
            }

            const kanjiData = await getKanjiData(kanji);
            if (!kanjiData || !kanjiData.strokePaths) {
                throw new Error(`No stroke data found for kanji: ${kanji}`);
            }

            const strokes = kanjiData.strokePaths.map(path => this.parseSVGPath(path));
            this.cache.set(kanji, strokes);
            return strokes;
        } catch (error) {
            console.error(`Error loading kanji ${kanji}:`, error);
            return null;
        }
    }

    parseSVGPath(pathData) {
        const commands = svgPathParser(pathData);
        return this.convertCommandsToPoints(commands);
    }

    convertCommandsToPoints(commands) {
        const points = [];
        let currentX = 0;
        let currentY = 0;

        commands.forEach(cmd => {
            switch (cmd.code) {
                case 'M':
                case 'L':
                    points.push({
                        x: this.normalizeCoordinate(cmd.x),
                        y: this.normalizeCoordinate(cmd.y)
                    });
                    currentX = cmd.x;
                    currentY = cmd.y;
                    break;
                case 'C':
                    // Convert bezier curve to points
                    const curve = new Bezier(
                        currentX, currentY,
                        cmd.x1, cmd.y1,
                        cmd.x2, cmd.y2,
                        cmd.x, cmd.y
                    );
                    // Get more points for smoother curves
                    const curvePoints = curve.getLUT(15);
                    curvePoints.forEach(p => points.push({
                        x: this.normalizeCoordinate(p.x),
                        y: this.normalizeCoordinate(p.y)
                    }));
                    currentX = cmd.x;
                    currentY = cmd.y;
                    break;
            }
        });

        return points;
    }

    normalizeCoordinate(value) {
        // The kanji database uses a different coordinate system, normalize to our 300x300
        return (value / 100) * 300;
    }
}

module.exports = KanjiVGHandler;
