// ======================================================
// CONFIGURAÇÕES DO EVENTO — edite apenas este arquivo
// ======================================================
// Mantenha as aspas "" e as vírgulas ao editar os textos.
// ======================================================

const EVENTO = {
    nome: "SARC IFC Brusque 2026",
    subtitulo: "Torneio LAN de Counter-Strike 1.6",
    local: "IFC Campus Brusque",
    formato: "3x3",
    maxEquipes: 8,
    data: "DATA DO EVENTO",     // texto exibido na página (ex.: "15 de novembro de 2026")
    dataISO: "2026-11-05T20:20:00-03:00",                 // ativa a contagem regressiva. Ex: "2026-11-15T09:00:00-03:00" (vazio = sem contagem)
    instagram: "https://www.instagram.com/ifc.redes.computadores.brusque?cplk=MWhraDQxb3hsNTJzZQ==",               // Ex: "https://instagram.com/seuperfil" (vazio = link oculto)
    contato: ""                  // Ex: "mailto:contato@exemplo.com" (vazio = link oculto)
};

// ======================================================
// LINK DE INSCRIÇÃO (abre em nova aba)
// ======================================================
const URL_INSCRICAO = "https://forms.gle/4DkFpuQZ5vCN37i66";

// ======================================================
// OBJETIVO DO EVENTO (seção "Sobre")
// ======================================================
const OBJETIVO = {
    titulo: "Um torneio feito para quem joga junto",
    paragrafos: [
        "O " + EVENTO.nome + " é um torneio LAN de Counter-Strike 1.6 realizado no " + EVENTO.local + ", com partidas " + EVENTO.formato + " jogadas lado a lado, na mesma rede.",
        "O objetivo é aproximar estudantes e comunidade em torno de um jogo clássico, estimulando o trabalho em equipe, a estratégia e a competição saudável, com regras claras e organização do início ao fim.",
        "Reúna seu trio, escolha uma TAG e dispute o título e a premiação."
    ]
};

// ============================================
// ALTERE AQUI A INFORMAÇÃO DA PREMIAÇÃO
// ============================================
const PREMIO = "Troféu + brindes para a equipe campeã";

// ============================================
// CAMPEÃO — preencha ao fim do evento
// ============================================
// Aparece na coroa 3D sobre o mapa e no bloco de premiação.
// Depois de preenchido e publicado, fica ali para sempre.
// Vazio = a coroa mostra "A definir".
const CAMPEAO = {
    equipe: "",                  // Ex: "Os Brabos"
    jogadores: ["", "", ""]      // Ex: ["Nick1", "Nick2", "Nick3"]
};

// ======================================================
// COMO FUNCIONA (etapas do evento). Formato: [título, descrição]
// ======================================================
const ETAPAS = [
    ["Inscrição", "Envie o formulário da sua equipe."],
    ["Equipes", "A organização confirma times e TAGs."],
    ["Sorteio", "Definição dos confrontos."],
    ["Partidas", "Jogos 3x3 em LAN."],
    ["Final", "Os melhores decidem o título."],
    ["Premiação", "Entrega ao campeão."]
];

// ======================================================
// COMO PARTICIPAR (passos para se inscrever)
// ======================================================
const PASSOS = [
    "Forme uma equipe de 3 jogadores.",
    "Escolha uma TAG.",
    "Defina os nicks dos jogadores.",
    "Preencha o formulário de inscrição.",
    "Compareça ao evento com o equipamento necessário.",
    "Aguarde a chamada da organização."
];

// ======================================================
// REGRAS (resumo). Formato: [título, texto]
// ======================================================
const REGRAS = [
    ["Equipes", "Exatamente 3 jogadores por equipe."],
    ["Participação", "De 3 a 8 equipes."],
    ["Partidas", "Melhor de 5 rounds (ajuste conforme a organização)."],
    ["Troca de lado", "2 rounds CT, troca, 2 TR, troca, 1 CT."],
    ["BYE", "Número ímpar de equipes: sorteio de equipe com BYE."],
    ["Desempate", "Saldo de rounds, depois rounds ganhos, depois confronto direto."],
    ["Tolerância e WO", "Equipe ausente após a tolerância da organização perde por WO."],
    ["Mapa", "Mapa definido pela organização."],
    ["Cheats e bots", "Proibido qualquer cheat, bot ou programa de vantagem. Desclassifica."],
    ["Organização", "As decisões da organização são finais."]
];

// ======================================================
// ORGANIZAÇÃO (seção discreta, só nomes — sem foto)
// ======================================================
// Campos vazios ficam ocultos. Para adicionar alguém, copie uma linha de "equipe".
const ORGANIZACAO = {
    coordenador: { nome: "Rafa", cargo: "Coordenador", linkedin: "", github: "" },
    equipe: [
        { nome: "caique", cargo: "Organização", linkedin: "www.linkedin.com/in/caique-cardim", github: "https://github.com/kyo5hy" },
        { nome: "Ygor", cargo: "Organização", linkedin: "", github: "" },
        { nome: "Abraão", cargo: "Organização", linkedin: "https://www.linkedin.com/in/abraaoteixeira/", github: "" }
        
    ]
};

// ======================================================
// FOTOS DO EVENTO — preencher depois que o evento acabar
// ======================================================
// Coloque as fotos em img/ e liste aqui (ideal: 3, no máximo 6).
// Enquanto estiver vazio, a seção não aparece na página.
// Exemplo:
//   { src: "img/evento1.jpg", legenda: "Final no laboratório" },
const FOTOS_EVENTO = [{ src: "img/cs.web", legenda: "Final no laboratório" }];

// Crédito do site (rodapé). Nome vazio = oculto.
const CREDITO_SITE = { texto: "Site desenvolvido por", nome: "kyoshy", link: "" };
