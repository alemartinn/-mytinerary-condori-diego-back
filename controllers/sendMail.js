const nodemailer = require('nodemailer');//Nodemailer sends mails to verify.
const { google } = require('googleapis'); //This contains methods and properties from google.
const OAuth = google.auth.OAuth2; //
const { ID_CLIENT_GOOGLE, SECRET_CLIENT_GOOGLE, URL_GOOGLE, REFRESH_GOOGLE, USER_GOOGLE, TYPE_GOOGLE } = process.env;

const sendMail = async (mailUser, code) => {

    //Create the credential
    const client = new OAuth(
        ID_CLIENT_GOOGLE, 
        SECRET_CLIENT_GOOGLE, 
        URL_GOOGLE
    );

    //Setting to refresh token
    client.setCredentials({
        refresh_token: REFRESH_GOOGLE
    });

    //Now we get the accessToken which allow us to connect with google's api
    const accessToken = client.getAccessToken();

    //Configuration of message service.
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: USER_GOOGLE,
            type: TYPE_GOOGLE,
            clientId: ID_CLIENT_GOOGLE,
            clientSecret: SECRET_CLIENT_GOOGLE,
            refreshToken: REFRESH_GOOGLE,
            accessToken: accessToken
        },
        tls: { //Transport layer security
            rejectUnauthorized: false //This prevents that antivirus block it
        }
    });
    
    // Object to send mail to user.
    const mailOption = {
        from: USER_GOOGLE,
        to: mailUser,
        subject: 'Verify your MyTinerary account',
        html: `
            <div>
                <h1> Hola ${mailUser} </h1>
                <a href='http://localhost:4000/auth/verify/${code}'> Click here to verify your account </a>
            </div>
        ` 
        //codigo HTML puro que va a renderizar en el cuerpo del mail.
        //en los div debo enviar un link de una url para verificar.
        //ese link o endpoint se conectara con el metodo correspondiente para verificar la cuenta.
    };

    transport.sendMail(
        mailOption,
        (error, response) => error ? console.log(error) : console.log('Check mail or Ok')
    );
};

module.exports = sendMail;