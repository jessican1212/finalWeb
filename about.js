let fadeUp = anime({
    targets: '#grid-item3',
    easing: 'easeOutCirc',
    duration: 1000,
    loop: false,
    autoplay: true,
    translateY: -70,
    opacity: [0,1],
});

const boxes = document.querySelectorAll('.box');

let stagger = anime({
    targets: boxes,
    color: "#ffffff",
    backgroundColor: ["hsl(186, 42%, 44%)", "hsl(5, 77%, 92%)", "hsl(219, 100%, 10%)"],
    scale: [1, 0.9, 1],
    easing: 'linear',
    delay: anime.stagger(150, {grid: [9, 3], from: 'center'}),
    autoplay: false,
})
