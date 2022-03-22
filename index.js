// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

require('dotenv').config();
const LaunchDarkly = require('launchdarkly-node-server-sdk') 
const client = LaunchDarkly.init(process.env.LD_SDK_KEY);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const context = {
	key: "sherron+4@launchdarkly.com",
	firstname: "Simon",
	privateAttributeNames:["firstname"],
	custom: {
		groups: ["frequent-visitors","myVegas"],
	}
}

const msg = {
	to: `${context.key}`, 
	from: 'simon@siherron.co.uk', 
	subject: `${context.firstname}, Welcome to the MGM Vegas`,
	text: 'Here is your complimentary $100 drinks pass and we hope you enjoy your stay.',
	html: '<strong>Here is your complimentary $100 drinks pass and we hope you enjoy your stay.</strong>',
}

const msg2 = {
	to: `${context.key}`, 
	from: 'simon@siherron.co.uk', 
	subject: `${context.firstname}, Welcome to the MGM Vegas`,
	text: 'We hope you enjoy your stay.',
	html: '<strong>We hope you enjoy your stay.</strong>',
  }

//LaunchDarkly Flag Script.
client.on('ready', () => {
	client.variation(process.env.FLAGNAME, context, "msg")
	.then((value)=>{
		sgMail
		.send(value === "msg" ? msg : msg2)
		.then(() => {
			console.log('Email sent')
			
			setTimeout(()=> {
				client.flush();
				console.log('Flush');
				console.log('Close');
				client.close();
				
			}, 5000)
		})
		.catch((error) => {
			console.error(error)
		});		
	})	
});
