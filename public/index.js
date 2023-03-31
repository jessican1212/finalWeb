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
    opacity: [0,1],
});

let bouncingBall = anime({
	targets: '#period',
	translateY: ['-55', '0', '-18','0', '-8', '0', '-4','0', '-2','0', '-1', '0', '-0.3', '0'],
    delay: 1000,
	duration: 7000,
	loop: false,
	easing: 'easeInOutSine',
});

let textChanger = anime({
    targets: '.sliding span',
    keyframes: [
      {translateX: -50, opacity: 0, duration:0},
      {translateX: 0, opacity:1, duration: 300},
      {translateX: 50, opacity:0,delay: 1100, duration:300},
    ],
    easing: 'linear',
    delay: anime.stagger(1400, {start: 0}),
    loop: true
  });
