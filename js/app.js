new Vue({
	el: '#app',
	data: {
		vidaJogador: 100,
		vidaMonstro: 100,
		gameIsRunning: false,
		turns: []
	},
	methods: {
		startGame: function() {
			this.gameIsRunning = true;
			this.vidaJogador = 100;
			this.vidaMonstro = 100;
			this.turns = [];
		},
		ataque: function() {
			var dano = this.calculaDano(3, 14);
			this.vidaMonstro -= dano;
			this.turns.unshift({
				isPlayer: true,
				text: 'Jogador ataca Monstro e causa ' + dano + ' de dano.'
			});
			if (this.checaVencedor()) {
				return;
			}

			this.ataqueMonstro();
		},
		ataqueEspecial: function() {
			var dano = this.calculaDano(8, 19);
			this.vidaMonstro -= dano;
			this.turns.unshift({
				isPlayer: true,
				text: 'Jogador ataca Monstro com Ataque Especial e causa ' + dano + ' de dano.'
			});
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
			this.turns.unshift({
				isPlayer: true,
				text: 'Jogador se cura em 10 pontos'
			});
			this.ataqueMonstro();
		},
		desistir: function() {
			this.gameIsRunning = false;
			this.turns = [];
		},
		ataqueMonstro: function() {
			var dano = this.calculaDano(4, 15);
			this.vidaJogador -= dano;
			this.checaVencedor();
			this.turns.unshift({
				isPlayer: false,
				text: 'Monstro ataca Jogador e causa ' + dano + ' de dano.'
			});
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