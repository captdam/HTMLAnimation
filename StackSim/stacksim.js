class StackSim {
	constructor (
		dom, // document.getElementById('mydiv')
		pc, // 0
		sp, // 0
		code, // [{display_address, display_instruction, program_to_run}]
		mem // [{display_address, display_data}]
	) {
		this.dom = dom;
		
		this.code = []; // program_to_run
		this.pc_init = pc;
		this.dom_code = document.createElement('div');
		code.map(c => {
			const d = document.createElement('div');
			const d0 = document.createElement('span');
			d0.textContent = c[0];
			const d1 = document.createElement('span');
			d1.textContent = c[1];
			d.replaceChildren(d0, d1);
			this.dom_code.appendChild(d);
			this.code.push(c[2]);
		});

		this.mem_init = [];
		this.sp_init = sp;
		this.dom_mem = document.createElement('div');
		mem.map(m => {
			const d = document.createElement('div');
			const d0 = document.createElement('span');
			d0.textContent = m[0];
			const d1 = document.createElement('span');
			d.replaceChildren(d0, d1);
			this.dom_mem.appendChild(d);
			this.mem_init.push(m[1]);
		})

		this.dom.replaceChildren(this.dom_code, this.dom_mem);
	}
	
	mem_write(addr, content) {
		this.dom_mem.querySelectorAll('div')[addr].querySelectorAll('span')[1].textContent = content;
	}

	display() {
		this.dom_code.querySelectorAll('div').forEach(x => x.style.color = 'inherit');
		this.dom_code.querySelectorAll('div')[this.pc].style.color = 'red';
		this.dom_mem.querySelectorAll('div').forEach(x => x.style.color = 'inherit');
		this.dom_mem.querySelectorAll('div')[this.sp].style.color = 'red';
	}

	reset(event) {
		for (let i = 0; i < this.mem_init.length; i++) {
			this.mem_write(i, this.mem_init[i]);
		}
		this.pc = this.pc_init;
		this.sp = this.sp_init;
		this.display();
	}

	index(event) {
		if (this.pc + 1 == this.code.length)
			throw new Error('End of code');
		this.code[this.pc++]();
		this.display();
	}
}