const body = document.querySelector('body');

const playerNameh1 = document.querySelector('#player-name-h1');
const inputForName = document.querySelector('#input');
const btnName = document.querySelector('#player-name-button');

const div2 = document.querySelector('#div2');
const imgSten = document.querySelector('#img-sten');
const imgSax = document.querySelector('#img-sax');
const imgPase = document.querySelector('#img-pase');
const imgStenHide = document.querySelector('#img-sten-hide');
const imgSaxHide = document.querySelector('#img-sax-hide');
const imgPaseHide = document.querySelector('#img-pase-hide');
const imgStenHide2 = document.querySelector('#img-sten-hide2');
const imgSaxHide2 = document.querySelector('#img-sax-hide2');
const imgPaseHide2 = document.querySelector('#img-pase-hide2');

const h2datorval = document.querySelector('#datorval');
const h2spelarpoint = document.querySelector('#spelarpoint');

const scoreboard = document.querySelector('#scoreboard');
const scoreitems = document.querySelector('.score-item');

const h1Explain = document.createElement('h1');
h1Explain.id = "explain";
div2.append(h1Explain);

let h2playercount = 0;
let h2computercount = 0;
const arr = ['Sten', 'Sax', 'Påse'];


const baseUrl = `https://miniprojekt-1-js-2-ok-default-rtdb.europe-west1.firebasedatabase.app/highscore.json`;

async function getArrScore() {
    const response = await fetch(baseUrl);
    const data = await response.json();
    const newArr = [];
    data.forEach((loopObj) => {

        const { name, score } = loopObj;
        const objForComparison = {}
        objForComparison.name = name;
        objForComparison.score = score;

        //scoreboardet

        const scoreItems = document.createElement('p');
        scoreboard.append(scoreItems);
        scoreItems.innerText = objForComparison.name + ': ' + objForComparison.score + ' poäng'

    })


}
getArrScore()
playerNameh1.innerText = `Lycka till ${inputForName.value}!`;
btnName.addEventListener('click', nameFunction);
function nameFunction(event1) {
    event1.preventDefault();
    window.location.reload();

}
//om spelaren valt namn så funkar det att spela, annars får man alert
if (inputForName.value != '') {
    div2.addEventListener('click', clickFunction);
    function clickFunction(event) {

        if (event.target.id == 'img-sten' || event.target.id == 'img-sax' || event.target.id == 'img-pase') {

            let randomNumber = Math.floor(Math.random() * arr.length);
            let computerChoice = arr[randomNumber];
            h2datorval.style.visibility = "visible"

            console.log(computerChoice);
            if (event.target.id == 'img-sten') {

                imgSten.style.border = "white solid 4px"
                imgSten.style.padding = "8px";
                imgSten.style.borderRadius = "5px";
                imgSax.style.border = "";
                imgPase.style.border = "";
            }
            else if (event.target.id == 'img-sax') {

                imgSax.style.border = "white solid 4px"
                imgSax.style.padding = "8px";
                imgSax.style.borderRadius = "5px";
                imgSten.style.border = "";
                imgPase.style.border = "";
            }
            else if (event.target.id == 'img-pase') {

                imgPase.style.border = "white solid 4px"
                imgPase.style.padding = "8px";
                imgPase.style.borderRadius = "5px";
                imgSten.style.border = "";
                imgSax.style.border = "";
            }
            if (computerChoice == arr[0]) {
                imgSaxHide2.style.display = "none";
                imgStenHide2.style.display = "block";
                imgPaseHide2.style.display = "none";
            }
            else if (computerChoice == arr[1]) {
                imgSaxHide2.style.display = "block";
                imgStenHide2.style.display = "none";
                imgPaseHide2.style.display = "none";
            }
            else if (computerChoice == arr[2]) {
                imgSaxHide2.style.display = "none";
                imgStenHide2.style.display = "none";
                imgPaseHide2.style.display = "block";
            }

            if (event.target.id == 'img-sten' && computerChoice == arr[0] || event.target.id == 'img-sax' && computerChoice == arr[1] || event.target.id == 'img-pase' && computerChoice == arr[2]) {
                h2spelarpoint.innerText = `Dina poäng: ${h2playercount}`;

                h1Explain.innerText = 'Oavgjort'
            }

            else if (event.target.id == 'img-sten' && computerChoice == arr[1] || event.target.id == 'img-sax' && computerChoice == arr[2] || event.target.id == 'img-pase' && computerChoice == arr[0]) {
                h1Explain.innerText = '';
                h2playercount++;
                h2spelarpoint.innerText = `Dina poäng: ${h2playercount}`;
                h1Explain.innerText = 'Du vann!'
            }
            //Här vinner datorn
            else if (event.target.id == 'img-sten' && computerChoice == arr[2] || event.target.id == 'img-sax' && computerChoice == arr[0] || event.target.id == 'img-pase' && computerChoice == arr[1]) {
                h2computercount++;
                h1Explain.innerText = '';

                const obj = {
                    name: inputForName.value,
                    score: h2playercount
                }
                //Här jämförs poängen med highscoren
                async function getArr() {
                    const response = await fetch(baseUrl);
                    const data = await response.json();

                    const newArr = []

                    data.forEach((loopObj) => {

                        const { name, score } = loopObj;
                        const objForComparison = {};
                        objForComparison.name = name;
                        objForComparison.score = score;
                        ///om spelarens score blir högre än det som finns i highscoren så läggs det till lika många obj i newArr. 

                        if (Number(obj.score) > objForComparison.score) {
                            newArr.push(obj)

                        };
                    })
                    //Sen använder jag den Arrayens längd för att veta vart nya scoren ska sättas in.
                    console.log(5 - newArr.length + 4, 5 - newArr.length + 3, 5 - newArr.length + 2, 5 - newArr.length + 1, 5 - newArr.length)
                    if (newArr.length != 0 && newArr.length != 6) {
                        //Här patchar jag objektet som finns på den URL:en med spelarens score
                        async function patch(obj) {
                            const url = `https://miniprojekt-1-js-2-ok-default-rtdb.europe-west1.firebasedatabase.app/highscore/${5 - newArr.length}.json`

                            const init = {
                                method: 'PATCH',
                                body: JSON.stringify(obj),
                                headers: {
                                    'Content-type': "application/json;charset=UTF-8"
                                }
                            };
                            const response = await fetch(url, init);
                            const data = await response.json();


                        }
                        patch(obj)


                    }
                    //Sedan patchas alla andra object i highscorelistan beroende på om dom ska ändras, vilket beror på hur lång arrayen är- därmed if-satserna
                    if (newArr.length != 0 && newArr.length != 1 && newArr.length != 2 && newArr.length != 3 && newArr.length != 4) {

                        async function patchNextNextNextLast(obj) {
                            const url = `https://miniprojekt-1-js-2-ok-default-rtdb.europe-west1.firebasedatabase.app/highscore/${5 - newArr.length + 4}.json`

                            const init = {
                                method: 'PATCH',
                                body: JSON.stringify(obj),
                                headers: {
                                    'Content-type': "application/json;charset=UTF-8"
                                }
                            };
                            const response = await fetch(url, init);
                            const data = await response.json();
                        }
                        patchNextNextNextLast(data[5 - newArr.length + 3])
                    }

                    if (newArr.length != 2 && newArr.length != 0 && newArr.length != 1 && newArr.length != 3) {

                        async function patchNextNextNext(obj) {
                            const url = `https://miniprojekt-1-js-2-ok-default-rtdb.europe-west1.firebasedatabase.app/highscore/${5 - newArr.length + 3}.json`

                            const init = {
                                method: 'PATCH',
                                body: JSON.stringify(obj),
                                headers: {
                                    'Content-type': "application/json;charset=UTF-8"
                                }
                            };
                            const response = await fetch(url, init);
                            const data = await response.json();


                        }

                        patchNextNextNext(data[5 - newArr.length + 2])
                    }

                    if (newArr.length != 1 && newArr.length != 0 && newArr.length != 2) {

                        async function patchNextNext(obj) {
                            const url = `https://miniprojekt-1-js-2-ok-default-rtdb.europe-west1.firebasedatabase.app/highscore/${5 - newArr.length + 2}.json`
                            console.log(url)
                            const init = {
                                method: 'PATCH',
                                body: JSON.stringify(obj),
                                headers: {
                                    'Content-type': "application/json;charset=UTF-8"
                                }
                            };
                            const response = await fetch(url, init);
                            const data = await response.json();
                            console.log(data);

                        }

                        patchNextNext(data[5 - newArr.length + 1])

                    }

                    if (newArr.length != 1 && newArr.length != 0) {

                        async function patchNext(obj) {
                            const url = `https://miniprojekt-1-js-2-ok-default-rtdb.europe-west1.firebasedatabase.app/highscore/${5 - newArr.length + 1}.json`

                            const init = {
                                method: 'PATCH',
                                body: JSON.stringify(obj),
                                headers: {
                                    'Content-type': "application/json;charset=UTF-8"
                                }
                            };
                            const response = await fetch(url, init);
                            const data = await response.json();


                        }

                        patchNext(data[5 - newArr.length]);

                    }
                }
                getArr();

            }
            //När datorn får poäng så får man alert om det och sidan startar om
            if (h2computercount == 1) {

                body.style.backgroundColor = "hsl(0, 95%, 70%)";

                function reloadPage() {
                    alert(`Du fick ihop ${h2playercount} poäng när motståndaren fick dig med ${computerChoice}`);
                    window.location.reload();
                }
                setTimeout(reloadPage, 200);



            }

        }

    }
}
else {
    div2.addEventListener('click', clickFunction);
    function clickFunction() {
        alert('Fyll i namn');
    }
}









