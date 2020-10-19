'use strict';

class GearAnimation {
	constructor (htmlId) {
		this.canvas = document.getElementById(htmlId);
		this.ctx = canvas.getContext('2d');
		this.gear = [];
	}

	add(x, y, teethSize, teethCount, initPhase, teethSpeed, support, axisRatio) {
		this.gear.push([
			x, y, //[0,1] = axis position
			teethSize, teethCount, //[2,3] = teeth size and count
			initPhase, //[4] = current phase
			teethSpeed / teethCount,
			support, axisRatio
		]);
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.lastDrawTimestamp = this.lastDrawTimestamp ?? 0;
		let currentDrawTimestamp = new Date().getTime();
		let speedRatio = 0.02 * (currentDrawTimestamp - this.lastDrawTimestamp);
		
		this.gear.map( (x) => {
			x[4] += speedRatio * x[5];
			this.drawGear1(x[0], x[1], x[2], x[3], x[4], x[6], x[7]);
		} );

		this.lastDrawTimestamp = currentDrawTimestamp;
		window.requestAnimationFrame(() => {this.draw()});
	}

	drawGear1(x, y, teethSize, teethCount, phase, support, axisRatio) {
		let r = 2*teethSize*teethCount/Math.PI;

		this.ctx.beginPath();
		this.ctx.arc(x, y, r*0.98, 0, 2*Math.PI);
		this.ctx.stroke();

		this.ctx.beginPath();
		let a = phase;
		let x1 = 2*Math.PI / teethCount * 0.1;
		let x4 = 2*Math.PI / teethCount * 0.4;
		this.ctx.moveTo( x+r*Math.cos(a), y+r*Math.sin(a) )
		for (let i = 0; i < teethCount; i++) {
			a += x4;
			this.ctx.lineTo( x+r*Math.cos(a), y+r*Math.sin(a) );
			a += x1;
			this.ctx.lineTo( x+(r+teethSize)*Math.cos(a), y+(r+teethSize)*Math.sin(a) );
			a += x4;
			this.ctx.lineTo( x+(r+teethSize)*Math.cos(a), y+(r+teethSize)*Math.sin(a) );
			a += x1;
			this.ctx.lineTo( x+r*Math.cos(a), y+r*Math.sin(a) );
		}
		this.ctx.stroke();

		let diffSupport = 2 * Math.PI / support;
		let a1 = diffSupport * 0.05;
		let a2 = diffSupport * 0.45;
		let a3 = diffSupport * 0.55;
		let a4 = diffSupport * 0.95;
		for (let i = 0; i < support; i++) {
			let a = phase + i * diffSupport;
			let p1 = [ x+r*0.9*Math.cos(a+a1), y+r*0.9*Math.sin(a+a1) ];
			let p2 = [ x+r*axisRatio*Math.cos(a+a2), y+r*axisRatio*Math.sin(a+a2) ];
			let p3 = [ x+r*axisRatio*Math.cos(a+a3), y+r*axisRatio*Math.sin(a+a3) ];
			let p4 = [ x+r*0.9*Math.cos(a+a4), y+r*0.9*Math.sin(a+a4) ];
			this.ctx.beginPath();
			this.ctx.moveTo( p1[0], p1[1] );
			this.ctx.lineTo( p2[0], p2[1] );
			this.ctx.stroke();
			this.ctx.beginPath();
			this.ctx.moveTo( p3[0], p3[1] );
			this.ctx.lineTo( p4[0], p4[1] );
			this.ctx.stroke();
/*			this.ctx.beginPath();
			this.ctx.arc(x, y, r*axisRatio, a2, a3);
			this.ctx.stroke();
			this.ctx.beginPath();
			this.ctx.arc(x, y, r*0.9, a1, a4);
			this.ctx.stroke();*/
		}

		this.ctx.beginPath();
		this.ctx.arc(x, y, r*axisRatio, 0, 2*Math.PI);
		this.ctx.stroke();
		this.ctx.beginPath();
		this.ctx.arc(x, y, r*0.9, 0, 2*Math.PI);
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.arc(x, y, r*axisRatio*0.85, 0, 2*Math.PI);
		this.ctx.stroke();
	}
}
