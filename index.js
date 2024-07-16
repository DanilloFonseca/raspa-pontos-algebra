const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSY3DGt4zMPvTxgeMLG8jkLDhngm3U-UUunNF-TywX9MlGRmrhkP6sBlBJWjEr1Cj4OCVoP-McsTTh0/pubhtml/sheet?headers=false&gid=657972830';

async function getPontos(){
    const request = await axios.get(url);
    const $ = cheerio.load(request.data);
    const turma = [];
    var count = 0;
    let aluno = [];

    $('table.waffle tbody tr td').each((index, element) => {
        if(index > 7){
            let aux = $(element).text().trim();
            aluno.push(aux);
            count++;
            if(count == 4){
                turma.push(aluno);
                aluno = [];
                count = 0;
            }
        }

    });
    console.log(turma);
}

getPontos();
