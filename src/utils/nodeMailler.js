const SendGridmail = require("@sendgrid/mail");

SendGridmail.setApiKey(process.env.KEY_SENDGRID_API);


const SendMail = async (email, password_brut, firstname_staff) => {
  const msg = {
    to: email,
    from: process.env.MAIL_FROM,
    subject: "Nouvel Compte Utilisateur",
    text: `Salut ${firstname_staff}. <br/> Nous tenons à vous informer qu'un compte utilisateur vous a été créé. <br/>
    Voici vos identifiants: <br/>
    Nom d'utilisateur : ${email} <br/>
    Password : ${password_brut} <br/>
    
    Connectez-vous <a href="pas_de_site_encore"> ici </a>. <br/>
    Etant donné que ce sont là des informations très sensibles pour votre compte, nous vous prions de bien les conserver.`,
    
    html: `<p>Salut <b>${firstname_staff}</b>. <br/> Nous tenons à vous informer qu'un compte utilisateur vous a été créé. <br/>
    Voici vos identifiants: <br/>
    Nom d'utilisateur : <b>${email}</b> <br/>
    Password : <b>${password_brut}</b> <br/>
    
    Connectez-vous <a href="pas_de_site_encore"> ici </a>. <br/>
    Etant donné que ce sont là des informations très sensibles pour votre compte, nous vous prions de bien les conserver.</p>`,
  };
  const sendingMail = await SendGridmail.send(msg).then(() => {
    return true;
  })
  .catch(() => {
    return false;
  });
  return sendingMail;
};
module.exports = SendMail;