let fadeUp = anime({
    targets: '#grid-item3',
    easing: 'easeOutCirc',
    duration: 1000,
    loop: false,
    autoplay: true,
    translateY: -70,
    opacity: [0,1],
});


let cardStarter = anime({
    targets: ".inner-card",
    duration: 2000,
    elasticity: 100,
    loop: false,
    translateY: [100, 0],
    opacity: [0, 1],
})