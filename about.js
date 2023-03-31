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
    backgroundColor: ["#FFE58A", "#EE6C45", "#BF3475", "#001233"],
    scale: [1, 0.9, 1],
    easing: 'linear',
    delay: anime.stagger(200, {grid: [9, 3], from: 'center'}),
    autoplay: false,
})
