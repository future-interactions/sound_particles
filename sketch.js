let mic, fft;

function setup() {
  createCanvas(displayWidth, displayHeight);
  noFill();

  mic = new p5.AudioIn();
  mic.start();
  //getAudioContext().resume();
  fft = new p5.FFT();
  fft.setInput(mic);
strokeWeight(2);
//background(0);
}

function draw() {
	noStroke();
	fill(0);
rect(0,0,displayWidth,displayHeight);
  let spectrum = fft.analyze();

 // beginShape();
  for (i = 0; i < spectrum.length; i++) {
	if(spectrum[i]>0){
		stroke(200-spectrum[i]);
    //stroke(255);
	}else{
		stroke(0);
	}
	let x = displayWidth/spectrum.length*i-100;
	point(x*1.5,map(spectrum[i], 0, 255, height/2, 0));
	point(x*1.5,map(spectrum[i]*-1, 0, 255, height/2, 0));

   // vertex(i, map(spectrum[i], 0, 255, height/2, 0));
  }
 // endShape();
}
function touchStarted() {
  getAudioContext().resume();
}