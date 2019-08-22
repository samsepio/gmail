const socket=io();

let correo=document.getElementById('correo');
let mensaje=document.getElementById('mensaje');
let ingresar=document.getElementById('ingresar');
let error=document.getElementById('error');
let errorB=document.getElementById('errorB');
let ip=document.getElementById('ip');

ingresar.addEventListener('click',(evento)=>{
	const caracteres=(correo.value.length);
	if(caracteres > 50){
		error.innerHTML+=`el correo no puede ser mayor a 50 caracteres`;
		error.style.color="red";
		evento.preventDefault();
	};
	if(correo.value==""||mensaje.value==""){
		errorB.innerHTML+=`todos los campos son hobligatorios`;
		errorB.style.color="red";
		evento.preventDefault();
	};
	socket.emit('correo',{
		correo: correo.value,
		mensaje: mensaje.value,
		ip: ip.value
	});
});
