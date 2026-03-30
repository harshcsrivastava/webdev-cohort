import "dotenv/config";
// import { sendMail } from "./src/common/config/email.js";

async function sending() {
    const htmlContent = `
    <div
            style="
                font-family: Arial, sans-serif;
                background-color: #FADADD;
background-image: linear-gradient(147deg, #FADADD 0%, #fc6c85 74%);
                color: #333;
                text-align: center;
            "
        >
            <h1>Welcome!</h1>
            <p>Thanks for signing up. We’re excited to have you on board.</p>
             <br> <br>
            <a href="https://www.youtube.com/watch?v=Aq5WXmQQooo">
                <img
                    src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/strip-club-poster-design-template-95a74f70fec82b46de5a1c10a2ff01de_screen.jpg?ts=1636999902"
                    alt=""
                    srcset=""
            /></a> <br> <br>
            <a
                href="https://www.youtube.com/watch?v=Aq5WXmQQooo"
                style="
                    display: inline-block;
                    padding: 10px 20px;
                    background: #34ebb1;
                    color: #fff;
                    text-decoration: none;
                "
            >
                Claim Here
            </a>
        </div>
  `;

    // await sendMail(
    //     "aeophics@gmail.com",
    //     "Can i get huhhhh yeahhhhh Neighbour",
    //     htmlContent,
    // );
    // await sendMail(
    //     "aniketh2278@gmail.com",
    //     "Can i get huhhhh yeahhhhh Neighbour",
    //     htmlContent,
    // );
    // await sendMail(
    //     "dhruvsinghbareilly123@gmail.com",
    //     "Welcome to your San Andreas Strip Club",
    //     htmlContent,
    // );
}

sending();
