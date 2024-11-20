class Juego {
    constructor() {
        this.eleccionUsuario = "";
        this.eleccionComputadora = "";
    }

    setEleccionUsuario(eleccion) {
        this.eleccionUsuario = eleccion;
    }

    eleccionAleatoria() {
        const opciones = ["Piedra", "Papel", "Tijera", "Lagarto", "Spock"];
        const indiceAleatorio = Math.floor(Math.random() * opciones.length);
        this.eleccionComputadora = opciones[indiceAleatorio];
    }

    determinarGanador() {
        if (this.eleccionUsuario === this.eleccionComputadora) {
            return "Empate";
        } 
        
        if (
            (this.eleccionUsuario === "Piedra" && (this.eleccionComputadora === "Tijera" || this.eleccionComputadora === "Lagarto")) ||
            (this.eleccionUsuario === "Papel" && (this.eleccionComputadora === "Piedra" || this.eleccionComputadora === "Spock")) ||
            (this.eleccionUsuario === "Tijera" && (this.eleccionComputadora === "Papel" || this.eleccionComputadora === "Lagarto")) ||
            (this.eleccionUsuario === "Lagarto" && (this.eleccionComputadora === "Spock" || this.eleccionComputadora === "Papel")) ||
            (this.eleccionUsuario === "Spock" && (this.eleccionComputadora === "Tijera" || this.eleccionComputadora === "Piedra"))
        ) {
            return "Ganaste";
        } 

        return "Perdiste";
    }

    jugar() {
        this.eleccionAleatoria();
        return this.determinarGanador();
    }
}

const juego = new Juego();

document.getElementById("piedra").addEventListener("click", () => juego.setEleccionUsuario("Piedra"));
document.getElementById("papel").addEventListener("click", () => juego.setEleccionUsuario("Papel"));
document.getElementById("tijera").addEventListener("click", () => juego.setEleccionUsuario("Tijera"));
document.getElementById("lagarto").addEventListener("click", () => juego.setEleccionUsuario("Lagarto"));
document.getElementById("spock").addEventListener("click", () => juego.setEleccionUsuario("Spock"));

document.getElementById("jugar").addEventListener("click", () => {
    const resultado = juego.jugar();
    document.getElementById("resultadoJuego").innerText = `Resultado: ${resultado}. La computadora eligió ${juego.eleccionComputadora}.`;
});
