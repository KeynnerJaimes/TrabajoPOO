// Clase Usuario
class Usuario {
    constructor(nombre, correo, contraseña) {
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
    }
}

// Clase para manejar el registro y login
class SistemaLogin {
    constructor() {
        this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    }

    registrarUsuario(nombre, correo, contraseña) {
        const usuarioExistente = this.usuarios.find(user => user.correo === correo);
        
        if (usuarioExistente) {
            return 'Este correo ya está registrado.';
        } else {
            const nuevoUsuario = new Usuario(nombre, correo, contraseña);
            this.usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
            return 'Registro exitoso, puedes iniciar sesión ahora.';
        }
    }

    iniciarSesion(correo, contraseña) {
        const usuario = this.usuarios.find(user => user.correo === correo && user.contraseña === contraseña);
        
        if (usuario) {
            return `Bienvenido de nuevo, ${usuario.nombre}!`;
        } else {
            return 'Correo o contraseña incorrectos.';
        }
    }

    mostrarFormulario(formulario) {
        if (formulario === 'registro') {
            document.getElementById('registro').style.display = 'block';
            document.getElementById('login').style.display = 'none';
            document.getElementById('pantalla-inicio').style.display = 'block';
        } else if (formulario === 'login') {
            document.getElementById('registro').style.display = 'none';
            document.getElementById('login').style.display = 'block';
            document.getElementById('pantalla-inicio').style.display = 'block';
        }
    }

    mostrarJuego() {
        document.getElementById('pantalla-inicio').style.display = 'none';
        document.getElementById('contenedor').style.display = 'block';
    }
}

const sistemaLogin = new SistemaLogin();

document.getElementById('formRegistro').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correoRegistro').value;
    const contraseña = document.getElementById('contraseñaRegistro').value;

    const resultado = sistemaLogin.registrarUsuario(nombre, correo, contraseña);
    document.getElementById('resultado').innerText = resultado;

    if (resultado === 'Registro exitoso, puedes iniciar sesión ahora.') {
        sistemaLogin.mostrarFormulario('login');
    }
});

document.getElementById('formLogin').addEventListener('submit', (e) => {
    e.preventDefault();

    const correo = document.getElementById('correoLogin').value;
    const contraseña = document.getElementById('contraseñaLogin').value;

    const resultado = sistemaLogin.iniciarSesion(correo, contraseña);
    document.getElementById('resultado').innerText = resultado;

    if (resultado.startsWith('Bienvenido de nuevo')) {
        sistemaLogin.mostrarJuego();
    }
});

sistemaLogin.mostrarFormulario('registro');

document.getElementById('irLogin').addEventListener('click', () => sistemaLogin.mostrarFormulario('login'));
document.getElementById('irRegistro').addEventListener('click', () => sistemaLogin.mostrarFormulario('registro'));

document.getElementById('mostrarRegistro').addEventListener('click', () => sistemaLogin.mostrarFormulario('registro'));
document.getElementById('mostrarLogin').addEventListener('click', () => sistemaLogin.mostrarFormulario('login'));
