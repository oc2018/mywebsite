import nodemailer from 'nodemailer';
import env from 'dotenv';
import Mailgen from 'mailgen';

env.config();

const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD

// console.log('email');
export const forgotPassword = (req, res, next) => {
    const { email } = req.body;

    let config = {
        service: 'gmail',
        tls: {
            rejectUnauthorized: false,
        },
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Eric Ndege",
            link: 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name: 'Eric Ndege',
            intro: "Create a new Password",
            table: {
                data: [{
                    item: "Nodemailer Stack Book",
                    description: "A Backend application",
                    price: "Ksh: 1000.00"
                }]
            },
            outro: "Looking forward to doing more bussiness"
        }
    }

    let mail = MailGenerator.generate(response);

    let message = {
        from: EMAIL,
        to: email,
        subject: "Change password",
        html: mail
    }

    transporter.sendMail(message, ( error, info ) => {
        if(error) {
            console.log({error: error});
        } else {
            console.log(info.response);
            next();
        }
    })


};