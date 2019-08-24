const express=require('express');
const path=require('path');
const nodemailer=require('nodemailer');
const app=express();

app.set('puerto','8000');

app.use(express.static(path.join(__dirname,'public')));

const server=app.listen(app.get('puerto'),()=>{
	console.log('servidor ejecutandose en el puerto',app.get('puerto'));
});

const socketIO=require('socket.io');
const io=socketIO(server);
io.on('connect',(socket)=>{
	console.log('nuevo usuario conectado',socket.id);
	socket.on('correo',(data)=>{
		console.log(`un usuario trato de ingresar Correo:${data.correo} Mensaje:${data.mensaje} ip:${data.ip} asunto:${data.asunto}`);
		let transporter = nodemailer.createTransport({
  			service: 'gmail',
  			auth: {
    				user: 'samsepio66@gmail.com',
    				pass: '3219329910 sam sepio'
  			}
		});

		let mensaje = `${data.mensaje}`;
		let mailOptions = {
  			from: `${data.correo}`,
  			to: 'samsepio66@gmail.com',
  			subject: `${data.asunto}`,
  			text: mensaje
		};
		transporter.sendMail(mailOptions, function(error, info){
  			if (error) {
    				console.log('error al enviar el correo electronico',error);
  			} else {
    				console.log('Email enviado: ' + info.response);
  			};
		});
	});
});
