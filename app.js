import fs from 'fs' ;
import qr from'qr-image';
import express from "express" ;
import bodyParser from "body-parser" ;
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express() ;
const port = 3000 ;
var qr_svg ;

app.use(bodyParser.urlencoded({extended : true})) ;
app.use(express.static(__dirname + "/public"));


app.get("/" , (req ,res) => {
  res.sendFile(__dirname + "/public/QRCodeGenerator.html") ;
});

app.post("/QR" , (req , res) => {
  const url = req.body["URL"] ;
  if (!url) {
    return res.status(400).send("No URL provided!");
  }
  qr_svg = qr.image(url, { type: 'png' });
  qr_svg.pipe(fs.createWriteStream(__dirname + "/public/qr_img.png"));

  res.redirect("/QR.html");
});

app.listen(port , () => {
  console.log(`Listening on port ${port}`) ;
});




