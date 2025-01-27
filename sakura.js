class SakuraPetal {
    constructor(container) {
        this.container = container;
        this.element = document.createElement('div');
        this.element.className = 'petal';
        this.reset();
        this.container.appendChild(this.element);
    }

    reset() {
        const startX = Math.random() * window.innerWidth;
        this.x = startX;
        this.y = -10;
        this.rotation = Math.random() * 360;
        this.speed = 1 + Math.random() * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
        this.oscillationSpeed = 1 + Math.random() * 2;
        this.oscillationDistance = 30 + Math.random() * 20;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.transform = `rotate(${this.rotation}deg)`;
    }

    animate() {
        this.y += this.speed;
        this.x += Math.sin(this.y * 0.01) * this.oscillationDistance * 0.1;
        this.rotation += this.rotationSpeed;

        if (this.y > window.innerHeight) {
            this.reset();
        }

        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.transform = `rotate(${this.rotation}deg)`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sakuraContainer = document.createElement('div');
    sakuraContainer.className = 'sakura-container';
    document.body.appendChild(sakuraContainer);

    const petals = Array.from({ length: 30 }, () => new SakuraPetal(sakuraContainer));

    function animate() {
        petals.forEach(petal => petal.animate());
        requestAnimationFrame(animate);
    }

    animate();
});
