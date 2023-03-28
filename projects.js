let fadeUp = anime({
    targets: '#grid-item3',
    easing: 'easeOutCirc',
    duration: 1000,
    loop: false,
    autoplay: true,
    translateY: -70,
    opacity: [0,1],
});

let starter = anime({
    targets: ".project-card",
    duration: 1000,
    easing: 'spring(1, 80, 10, 0)',
    loop: false,
    width: [0, 250],
})

let cardStarter = anime({
    targets: ".inner-card",
    duration: 1800,
    elasticity: 100,
    loop: false,
    translateY: [70, 0],
    opacity: [0 , 1],
    delay: 800,
})