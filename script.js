const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes =document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarBtIcone = document.querySelector('.app_card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')

const musica = new Audio('/sons/luna-rise-part-one.mp3') //fazer com que o javascript leia o arquivo
const audioPlay = new Audio('/sons/play.wav')
const audioPausa = new Audio('/sons/pause.mp3')
const audioTempoFinalizado = new Audio('./sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true  //deixando a música tocando o tempo todo



musicaFocoInput.addEventListener('change' , () => {
    if(musica.paused){
        musica.play()
    } else{
        musica.pause
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})
    //html.setAttribute('data-contexto', 'foco') 
    //banner.setAttribute('.src','/imagens/foco.png')
    //qual elemento quero alterar + qual elemento que quero inserir
    //simplificando com a função
    


//função para dizer o que quero que aconteça quando tiver a ação "clicar"
curtoBt.addEventListener ('click', () =>{ 
        tempoDecorridoEmSegundos = 300
        alterarContexto('descanso-curto')
        curtoBt.classList.add('active')
    })
    //html.setAttribute('data-contexto','descanso-curto')
    //banner.setAttribute('.src','/imagens/descanso-curto.png')
     //simplificando com a função
    


longoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})
    //html.setAttribute('data-contexto','descanso-longo')
    //banner.setAttribute('.src','/imagens/descanso-longo.png') 

    //simplificando com a função
    


//fução para chamar documentos e funções para o mesmo lado

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

//variável do botão de tempo
const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        alert('Tempo finalizado!') //alerta aparece
        zerar() //zera a contagem
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
    
}

//evento de clique
startPauseBt.addEventListener('click', iniciarOuPausar)

//função para criar a contagem
function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausar.textContent = "<strong>Pausar</strong>"
}

//zerar a contagem
function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausar.textContent = "<strong>Começar</strong>"
    intervaloId = null
}

//mostrar o temporizador

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br',{minute: '2-digit',second:'2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()