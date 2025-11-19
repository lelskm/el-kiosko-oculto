// js/products.js
// Base de datos de productos con categorías y ofertas estandarizadas.

export const jokeProducts = [
  {
    id: 1,
    name: "Manipulador de Campos de Energia Cero",
    price: "$95,000",
    seller: "Dr. Eli Vance",
    description: "El icónico Manipulador de Campos de Energía Cero, utilizado por Gordon Freeman, permite el transporte instantáneo de materia y personas. Longitud total: 40 cm; peso: 1,3 kg.",
    category: "Armas de Energía",
    isOffer: true,
    image: "imagenes/arma gravitatoria hl 2.jpeg", 
    images: [
      "imagenes/miniatura arma gravitatoria 1.jpg", 
      "imagenes/miniatura arma gravitatoria 2.jpg",
      "imagenes/miniatura arma gravitatoria 3.png"
    ],
    // ----------------------------------------------------------------------
    // ¡NUEVO CAMPO DE INFORMACIÓN EXTENDIDA!
    extendedInfo: {
        origen: "Herramienta desarrollada para labores de mantenimiento y recuperación en instalaciones de investigación avanzada; adaptada en combate para uso improvisado.",
        specs: "Carcasa de aleación compuesta (matriz metálica + polímero conductor), condensador cuántico de flujo inverso, bobinas de control de tino, interfaces hápticas y sensores LIDAR de corto alcance. Fuente: célula de energía lambda / acumulador de alta densidad. Medidas aproximadas: 0,62 m × 0,18 m × 0,12 m. Masa aproximada: 4,2 kg.",
        funcionamiento: "Genera un campo local que modifica la interacción entre un objeto y el vector gravitacional aparente en un volumen limitado; posibilita suspensión, traslación y proyección de masas dentro de sus límites operativos."
    }
    // ----------------------------------------------------------------------
  },
  {
    id: 2,
    name: "Dispositivo Portátil de Portales de Aperture Science",
    price: "$1,200,000",
    seller: "GLaDOS",
    description: "Sistema experimental de mano con doble emisor gemelo que establece un enlace bidireccional entre dos puntos. Dimensiones: 33 cm longitud; peso: 1,1–1,5 kg.",
    category: "Dispositivos de Viaje",
    isOffer: false,
    image: "imagenes/arma de portales portal.jpg",
    images: [
      "imagenes/miniatura portal 1.jpg", 
      "imagenes/miniatura portal 2.jpg",
      "imagenes/miniatura portal 3.jpg"
    ],
    extendedInfo: {
        origen: "Instrumento de prueba para cámaras de evaluación de dinámicas de movimiento y logística interna.",
        specs: "Armazón de aleación ligera Aperture, módulos generadores emparejados, condensador de conservación de momentum, aislantes cerámicos y sistema de control de fase. Fuente: microreactor de fusión de baja potencia. Medidas: 0,33–0,40 m (longitud cuerpo + emisor); diámetro emisor ≈ 0,20 m. Masa aproximada: 1,1–1,5 kg.",
        funcionamiento: "Establece conexión bidireccional entre dos planos de superficie, permitiendo tránsito instantáneo de masa conservando vector de velocidad relativo; empleado en resolución de rutas y pruebas de dinámica."
    }
  },
  {
    id: 3,
    name: "Espadas del Caos",
    price: "$450,000",
    seller: "Brok y Sindri.",
    description: "Forjadas en los fuegos del Inframundo, son dos hojas curvas unidas por cadenas ardientes. Largo: 60 cm (hoja); peso: 9 kg.",
    category: "Armas Cuerpo a Cuerpo",
    isOffer: true,
    image: "imagenes/espadas del caos.jpg",
    images: [
      "imagenes/miniatura kratos 1.jpg", 
      "imagenes/miniatura kratos 2.jpg",
      "imagenes/miniatura kratos 3.jpg"
    ],
    extendedInfo: {
        origen: "Armas forjadas con propósito punitivo y simbólico, empleadas por agentes de guerra vinculados a pactos divinos.",
        specs: "Hojas de acero tratado en proceso de alta temperatura con infusión de materia reactivada (aleación “infernal”), eslabones de cadena de hierro forjado con recubrimiento resistivo, empuñaduras reforzadas y enclaves rúnicos. Longitud hoja: ≈ 0,60–0,65 m; longitud cadena desplegada: hasta ≈ 2,6 m. Masa: hoja individual ≈ 2,5–3,0 kg; conjunto ≈ 8–9 kg.",
        funcionamiento: "Combinación de daño cortante-industrial y campo de energía residual que potencia el impacto; cadenas permiten control de distancia, arrastre y maniobras cinéticas complejas."
    }
  },
  {
    id: 4,
    name: "Espada de Diamante",
    price: "$5,000",
    seller: "Herrero aldeano",
    description: "Arma de filo perfecto, creada a partir de diamantes puros. Sinónimo de poder y resistencia. Largo: 1,10 metros; peso: 3,8 kg.",
    category: "Armas Cuerpo a Cuerpo",
    isOffer: false,
    image: "imagenes/espada diamante.jpg",
    images: [
      "imagenes/miniatura espada diamante 1.jpg", 
      "imagenes/miniatura espada diamante 2.jpg",
      "imagenes/miniatura espada diamante 3.jpg"
    ],
    extendedInfo: {
        origen: "Herramienta/arma de élite para operaciones de combate prolongado y supervivencia en entornos hostiles.",
        specs: "Material principal: bloques de diamante compuestos adheridos; empuñadura de madera tratada o compuesto reforzado. Longitud total ≈ 1,10 m; hoja ≈ 0,80 m; sección transversal cuadrada ≈ 0,12–0,14 m. Masa aproximada: 3–4 kg.",
        funcionamiento: "Excepcional resistencia al desgaste y elevada capacidad de corte; diseñada para uso continuado sin necesidad de afilado frecuente."
    }
  },
  {
    id: 5,
    name: "Dubstep Gun",
    price: "$80,000",
    seller: "Kinzie Kensington.",
    description: "Arma sónica experimental que dispara ondas de sonido al ritmo de la música electrónica. Longitud: 85 cm; peso: 6 kg.",
    category: "Armas de Energía",
    isOffer: true,
    image: "imagenes/dubstep gun.jpg",
    images: [
      "imagenes/miniatura dubstep gun 1.jpg", 
    ],
    extendedInfo: {
        origen: "Desarrollo experimental para control de multitudes y efectos piroacústicos; adoptado en escenarios de espectáculo por su efecto audiovisual.",
        specs: "Cámara de resonancia con subwoofers integrados, condensador de frecuencia (3 kW nominal), modulador BPM, casco estructural metálico con disipadores. Dimensiones: ≈ 0,70–1,10 m (según modelo); masa: 6–8 kg. Fuente: acumulador de pulso acústico.",
        funcionamiento: "Genera picos de presión y vibración que provocan desorientación, desplazamiento de objetos ligeros y daños estructurales localizados en materiales frágiles; salida modulable por frecuencia y amplitud."
    }
  },
  {
    id: 6,
    name: "AWP",
    price: "$7,500",
    seller: "Counter-Strike Armory",
    description: "Fusil de francotirador de cerrojo de gran calibre, reconocido por su precisión extrema. Longitud: 1,20 metros; peso: 6,5 kg.",
    category: "Armas de Fuego",
    isOffer: false,
    image: "imagenes/awp.jpg",
    images: [
      "imagenes/miniatura awp 1.jpg", 
      "imagenes/miniatura awp 2.jpeg",
      "imagenes/miniatura awp 3.jpeg"
    ],
    extendedInfo: {
        origen: "Plataforma de francotirador para fuerzas especializadas y tiradores de precisión.",
        specs: "Cuerpo: polímero reforzado y piezas críticas en acero templado; cañón de 60–66 cm; visor telescópico de aumento variable; calibre equivalente .338 Lapua Magnum. Longitud total ≈ 1,20–1,25 m. Masa: 6–7,5 kg.",
        funcionamiento: "Disparo único de alta energía con capacidad de neutralizar objetivos con impacto central; requiere cálculo balístico y estabilización para uso óptimo."
    }
  },
  {
    id: 7,
    name: "Fat Man",
    price: "$300,000",
    seller: "Moira Brown",
    description: "Lanzador táctico portátil diseñado para disparar mini cabezas nucleares. Longitud: 1,30 metros; peso: 13 kg.",
    category: "Armas de Fuego",
    isOffer: true,
    image: "imagenes/fatman.png",
    images: [
      "imagenes/miniatura fatman 1.png", 
      "imagenes/miniatura fatman 2.jpg",
      "imagenes/miniatura fatman 3.png"
    ],
    extendedInfo: {
        origen: "Desarrollo pre-guerra para demolición de estructuras y neutralización de concentraciones hostiles.",
        specs: "Cuerpo estructural de acero pesado, mecanismo de lanzamiento asistido, compartimento de proyectil calibrado para dispositivos termonucleares miniaturizados. Longitud ≈ 1,10–1,30 m; diámetro tambor ≈ 28–36 cm. Masa: 12–18 kg (vacío). Fuente: carga nuclear sellada (en munición).",
        funcionamiento: "Proyectil con detonación de impulsión térmica/química en punto de impacto, generando onda de choque y radiación localizadas para efectos de aniquilación y destrucción de área."
    }
  },
  {
    id: 8,
    name: "BFG 9000",
    price: "$950,000",
    seller: "Técnico de la UAC",
    description: "El arma de energía más poderosa creada por la UAC. Dispara una esfera de plasma verde concentrado. Longitud: 1,10 metros; peso: 18 kg.",
    category: "Armas de Energía",
    isOffer: false,
    image: "imagenes/bfg 9000.png",
    images: [
      "imagenes/miniatura bfg 9000 1.png", 
      "imagenes/miniatura bfg 9000 2.jpg",
      "imagenes/miniatura bfg 9000 3.jpg"
    ],
    extendedInfo: {
        origen: "Proyecto para neutralización masiva de entidades hostiles en zonas de alta densidad demoníaca.",
        specs: "Armazón blindado con cámara de contención de plasma, núcleo de fusión de baja escala y generadores de campo. Longitud ≈ 1,40–1,60 m; diámetro núcleo ≈ 40–55 cm. Masa: 18–28 kg. Fuente: núcleo de fusión/condensador energético.",
        funcionamiento: "Dispara una esfera de plasma que despliega arcos eléctricos en radio alrededor del punto de impacto, causando desintegración y fallo estructural en materia orgánica e inorgánica."
    }
  },
  {
    id: 9,
    name: "M6D Magnum",
    price: "$9,000",
    seller: "Arsenal del UNSC",
    description: "Pistola semiautomática de calibre 12.7 mm, con visor óptico integrado. Longitud: 26 cm; peso: 2,3 kg.",
    category: "Armas de Fuego",
    isOffer: true,
    image: "imagenes/m6d halo.jpeg",
    images: [
      "imagenes/miniatura m6d halo 1.png", 
      "imagenes/miniatura m6d halo 2.jpeg",
    ],
    extendedInfo: {
        origen: "Armamento estándar de dotación para personal de fuerzas expedicionarias y unidades de respuesta.",
        specs: "Marco en titanio ligero, corredera y mecanismos en acero inoxidable, visor óptico integrado. Calibre nominal equivalente 12.7 mm. Longitud ≈ 0,26 m; masa cargada ≈ 2,0–2,5 kg.",
        funcionamiento: "Alta energía por impacto, adecuada para penetración de blindajes ligeros y neutralización rápida de amenazas en entornos hostiles."
    }
  },
  {
    id: 10,
    name: "Hidden Blade",
    price: "$25,000",
    seller: "Maestro artesano de la Hermandad",
    description: "Arma sigilosa que se oculta bajo el antebrazo, para eliminar objetivos de forma silenciosa. Longitud extendida: 23 cm; peso: 500 gramos.",
    category: "Armas Cuerpo a Cuerpo",
    isOffer: false,
    image: "imagenes/hidden blade.jpg",
    images: [
      "imagenes/miniatura hidden blade 1.jpg", 
      "imagenes/miniatura hidden blade 2.jpg",
    ],
    extendedInfo: {
        origen: "Herramienta de infiltración y neutralización furtiva diseñada por cofradías orientadas al espionaje y acción encubierta.",
        specs: "Hoja de acero templado; mecanismo de resorte calibrado y bloqueo de seguridad; brazal: aleación ligera con correas de ajuste. Longitud hoja extendida ≈ 0,23 m. Masa: ≈ 0,5–0,8 kg.",
        funcionamiento: "Proporciona ataque puntual y penetración de estructuras corporales/armaduras ligeras; optimizada para perfiles de bajo ruido y eliminación selectiva."
    }
  },
  {
    id: 11,
    name: "Crowbar",
    price: "$500",
    seller: "Barney Calhoun",
    description: "Palanca de hierro estándar, utilizada por personal de mantenimiento de Black Mesa. Herramienta de supervivencia. Longitud: 58 cm; peso: 2,4 kg.",
    category: "Herramientas",
    isOffer: true,
    image: "imagenes/crowbar.png",
    images: [
      "imagenes/miniatura crowbar 1.png", 
      "imagenes/miniatura crowbar 2.jpg",
      "imagenes/miniatura crowbar 3.jpg"
    ],
    extendedInfo: {
        origen: "Instrumento estándar de mantenimiento industrial con uso secundario en autodefensa.",
        specs: "Material: acero al carbono forjado; longitud ≈ 0,58–0,60 m; masa ≈ 2,4–3,2 kg. Tratamiento superficial anticorrosión.",
        funcionamiento: "Punto de apoyo para abrir, cortar o golpear; eficacia probada en rompimiento de estructuras y combate cercano como arma contundente."
    }
  },
  {
    id: 12,
    name: "Energy Sword",
    price: "$55,000",
    seller: "Elite Sangheili",
    description: "Espada de energía mística que proyecta dos hojas de plasma puro. Longitud: 1,20 metros; peso: 3,1 kg.",
    category: "Armas de Energía",
    isOffer: false,
    image: "imagenes/espada halo.jpg",
    images: [
      "imagenes/miniatura espada halo 1.jpg", 
      "imagenes/miniatura espada halo 2.jpg",
      "imagenes/miniatura espada halo 3.jpg"
    ],
    extendedInfo: {
        origen: "Emblema marcial y arma letal de élite con función simbólica y operativa.",
        specs: "Empuñadura de aleación multicapa; proyectores de plasma gemelos con generadores de campo; longitud total ≈ 1,10–1,20 m. Masa aparente ≈ 3–6 kg (sensada por usuario). Fuente: célula de energía Covenant integrada.",
        funcionamiento: "Corte molecular por plasma ionizado; capaz de atravesar compuestos y blindajes ligeros con eficiencia extrema."
    }
  },
  {
    id: 13,
    name: "Ray Gun",
    price: "$120,000",
    seller: "Doctor Richtofen",
    description: "Prototipo de arma de energía que dispara proyectiles de plasma verde que explotan al impacto. Longitud: 40 cm; peso: 4 kg.",
    category: "Armas de Energía",
    isOffer: true,
    image: "imagenes/raygun.jpg",
    images: [
      "imagenes/miniatura raygun 1.jpg", 
      "imagenes/miniatura raygun 2.jpeg",
    ],
    extendedInfo: {
        origen: "Tecnología recuperada y adaptada para defensa contra amenazas transdimensionales.",
        specs: "Chasis de aleación ligera con bobinas de inducción; longitud ≈ 0,40–0,42 m; masa ≈ 2,0–4,0 kg. Fuente: celdas de energía de alta densidad.",
        funcionamiento: "Proyectiles energéticos que detonan al impacto liberando fragmentos ionizados y expansión térmica; altamente efectivo contra concentraciones orgánicas."
    }
  },
  {
    id: 14,
    name: "Needler",
    price: "$35,000",
    seller: "Mercader Kig-Yar",
    description: "Arma de proyectiles cristalinos autoguiados que persiguen y detonan al acumularse. Longitud: 80 cm; peso: 5,4 kg.",
    category: "Armas de Energía",
    isOffer: false,
    image: "imagenes/needler.jpeg",
    images: [
      "imagenes/miniatura needler halo 1.jpg", 
      "imagenes/miniatura needler halo 2.jpg",
    ],
    extendedInfo: {
        origen: "Armamento estándar de vanguardia para operaciones de choque y neutralización distribuida.",
        specs: "Cuerpo curvo cristalino/polímero alienígena; cargador de puntas cristalinas rosadas; longitud ≈ 0,80–0,85 m; masa ≈ 4,8–5,4 kg. Fuente: condensador de energía.",
        funcionamiento: "Proyectiles autodirigidos que se incrustan y detonan tras acumulación, provocando detonación retardada y aumento de letalidad en impactos múltiples."
    }
  },
  {
    id: 15,
    name: "Peacekeeper",
    price: "$18,000",
    seller: "Torbjörn Lindholm",
    description: "Revólver personalizado de gran potencia y precisión. Longitud: 34 cm; peso: 1,8 kg.",
    category: "Armas de Fuego",
    isOffer: false,
    image: "imagenes/peacekeeper.jpg",
    images: [
      "imagenes/miniatura peacekeeper 1.jpg", 
      "imagenes/miniatura peacekeeper 2.jpg",
      "imagenes/miniatura peacekeeper 3.jpg"
    ],
    extendedInfo: {
        origen: "Arma personal para tiradores con perfil de duelos y operaciones de precisión a corta distancia.",
        specs: "Acero tratado con recubrimiento cerámico; empuñadura de madera o polímero; longitud ≈ 0,34 m; masa ≈ 1,6–1,9 kg. Calibre nominal: alta energía por proyectil.",
        funcionamiento: "Disparo potente y preciso; empleado para neutralización en enfrentamientos rápidos y maniobras tácticas de corto alcance."
    }
  },
  {
    id: 16,
    name: "Fire Flower",
    price: "$2,000",
    seller: "Toad",
    description: "Planta mágica que otorga el poder de lanzar bolas de fuego. Altura: 30 cm; peso: 300 gramos.",
    category: "Ítems Mágicos",
    isOffer: true,
    image: "imagenes/fire flower.jpg",
    images: [
      "imagenes/miniatura fire flower 1.jpg", 
    ],
    extendedInfo: {
        origen: "Artefacto botánico místico empleado en defensa y combate en ecosistemas del Reino.",
        specs: "Tallo 25–30 cm; pétalos con tejido pirolítico; masa ≈ 0,3–0,5 kg. Fuente: energía elemental interna.",
        funcionamiento: "Emisión repetida de esferas incandescentes con temperaturas estimadas hasta 800 °C; proporciona resistencia térmica temporal al usuario y capacidad ofensiva directa."
    }
  },
  {
    id: 17,
    name: "Crisol",
    price: "$400,000",
    seller: "Herrero de Argent D’Nur",
    description: "Espada de energía mística, capaz de segar a los demonios más antiguos. Longitud: 1,15 metros; peso: 9 kg.",
    category: "Armas Cuerpo a Cuerpo",
    isOffer: false,
    image: "imagenes/crisol.jpg",
    images: [
      "imagenes/miniatura crisol 1.jpg", 
      "imagenes/miniatura crisol 2.jpg",
    ],
    extendedInfo: {
        origen: "Arma sagrada y herramienta de purga dedicada al enfrentamiento de entidades de elevada entropía.",
        specs: "Marco metálico ceremonial con núcleo de plasma rojo estabilizado; longitud ≈ 1,15–1,50 m; masa ≈ 9–12 kg. Fuente: reactor interno de energía arcana.",
        funcionamiento: "Corta y descompone estructura molecular de materia demoníaca u orgánica avanzada; produce ionización local y anulación de resistencia vital en contacto directo."
    }
  },
  {
    id: 18,
    name: "Banana Peel",
    price: "$50",
    seller: "Lakitu",
    description: "Residuo aparentemente inofensivo pero letal en las pistas. Longitud: 18-22 cm; peso: 200 gramos.",
    category: "Ítems Mágicos",
    isOffer: true,
    image: "imagenes/banana.jpg",
    images: [
      "imagenes/miniatura banana 1.jpg", 
    ],
    extendedInfo: {
        origen: "Implemento de sabotaje en carreras y maniobras competitivas.",
        specs: "Longitud ≈ 0,18–0,22 m; masa ≈ 0,15–0,25 kg; superficie tratada con agente deslizante.",
        funcionamiento: "Reduce coeficiente de fricción al contacto, provocando derrape o pérdida de tracción en vehículos que la pisan."
    }
  },
  {
    id: 19,
    name: "Diamond Pickaxe",
    price: "$4,500",
    seller: "Herrero aldeano",
    description: "Herramienta minera más resistente, capaz de destruir obsidiano. Longitud: 1,20 metros; peso: 5 kg.",
    category: "Herramientas",
    isOffer: true,
    image: "imagenes/pico diamante.jpg",
    images: [
      "imagenes/miniatura pico diamante 1.jpg", 
      "imagenes/miniatura pico diamante 2.jpg",
      "imagenes/miniatura pico diamante 3.jpg"
    ],
    extendedInfo: {
        origen: "Implemento de minería avanzada para acceso a capas profundas y extracción de recursos de alto valor.",
        specs: "Cabezal: diamante compuesto/estructura cristalina comprimida; mango: madera tratada o aleación compuesta; longitud ≈ 1,00–1,20 m; masa ≈ 3–5 kg.",
        funcionamiento: "Fractura sostenida en materiales refractarios con mínima pérdida de integridad superficial tras uso prolongado."
    }
  },
  {
    id: 20,
    name: "Pistola de Herramientas",
    price: "$999,999",
    seller: "Garry Newman",
    description: "Dispositivo definitivo de manipulación y creación. Permite modificar, ensamblar y controlar cualquier objeto. Longitud: 40 cm; peso: 2,8 kg.",
    category: "Dispositivos de Viaje",
    isOffer: false,
    image: "imagenes/toolgun.jpg",
    images: [
      "imagenes/miniatura toolgun 1.jpg", 
      "imagenes/miniatura toolgun 2.jpg",
      "imagenes/miniatura toolgun 3.jpg"
    ],
    extendedInfo: {
        origen: "Herramienta de creación y edición en tiempo real para constructores y administradores de entornos simulados.",
        specs: "Armazón metálico ligero, núcleo de energía azul, matriz de interfaces programables, sensores de proximidad y panel de configuración. Longitud ≈ 0,35–0,40 m; masa ≈ 1,5–2,8 kg. Fuente: acumulador modular.",
        funcionamiento: "Emite campo de orden superior que permite alterar posición, congelar física, soldar o desactivar entidades; interfaz configurable para permisos y macros administrativas."
    }
  },
  {
    id: 21,
    name: "Guantelete del Infinito",
    price: "$10,000,000,000",
    seller: "Eitri, el enano forjador",
    description: "Reliquia cósmica forjada para contener las seis Gemas del Infinito. Otorga control absoluto sobre toda existencia. Longitud: 46 cm; peso: 8 kg.",
    category: "Ítems Mágicos",
    isOffer: false,
    image: "imagenes/guantelete.jpg",
    images: [
      "imagenes/miniatura guantelete 1.jpg", 
      "imagenes/miniatura guantelete 2.jpg",
      "imagenes/miniatura guantelete 3.jpg"
    ],
    extendedInfo: {
        origen: "Artefacto de forja mitológica con finalidad de equilibrio/dominación universal según portador.",
        specs: "Aleación dorada de Nidavellir con ranuras de contención; longitud ≈ 0,45–0,46 m; masa ≈ 7–9 kg (sin gemas). Requiere matriz reforzada para disipación de energía.",
        funcionamiento: "Con los núcleos energéticos insertados, actúa como interfaz para controlar espacio, tiempo, realidad, alma, poder y mente en escala cosmológica; efecto dependiente de integridad de núcleos y resistencia del portador."
    }
  },
  {
    id: 22,
    name: "Star Wand",
    price: "$3,000",
    seller: "Epic Games",
    description: "Herramienta de recolección y símbolo de estilo en combate. Longitud: 95 cm; peso: 3 kg.",
    category: "Armas Cuerpo a Cuerpo",
    isOffer: true,
    image: "imagenes/pico fortnite.jpg",
    images: [
      "imagenes/miniatura pico fortnite 1.jpg", 
      "imagenes/miniatura pico fortnite 2.jpg",
    ],
    extendedInfo: {
        origen: "Implemento multiuso de estética icónica empleado por competidores para balance entre recolección y combate.",
        specs: "Mango de acero con recubrimiento decorativo, núcleo emisor lumínico; longitud ≈ 0,60–0,95 m; masa ≈ 1,2–3,0 kg.",
        funcionamiento: "Genera impactos contundentes y proyecta ráfagas de luz que afectan sensibilidad visual temporal y fragmentan estructuras."
    }
  },
  {
    id: 23,
    name: "Pulse Pistols",
    price: "$35,000",
    seller: "Winston",
    description: "Armas gemelas de corto alcance que disparan ráfagas de energía de alta frecuencia. Longitud (c/u): 28 cm; peso (c/u): 1,1 kg.",
    category: "Armas de Energía",
    isOffer: false,
    image: "imagenes/tracer.jpg",
    images: [
      "imagenes/miniatura tracer 1.jpg", 
      "imagenes/miniatura tracer 2.jpg",
    ],
    extendedInfo: {
        origen: "Armamento compacto para unidades de alta movilidad y asalto rápido.",
        specs: "Cuerpo en titanio ligero, núcleos de energía de alta recarga; longitud ≈ 0,28 m (cada una); masa ≈ 1,0–1,6 kg (cada unidad). Fuente: acumulador de pulso.",
        funcionamiento: "Descargas de energía en ráfagas de alta velocidad con baja dispersión, optimizadas para neutralización en 0–30 m y para explotación de movilidad del portador."
    }
  },
  {
    id: 24,
    name: "Pistola de Portales",
    price: "$3,500,000",
    seller: "Rick Sánchez",
    description: "Dispositivo de manipulación interdimensional que abre portales verdes para el desplazamiento instantáneo. Longitud: 28 cm; peso: 1,8 kg.",
    category: "Dispositivos de Viaje",
    isOffer: true,
    image: "imagenes/pistola portal.jpg",
    images: [
      "imagenes/miniatura pistola portal 1.jpg", 
      "imagenes/miniatura pistola portal 2.jpg",
    ],
    extendedInfo: {
        origen: "Dispositivo de manipulación interdimensional que abre portales verdes para el desplazamiento instantáneo.",
        specs: "Armazón de aleación ligera con núcleos de energía de alta recarga; longitud ≈ 0,28 m; masa ≈ 1,8 kg. Fuente: reactor de bolsillo de antimateria.",
        funcionamiento: "Abre y mantiene un agujero de gusano estable entre dos puntos del espacio-tiempo, permitiendo el tránsito instantáneo."
    }
  }
];