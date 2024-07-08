import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // cuenta de gmail que manda el correo
        user: 'cuenta.de.pruebatarea2@gmail.com', //es mi cuenta pa la tarea de distribuidozz
        pass: 'pwpp oftg rfru bxab' //contraseña de app
    }
});

export default transporter;
