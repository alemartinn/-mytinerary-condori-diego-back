const nodemailer = require('nodemailer');//se encarga de enviar los mails a verificar
const {google} = require('googleapis'); //contiene metodos y propiedades
const OAuth = google.auth.OAuth2; //
const {ID_CLIENTE_GOOGLE, SECRET_CLIENTE_GOOGLE, URL_GOOGLE, REFRESH_GOOGLE, USER_GOOGLE, TYPE_GOOGLE} = process.env;

const sendMail = async (mailUser, code) => {

    const client = new OAuth(
        ID_CLIENTE_GOOGLE, 
        SECRET_CLIENTE_GOOGLE, 
        URL_GOOGLE
    );

    client.setCredentials({
        refresh_token: REFRESH_GOOGLE
    });

    const accessToken = client.getAccessToken();

    const mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: USER_GOOGLE,
            type: TYPE_GOOGLE,
            clientId: ID_CLIENTE_GOOGLE,
            clientSecret: SECRET_CLIENTE_GOOGLE,
            refreshToken: REFRESH_GOOGLE,
            accessToken: accessToken
        },
        tls: { //transport layer security
            rejectUnauthorized: false //para evitar que bloquee el antivirus
        }
    });
    
    const mailOption = {
        from: USER_GOOGLE,
        to: mailUser,
        subject: 'Verify MyTinerary account',
        html: `
            <div>

            </div>
        ` 
        //codigo HTML puro que va a renderizar en el cuerpo del mail.
        //en los div debo enviar un link de una url para verificar.
        //ese link o endpoint se conectara con el metodo correspondiente para verificar la cuenta.
    };

    await transport.sendMail(
        mailOption, 
        (error,response)=>error ? console.log(error) : console.log('Check mail or Ok')
    );
};

module.exports = sendMail;