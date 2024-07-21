const axios  = require("axios");


async function sendRequest(amount){
    const cookie = 'your cookie'
    const response = await axios({
      method: "post",
      url: "https://stake.com/_api/graphql",
      headers: {
        accept: "*/*",
        "accept-language": "en-GB,en;q=0.9",
        "content-type": "application/json",
        cookie: cookie,
        origin: "https://stake.com",
        priority: "u=1, i",
        referer: "https://stake.com/casino/games/dice",
        "sec-ch-ua": `"Not/A)Brand";v="8", "Chromium";v="126", "Brave";v="126"`,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-model": "",
        "sec-ch-ua-platform": "Windows",
        "sec-ch-ua-platform-version": "15.0.0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "x-access-token":
          "your tokens",
        "x-lockdown-token": "your tokens",
      },
      data: `{"query":"mutation DiceRoll($amount: Float!, $target: Float!, $condition: CasinoGameDiceConditionEnum!, $currency: CurrencyEnum!, $identifier: String!) {\\n  diceRoll(\\n    amount: $amount\\n    target: $target\\n    condition: $condition\\n    currency: $currency\\n    identifier: $identifier\\n  ) {\\n    ...CasinoBet\\n    state {\\n      ...CasinoGameDice\\n    }\\n  }\\n}\\n\\nfragment CasinoBet on CasinoBet {\\n  id\\n  active\\n  payoutMultiplier\\n  amountMultiplier\\n  amount\\n  payout\\n  updatedAt\\n  currency\\n  game\\n  user {\\n    id\\n    name\\n  }\\n}\\n\\nfragment CasinoGameDice on CasinoGameDice {\\n  result\\n  target\\n  condition\\n}\\n","variables":{"target":28,"condition":"above","identifier":"TqBNiv8HqCZuGLwVnLLAm","amount":${amount},"currency":"inr"}}`,
    });

    
    return response.data;
}
const DEFAULT_AMOUNT = 0.0;
async function main() {
    let amount = DEFAULT_AMOUNT;
    let lossesInARow = 0;
    console.log("betting" + amount);
    while(1){
       const response = await sendRequest(amount);
       console.log(response.data);
        if (response.data.diceRoll.state.result < 50.5) {
          console.log(`Lost`);
          lossesInARow++;
          amount = amount * 2;
        } else {
          console.log(`Won`);
          lossesInARow = 0;
          amount = DEFAULT_AMOUNT;
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (lossesInARow >= 13) {
          console.log("Stopping");
          process.exit(0);
        }
    }
}

main();