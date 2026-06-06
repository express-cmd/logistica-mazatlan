/**
 * CONFIGURACIÓN CENTRAL DE LA API KEY DE GOOGLE MAPS
 */
const GOOGLE_API_KEY = "AIzaSyB1Uz3PtD6rE1xPlglgIojr3aeMe2pEXY0";

let map;
let cpGroups = {};     
let activePolygons = {}; 

// BASE DE DATOS COMPLETA INTEGRADA DE MAZATLÁN SINALOA
const DATABASE_MAZATLAN = {
  "82000": {"lat": 23.2163875, "lon": -106.4047075, "colonias": ["Balcones de Loma Linda", "Centro", "Los Pinos", "Mazatlán Centro"]},
  "82007": {"lat": 23.20201, "lon": -106.36632, "colonias": ["Loma Linda"]},
  "82008": {"lat": 23.19734, "lon": -106.37071, "colonias": ["Miguel Hidalgo"]},
  "82009": {"lat": 23.20594, "lon": -106.35786, "colonias": ["José María Gonzalez"]},
  "82010": {"lat": 23.2428, "lon": -106.40750125, "colonias": ["Campo Bello", "Chimizu", "Estero", "Independencia", "Juan Carrasco", "Libertad", "Lomas Del Mar", "Palos Prietos"]},
  "82013": {"lat": 23.27777, "lon": -106.4481, "colonias": ["Ferrocarrilera"]},
  "82014": {"lat": 23.26346, "lon": -106.43322, "colonias": ["San Angel"]},
  "82015": {"lat": 23.26709, "lon": -106.35869, "colonias": ["Trópico de Cáncer"]},
  "82016": {"lat": 23.23267, "lon": -106.37177, "colonias": ["Brisas Del Mar"]},
  "82017": {"lat": 23.2575, "lon": -106.37808, "colonias": ["Telleria"]},
  "82018": {"lat": 23.24683, "lon": -106.4449, "colonias": ["Insurgentes"]},
  "82019": {"lat": 23.23613, "lon": -106.38496, "colonias": ["Tierra y Libertad"]},
  "82020": {"lat": 23.231373333333334, "lon": -106.39569666666667, "colonias": ["12 de Mayo", "Bahías", "Klein"]},
  "82028": {"lat": 23.26265, "lon": -106.39157, "colonias": ["Casas Económicas"]},
  "82030": {"lat": 23.221694999999997, "lon": -106.388215, "colonias": ["Montuosa", "Reforma"]},
  "82035": {"lat": 23.23613, "lon": -106.38496, "colonias": ["Sanchez Taboada"]},
  "82036": {"lat": 23.24069, "lon": -106.41458, "colonias": ["Shimuzu"]},
  "82037": {"lat": 23.21865, "lon": -106.43182, "colonias": ["Francisco Solís"]},
  "82038": {"lat": 23.21943, "lon": -106.42713, "colonias": ["Obrera"]},
  "82040": {"lat": 23.231875, "lon": -106.3855375, "colonias": ["Gabriel Leyva", "Lázaro Cárdenas", "Playa Sur", "Villas Playa Sur"]},
  "82043": {"lat": 23.19373, "lon": -106.42605, "colonias": ["Isla de La Piedra"]},
  "82046": {"lat": 23.27317, "lon": -106.36178, "colonias": ["La Armada"]},
  "82048": {"lat": 23.26243, "lon": -106.40629, "colonias": ["Cerro de La Cruz"]},
  "82050": {"lat": 23.22092, "lon": -106.4339, "colonias": ["Portuario Alfredo V Bonfil"]},
  "82057": {"lat": 23.27771, "lon": -106.45172, "colonias": ["Héroe de Nacozari"]},
  "82058": {"lat": 23.24206, "lon": -106.38879, "colonias": ["José María Rico"]},
  "82059": {"lat": 23.24782, "lon": -106.41439, "colonias": ["Casa Redonda"]},
  "82060": {"lat": 23.258375, "lon": -106.424545, "colonias": ["Francisco I Madero", "José María Pino Suárez"]},
  "82069": {"lat": 23.19747, "lon": -106.37337, "colonias": ["Campo 7"]},
  "82070": {"lat": 23.23311, "lon": -106.41751333333333, "colonias": ["Piedrera", "Rincón de Urias", "Urias"]},
  "82080": {"lat": 23.19181, "lon": -106.40274500000001, "colonias": ["5ta Chapalita", "Gral. Rafael Buelna"]},
  "82088": {"lat": 23.19172, "lon": -106.36873, "colonias": ["Ciudad de Mazatlán"]},
  "82089": {"lat": 23.20667, "lon": -106.42659, "colonias": ["La Sirena"]},
  "82090": {"lat": 23.233155, "lon": -106.41416833333334, "colonias": ["2a Ampl. Felipe Angeles", "Diaz Ordaz", "Felipe", "Felipe Angeles", "Hacienda de Urias", "Santa Teresa"]},
  "82099": {"lat": 23.23789, "lon": -106.3987, "colonias": ["Urias"]},
  "82100": {"lat": 23.208285, "lon": -106.40973500000001, "colonias": ["Country Club", "Sábalo Country Club"]},
  "82102": {"lat": 23.21943, "lon": -106.42713, "colonias": ["La Marina"]},
  "82103": {"lat": 23.223912, "lon": -106.40303200000001, "colonias": ["El Secreto.", "Marina Real", "Palmas del Sol", "Punta Diamante", "Villa Corral"]},
  "82110": {"lat": 23.24918333333333, "lon": -106.42167500000001, "colonias": ["El Cid", "El Dorado", "Las Gaviotas", "Las Gaviotas Exlaguna", "Lomas de Mazatlán", "Zona Dorada"]},
  "82112": {"lat": 23.23667153846154, "lon": -106.38679615384613, "colonias": ["Cerritos Resort", "Club Palmas", "Las Palmas", "Las Quintas", "Playa Linda", "Quintas Del Mar", "Real Del Mar", "Royal Country", "Sábalo Cerritos", "Villa Del Mar", "Villa Marina", "Villa Tranquila", "Villas de Rueda"]},
  "82113": {"lat": 23.22689, "lon": -106.38437, "colonias": ["Club Real"]},
  "82118": {"lat": 23.21309, "lon": -106.43244, "colonias": ["Rincón Colonial"]},
  "82119": {"lat": 23.24268, "lon": -106.41912, "colonias": ["Francisco Silva"]},
  "82120": {"lat": 23.227305, "lon": -106.40668799999999, "colonias": ["El Toreo", "El Toro", "Hacienda Del Mar", "Jardines Del Toreo", "Olimpo Infonavit", "Periodista", "Plaza Reforma", "Pueblo Nuevo", "Sanchez Celis", "Zafiro"]},
  "82123": {"lat": 23.21849, "lon": -106.41152, "colonias": ["Alameda"]},
  "82124": {"lat": 23.230473636363637, "lon": -106.39914636363638, "colonias": ["Chulavista", "La Joya", "Paseo Alameda", "Paseo Los Olivos", "Paseo de las Torres", "Prados Del Sol", "Puesta Del Sol", "Real del Valle", "Rincón de las Palmas", "Terranova", "Torre Molino"]},
  "82125": {"lat": 23.23991, "lon": -106.42403666666667, "colonias": ["Paraíso", "Rincón de las Plazas", "San Carlos"]},
  "82126": {"lat": 23.20667, "lon": -106.42659, "colonias": ["Hacienda las Cruces"]},
  "82127": {"lat": 23.234635, "lon": -106.38150999999999, "colonias": ["Dorados de Villa", "Libertad de Expresión"]},
  "82128": {"lat": 23.26058, "lon": -106.40796499999999, "colonias": ["Los Mangos", "Playas Infonavit"]},
  "82129": {"lat": 23.26062, "lon": -106.45131, "colonias": ["Venadillo"]},
  "82130": {"lat": 23.221739999999997, "lon": -106.418915, "colonias": ["Ignacio Allende", "Mar de Cortes"]},
  "82132": {"lat": 23.246165, "lon": -106.41408200000001, "colonias": ["Arboleda 1", "Arboledas 2 Fovissste", "Bahías Tortugas", "Delfines", "Francisco Alarcón Infonavit", "Jardines del Bosque", "Los Caracoles", "Torremolinos", "Valle Dorado", "Villas Residencial"]},
  "82133": {"lat": 23.240595000000003, "lon": -106.412315, "colonias": ["Brisas del Valle II", "Del Valle", "Las Brisas", "Las Misiones"]},
  "82134": {"lat": 23.24510615384615, "lon": -106.40108846153846, "colonias": ["Arboledas 3 Fovissste", "El Conchi II", "Hogar Pescador", "Jesús Osuna", "Luis Donaldo Colosio", "Nuevo Milenio", "Prado Bonito", "Renato Vega", "Salinas de Gortari", "San Francisco", "Santa Rosa", "Valle Del Ejido", "Villa Carey"]},
  "82136": {"lat": 23.234867272727275, "lon": -106.41101545454545, "colonias": ["Bosques Del Arroyo", "Colinas Del Real", "Colinas del Real Plus", "Jaripillo", "José Gordillo Pinto", "La Campiña", "María Antonieta", "Petróleos", "Santa Laura", "Valle Bonito", "Villa Tutuli"]},
  "82137": {"lat": 23.18458, "lon": -106.36213, "colonias": ["Huertos Familiares"]},
  "82138": {"lat": 23.258315000000003, "lon": -106.418135, "colonias": ["Mazatlán Fovissste", "Playa Azul Fovissste"]},
  "82139": {"lat": 23.227004, "lon": -106.40423150000001, "colonias": ["Ampliación Villa Verde", "Arboledas Invies", "Bugambilias", "Costa Dorada", "El Conchi", "El Conchi Infonavit", "Francisco Labastida Ochoa", "Jesús Kumate", "Las Mañanitas", "Lomas San Jorge", "Los Arrecifes", "Los Laureles", "Nuevo Cajeme", "Pradera Dorada", "San Joaquín", "Santa Sofia", "Villa Florida", "Villa Verde", "Villa de las Flores", "Vistas Del Mar"]},
  "82140": {"lat": 23.23793, "lon": -106.39128500000001, "colonias": ["Estadio", "Lomas Del Valle", "Lopez Mateos", "Planetario"]},
  "82143": {"lat": 23.24984, "lon": -106.36711, "colonias": ["Casa Blanca"]},
  "82144": {"lat": 23.215245000000003, "lon": -106.38471, "colonias": ["Las Huertas", "Los Girasoles"]},
  "82145": {"lat": 23.19787, "lon": -106.44941, "colonias": ["Aviación"]},
  "82146": {"lat": 23.21501, "lon": -106.45216500000001, "colonias": ["Antiguo Aeropuerto", "Sembradores de La Amistad"]},
  "82147": {"lat": 23.26259, "lon": -106.42208, "colonias": ["María Fernanda"]},
  "82148": {"lat": 23.224445, "lon": -106.36499, "colonias": ["Playas Del Sol", "Zona Costera"]},
  "82149": {"lat": 23.19043, "lon": -106.42057, "colonias": ["Flamingos"]},
  "82150": {"lat": 23.230106666666668, "lon": -106.41337833333334, "colonias": ["20 de Noviembre", "Olímpica", "Santa Fe", "Villa Galaxia", "Villa Satélite", "Villa de Jacaro"]},
  "82153": {"lat": 23.235135, "lon": -106.43361999999999, "colonias": ["Antonio Toledo Corro", "Jabalines Infonavit"]},
  "82154": {"lat": 23.238692, "lon": -106.41307200000001, "colonias": ["Issstesin", "Jabalies Fovissste", "Los Olivos", "Los Portales", "Los Venados"]},
  "82155": {"lat": 23.19442, "lon": -106.43576, "colonias": ["Ruben Jaramillo"]},
  "82156": {"lat": 23.23526, "lon": -106.44773, "colonias": ["Villas Del Estero"]},
  "82157": {"lat": 23.212837142857143, "lon": -106.40809714285714, "colonias": ["Bahía de Mazatlán Fovissste", "Costa Brava", "Gilberto Lopez", "Isla Residencial", "Jacarandas", "Plazas San Ignacio", "Santa Virginia"]},
  "82158": {"lat": 23.23696, "lon": -106.415375, "colonias": ["Federico Velarde", "INDECO"]},
  "82159": {"lat": 23.24475166666667, "lon": -106.40044999999999, "colonias": ["Esperanza Fovissste", "Los Sauces", "Melina", "Universidad 94", "Valles de Jaridillo", "Villa Residencial Del Rey"]},
  "82160": {"lat": 23.24369, "lon": -106.42423, "colonias": ["Luis Echeverría Alvarez"]},
  "82163": {"lat": 23.20061, "lon": -106.37173333333332, "colonias": ["Burócrata", "Fuentes Del Valle", "Las Olas"]},
  "82164": {"lat": 23.2311575, "lon": -106.4184275, "colonias": ["Costa Azul", "Esmeralda", "Salvador Allende", "Villas Del Rey"]},
  "82165": {"lat": 23.24063, "lon": -106.37657, "colonias": ["Jabalíes"]},
  "82166": {"lat": 23.19487, "lon": -106.40438, "colonias": ["ISSSTE"]},
  "82170": {"lat": 23.212226666666666, "lon": -106.39206333333334, "colonias": ["Constitución", "Morelos", "Ramon F Iturbide"]},
  "82180": {"lat": 23.229448333333334, "lon": -106.41398, "colonias": ["Benito Juárez", "Esperanza", "Jesús Garcia", "Lomas de Juárez", "Santa Elena", "Venustiano Carranza"]},
  "82183": {"lat": 23.23664, "lon": -106.38732, "colonias": ["Obrera Industrial"]},
  "82185": {"lat": 23.23089, "lon": -106.43875, "colonias": ["Loma Atravesada"]},
  "82186": {"lat": 23.21435, "lon": -106.422925, "colonias": ["Azteca", "Santa Cecilia"]},
  "82187": {"lat": 23.2357, "lon": -106.4064225, "colonias": ["14 de Febrero", "Alfonso G Calderón", "Del Bosque", "San Rafael"]},
  "82188": {"lat": 23.18856, "lon": -106.42291, "colonias": ["Anáhuac"]},
  "82189": {"lat": 23.27768, "lon": -106.38201, "colonias": ["Salvador Robles Quintero"]},
  "82190": {"lat": 23.215590000000002, "lon": -106.40920500000001, "colonias": ["Emiliano Zapata", "Flores Magón", "Mazatlan I", "Niños Héroes"]},
  "82195": {"lat": 23.215700000000002, "lon": -106.4047475, "colonias": ["Hacienda Victoria", "Lomas Del Porvenir", "Mazatlan II", "Mazatlán III"]},
  "82196": {"lat": 23.227715, "lon": -106.39712499999999, "colonias": ["Mirasol", "Petrolero"]},
  "82197": {"lat": 23.23742, "lon": -106.43283, "colonias": ["Primavera"]},
  "82198": {"lat": 23.242279166666666, "lon": -106.41056666666667, "colonias": ["Doña Chonita", "Ejidal", "Exhacienda El Conchi", "Foresta", "Hacienda del Valle", "Loma Bonita", "Lomas Del Ébano", "Rinconada Del Valle", "San Fernando", "Simon Jimenez Cárdenas", "Valle del Sol", "Villas del Sol"]},
  "82199": {"lat": 23.255395, "lon": -106.448635, "colonias": ["Genaro Estrada Calderón", "Los Magueyes"]},
  "82200": {"lat": 23.216735, "lon": -106.38279, "colonias": ["Lomas de Monterrey", "San Francisquito"]},
  "82203": {"lat": 23.22737, "lon": -106.37196, "colonias": ["El Vainillo"]},
  "82206": {"lat": 23.2247, "lon": -106.43238, "colonias": ["El Walamo"]},
  "82210": {"lat": 23.2369, "lon": -106.38155, "colonias": ["Villa Unión Centro"]},
  "82213": {"lat": 23.24063, "lon": -106.37657, "colonias": ["El Tronconal"]},
  "82214": {"lat": 23.228634285714286, "lon": -106.39821857142859, "colonias": ["7 de Abril", "Agustina Ramirez", "Alfonso G Calderón", "Buenavista", "Fidel Velázquez", "Flor de Mayo", "Lomas de Villa Unión"]},
  "82215": {"lat": 23.220526, "lon": -106.40562400000002, "colonias": ["Antonio Toledo Corro", "José Lopez Portillo", "Lienzo Charro", "Renato Vega", "Ángela Peralta"]},
  "82216": {"lat": 23.224136666666666, "lon": -106.41146666666667, "colonias": ["11 Ríos", "Ejidal", "Francisco Villa"]},
  "82217": {"lat": 23.21766, "lon": -106.41153000000001, "colonias": ["Margarita Maza de Juárez", "Raul Osuna Burgueño", "Sixto Osuna"]},
  "82233": {"lat": 23.28108, "lon": -106.43518, "colonias": ["El Recodo"]},
  "82236": {"lat": 23.26063, "lon": -106.44134, "colonias": ["Siqueiros"]},
  "82238": {"lat": 23.25769, "lon": -106.40288, "colonias": ["El Salto"]},
  "82240": {"lat": 23.24596, "lon": -106.39222, "colonias": ["Los Llanitos"]},
  "82245": {"lat": 23.27685, "lon": -106.38889, "colonias": ["El Roble"]},
  "82246": {"lat": 23.23199, "lon": -106.38517, "colonias": ["El Guayabo"]},
  "82247": {"lat": 23.22181, "lon": -106.43882, "colonias": ["Escamillas"]},
  "82248": {"lat": 23.23921, "lon": -106.36226, "colonias": ["El Bajio"]},
  "82249": {"lat": 23.19487, "lon": -106.40438, "colonias": ["Cofradia de Leyva Solano"]},
  "82266": {"lat": 23.28196, "lon": -106.45362, "colonias": ["Barron"]},
  "82267": {"lat": 23.238296666666667, "lon": -106.42110000000001, "colonias": ["Cereso Mazatlán", "El Castillo", "Isla de La Piedra"]},
  "82269": {"lat": 23.27856, "lon": -106.39819, "colonias": ["Aeropuerto Rafael Buelna"]},
  "82270": {"lat": 23.2783, "lon": -106.41074, "colonias": ["El Habal"]},
  "82273": {"lat": 23.22696, "lon": -106.3636, "colonias": ["El Chilillo"]},
  "82275": {"lat": 23.2821, "lon": -106.42267, "colonias": ["Pozole"]},
  "82277": {"lat": 23.19473, "lon": -106.45484, "colonias": ["Potrero de Carrasco"]},
  "82300": {"lat": 23.26839, "lon": -106.4372, "colonias": ["Amapas"]},
  "82304": {"lat": 23.220689999999998, "lon": -106.39503500000001, "colonias": ["El Guamúchil", "El Tecomate de la Noria"]},
  "82313": {"lat": 23.250945, "lon": -106.41209, "colonias": ["Juantillos", "San Marcos"]},
  "82329": {"lat": 23.25425, "lon": -106.39182, "colonias": ["La Noria"]},
  "82330": {"lat": 23.25965, "lon": -106.4519, "colonias": ["Los Zapotes"]},
  "82350": {"lat": 23.234859999999998, "lon": -106.37298, "colonias": ["El Quelite", "Puente Del Quelite"]},
  "82360": {"lat": 23.21561, "lon": -106.38772, "colonias": ["El Quemado"]},
  "82369": {"lat": 23.25965, "lon": -106.4519, "colonias": ["La Zábila"]},
  "82370": {"lat": 23.20129, "lon": -106.43651, "colonias": ["El Recreo"]},
  "82384": {"lat": 23.20051, "lon": -106.39586, "colonias": ["Mármol"]}
};

/**
 * Inicializa el mapa base
 */
function initMap() {
    const mztCoordinates = { lat: 23.2329, lng: -106.4062 };
    
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12.5,
        center: mztCoordinates,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }
        ],
        mapTypeControl: true,
        streetViewControl: false
    });

    procesarDiccionarioPostal();
    initEventListeners();
}

window.initMap = initMap;

function initEventListeners() {
    document.getElementById('btnSearch').addEventListener('click', buscarCodigos);
    document.getElementById('btnClear').addEventListener('click', limpiarMapa);
    document.getElementById('btnExportCSV').addEventListener('click', () => exportarDatos('csv'));
    document.getElementById('btnExportExcel').addEventListener('click', () => exportarDatos('xml'));

    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') buscarCodigos();
    });
}

/**
 * Mapea la base de datos JSON directo al runtime de Google Maps
 */
function procesarDiccionarioPostal() {
    cpGroups = {};
    let totalColonias = 0;

    for (let cp in DATABASE_MAZATLAN) {
        const item = DATABASE_MAZATLAN[cp];
        cpGroups[cp] = {
            colonias: item.colonias,
            // Generamos el punto usando las claves lat y lon del JSON
            points: [new google.maps.LatLng(item.lat, item.lon)]
        };
        totalColonias += item.colonias.length;
    }
    
    const totalCPs = Object.keys(cpGroups).length;
    document.getElementById('statusLoad').innerText = `Base postal activa: ${totalCPs} CPs y ${totalColonias} Colonias indexadas.`;
}

/**
 * Dibuja los códigos postales solicitados por el usuario
 */
function buscarCodigos() {
    const input = document.getElementById('searchInput').value;
    limpiarMapa();

    let targetCPs = input.split(',').map(c => c.trim()).filter(c => c.length > 0);
    
    // Si la barra está vacía, mapea de golpe todos los códigos del archivo
    if (targetCPs.length === 0) {
        targetCPs = Object.keys(cpGroups);
    }

    const bounds = new google.maps.LatLngBounds();
    let dibujados = 0;

    targetCPs.forEach(cp => {
        if (cpGroups[cp]) {
            generarPoligonoCP(cp, cpGroups[cp], bounds);
            dibujarListaLateral(cp, cpGroups[cp]);
            dibujados++;
        }
    });

    if (dibujados > 0) {
        map.fitBounds(bounds);
    } else {
        alert("No se encontraron coincidencias para los CPs ingresados en Mazatlán.");
    }
}

function generarColorPorCP(cp) {
    let hash = 0;
    for (let i = 0; i < cp.length; i++) {
        hash = cp.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return "#" + "000000".substring(0, 6 - color.length) + color;
}

/**
 * Genera el área poligonal visual alrededor de las coordenadas de las colonias
 */
function generarPoligonoCP(cp, data, globalBounds) {
    let hullPoints = data.points;
    
    // Al ser un punto central por CP del JSON, creamos el radio de cobertura logística de 450 metros
    if (hullPoints.length > 0) {
        const p = hullPoints[0];
        const offset = 0.0045; 
        hullPoints = [
            new google.maps.LatLng(p.lat() + offset, p.lng() - offset),
            new google.maps.LatLng(p.lat() + offset, p.lng() + offset),
            new google.maps.LatLng(p.lat() - offset, p.lng() + offset),
            new google.maps.LatLng(p.lat() - offset, p.lng() - offset)
        ];
    }

    const colorHex = generarColorPorCP(cp);

    const polygon = new google.maps.Polygon({
        paths: hullPoints,
        strokeColor: colorHex,
        strokeOpacity: 0.85,
        strokeWeight: 2,
        fillColor: colorHex,
        fillOpacity: 0.25, // Opacidad de relleno al 25% solicitado
        map: map
    });

    hullPoints.forEach(p => globalBounds.extend(p));

    const infoWindow = new google.maps.InfoWindow();
    polygon.addListener('click', (event) => {
        const listaHtml = data.colonias.map(col => `<li>${col}</li>`).join('');
        const contentString = `
            <div class="info-window-content">
                <h4 style="margin:0 0 5px 0; color:#1a73e8;">Código Postal: ${cp}</h4>
                <div style="margin-bottom:8px;"><b>Asentamientos indexados:</b> ${data.colonias.length}</div>
                <div style="max-height:140px; overflow-y:auto; border-top:1px solid #ddd; padding-top:6px;">
                    <ul style="padding-left:15px; margin:0; font-size:12px; color:#555;">${listaHtml}</ul>
                </div>
            </div>`;
        
        infoWindow.setContent(contentString);
        infoWindow.setPosition(event.latLng);
        infoWindow.open(map);
    });

    activePolygons[cp] = polygon;
}

function dibujarListaLateral(cp, data) {
    const listContainer = document.getElementById('cpList');
    
    const item = document.createElement('div');
    item.className = 'cp-item';
    
    const header = document.createElement('div');
    header.className = 'cp-header';
    header.innerHTML = `<span>CP ${cp} (${data.colonias.length} Col.)</span> <span>▼</span>`;
    
    const body = document.createElement('div');
    body.className = 'cp-body';
    body.style.display = 'none'; 
    
    const ul = document.createElement('ul');
    data.colonias.forEach(col => {
        const li = document.createElement('li');
        li.innerText = col;
        ul.appendChild(li);
    });
    
    body.appendChild(ul);
    item.appendChild(header);
    item.appendChild(body);
    
    header.addEventListener('click', () => {
        const isHidden = body.style.display === 'none';
        body.style.display = isHidden ? 'block' : 'none';
        header.querySelector('span:last-child').innerText = isHidden ? '▲' : '▼';
        
        if (isHidden && activePolygons[cp]) {
            const bounds = new google.maps.LatLngBounds();
            activePolygons[cp].getPath().forEach(p => bounds.extend(p));
            map.panTo(bounds.getCenter());
            map.setZoom(14);
        }
    });
    
    listContainer.appendChild(item);
}

function limpiarMapa() {
    for (let cp in activePolygons) {
        activePolygons[cp].setMap(null);
    }
    activePolygons = {};
    document.getElementById('cpList').innerHTML = '';
}

function exportarDatos(format) {
    if (Object.keys(cpGroups).length === 0) return;

    let content = "";
    let fileName = `Logistica_Completa_Mazatlan.${format === 'csv' ? 'csv' : 'xls'}`;
    let mimeType = "";

    if (format === 'csv') {
        mimeType = 'text/csv;charset=utf-8;';
        content = "Código Postal,Cantidad Colonias,Colonias\n";
        for (let cp in cpGroups) {
            let coloniasStr = cpGroups[cp].colonias.join(' | ');
            content += `"${cp}",${cpGroups[cp].colonias.length},"${coloniasStr}"\n`;
        }
    } else {
        mimeType = 'application/vnd.ms-excel';
        content = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">`;
        content += `<head><meta charset="UTF-8"></head><body><table border="1">`;
        content += `<tr style="background:#1a73e8; color:white;"><th>Código Postal</th><th>Colonias Cobertura</th><th>Asentamientos</th></tr>`;
        
        for (let cp in cpGroups) {
            let coloniasStr = cpGroups[cp].colonias.join(', ');
            content += `<tr><td>${cp}</td><td>${cpGroups[cp].colonias.length}</td><td>${coloniasStr}</td></tr>`;
        }
        content += `</table></body></html>`;
    }

    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement("a");
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Inicialización asíncrona de Google Maps limpia
(function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
})();