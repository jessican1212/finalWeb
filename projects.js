let fadeUp = anime({
    targets: '#grid-item3',
    easing: 'easeOutCirc',
    duration: 1000,
    loop: false,
    autoplay: true,
    translateY: -70,
});

let starter = anime({
    targets: ".project-card",
    duration: 1000,
    easing: 'easeInOutSine',
    loop: false,
    width: [0, 250],
})

let cardStarter = anime({
    targets: ".inner-card",
    duration: 1800,
    elasticity: 100,
    loop: false,
    translateY: [50, 0],
    opacity: [0 , 1],
    delay: 800,
})