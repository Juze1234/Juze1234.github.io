"use client";

import Link from "next/link";
import { useEffect } from "react";

type Language = "en" | "ru";

const sharedProjects = [
  { number: "01", image: "/projects/metro-war/teaser.jpg", href: "#metro-war", featured: true },
  { number: "02", image: "/projects/metro-war/passport.jpg", href: "https://www.youtube.com/watch?v=FRJ88T8c6gM", featured: false },
  { number: "03", image: "/projects/metro-war/network-map.jpg", href: "#metro-war", featured: false },
];

const sharedVideos = [
  { image: "/projects/metro-war/teaser.jpg", href: "https://www.youtube.com/watch?v=tnzsOXm63ZY", duration: "01:20" },
  { image: "/projects/metro-war/generator.jpg", href: "https://www.youtube.com/watch?v=HxpxkqS64HA", duration: "04:59" },
  { image: "/projects/metro-war/draisine.jpg", href: "https://www.youtube.com/watch?v=O6strrx9pd4", duration: "04:29" },
  { image: "/projects/metro-war/anomaly.jpg", href: "https://www.youtube.com/watch?v=_shYOTD5DGo", duration: "01:27" },
];

const content = {
  en: {
    locale: "English",
    pageTitle: "Sergey Senchenko — Technical Design Portfolio",
    portfolioLabel: "Technical Design Portfolio",
    backToTop: "Back to top",
    languageLabel: "Choose language",
    navLabel: "Primary navigation",
    nav: ["Work", "Capabilities", "About", "Contact"],
    location: "Tallinn, Estonia · Open to remote opportunities",
    roles: "Technical Designer · Gameplay Scripter · Level Designer",
    heroStart: "Gameplay systems —",
    heroAccent: " from concept to implementation.",
    heroText: "Lead developer of Metro W.A.R. RP, with hands-on experience across gameplay scripting, model integration, level design, game design, and multiplayer economy design.",
    explore: "Explore selected work",
    coreAreasLabel: "Core areas",
    coreAreas: ["DayZ modding", "RP infrastructure", "Gameplay systems", "Level design"],
    selectedWork: "Selected work",
    projectsHeadline: "Projects with playable outcomes.",
    projectsNote: "Case studies are assembled from project footage, production code, and development materials.",
    projects: [
      {
        title: "Metro W.A.R. RP",
        platform: "DayZ",
        description: "A survival and roleplay experience set in the Metro 2033 universe, developed on DayZ with custom systems, environments, and a player-driven economy.",
        tags: ["Gameplay systems", "Modding", "Multiplayer"],
        linkLabel: "Read case study",
      },
      {
        title: "Roleplay Infrastructure",
        platform: "DayZ · Metro W.A.R.",
        description: "Connected systems for persistent roleplay: player identity and passports, rental and access control, and private storage supporting long-term character progression.",
        tags: ["System design", "Access control", "Player identity"],
        linkLabel: "View system demonstration",
      },
      {
        title: "Metro Network & Surface World",
        platform: "DayZ · Metro W.A.R.",
        description: "A connected underground network and surface play space. I contribute gameplay requirements, system and economy placement, route design, and environment iteration while the second team member leads primary map production.",
        tags: ["Level design", "World building", "Gameplay integration"],
        linkLabel: "View project context",
      },
    ],
    skillsLabel: "skills",
    caseStudy: "Case study 01 · DayZ",
    caseIntro: "I am building an independent multiplayer survival and roleplay project on DayZ, set in the Metro 2033 universe. It combines underground exploration, survival pressure, roleplay systems, and a designed server economy. I work in a two-person team: the other developer focuses primarily on the map, while I lead development of the remaining systems and content. After two years in development, we are preparing the project for its next closed beta.",
    facts: [
      ["Role", "Lead Developer"], ["Platform", "DayZ"], ["Format", "Multiplayer RP survival"],
      ["Focus", "Systems, world, economy"], ["Team", "2 developers"],
    ],
    resultsLabel: "Project results",
    impacts: [["2 years", "in active development"], ["900+", "members awaiting launch"], ["80 CCU", "full server during the latest major test"], ["Next", "closed beta in preparation"]],
    contributionLabel: "Personal contribution",
    contributionHeadline: "From concept to playable system.",
    contributions: [
      "Porting and integrating models into the DayZ development pipeline",
      "Scripting multiplayer gameplay systems with synchronized server-side state",
      "Level design across the metro network: gameplay integration, system placement, routes, and environmental iteration",
      "Game design for survival and roleplay-oriented player behaviour",
      "Designing the server economy and its progression logic",
      "Leading development alongside a dedicated world and map contributor",
    ],
    mapAlt: "Metro W.A.R. underground network map",
    mapCaption: "World map · Underground network and surface connections",
    levelLabel: "Level-design spotlight",
    levelHeadline: "VDNKh: the player's first station.",
    levelIntro: "VDNKh is the starting point for every new player. It introduces the project's core interactions in a focused environment before sending the player into the wider metro network.",
    levelFacts: [
      ["Purpose", "Onboard new players and establish the project's survival-roleplay direction."],
      ["Player flow", "A single outgoing tunnel creates a clear first route and gives the atmosphere room to land."],
      ["Economy", "An on-station trader gives players an immediate introduction to trading and progression."],
      ["Core loop", "Choose a loadout, prepare at the station, then enter the tunnels to fight mutants, gather loot, roleplay, or pursue personal and group conflicts."],
    ],
    galleryLabel: "VDNKh environment and onboarding system",
    gallery: [
      ["VDNKh station platform in Metro W.A.R.", "VDNKh platform · The player's first station"],
      ["Player loadout selection interface", "Loadout selection · Preparing a new character"],
      ["Generator room at VDNKh station", "Station infrastructure · Integrated power system"],
      ["Trader area at VDNKh station", "Trader area · Economy and player interaction"],
    ],
    loadoutLabel: "Gameplay-system contribution",
    loadoutHeadline: "Data-driven loadout selection.",
    loadoutFacts: [
      ["Ownership", "Independently designed and implemented the complete system code and player-facing interface."],
      ["Rule", "Available equipment choices are determined by the character's registered home station."],
      ["Goal", "Give players meaningful visual and equipment variety from the beginning of their story."],
      ["Architecture", "Config-driven loadout sets with client-side preview and selection, plus server-side eligibility checks and final equipment application tied to station and passport data."],
    ],
    codeExcerpt: "Condensed production excerpt",
    codeAria: "Server-side loadout eligibility code excerpt",
    codePrivate: "Representative excerpt only. The complete project source remains private.",
    qaLabel: "Code & QA",
    qaHeadline: "Rules enforced on the server. Failures traced end to end.",
    qaText: "Loadout access is derived from persistent passport data, with synchronized player state as a fallback. Missing or invalid state fails closed instead of granting restricted equipment.",
    qaItems: [
      "Feature implementation and QA owned by the same developer",
      "Client preview, selection, RPC, validation, and final application tested as one flow",
      "Defensive handling for missing sessions, players, spawn data, loadouts, and repeated submission",
      "Issues reproduced and iterated through hands-on multiplayer testing",
    ],
    privateWalkthrough: "Full source and a deeper code walkthrough are available privately during recruitment.",
    demosLabel: "Selected demonstrations",
    demosHeadline: "Playable mechanics, captured in-engine.",
    fullChannel: "Full project channel",
    play: "Play",
    videos: [
      ["Project teaser", "Project overview", "An overview of the custom underground world and the combined survival and roleplay direction."],
      ["Stationary generator", "Gameplay system", "A configurable, server-authoritative power network. Fuel and a glow plug bring the generator online; switches then control lighting circuits, panels, and powered hermetic doors, with synchronized audio, animation, and low-fuel feedback."],
      ["Rail handcars", "Traversal system", "A custom draisine built by extending HypeTrain Core. Project work includes model integration, simulation tuning, six-passenger mapping, custom rail paths, graph-generation overrides, and automatic alignment to valid track nodes."],
      ["Anomaly demonstration", "Environmental hazard", "A layered electric hazard with an outer interference zone and a lethal core. It attacks players and mutants, flickers carried lights, drains batteries and vehicle power, and communicates danger through particles, sound, dynamic light, and lightning strikes."],
    ],
    videoThumbnail: "video thumbnail",
    supportingLabel: "Supporting systems",
    supportingHeadline: "World events and roleplay infrastructure.",
    supportingText: "Additional demonstrations include the ghost train world event and an in-world resident passport, showing how atmosphere and formal roleplay infrastructure support the core survival experience. The wider codebase also contains rental, access-control, private storage, and player identity systems.",
    ghostAlt: "Ghost train world event",
    ghostCaption: "Ghost train · World event",
    passportAlt: "Metro resident passport system",
    passportCaption: "Resident passport · RP system",
    disclaimer: "Independent fan-made project. This portfolio documents personal development work and is not presented as an official Metro franchise product.",
    capabilitiesLabel: "Capabilities",
    capabilitiesHeadline: "Design thinking, proven in-engine.",
    capabilities: [
      ["Gameplay scripting", "Implementing and debugging interactive systems in Enforce Script within the DayZ framework."],
      ["Technical design", "Connecting design intent with practical, testable in-engine implementation."],
      ["Level design", "Building spaces around player flow, atmosphere, encounters, and exploration."],
      ["Multiplayer systems", "Working with server-driven gameplay and the realities of online player behaviour."],
      ["Hands-on QA", "Owning feature testing, reproducing issues, tracing client-server failures, and iterating from playtest feedback."],
    ],
    toolsetLabel: "Working toolset",
    toolsetText: "Tools used across scripting, asset integration, environment production, and presentation.",
    toolGroups: [["Scripting", ["Enforce Script"]], ["DayZ pipeline", ["DayZ Tools", "Object Builder", "Terrain Builder"]], ["Content creation", ["Blender", "Substance Painter", "Adobe Photoshop"]]],
    aboutLabel: "About",
    aboutHeadline: "A practical route into game development.",
    about: [
      "I am the lead developer of Metro W.A.R. RP. I write the gameplay systems, bring models into the engine, build the levels, handle game design, and design the server economy. There are two of us — the other developer mainly handles the world and the map. Over two years more than 900 people have gathered around the project, and at our last big test the server was full: all 80 players.",
      "I built this portfolio out of things that already work in the game, not descriptions of ideas. Each case study shows what I did myself, where my part ends and my teammate's begins, the technical decisions behind it, and what the player ended up with.",
    ],
    contactLabel: "Contact",
    contactHeadline: "Interested in practical technical design?",
    contactText: "Based in Tallinn, Estonia, and open to remote opportunities in technical design, gameplay scripting, and level design.",
    cvDownload: "Download CV · PDF",
    projectChannel: "Project channel",
    footerTitle: "Sergey Senchenko · Technical Design Portfolio",
    footerVersion: "Portfolio · 2026",
  },
  ru: {
    locale: "Русский",
    pageTitle: "Сергей Сенченко — портфолио технического дизайнера",
    portfolioLabel: "Портфолио технического дизайнера",
    backToTop: "Наверх",
    languageLabel: "Выбор языка",
    navLabel: "Основная навигация",
    nav: ["Работы", "Навыки", "Обо мне", "Контакты"],
    location: "Таллинн, Эстония · Рассматриваю удалённую работу",
    roles: "Технический дизайнер · Скриптер игровых систем · Левел-дизайнер",
    heroStart: "Игровые системы —",
    heroAccent: " от идеи до реализации.",
    heroText: "Главный разработчик Metro W.A.R. RP с практическим опытом в программировании игровых механик, интеграции моделей, левел- и геймдизайне, а также проектировании экономики многопользовательского сервера.",
    explore: "Посмотреть работы",
    coreAreasLabel: "Основные направления",
    coreAreas: ["Моддинг DayZ", "RP-инфраструктура", "Игровые системы", "Левел-дизайн"],
    selectedWork: "Избранные работы",
    projectsHeadline: "Проекты с игровым результатом.",
    projectsNote: "Кейсы собраны на основе видео проекта, рабочего кода и материалов разработки.",
    projects: [
      {
        title: "Metro W.A.R. RP",
        platform: "DayZ",
        description: "Проект о выживании и ролевой игре во вселенной Metro 2033, созданный на платформе DayZ с собственными системами, локациями и экономикой, зависящей от действий игроков.",
        tags: ["Игровые системы", "Моддинг", "Мультиплеер"],
        linkLabel: "Открыть кейс",
      },
      {
        title: "Ролевая инфраструктура",
        platform: "DayZ · Metro W.A.R.",
        description: "Связанные системы для долгосрочного ролеплея: личность и паспорт игрока, аренда, контроль доступа и приватное хранилище, поддерживающие развитие персонажа.",
        tags: ["Системный дизайн", "Контроль доступа", "Идентичность игрока"],
        linkLabel: "Посмотреть демонстрацию",
      },
      {
        title: "Сеть метро и поверхность",
        platform: "DayZ · Metro W.A.R.",
        description: "Связанный подземный мир и игровая поверхность. Я отвечаю за игровые требования, размещение систем и экономики, проектирование маршрутов и итерации окружения; второй участник команды ведёт основную работу над картой.",
        tags: ["Левел-дизайн", "Построение мира", "Интеграция механик"],
        linkLabel: "Контекст проекта",
      },
    ],
    skillsLabel: "навыки",
    caseStudy: "Кейс 01 · DayZ",
    caseIntro: "Я разрабатываю независимый многопользовательский проект о выживании и ролевой игре на платформе DayZ во вселенной Metro 2033. Он объединяет исследование подземного мира, давление механик выживания, ролевые системы и спроектированную серверную экономику. Я работаю в команде из двух человек: второй разработчик в основном занимается картой, а я руковожу разработкой остальных систем и контента. После двух лет работы мы готовим проект к следующему закрытому бета-тесту.",
    facts: [["Роль", "Главный разработчик"], ["Платформа", "DayZ"], ["Формат", "Мультиплеерное RP-выживание"], ["Фокус", "Системы, мир, экономика"], ["Команда", "2 разработчика"]],
    resultsLabel: "Результаты проекта",
    impacts: [["2 года", "активной разработки"], ["900+", "участников ожидают запуск"], ["80 онлайн", "полный сервер на последнем крупном тесте"], ["Далее", "подготовка закрытой беты"]],
    contributionLabel: "Личный вклад",
    contributionHeadline: "От идеи до работающей механики.",
    contributions: [
      "Портирование и интеграция моделей в пайплайн разработки DayZ",
      "Программирование сетевых игровых систем с синхронизированным серверным состоянием",
      "Левел-дизайн сети метро: интеграция механик, размещение систем, маршруты и итерации окружения",
      "Геймдизайн выживания и ролевого поведения игроков",
      "Проектирование серверной экономики и логики прогрессии",
      "Руководство разработкой вместе со специалистом по миру и карте",
    ],
    mapAlt: "Карта подземной сети Metro W.A.R.",
    mapCaption: "Карта мира · Подземная сеть и выходы на поверхность",
    levelLabel: "Пример левел-дизайна",
    levelHeadline: "ВДНХ: первая станция игрока.",
    levelIntro: "ВДНХ — стартовая точка каждого нового игрока. В компактном и понятном пространстве она знакомит с основными взаимодействиями проекта, прежде чем отправить игрока в большую сеть метро.",
    levelFacts: [
      ["Назначение", "Познакомить нового игрока с направлением проекта: выживание и ролеплей."],
      ["Маршрут", "Один выходящий тоннель создаёт понятный первый путь и позволяет прочувствовать атмосферу."],
      ["Экономика", "Торговец на станции сразу знакомит игрока с торговлей и прогрессией."],
      ["Игровой цикл", "Выбрать снаряжение, подготовиться на станции, выйти в тоннели, сражаться с мутантами, собирать ресурсы, отыгрывать роль или участвовать в конфликтах."],
    ],
    galleryLabel: "Окружение ВДНХ и система знакомства с игрой",
    gallery: [
      ["Платформа станции ВДНХ в Metro W.A.R.", "Платформа ВДНХ · Первая станция игрока"],
      ["Интерфейс выбора снаряжения", "Выбор снаряжения · Подготовка персонажа"],
      ["Генераторная на станции ВДНХ", "Инфраструктура станции · Связанная энергосистема"],
      ["Торговая зона на станции ВДНХ", "Торговая зона · Экономика и взаимодействие игроков"],
    ],
    loadoutLabel: "Вклад в игровую систему",
    loadoutHeadline: "Система выбора снаряжения на основе данных.",
    loadoutFacts: [
      ["Авторство", "Самостоятельно спроектировал и реализовал весь программный код системы и пользовательский интерфейс."],
      ["Правило", "Доступные варианты экипировки определяются станцией прописки персонажа."],
      ["Цель", "Дать игрокам значимое визуальное и игровое разнообразие с самого начала истории."],
      ["Архитектура", "Наборы экипировки задаются конфигурацией; клиент отвечает за предпросмотр и выбор, а сервер проверяет доступность и выдаёт предметы на основе данных станции и паспорта."],
    ],
    codeExcerpt: "Сокращённый фрагмент рабочего кода",
    codeAria: "Фрагмент серверной проверки доступа к набору снаряжения",
    codePrivate: "Показан репрезентативный фрагмент. Полный исходный код проекта остаётся закрытым.",
    qaLabel: "Код и QA",
    qaHeadline: "Правила проверяются сервером. Ошибки отслеживаются по всей цепочке.",
    qaText: "Доступ к снаряжению определяется постоянными данными паспорта, а синхронизированное состояние игрока используется как запасной источник. При отсутствии или ошибке данных система отклоняет выдачу закрытого снаряжения.",
    qaItems: [
      "Разработка механики и её тестирование выполнялись одним разработчиком",
      "Предпросмотр, выбор, RPC, валидация и итоговая выдача проверялись как единый сценарий",
      "Предусмотрена защита от отсутствующих сессий, игроков, данных спавна, наборов и повторной отправки",
      "Ошибки воспроизводились и исправлялись по результатам многопользовательских тестов",
    ],
    privateWalkthrough: "Полный исходный код и подробный разбор доступны приватно во время найма.",
    demosLabel: "Избранные демонстрации",
    demosHeadline: "Работающие механики, снятые в игре.",
    fullChannel: "Канал проекта",
    play: "Смотреть",
    videos: [
      ["Тизер проекта", "Обзор проекта", "Обзор созданного подземного мира и общего направления выживания и ролеплея."],
      ["Стационарный генератор", "Игровая система", "Настраиваемая серверная энергосистема. Топливо и свеча накала запускают генератор; выключатели управляют группами освещения, панелями и гермоворотами, а звук, анимация и предупреждение о низком топливе синхронизируются между игроками."],
      ["Дрезины", "Система перемещения", "Собственная дрезина на основе расширенного HypeTrain Core. Работа включает интеграцию модели, настройку симуляции, шесть пассажирских мест, пользовательские рельсовые пути, изменение генерации графа и автоматическое выравнивание по допустимым нодам."],
      ["Демонстрация аномалии", "Опасность окружения", "Многослойная электрическая аномалия с внешней зоной помех и смертельным ядром. Она атакует игроков и мутантов, заставляет мерцать переносной свет, разряжает батареи и технику и сообщает об опасности частицами, звуком, динамическим светом и молниями."],
    ],
    videoThumbnail: "обложка видео",
    supportingLabel: "Дополнительные системы",
    supportingHeadline: "События мира и ролевая инфраструктура.",
    supportingText: "Дополнительные демонстрации показывают мировое событие «поезд-призрак» и внутриигровой паспорт жителя. Они демонстрируют, как атмосфера и формальные ролевые системы поддерживают основное выживание. В кодовой базе также есть аренда, контроль доступа, приватные хранилища и системы идентичности игрока.",
    ghostAlt: "Мировое событие с поездом-призраком",
    ghostCaption: "Поезд-призрак · Мировое событие",
    passportAlt: "Система паспорта жителя метро",
    passportCaption: "Паспорт жителя · RP-система",
    disclaimer: "Независимый фанатский проект. Это портфолио документирует личную работу над разработкой и не представляет официальный продукт франшизы Metro.",
    capabilitiesLabel: "Компетенции",
    capabilitiesHeadline: "Проектные решения, проверенные в игре.",
    capabilities: [
      ["Gameplay-программирование", "Реализация и отладка интерактивных систем на Enforce Script в рамках DayZ."],
      ["Технический дизайн", "Связь дизайнерской задачи с практической, тестируемой реализацией в движке."],
      ["Левел-дизайн", "Создание пространств вокруг маршрутов игрока, атмосферы, столкновений и исследования."],
      ["Мультиплеерные системы", "Работа с серверной логикой и реальным поведением игроков в сетевой среде."],
      ["Практический QA", "Тестирование механик, воспроизведение ошибок, поиск сбоев между клиентом и сервером и итерации по итогам игровых тестов."],
    ],
    toolsetLabel: "Рабочие инструменты",
    toolsetText: "Инструменты для программирования, интеграции ассетов, производства окружения и презентации.",
    toolGroups: [["Программирование", ["Enforce Script"]], ["Пайплайн DayZ", ["DayZ Tools", "Object Builder", "Terrain Builder"]], ["Создание контента", ["Blender", "Substance Painter", "Adobe Photoshop"]]],
    aboutLabel: "Обо мне",
    aboutHeadline: "Практический путь в игровую разработку.",
    about: [
      "Я главный разработчик Metro W.A.R. RP. Пишу игровые механики, переношу модели в движок, занимаюсь уровнями и геймдизайном, проектирую экономику сервера. Нас в команде двое — второй разработчик в основном отвечает за мир и карту. За два года вокруг проекта собралось больше 900 человек, а на последнем крупном тесте сервер был забит полностью, все 80 игроков.",
      "Портфолио я собрал из того, что уже работает в игре, а не из описаний задумок. В каждом кейсе видно, что сделал лично я, где заканчивается моя часть и начинается работа напарника, какие технические решения за этим стоят и что в итоге получил игрок.",
    ],
    contactLabel: "Контакты",
    contactHeadline: "Ищете практического технического дизайнера?",
    contactText: "Живу в Таллинне и рассматриваю удалённую работу в техническом дизайне, программировании игровых механик и левел-дизайне.",
    cvDownload: "Скачать CV · PDF",
    projectChannel: "Канал проекта",
    footerTitle: "Сергей Сенченко · Портфолио технического дизайнера",
    footerVersion: "Портфолио · 2026",
  },
} as const;

const galleryImages = [
  "/projects/metro-war/vdnkh/platform.jpg",
  "/projects/metro-war/vdnkh/loadout-selection.jpg",
  "/projects/metro-war/vdnkh/generator-room.jpg",
  "/projects/metro-war/vdnkh/trader-area.jpg",
];

export default function PortfolioPage({ language }: { language: Language }) {
  const t = content[language];

  // Each language is its own route, so the URL is the source of truth. The root
  // layout ships lang="en"; correct it here for the Russian route.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <main className={`lang-${language}`}>
      <header className="site-header">
        <a className="identity" href="#top" aria-label={t.backToTop}>
          <span className="identity-mark">SS</span>
          <span className="identity-copy"><strong>Sergey Senchenko</strong><small>{t.portfolioLabel}</small></span>
        </a>
        <div className="header-controls">
          <nav aria-label={t.navLabel}>
            <a href="#work">{t.nav[0]}</a><a href="#capabilities">{t.nav[1]}</a><a href="#about">{t.nav[2]}</a><a className="nav-contact" href="#contact">{t.nav[3]}</a>
          </nav>
          <div className="language-switch" role="group" aria-label={t.languageLabel}>
            <Link href="/" className={language === "en" ? "active" : ""} aria-current={language === "en" ? "page" : undefined} hrefLang="en">ENG</Link>
            <Link href="/ru/" className={language === "ru" ? "active" : ""} aria-current={language === "ru" ? "page" : undefined} hrefLang="ru">RU</Link>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker"><span className="status-dot" />{t.location}</div>
        <div className="hero-layout">
          <div><p className="eyebrow">{t.roles}</p><h1>{t.heroStart}<span>{t.heroAccent}</span></h1></div>
          <div className="hero-aside"><p>{t.heroText}</p><a href="#work" className="text-link">{t.explore} <span>↓</span></a></div>
        </div>
        <div className="signal-strip" aria-label={t.coreAreasLabel}>{t.coreAreas.map((area) => <span key={area}>{area}</span>)}</div>
      </section>

      <section className="section" id="work">
        <div className="section-heading"><div><p className="eyebrow">{t.selectedWork}</p><h2>{t.projectsHeadline}</h2></div><p className="section-note">{t.projectsNote}</p></div>
        <div className="projects-grid">
          {t.projects.map((project, index) => {
            const shared = sharedProjects[index];
            return <article className={`project-card ${shared.featured ? "featured" : ""}`} key={shared.number}>
              <div className="project-topline"><span>{shared.number}</span><span>{project.platform}</span></div>
              <div className="project-visual has-image" aria-hidden="true"><img src={shared.image} alt="" /><div className="project-scanline" /></div>
              <div className="project-content"><h3>{project.title}</h3><p>{project.description}</p><ul className="tag-list" aria-label={`${project.title}: ${t.skillsLabel}`}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><a href={shared.href} target={shared.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{project.linkLabel} <span>↗</span></a></div>
            </article>;
          })}
        </div>

        <article className="case-study" id="metro-war">
          <header className="case-study-header"><div><p className="eyebrow">{t.caseStudy}</p><h2>Metro W.A.R. RP</h2></div><p>{t.caseIntro}</p></header>
          <div className="case-facts">{t.facts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
          <div className="impact-grid" aria-label={t.resultsLabel}>{t.impacts.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}</div>
          <div className="contribution-grid"><div><p className="eyebrow">{t.contributionLabel}</p><h3>{t.contributionHeadline}</h3></div><ul>{t.contributions.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ul></div>

          <div className="level-spotlight">
            <div className="level-map"><img src="/projects/metro-war/network-map.jpg" alt={t.mapAlt} loading="lazy" /><span>{t.mapCaption}</span></div>
            <div className="level-copy"><p className="eyebrow">{t.levelLabel}</p><h3>{t.levelHeadline}</h3><p>{t.levelIntro}</p><dl>{t.levelFacts.map(([term, detail]) => <div key={term}><dt>{term}</dt><dd>{detail}</dd></div>)}</dl></div>
            <div className="level-gallery" aria-label={t.galleryLabel}>{t.gallery.map(([alt, caption], index) => <figure key={caption}><img src={galleryImages[index]} alt={alt} loading="lazy" /><figcaption>{caption}</figcaption></figure>)}</div>
            <div className="loadout-case"><div><p className="eyebrow">{t.loadoutLabel}</p><h4>{t.loadoutHeadline}</h4></div><div className="loadout-facts">{t.loadoutFacts.map(([label, detail]) => <p key={label}><span>{label}</span>{detail}</p>)}</div></div>
            <div className="implementation-evidence">
              <div className="code-panel"><div className="code-panel-header"><span>Enforce Script</span><span>{t.codeExcerpt}</span></div><pre aria-label={t.codeAria}><code>{`private bool CanPlayerUseFactionLoadout(
    PlayerBase player,
    SpawnSetsData setData)
{
    if (!setData)
        return false;

    if (setData.Faction == string.Empty ||
        setData.Faction == "none")
        return true;

    string profile = GetPlayerFactionNameFromPassport(player);
    if (profile == string.Empty)
        profile = GetPlayerFactionName(player);

    return profile != string.Empty &&
        profile == setData.Faction;
}`}</code></pre><p>{t.codePrivate}</p></div>
              <div className="qa-copy"><p className="eyebrow">{t.qaLabel}</p><h4>{t.qaHeadline}</h4><p>{t.qaText}</p><ul>{t.qaItems.map((item) => <li key={item}>{item}</li>)}</ul><small>{t.privateWalkthrough}</small></div>
            </div>
          </div>

          <div className="video-section">
            <div className="video-heading"><div><p className="eyebrow">{t.demosLabel}</p><h3>{t.demosHeadline}</h3></div><a href="https://www.youtube.com/@MetroWARrpOFF" target="_blank" rel="noreferrer">{t.fullChannel} <span>↗</span></a></div>
            <div className="video-grid">{t.videos.map(([title, category, description], index) => { const shared = sharedVideos[index]; return <a className="video-card" href={shared.href} target="_blank" rel="noreferrer" key={shared.href}><div className="video-image"><img src={shared.image} alt={`${title} — ${t.videoThumbnail}`} loading="lazy" /><span className="play-button" aria-hidden="true">{t.play}</span><small>{shared.duration}</small></div><div className="video-copy"><span>{category}</span><strong>{title}</strong><p>{description}</p></div></a>; })}</div>
          </div>

          <div className="supporting-systems"><div className="supporting-copy"><p className="eyebrow">{t.supportingLabel}</p><h3>{t.supportingHeadline}</h3><p>{t.supportingText}</p></div><div className="supporting-media"><a href="https://www.youtube.com/watch?v=g36GysVoe_o" target="_blank" rel="noreferrer"><img src="/projects/metro-war/ghost-train.jpg" alt={t.ghostAlt} loading="lazy" /><span>{t.ghostCaption} ↗</span></a><a href="https://www.youtube.com/watch?v=FRJ88T8c6gM" target="_blank" rel="noreferrer"><img src="/projects/metro-war/passport.jpg" alt={t.passportAlt} loading="lazy" /><span>{t.passportCaption} ↗</span></a></div></div>
          <p className="project-disclaimer">{t.disclaimer}</p>
        </article>
      </section>

      <section className="section capability-section" id="capabilities">
        <div className="section-heading compact"><div><p className="eyebrow">{t.capabilitiesLabel}</p><h2>{t.capabilitiesHeadline}</h2></div></div>
        <div className="capability-list">{t.capabilities.map(([title, description], index) => <div className="capability-row" key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></div>)}</div>
        <div className="toolset" aria-label={t.toolsetLabel}><div className="toolset-heading"><p className="eyebrow">{t.toolsetLabel}</p><p>{t.toolsetText}</p></div><div className="tool-groups">{t.toolGroups.map(([category, tools]) => <div className="tool-group" key={category}><span>{category}</span><ul>{tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></div>)}</div></div>
      </section>

      <section className="section about-section" id="about"><div><p className="eyebrow">{t.aboutLabel}</p><h2>{t.aboutHeadline}</h2></div><div className="about-copy">{t.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>
      <section className="contact-section" id="contact"><p className="eyebrow">{t.contactLabel}</p><h2>{t.contactHeadline}</h2><p>{t.contactText}</p><div className="contact-actions"><a href="mailto:SergeyJuze@gmail.com">SergeyJuze@gmail.com <span>↗</span></a><a href="/cv/Sergey_Senchenko_CV_ATS.pdf" download>{t.cvDownload} <span>↓</span></a><a href="https://www.linkedin.com/in/sergey-senchenko-951aa837b/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href="https://github.com/Juze1234" target="_blank" rel="noreferrer">GitHub <span>↗</span></a><a href="https://www.youtube.com/@MetroWARrpOFF" target="_blank" rel="noreferrer">{t.projectChannel} <span>↗</span></a></div></section>
      <footer><span>{t.footerTitle}</span><span>{t.footerVersion}</span></footer>
    </main>
  );
}
