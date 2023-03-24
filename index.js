let outlineStroke = anime({
    targets: "#jessica path",
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 2500,
    loop: false
});

let fadeUp = anime({
    targets: '#grid-item3',
    easing: 'easeOutCirc',
    duration: 1000,
    loop: false,
    autoplay: true,
    translateY: -60,
});

let bouncingBall = anime({
	targets: '#period',
	translateY: ['-55', '0', '-18','0', '-8', '0', '-4','0', '-2','0'],
    delay: 800,
	duration: 5000,
	loop: false,
	direction: 'alternate',
	easing: 'easeInOutSine',
});

