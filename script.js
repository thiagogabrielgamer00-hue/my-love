/* =====================================
   CONFIGURAÇÃO DA DATA
===================================== */

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

    let anos =
        agora.getFullYear() -
        dataInicio.getFullYear();

    let meses =
        agora.getMonth() -
        dataInicio.getMonth();

    let dias =
        agora.getDate() -
        dataInicio.getDate();

    let horas =
        agora.getHours() -
        dataInicio.getHours();

    let minutos =
        agora.getMinutes() -
        dataInicio.getMinutes();

    let segundos =
        agora.getSeconds() -
        dataInicio.getSeconds();


    if (segundos < 0) {

        segundos += 60;
        minutos--;

    }


    if (minutos < 0) {

        minutos += 60;
        horas--;

    }


    if (horas < 0) {

        horas += 24;
        dias--;

    }


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


    if (meses < 0) {

        meses += 12;
        anos--;

    }


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


atualizarContador();

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


    const tamanho =
        Math.random() * 19 + 11;

    heart.style.fontSize =
        `${tamanho}px`;


    heart.style.left =
        `${Math.random() * 100}%`;


    const duracao =
        Math.random() * 9 + 8;

    heart.style.animationDuration =
        `${duracao}s`;


    heart.style.animationDelay =
        `${Math.random() * 2}s`;


    heartsContainer.appendChild(
        heart
    );


    setTimeout(() => {

        heart.remove();

    }, (duracao + 2) * 1000);

}


setInterval(
    criarCoracao,
    900
);


/* =====================================
   ANIMAÇÃO AO ENTRAR NA TELA
===================================== */

const elementos =
    document.querySelectorAll(
        ".media-card, .timeline-item, .message-card"
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


/* =====================================
   TEMA ESCURO
===================================== */

const themeToggle =
    document.getElementById(
        "theme-toggle"
    );


function aplicarTema() {

    const tema =
        localStorage.getItem(
            "tema"
        );

    if (tema === "dark") {

        document.body.classList.add(
            "dark"
        );

        themeToggle.textContent = "☀️";

    } else {

        document.body.classList.remove(
            "dark"
        );

        themeToggle.textContent = "🌙";

    }

}


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );

        const escuro =
            document.body.classList.contains(
                "dark"
            );

        localStorage.setItem(
            "tema",
            escuro ? "dark" : "light"
        );

        aplicarTema();

    }
);


aplicarTema();


/* =====================================
   GALERIA - FOTO AMPLIADA
===================================== */

const imageModal =
    document.getElementById(
        "image-modal"
    );

const modalImage =
    document.getElementById(
        "modal-image"
    );

const closeModal =
    document.getElementById(
        "close-modal"
    );


const galleryImages =
    document.querySelectorAll(
        ".media-card img"
    );


galleryImages.forEach(
    (image) => {

        image.addEventListener(
            "click",
            () => {

                modalImage.src =
                    image.src;

                modalImage.alt =
                    image.alt;

                imageModal.classList.add(
                    "active"
                );

                document.body.style.overflow =
                    "hidden";

            }
        );

    }
);


function fecharModal() {

    imageModal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


closeModal.addEventListener(
    "click",
    fecharModal
);


imageModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === imageModal
        ) {

            fecharModal();

        }

    }
);


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            fecharModal();

        }

    }
);


/* =====================================
   PLAYER DE MÚSICA
===================================== */

const musicas = [

    {
        arquivo: "musicas/musica1.mp3",
        nome: "Sol e Lua"
    },

    {
        arquivo: "musicas/musica2.mp3",
        nome: "Botas Verdes de neon"
    },

    {
        arquivo: "musicas/musica3.mp3",
        nome: "Gato Cerveja"
    }

];


const audio =
    new Audio();


audio.volume = 0.7;


let musicaAtual = 0;


const musicPlayer =
    document.querySelector(
        ".music-player"
    );

const musicOpen =
    document.getElementById(
        "music-open"
    );

const musicClose =
    document.getElementById(
        "music-close"
    );

const musicTitle =
    document.getElementById(
        "music-title"
    );

const playPause =
    document.getElementById(
        "play-pause"
    );

const prevSong =
    document.getElementById(
        "prev-song"
    );

const nextSong =
    document.getElementById(
        "next-song"
    );

const progress =
    document.getElementById(
        "progress"
    );

const volume =
    document.getElementById(
        "volume"
    );

const currentTime =
    document.getElementById(
        "current-time"
    );

const duration =
    document.getElementById(
        "duration"
    );

const musicDisc =
    document.getElementById(
        "music-disc"
    );

const songOptions =
    document.querySelectorAll(
        ".song-option"
    );


/* =====================================
   CARREGAR MÚSICA
===================================== */

function carregarMusica(
    indice,
    tocar = false
) {

    musicaAtual = indice;

    audio.src =
        musicas[indice].arquivo;

    musicTitle.textContent =
        musicas[indice].nome;


    songOptions.forEach(
        (option, index) => {

            option.classList.toggle(
                "active",
                index === indice
            );

        }
    );


    audio.load();


    if (tocar) {

        const promessa =
            audio.play();

        if (
            promessa !== undefined
        ) {

            promessa.catch(
                () => {

                    console.log(
                        "O navegador bloqueou a reprodução automática."
                    );

                }
            );

        }

    }

}


/* =====================================
   PLAY / PAUSE
===================================== */

function alternarMusica() {

    if (
        audio.paused
    ) {

        audio.play()
            .then(
                () => {

                    atualizarBotao();

                }
            )
            .catch(
                () => {

                    console.log(
                        "Não foi possível reproduzir a música."
                    );

                }
            );

    } else {

        audio.pause();

        atualizarBotao();

    }

}


playPause.addEventListener(
    "click",
    alternarMusica
);


/* =====================================
   ATUALIZAR BOTÃO
===================================== */

function atualizarBotao() {

    if (
        audio.paused
    ) {

        playPause.textContent =
            "▶";

        musicDisc.classList.remove(
            "playing"
        );

    } else {

        playPause.textContent =
            "❚❚";

        musicDisc.classList.add(
            "playing"
        );

    }

}


audio.addEventListener(
    "play",
    atualizarBotao
);

audio.addEventListener(
    "pause",
    atualizarBotao
);


/* =====================================
   TROCAR MÚSICA
===================================== */

function trocarMusica(
    indice
) {

    carregarMusica(
        indice,
        true
    );

}


songOptions.forEach(
    (option) => {

        option.addEventListener(
            "click",
            () => {

                const indice =
                    Number(
                        option.dataset.song
                    );

                trocarMusica(
                    indice
                );

            }
        );

    }
);


/* =====================================
   ANTERIOR
===================================== */

prevSong.addEventListener(
    "click",
    () => {

        musicaAtual--;

        if (
            musicaAtual < 0
        ) {

            musicaAtual =
                musicas.length - 1;

        }

        trocarMusica(
            musicaAtual
        );

    }
);


/* =====================================
   PRÓXIMA
===================================== */

nextSong.addEventListener(
    "click",
    () => {

        musicaAtual++;

        if (
            musicaAtual >=
            musicas.length
        ) {

            musicaAtual = 0;

        }

        trocarMusica(
            musicaAtual
        );

    }
);


/* =====================================
   QUANDO A MÚSICA TERMINAR
===================================== */

audio.addEventListener(
    "ended",
    () => {

        musicaAtual++;

        if (
            musicaAtual >=
            musicas.length
        ) {

            musicaAtual = 0;

        }

        trocarMusica(
            musicaAtual
        );

    }
);


/* =====================================
   TEMPO
===================================== */

function formatarTempo(
    segundos
) {

    if (
        isNaN(segundos)
    ) {

        return "0:00";

    }


    const minutos =
        Math.floor(
            segundos / 60
        );

    const segundosRestantes =
        Math.floor(
            segundos % 60
        );


    return (
        minutos +
        ":" +
        String(
            segundosRestantes
        ).padStart(
            2,
            "0"
        )
    );

}


audio.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatarTempo(
                audio.duration
            );

    }
);


audio.addEventListener(
    "timeupdate",
    () => {

        currentTime.textContent =
            formatarTempo(
                audio.currentTime
            );


        if (
            audio.duration
        ) {

            progress.value =
                (
                    audio.currentTime /
                    audio.duration
                ) * 100;

        }

    }
);


/* =====================================
   BARRA DE PROGRESSO
===================================== */

progress.addEventListener(
    "input",
    () => {

        if (
            audio.duration
        ) {

            audio.currentTime =
                (
                    progress.value /
                    100
                ) *
                audio.duration;

        }

    }
);


/* =====================================
   VOLUME
===================================== */

volume.addEventListener(
    "input",
    () => {

        audio.volume =
            volume.value;

    }
);


/* =====================================
   FECHAR PLAYER
===================================== */

musicClose.addEventListener(
    "click",
    () => {

        musicPlayer.classList.add(
            "hidden"
        );

        musicOpen.classList.add(
            "visible"
        );

    }
);


/* =====================================
   ABRIR PLAYER
===================================== */

musicOpen.addEventListener(
    "click",
    () => {

        musicPlayer.classList.remove(
            "hidden"
        );

        musicOpen.classList.remove(
            "visible"
        );

    }
);


/* =====================================
   INICIALIZAÇÃO
===================================== */

carregarMusica(
    0,
    false
);