document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const clearButton = document.getElementById('clearButton');
    const nextButton = document.getElementById('nextButton');
    const currentKanji = document.getElementById('currentKanji');
    const hiragana = document.getElementById('hiragana');
    const romaji = document.getElementById('romaji');
    const kanjiMeaning = document.getElementById('kanjiMeaning');
    const difficultyStars = document.getElementById('difficultyStars');
    const exampleContainer = document.getElementById('exampleContainer');

    // Initialize state
    let currentKanjiIndex = 0;
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Setup canvas
    function setupCanvas() {
        canvas.width = 300;
        canvas.height = 300;
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Add white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Enable smooth lines
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
    }

    // Drawing functions
    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = getMousePos(canvas, e);
    }

    function draw(e) {
        if (!isDrawing) return;
        const [currentX, currentY] = getMousePos(canvas, e);
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        
        // Calculate the midpoint for smoother curves
        const midPoint = {
            x: (lastX + currentX) / 2,
            y: (lastY + currentY) / 2
        };
        
        // Use quadratic curves for smoother lines
        ctx.quadraticCurveTo(lastX, lastY, midPoint.x, midPoint.y);
        
        // Vary line width based on speed for more natural strokes
        const speed = Math.sqrt(
            Math.pow(currentX - lastX, 2) + 
            Math.pow(currentY - lastY, 2)
        );
        ctx.lineWidth = Math.max(4, 12 - speed / 10);
        
        ctx.stroke();
        [lastX, lastY] = [currentX, currentY];
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function getMousePos(canvas, e) {
        const rect = canvas.getBoundingClientRect();
        return [
            e.clientX - rect.left,
            e.clientY - rect.top
        ];
    }

    function clearCanvas() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 8;
    }

    // Function to display difficulty stars
    function displayDifficultyStars(difficulty) {
        let stars = '';
        for (let i = 0; i < difficulty; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        difficultyStars.innerHTML = stars;
    }

    // Function to shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Basic kanji list for practice with stroke counts and difficulty ratings
    const numberKanji = [
        { kanji: '一', hiragana: 'いち', romaji: 'ichi', meaning: 'One', difficulty: 1, strokes: 1, example: { japanese: '一つください。', furigana: 'ひとつください。', meaning: 'ひとつください。One please.' } },
        { kanji: '二', hiragana: 'に', romaji: 'ni', meaning: 'Two', difficulty: 1, strokes: 2, example: { japanese: '二人です。', furigana: 'ふたりです。', meaning: 'ふたりです。It is two people.' } },
        { kanji: '三', hiragana: 'さん', romaji: 'san', meaning: 'Three', difficulty: 1, strokes: 3, example: { japanese: '三回見ました。', furigana: 'さんかいみました。', meaning: 'さんかいみました。I saw it three times.' } },
        { kanji: '四', hiragana: 'よん', romaji: 'yon', meaning: 'Four', difficulty: 1, strokes: 5, example: { japanese: '四時です。', furigana: 'よじです。', meaning: 'よじです。It is 4 o\'clock.' } },
        { kanji: '五', hiragana: 'ご', romaji: 'go', meaning: 'Five', difficulty: 1, strokes: 4, example: { japanese: '五日です。', furigana: 'いつかです。', meaning: 'いつかです。It is the 5th day.' } },
        { kanji: '六', hiragana: 'ろく', romaji: 'roku', meaning: 'Six', difficulty: 1, strokes: 4, example: { japanese: '六月です。', furigana: 'ろくがつです。', meaning: 'ろくがつです。It is June.' } },
        { kanji: '七', hiragana: 'なな', romaji: 'nana', meaning: 'Seven', difficulty: 1, strokes: 2, example: { japanese: '七時です。', furigana: 'しちじです。', meaning: 'しちじです。It is 7 o\'clock.' } },
        { kanji: '八', hiragana: 'はち', romaji: 'hachi', meaning: 'Eight', difficulty: 1, strokes: 2, example: { japanese: '八月です。', furigana: 'はちがつです。', meaning: 'はちがつです。It is August.' } },
        { kanji: '九', hiragana: 'きゅう', romaji: 'kyuu', meaning: 'Nine', difficulty: 1, strokes: 2, example: { japanese: '九時です。', furigana: 'くじです。', meaning: 'くじです。It is 9 o\'clock.' } },
        { kanji: '十', hiragana: 'じゅう', romaji: 'juu', meaning: 'Ten', difficulty: 1, strokes: 2, example: { japanese: '十分です。', furigana: 'じゅっぷんです。', meaning: 'じゅっぷんです。It is 10 minutes.' } }
    ];

    const oneStarKanji = [
        { kanji: '人', hiragana: 'ひと', romaji: 'hito', meaning: 'Person', difficulty: 1, strokes: 2, example: { japanese: '人です。', furigana: 'ひとです。', meaning: 'ひとです。It is a person.' } },
        { kanji: '入', hiragana: 'はい', romaji: 'hai', meaning: 'Enter', difficulty: 1, strokes: 2, example: { japanese: '入ります。', furigana: 'はいります。', meaning: 'はいります。I will enter.' } },
        { kanji: '大', hiragana: 'おお', romaji: 'oo', meaning: 'Big, Large', difficulty: 1, strokes: 3, example: { japanese: '大きい。', furigana: 'おおきい。', meaning: 'おおきい。Big.' } },
        { kanji: '山', hiragana: 'やま', romaji: 'yama', meaning: 'Mountain', difficulty: 1, strokes: 3, example: { japanese: '山です。', furigana: 'やまです。', meaning: 'やまです。It is a mountain.' } },
        { kanji: '子', hiragana: 'こ', romaji: 'ko', meaning: 'Child', difficulty: 1, strokes: 3, example: { japanese: '子です。', furigana: 'こです。', meaning: 'こです。It is a child.' } },
        { kanji: '小', hiragana: 'ちい', romaji: 'chi', meaning: 'Small', difficulty: 1, strokes: 3, example: { japanese: '小さい。', furigana: 'ちいさい。', meaning: 'ちいさい。Small.' } },
        { kanji: '上', hiragana: 'うえ', romaji: 'ue', meaning: 'Up, Above', difficulty: 1, strokes: 3, example: { japanese: '上です。', furigana: 'うえです。', meaning: 'うえです。It is up.' } },
        { kanji: '下', hiragana: 'した', romaji: 'shita', meaning: 'Down, Below', difficulty: 1, strokes: 3, example: { japanese: '下です。', furigana: 'したです。', meaning: 'したです。It is down.' } },
        { kanji: '川', hiragana: 'かわ', romaji: 'kawa', meaning: 'River', difficulty: 1, strokes: 3, example: { japanese: '川です。', furigana: 'かわです。', meaning: 'かわです。It is a river.' } }
    ];

    const twoStarKanji = [
        { kanji: '月', hiragana: 'つき', romaji: 'tsuki', meaning: 'Moon, Month', difficulty: 2, strokes: 4, example: { japanese: '月です。', furigana: 'つきです。', meaning: 'つきです。It is the moon.' } },
        { kanji: '日', hiragana: 'ひ', romaji: 'hi', meaning: 'Sun, Day', difficulty: 2, strokes: 4, example: { japanese: '日です。', furigana: 'ひです。', meaning: 'ひです。It is the sun.' } },
        { kanji: '年', hiragana: 'とし', romaji: 'toshi', meaning: 'Year', difficulty: 2, strokes: 6, example: { japanese: '年です。', furigana: 'としです。', meaning: 'としです。It is the year.' } },
        { kanji: '中', hiragana: 'なか', romaji: 'naka', meaning: 'Middle, Inside', difficulty: 2, strokes: 4, example: { japanese: '中です。', furigana: 'なかです。', meaning: 'なかです。It is inside.' } },
        { kanji: '白', hiragana: 'しろ', romaji: 'shiro', meaning: 'White', difficulty: 2, strokes: 5, example: { japanese: '白です。', furigana: 'しろです。', meaning: 'しろです。It is white.' } },
        { kanji: '百', hiragana: 'ひゃく', romaji: 'hyaku', meaning: 'Hundred', difficulty: 2, strokes: 6, example: { japanese: '百円。', furigana: 'ひゃくえん。', meaning: 'ひゃくえん。100 yen.' } },
        { kanji: '木', hiragana: 'き', romaji: 'ki', meaning: 'Tree, Wood', difficulty: 2, strokes: 4, example: { japanese: '木です。', furigana: 'きです。', meaning: 'きです。It is a tree.' } },
        { kanji: '本', hiragana: 'ほん', romaji: 'hon', meaning: 'Book', difficulty: 2, strokes: 5, example: { japanese: '本です。', furigana: 'ほんです。', meaning: 'ほんです。It is a book.' } },
        { kanji: '火', hiragana: 'ひ', romaji: 'hi', meaning: 'Fire', difficulty: 2, strokes: 4, example: { japanese: '火です。', furigana: 'ひです。', meaning: 'ひです。It is fire.' } },
        { kanji: '水', hiragana: 'みず', romaji: 'mizu', meaning: 'Water', difficulty: 2, strokes: 4, example: { japanese: '水です。', furigana: 'みずです。', meaning: 'みずです。It is water.' } },
        { kanji: '手', hiragana: 'て', romaji: 'te', meaning: 'Hand', difficulty: 2, strokes: 4, example: { japanese: '手です。', furigana: 'てです。', meaning: 'てです。It is a hand.' } },
        { kanji: '足', hiragana: 'あし', romaji: 'ashi', meaning: 'Foot, Leg', difficulty: 2, strokes: 7, example: { japanese: '足です。', furigana: 'あしです。', meaning: 'あしです。It is a foot.' } },
        { kanji: '目', hiragana: 'め', romaji: 'me', meaning: 'Eye', difficulty: 2, strokes: 5, example: { japanese: '目です。', furigana: 'めです。', meaning: 'めです。It is an eye.' } },
        { kanji: '耳', hiragana: 'みみ', romaji: 'mimi', meaning: 'Ear', difficulty: 2, strokes: 6, example: { japanese: '耳です。', furigana: 'みみです。', meaning: 'みみです。It is an ear.' } },
        { kanji: '口', hiragana: 'くち', romaji: 'kuchi', meaning: 'Mouth', difficulty: 2, strokes: 3, example: { japanese: '口です。', furigana: 'くちです。', meaning: 'くちです。It is a mouth.' } },
        { kanji: '田', hiragana: 'た', romaji: 'ta', meaning: 'Rice Field', difficulty: 2, strokes: 5, example: { japanese: '田です。', furigana: 'たです。', meaning: 'たです。It is a rice field.' } },
        { kanji: '気', hiragana: 'き', romaji: 'ki', meaning: 'Spirit, Energy', difficulty: 2, strokes: 6, example: { japanese: '気です。', furigana: 'きです。', meaning: 'きです。It is spirit.' } },
        { kanji: '生', hiragana: 'せい', romaji: 'sei', meaning: 'Life', difficulty: 2, strokes: 5, example: { japanese: '生きる。', furigana: 'いきる。', meaning: 'いきる。To live.' } }
    ];

    const threeStarKanji = [
        { kanji: '金', hiragana: 'かね', romaji: 'kane', meaning: 'Money, Gold', difficulty: 3, strokes: 8, example: { japanese: '金です。', furigana: 'かねです。', meaning: 'かねです。It is money.' } },
        { kanji: '雨', hiragana: 'あめ', romaji: 'ame', meaning: 'Rain', difficulty: 3, strokes: 8, example: { japanese: '雨です。', furigana: 'あめです。', meaning: 'あめです。It is raining.' } },
        { kanji: '青', hiragana: 'あお', romaji: 'ao', meaning: 'Blue', difficulty: 3, strokes: 8, example: { japanese: '青です。', furigana: 'あおです。', meaning: 'あおです。It is blue.' } },
        { kanji: '空', hiragana: 'そら', romaji: 'sora', meaning: 'Sky', difficulty: 3, strokes: 8, example: { japanese: '空です。', furigana: 'そらです。', meaning: 'そらです。It is the sky.' } },
        { kanji: '海', hiragana: 'うみ', romaji: 'umi', meaning: 'Sea', difficulty: 3, strokes: 9, example: { japanese: '海です。', furigana: 'うみです。', meaning: 'うみです。It is the sea.' } },
        { kanji: '音', hiragana: 'おと', romaji: 'oto', meaning: 'Sound', difficulty: 3, strokes: 9, example: { japanese: '音です。', furigana: 'おとです。', meaning: 'おとです。It is a sound.' } },
        { kanji: '草', hiragana: 'くさ', romaji: 'kusa', meaning: 'Grass', difficulty: 3, strokes: 9, example: { japanese: '草です。', furigana: 'くさです。', meaning: 'くさです。It is grass.' } },
        { kanji: '林', hiragana: 'はやし', romaji: 'hayashi', meaning: 'Forest', difficulty: 3, strokes: 8, example: { japanese: '林です。', furigana: 'はやしです。', meaning: 'はやしです。It is a forest.' } },
        { kanji: '森', hiragana: 'もり', romaji: 'mori', meaning: 'Dense Forest', difficulty: 3, strokes: 12, example: { japanese: '森です。', furigana: 'もりです。', meaning: 'もりです。It is a forest.' } },
        { kanji: '天', hiragana: 'てん', romaji: 'ten', meaning: 'Heaven', difficulty: 3, strokes: 4, example: { japanese: '天です。', furigana: 'てんです。', meaning: 'てんです。It is heaven.' } },
        { kanji: '女', hiragana: 'おんな', romaji: 'onna', meaning: 'Woman', difficulty: 3, strokes: 3, example: { japanese: '女です。', furigana: 'おんなです。', meaning: 'おんなです。It is a woman.' } },
        { kanji: '男', hiragana: 'おとこ', romaji: 'otoko', meaning: 'Man', difficulty: 3, strokes: 7, example: { japanese: '男です。', furigana: 'おとこです。', meaning: 'おとこです。It is a man.' } },
        { kanji: '見', hiragana: 'み', romaji: 'mi', meaning: 'See', difficulty: 3, strokes: 7, example: { japanese: '見ます。', furigana: 'みます。', meaning: 'みます。I see.' } },
        { kanji: '聞', hiragana: 'き', romaji: 'ki', meaning: 'Hear, Ask', difficulty: 3, strokes: 14, example: { japanese: '聞きます。', furigana: 'ききます。', meaning: 'ききます。I hear.' } },
        { kanji: '食', hiragana: 'た', romaji: 'ta', meaning: 'Eat', difficulty: 3, strokes: 9, example: { japanese: '食べます。', furigana: 'たべます。', meaning: 'たべます。I eat.' } },
        { kanji: '飲', hiragana: 'の', romaji: 'no', meaning: 'Drink', difficulty: 3, strokes: 12, example: { japanese: '飲みます。', furigana: 'のみます。', meaning: 'のみます。I drink.' } },
        { kanji: '読', hiragana: 'よ', romaji: 'yo', meaning: 'Read', difficulty: 3, strokes: 14, example: { japanese: '読みます。', furigana: 'よみます。', meaning: 'よみます。I read.' } },
        { kanji: '書', hiragana: 'か', romaji: 'ka', meaning: 'Write', difficulty: 3, strokes: 10, example: { japanese: '書きます。', furigana: 'かきます。', meaning: 'かきます。I write.' } },
        { kanji: '話', hiragana: 'はな', romaji: 'hana', meaning: 'Speak, Talk', difficulty: 3, strokes: 13, example: { japanese: '話します。', furigana: 'はなします。', meaning: 'はなします。I speak.' } },
        { kanji: '車', hiragana: 'くるま', romaji: 'kuruma', meaning: 'Car', difficulty: 3, strokes: 7, example: { japanese: '車です。', furigana: 'くるまです。', meaning: 'くるまです。It is a car.' } },
        { kanji: '魚', hiragana: 'さかな', romaji: 'sakana', meaning: 'Fish', difficulty: 3, strokes: 11, example: { japanese: '魚です。', furigana: 'さかなです。', meaning: 'さかなです。It is a fish.' } },
        { kanji: '鳥', hiragana: 'とり', romaji: 'tori', meaning: 'Bird', difficulty: 3, strokes: 11, example: { japanese: '鳥です。', furigana: 'とりです。', meaning: 'とりです。It is a bird.' } },
        { kanji: '羽', hiragana: 'はね', romaji: 'hane', meaning: 'Feather', difficulty: 3, strokes: 6, example: { japanese: '羽です。', furigana: 'はねです。', meaning: 'はねです。It is a feather.' } },
        { kanji: '花', hiragana: 'はな', romaji: 'hana', meaning: 'Flower', difficulty: 3, strokes: 7, example: { japanese: '花です。', furigana: 'はなです。', meaning: 'はなです。It is a flower.' } }
    ];

    // Combine the kanji lists with numbers first, then shuffled difficulty groups
    const kanjiList = [
        ...numberKanji,
        ...shuffleArray(oneStarKanji),
        ...shuffleArray(twoStarKanji),
        ...shuffleArray(threeStarKanji)
    ];

    // Update displayed kanji
    function updateKanji() {
        const currentKanji = kanjiList[currentKanjiIndex];
        document.getElementById('currentKanji').textContent = currentKanji.kanji;
        document.getElementById('hiragana').textContent = currentKanji.hiragana;
        document.getElementById('romaji').textContent = currentKanji.romaji;
        document.getElementById('kanjiMeaning').textContent = currentKanji.meaning;
        displayDifficultyStars(currentKanji.difficulty);
        
        // Update example sentence
        const exampleContainer = document.getElementById('exampleContainer');
        const example = currentKanji.example;
        
        exampleContainer.innerHTML = `
            <div class="example-japanese">${example.japanese}</div>
            <div class="example-meaning">${example.meaning}</div>
        `;
        
        // Clear the canvas
        clearCanvas();
    }

    // Next kanji
    nextButton.addEventListener('click', () => {
        currentKanjiIndex = (currentKanjiIndex + 1) % kanjiList.length;
        updateKanji();
    });

    // Drawing event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events support
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        if (touch.force) {
            ctx.lineWidth = Math.max(8, touch.force * 20);
        }
        startDrawing(touch);
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        if (touch.force) {
            ctx.lineWidth = Math.max(8, touch.force * 20);
        }
        draw(touch);
    });
    
    canvas.addEventListener('touchend', stopDrawing);

    clearButton.addEventListener('click', clearCanvas);

    // Initialize
    setupCanvas();
    updateKanji();
});
