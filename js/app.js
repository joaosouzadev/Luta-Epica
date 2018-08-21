new Vue({
	el: '#app',
	data: {
		vidaJogador: 100,
		vidaMonstro: 100,
		gameIsRunning: false,
	},
	methods: {
		startGame: function() {
			this.gameIsRunning = true;
			this.vidaJogador = 100;
			this.vidaMonstro = 100;
		},
		ataque: function() {
			this.vidaMonstro -= this.calculaDano(3, 14);
			if (this.checaVencedor()) {
				return;
			}

			this.ataqueMonstro();
		},
		ataqueEspecial: function() {
			this.vidaMonstro -= this.calculaDano(8, 19);
			if (this.checaVencedor()) {
				return;
			}

			this.ataqueMonstro();
		},
		curar: function() {
			if (this.vidaJogador <= 90) {
				this.vidaJogador += 10;
			} else {
				this.vidaJogador = 100;
			}
			this.ataqueMonstro();
		},
		desistir: function() {
			this.gameIsRunning = false;
		},
		ataqueMonstro: function() {
			this.vidaJogador -= this.calculaDano(4, 15)
			this.checaVencedor();
		},
		calculaDano: function(min, max) {
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
		checaVencedor: function() {
			if (this.vidaMonstro <= 0){
				if (confirm('Você venceu! Jogar de novo?')){
					this.startGame();
				} else {
					this.gameIsRunning = false;
				}
				return true;
			} else if (this.vidaJogador <= 0) {
				if (confirm('Você perdeu! Jogar de novo?')){
					this.startGame();
				} else {
					this.gameIsRunning = false;
				}
				return true;
			}
			return false;
		}
	}
});