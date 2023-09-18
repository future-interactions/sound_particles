let mic, fft;

function setup() {
  createCanvas(displayWidth, displayHeight, WEBGL);
  noFill();

  mic = new p5.AudioIn();
  mic.start();
  //getAudioContext().resume();
  fft = new p5.FFT();
  fft.setInput(mic);
  strokeWeight(0.9);
  //rectMode(CENTER);
  //background(0);
}

function draw() {
  orbitControl();

  noStroke();
  background(0);
  let spectrum = fft.analyze();
  for (j = 0; j < 360; j+=60) {
    rotateX(radians(j));
    for (i = 0; i < spectrum.length; i++) {
      if (spectrum[i] > 0) {
        stroke(150 - spectrum[i]);
        // stroke(255);
      } else {
        stroke(0);
      }
      let x = displayWidth / spectrum.length * i;
      point(-width / 2 + x * 1.2, -spectrum[i]);
      point(-width / 2 + x * 1.2, spectrum[i]);
    }
  }
}
function touchStarted() {
  getAudioContext().resume();
}