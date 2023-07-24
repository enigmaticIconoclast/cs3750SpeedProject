import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

let testJSON = {
  text: "Hello World!",
};

app.use(cors());
app.use(express.json());

app.use("/record", records);

//Using to build a demo card management system
app.use("/cardDemo", (req, res) => {
  let result = "Hello World";
  let cardDeck = ['CA', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK','DA', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 
                'D9', 'D10', 'DJ', 'DQ', 'DK', 'HA', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK', 'SA', 'S2', 'S3', 'S4', 'S5',
                'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK'];

  let playerHand = new Array();
  let player2Hand = new Array();
  console.log(cardDeck);
  shuffleDeck(cardDeck);
  shuffleDeck(cardDeck);shuffleDeck(cardDeck);shuffleDeck(cardDeck);shuffleDeck(cardDeck);shuffleDeck(cardDeck);shuffleDeck(cardDeck);shuffleDeck(cardDeck);
  console.log(cardDeck);
  
  for(let i = 0; i<7; i++){
    drawCard(cardDeck, playerHand);
    drawCard(cardDeck, player2Hand);
  }

  console.log(cardDeck);
  console.log(playerHand);
  console.log(player2Hand);
  
  res.send(result).status(204)
});

function shuffleDeck(deckArray){
  for (let i = deckArray.length - 1; i> 0; i--){
    let randomIndex = Math.floor(Math.random() * (i +1));
    let temp = deckArray[i];
    deckArray[i] = deckArray[randomIndex];
    deckArray[randomIndex] = temp;
  }
}

function drawCard (from, to){
  to.unshift(from.shift());
}


// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
