const nodemailer = require('../config/nodemailer');

//Instead of
//newComment = function
//module.exports = newComment

//we can do
exports.newComment = (comment)=>
{
  console.log('inside newComment mailer', comment);
   let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
  nodemailer.transporter.sendMail({

     from: 'vani140103@gmail.com',
    to: comment.user.email   ,
    subject: 'New Comment Published',
    html: htmlString
  },(err,info)=>{
    if(err){
     console.log('error in publishing email',err);
     return;
    }

    console.log('Message delivered', info);
    return;
  });
}