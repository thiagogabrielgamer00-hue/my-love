/* =====================================
   CONFIGURAÇÃO
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
   DATA
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
   TEMA ESCURO / CLARO
===================================== */

const themeToggle =
    document.getElementById(
        "theme-toggle"
    );


function atualizarIconeTema() {

    const escuro =
        document.body.classList.contains(
            "dark-mode"
        );

    themeToggle.textContent =
        escuro ? "☀️" : "🌙";

    themeToggle.title =
        escuro
            ? "Mudar para tema claro"
            : "Mudar para tema escuro";
}


const temaSalvo =
    localStorage.getItem(
        "tema"
    );


if (temaSalvo === "escuro") {

    document.body.classList.add(
        "dark-mode"
    );
}


atualizarIconeTema();


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-mode"
        );

        const escuro =
            document.body.classList.contains(
                "dark-mode"
            );

        localStorage.setItem(
            "tema",
            escuro ? "escuro" : "claro"
        );

        atualizarIconeTema();

    }
);


/* =====================================
   PLAYER DE MÚSICA
===================================== */

const musicas = [

    {
        nome: "Sol e Lua",
        arquivo: "musicas/musica1.mp3"
    },

    {
        nome: "Botas verdes de neon",
        arquivo: "musicas/musica2.mp3"
    },

    {
        nome: "gato cerveja",
        arquivo: "musicas/musica3.mp3"
    }

];


let musicaAtual = 0;

const audio =
    document.getElementById(
        "audio-player"
    );

const musicPlayer =
    document.getElementById(
        "music-player"
    );

const musicTitle =
    document.getElementById(
        "music-title"
    );

const playButton =
    document.getElementById(
        "play-song"
    );

const progress =
    document.getElementById(
        "music-progress"
    );

const currentTime =
    document.getElementById(
        "current-time"
    );

const duration =
    document.getElementById(
        "duration"
    );

const songButtons =
    document.querySelectorAll(
        ".song-button"
    );


function formatarTempo(segundos) {

    if (
        isNaN(segundos) ||
        !isFinite(segundos)
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
        )
        .toString()
        .padStart(2, "0");

    return `${minutos}:${segundosRestantes}`;
}


function carregarMusica(
    indice,
    tocar = false
) {

    musicaAtual = indice;

    const musica =
        musicas[musicaAtual];

    audio.src =
        musica.arquivo;

    musicTitle.textContent =
        musica.nome;

    songButtons.forEach(
        (button, index) => {

            button.classList.toggle(
                "active",
                index === musicaAtual
            );

        }
    );

    progress.value = 0;

    currentTime.textContent =
        "0:00";

    duration.textContent =
        "0:00";

    if (tocar) {

        audio.play()
            .then(() => {

                playButton.textContent =
                    "⏸";

            })
            .catch(() => {

                playButton.textContent =
                    "▶";

            });

    } else {

        playButton.textContent =
            "▶";
    }
}


carregarMusica(0);


playButton.addEventListener(
    "click",
    () => {

        if (audio.paused) {

            audio.play()
                .then(() => {

                    playButton.textContent =
                        "⏸";

                })
                .catch(() => {

                    playButton.textContent =
                        "▶";

                });

        } else {

            audio.pause();

            playButton.textContent =
                "▶";
        }

    }
);


document.getElementById(
    "previous-song"
).addEventListener(
    "click",
    () => {

        musicaAtual--;

        if (musicaAtual < 0) {
            musicaAtual =
                musicas.length - 1;
        }

        carregarMusica(
            musicaAtual,
            true
        );

    }
);


document.getElementById(
    "next-song"
).addEventListener(
    "click",
    () => {

        musicaAtual++;

        if (
            musicaAtual >=
            musicas.length
        ) {
            musicaAtual = 0;
        }

        carregarMusica(
            musicaAtual,
            true
        );

    }
);


songButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const indice =
                    Number(
                        button.dataset.song
                    );

                carregarMusica(
                    indice,
                    true
                );

            }
        );

    }
);


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

        if (
            audio.duration &&
            isFinite(audio.duration)
        ) {

            progress.value =
                (
                    audio.currentTime /
                    audio.duration
                ) * 100;

        }

        currentTime.textContent =
            formatarTempo(
                audio.currentTime
            );

    }
);


progress.addEventListener(
    "input",
    () => {

        if (
            audio.duration &&
            isFinite(audio.duration)
        ) {

            audio.currentTime =
                (
                    progress.value / 100
                ) * audio.duration;

        }

    }
);


audio.addEventListener(
    "play",
    () => {

        playButton.textContent =
            "⏸";

    }
);


audio.addEventListener(
    "pause",
    () => {

        playButton.textContent =
            "▶";

    }
);


/*
   Quando uma música termina,
   passa automaticamente para a próxima.
*/

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

        carregarMusica(
            musicaAtual,
            true
        );

    }
);


/* Abrir player */

document.getElementById(
    "music-toggle"
).addEventListener(
    "click",
    () => {

        musicPlayer.classList.toggle(
            "open"
        );

    }
);


/* Fechar player */

document.getElementById(
    "close-music"
).addEventListener(
    "click",
    () => {

        musicPlayer.classList.remove(
            "open"
        );

    }
);


/* =====================================
   GALERIA AMPLIADA
===================================== */

const fotos =
    Array.from(
        document.querySelectorAll(
            ".gallery .media-card img"
        )
    );


const imageModal =
    document.getElementById(
        "image-modal"
    );

const modalImage =
    document.getElementById(
        "modal-image"
    );

const modalCounter =
    document.getElementById(
        "modal-counter"
    );

const modalClose =
    document.getElementById(
        "modal-close"
    );

const modalPrev =
    document.getElementById(
        "modal-prev"
    );

const modalNext =
    document.getElementById(
        "modal-next"
    );


let fotoAtual = 0;


function mostrarFoto(indice) {

    if (!fotos.length) {
        return;
    }

    if (indice < 0) {
        indice =
            fotos.length - 1;
    }

    if (
        indice >=
        fotos.length
    ) {
        indice = 0;
    }

    fotoAtual = indice;

    modalImage.src =
        fotos[fotoAtual].src;

    modalImage.alt =
        fotos[fotoAtual].alt;

    modalCounter.textContent =
        `${fotoAtual + 1} / ${fotos.length}`;

}


function abrirFoto(indice) {

    mostrarFoto(indice);

    imageModal.classList.add(
        "open"
    );

    document.body.style.overflow =
        "hidden";
}


function fecharFoto() {

    imageModal.classList.remove(
        "open"
    );

    document.body.style.overflow =
        "";
}


fotos.forEach(
    (foto, indice) => {

        foto.addEventListener(
            "click",
            () => {

                abrirFoto(indice);

            }
        );

    }
);


modalClose.addEventListener(
    "click",
    fecharFoto
);


modalPrev.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

        mostrarFoto(
            fotoAtual - 1
        );

    }
);


modalNext.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

        mostrarFoto(
            fotoAtual + 1
        );

    }
);


/*
   Clicar fora da foto fecha.
*/

imageModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            imageModal
        ) {

            fecharFoto();

        }

    }
);


/*
   Teclado:

   ESC = fechar
   ← = anterior
   → = próxima
*/

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !imageModal.classList.contains(
                "open"
            )
        ) {
            return;
        }

        if (
            event.key ===
            "Escape"
        ) {

            fecharFoto();

        }

        if (
            event.key ===
            "ArrowLeft"
        ) {

            mostrarFoto(
                fotoAtual - 1
            );

        }

        if (
            event.key ===
            "ArrowRight"
        ) {

            mostrarFoto(
                fotoAtual + 1
            );

        }

    }
);