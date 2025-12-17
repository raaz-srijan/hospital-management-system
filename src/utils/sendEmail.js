const transporter = require("./transporter");

const verificationMail = async (to, token) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify/${token}`;

    const html = `
        <div>
            <h3>Email Verification</h3>
            <p>Click the link below to verify your email address:</p>
            <a href="${verificationUrl}">${verificationUrl}</a>
        </div>
    `;

    const mailOptions = {
        to,
        subject: "Verify your email",
        html,
        from: "testamentdummy@gmail.com"
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully!");
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

module.exports = verificationMail;
