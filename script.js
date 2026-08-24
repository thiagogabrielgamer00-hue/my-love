/* =====================================
   CONFIGURAÇÃO
===================================== */

/*
   COLOQUE AQUI A DATA EM QUE VOCÊS
   SE CONHECERAM.

   Formato:

   ANO, MÊS, DIA, HORA, MINUTO, SEGUNDO

   IMPORTANTE:
   Janeiro = 0
   Fevereiro = 1
   Março = 2
   ...
   Dezembro = 11
*/

const dataInicio = new Date(
    2026,
    3,
    12,
    0,
    0,
    0
);


/* =====================================
   CONTADOR
===================================== */

function atualizarContador() {

    const agora = new Date();

    let anos = agora.getFullYear() - dataInicio.getFullYear();

    let meses = agora.getMonth() - dataInicio.getMonth();

    let dias = agora.getDate() - dataInicio.getDate();

    let horas = agora.getHours() - dataInicio.getHours();

    let minutos = agora.getMinutes() - dataInicio.getMinutes();

    let segundos = agora.getSeconds() - dataInicio.getSeconds();


    /*
       Ajuste dos segundos
    */

    if (segundos < 0) {

        segundos += 60;

        minutos--;

    }


    /*
       Ajuste dos minutos
    */

    if (minutos < 0) {

        minutos += 60;

        horas--;

    }


    /*
       Ajuste das horas
    */

    if (horas < 0) {

        horas += 24;

        dias--;

    }


    /*
       Ajuste dos dias
    */

    if (dias < 0) {

        const ultimoDiaMesAnterior =
            new Date(
                agora.getFullYear(),
                agora.getMonth(),
                0
            ).getDate();

        dias += ultimoDiaMesAnterior;

        meses--;

    }


    /*
       Ajuste dos meses
    */

    if (meses < 0) {

        meses += 12;

        anos--;

    }


    /*
       Atualiza a tela
    */

    document.getElementById("years").textContent =
        anos;

    document.getElementById("months").textContent =
        meses;

    document.getElementById("days").textContent =
        dias;

    document.getElementById("hours").textContent =
        horas;

    document.getElementById("minutes").textContent =
        minutos;

    document.getElementById("seconds").textContent =
        segundos;

}


/*
   Atualiza imediatamente
*/

atualizarContador();


/*
   Atualiza a cada segundo
*/

setInterval(
    atualizarContador,
    1000
);


/* =====================================
   DATA FORMATADA
===================================== */

function mostrarData() {

    const opcoes = {
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    const dataFormatada =
        dataInicio.toLocaleDateString(
            "pt-BR",
            opcoes
        );

    document.getElementById(
        "meeting-date"
    ).textContent = dataFormatada;

}

mostrarData();


/* =====================================
   CORAÇÕES FLUTUANTES
===================================== */

const heartsContainer =
    document.querySelector(
        ".hearts-container"
    );


function criarCoracao() {

    const heart =
        document.createElement("div");

    heart.classList.add(
        "floating-heart"
    );

    heart.textContent = "♥";

    /*
       Tamanho aleatório
    */

    const tamanho =
        Math.random() * 18 + 10;

    heart.style.fontSize =
        `${tamanho}px`;


    /*
       Posição aleatória
    */

    heart.style.left =
        `${Math.random() * 100}%`;


    /*
       Duração aleatória
    */

    const duracao =
        Math.random() * 8 + 7;

    heart.style.animationDuration =
        `${duracao}s`;


    /*
       Pequeno atraso aleatório
    */

    heart.style.animationDelay =
        `${Math.random() * 2}s`;


    heartsContainer.appendChild(
        heart
    );


    /*
       Remove depois da animação
    */

    setTimeout(() => {

        heart.remove();

    }, (duracao + 2) * 1000);

}


/*
   Cria corações periodicamente
*/

setInterval(
    criarCoracao,
    900
);


/* =====================================
   ANIMAÇÃO AO ENTRAR NA TELA
===================================== */

const elementos =
    document.querySelectorAll(
        ".photo-card, .timeline-item, .message-card"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


elementos.forEach(
    (elemento) => {

        elemento.style.opacity = "0";

        elemento.style.transform =
            "translateY(30px)";

        elemento.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

        observer.observe(elemento);

    }
);
