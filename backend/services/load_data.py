from sqlalchemy.orm import Session
from datetime import date
from models.pais import PaisModel
from models.provincia import ProvinciaModel
from models.idioma import IdiomaModel
from models.unidad_medicion import UnidadMedicionModel
from models.modo_transporte import ModoTransporteModel
from models.categoria_circuito import CategoriaCircuitoModel
from models.circuito import CircuitoModel
from models.punto_interes import PuntoInteresModel
from models.circuito_punto_interes import CircuitoPuntoInteresModel
from utils.enums import TipoPuntoInteresEnum


def load_idiomas(db: Session):
    if db.query(IdiomaModel).first():
        return

    idiomas = [
        IdiomaModel(idioma_id=1, nombre_idioma="Español", codigo_iso="es"),
        IdiomaModel(idioma_id=2, nombre_idioma="English", codigo_iso="en"),
        IdiomaModel(idioma_id=3, nombre_idioma="Português", codigo_iso="pt"),
    ]
    for idioma in idiomas:
        db.add(idioma)
    db.commit()


def load_paises(db: Session):
    if db.query(PaisModel).first():
        return

    paises = [
        PaisModel(pais_id=1, nombre_pais="Argentina", codigo_iso="AR"),
        PaisModel(pais_id=2, nombre_pais="Brasil", codigo_iso="BR"),
        PaisModel(pais_id=3, nombre_pais="Chile", codigo_iso="CL"),
        PaisModel(pais_id=4, nombre_pais="Colombia", codigo_iso="CO"),
        PaisModel(pais_id=5, nombre_pais="Perú", codigo_iso="PE"),
        PaisModel(pais_id=6, nombre_pais="Uruguay", codigo_iso="UY"),
        PaisModel(pais_id=7, nombre_pais="Paraguay", codigo_iso="PY"),
        PaisModel(pais_id=8, nombre_pais="Bolivia", codigo_iso="BO"),
        PaisModel(pais_id=9, nombre_pais="Ecuador", codigo_iso="EC"),
        PaisModel(pais_id=10, nombre_pais="Venezuela", codigo_iso="VE"),
        PaisModel(pais_id=11, nombre_pais="México", codigo_iso="MX"),
        PaisModel(pais_id=12, nombre_pais="Estados Unidos", codigo_iso="US"),
        PaisModel(pais_id=13, nombre_pais="Canadá", codigo_iso="CA"),
        PaisModel(pais_id=14, nombre_pais="España", codigo_iso="ES"),
    ]
    for pais in paises:
        db.add(pais)
    db.commit()


def load_provincias(db: Session):
    if db.query(ProvinciaModel).first():
        return

    provincias = [
        ProvinciaModel(provincia_id=1, nombre_provincia="Buenos Aires", pais_id=1),
        ProvinciaModel(provincia_id=2, nombre_provincia="Catamarca", pais_id=1),
        ProvinciaModel(provincia_id=3, nombre_provincia="Chaco", pais_id=1),
        ProvinciaModel(provincia_id=4, nombre_provincia="Chubut", pais_id=1),
        ProvinciaModel(provincia_id=5, nombre_provincia="Córdoba", pais_id=1),
        ProvinciaModel(provincia_id=6, nombre_provincia="Corrientes", pais_id=1),
        ProvinciaModel(provincia_id=7, nombre_provincia="Entre Ríos", pais_id=1),
        ProvinciaModel(provincia_id=8, nombre_provincia="Formosa", pais_id=1),
        ProvinciaModel(provincia_id=9, nombre_provincia="Jujuy", pais_id=1),
        ProvinciaModel(provincia_id=10, nombre_provincia="La Pampa", pais_id=1),
        ProvinciaModel(provincia_id=11, nombre_provincia="La Rioja", pais_id=1),
        ProvinciaModel(provincia_id=12, nombre_provincia="Mendoza", pais_id=1),
        ProvinciaModel(provincia_id=13, nombre_provincia="Misiones", pais_id=1),
        ProvinciaModel(provincia_id=14, nombre_provincia="Neuquén", pais_id=1),
        ProvinciaModel(provincia_id=15, nombre_provincia="Río Negro", pais_id=1),
        ProvinciaModel(provincia_id=16, nombre_provincia="Salta", pais_id=1),
        ProvinciaModel(provincia_id=17, nombre_provincia="San Juan", pais_id=1),
        ProvinciaModel(provincia_id=18, nombre_provincia="San Luis", pais_id=1),
        ProvinciaModel(provincia_id=19, nombre_provincia="Santa Cruz", pais_id=1),
        ProvinciaModel(provincia_id=20, nombre_provincia="Santa Fe", pais_id=1),
        ProvinciaModel(provincia_id=21, nombre_provincia="Santiago del Estero", pais_id=1),
        ProvinciaModel(provincia_id=22, nombre_provincia="Tierra del Fuego", pais_id=1),
        ProvinciaModel(provincia_id=23, nombre_provincia="Tucumán", pais_id=1),
        ProvinciaModel(provincia_id=24, nombre_provincia="Ciudad Autónoma de Buenos Aires", pais_id=1),
    ]
    for provincia in provincias:
        db.add(provincia)
    db.commit()


def load_unidades_medicion(db: Session):
    if db.query(UnidadMedicionModel).first():
        return

    unidades = [
        UnidadMedicionModel(unidad_medicion_id=1, nombre_unidad_medicion="Kilómetros"),
        UnidadMedicionModel(unidad_medicion_id=2, nombre_unidad_medicion="Millas"),
    ]
    for unidad in unidades:
        db.add(unidad)
    db.commit()


def load_modos_transporte(db: Session):
    if db.query(ModoTransporteModel).first():
        return

    modos = [
        ModoTransporteModel(modo_transporte_id=1, nombre_modo_transporte="A pie"),
        ModoTransporteModel(modo_transporte_id=2, nombre_modo_transporte="Automóvil"),
        ModoTransporteModel(modo_transporte_id=3, nombre_modo_transporte="Bicicleta"),
    ]
    for modo in modos:
        db.add(modo)
    db.commit()


def load_categorias_circuitos(db: Session):
    if db.query(CategoriaCircuitoModel).first():
        return

    categorias = [
        CategoriaCircuitoModel(
            categoria_id=1,
            nombre_categoria="Histórico",
            nombre_categoria_en="Historical",
            nombre_categoria_pt="Histórico",
        ),
        CategoriaCircuitoModel(
            categoria_id=2,
            nombre_categoria="Cultural",
            nombre_categoria_en="Cultural",
            nombre_categoria_pt="Cultural",
        ),
        CategoriaCircuitoModel(
            categoria_id=3,
            nombre_categoria="Religioso",
            nombre_categoria_en="Religious",
            nombre_categoria_pt="Religioso",
        ),
        CategoriaCircuitoModel(
            categoria_id=4,
            nombre_categoria="Gastronómico",
            nombre_categoria_en="Gastronomic",
            nombre_categoria_pt="Gastronômico",
        ),
        CategoriaCircuitoModel(
            categoria_id=5,
            nombre_categoria="Arquitectónico",
            nombre_categoria_en="Architectural",
            nombre_categoria_pt="Arquitetônico",
        ),
        CategoriaCircuitoModel(
            categoria_id=6,
            nombre_categoria="Naturaleza",
            nombre_categoria_en="Nature",
            nombre_categoria_pt="Natureza",
        ),
        CategoriaCircuitoModel(
            categoria_id=7,
            nombre_categoria="Aventura",
            nombre_categoria_en="Adventure",
            nombre_categoria_pt="Aventura",
        ),
        CategoriaCircuitoModel(
            categoria_id=8,
            nombre_categoria="Familiar",
            nombre_categoria_en="Family-friendly",
            nombre_categoria_pt="Familiar",
        ),
    ]
    for categoria in categorias:
        db.add(categoria)
    db.commit()


def load_puntos_interes(db: Session):
    if db.query(PuntoInteresModel).first():
        return

    pois = [
        PuntoInteresModel(
            poi_id=1,
            tipo_poi=TipoPuntoInteresEnum.RELIGIOSO,
            latitud=-31.416868,
            longitud=-64.184422,
            tiene_audioguia=True,
            nombre="Catedral de Córdoba",
            nombre_en="Córdoba Cathedral",
            nombre_pt="Catedral de Córdoba",
            descripcion="Principal iglesia de la ciudad.",
            descripcion_en="The city's main church.",
            descripcion_pt="Principal igreja da cidade.",
            fecha_inauguracion=date(1758, 5, 25),
            dato_historico="Inaugurada en 1758.",
            dato_historico_en="Inaugurated in 1758.",
            dato_historico_pt="Inaugurada em 1758.",
            informacion_cultural="Pinturas interiores de Emilio Caraffa, artista.",
            informacion_cultural_en="Interior paintings by Emilio Caraffa, artist.",
            informacion_cultural_pt="Pinturas interiores de Emilio Caraffa, artista.",
            activo=True,
        ),
        PuntoInteresModel(
            poi_id=2,
            tipo_poi=TipoPuntoInteresEnum.HISTORICO,
            latitud=-31.416127,
            longitud=-64.184042,
            tiene_audioguia=True,
            nombre="Cabildo Histórico",
            nombre_en="Historic Cabildo",
            nombre_pt="Cabildo Histórico",
            descripcion="Antiguo edificio colonial, hoy museo.",
            descripcion_en="Former colonial building, today a museum.",
            descripcion_pt="Antigo edifício colonial, hoje um museu.",
            fecha_inauguracion=date(1786, 1, 1),
            dato_historico="Remodelado y completado en 1786.",
            dato_historico_en="Remodeled and completed in 1786.",
            dato_historico_pt="Remodelado e completado em 1786.",
            informacion_cultural="Monumento Histórico Nacional desde 1941.",
            informacion_cultural_en="National Historic Monument since 1941.",
            informacion_cultural_pt="Monumento Histórico Nacional desde 1941.",
            activo=True,
        ),
        PuntoInteresModel(
            poi_id=3,
            tipo_poi=TipoPuntoInteresEnum.ARQUITECTONICO,
            latitud=-31.416374,
            longitud=-64.18502,
            tiene_audioguia=False,
            nombre="Pasaje Santa Catalina",
            nombre_en="Santa Catalina Passage",
            nombre_pt="Passagem Santa Catalina",
            descripcion="Conexión arquitectónica con la Plazoleta del Fundador.",
            descripcion_en="Architectural link with the Plazoleta del Fundador.",
            descripcion_pt="Conexão arquitetônica com a Plazoleta del Fundador.",
            fecha_inauguracion=date(1600, 1, 1),
            dato_historico="Construido en el siglo XVII, originalmente Pasaje Cuzco.",
            dato_historico_en="Built in the 17th century, originally Pasaje Cuzco.",
            dato_historico_pt="Construído no século XVII, originalmente Pasaje Cuzco.",
            informacion_cultural="Casa del Archivo Provincial de la Memoria.",
            informacion_cultural_en="Home of the Provincial Archive of Memory.",
            informacion_cultural_pt="Casa do Arquivo Provincial da Memória.",
            activo=True,
        ),
        PuntoInteresModel(
            poi_id=4,
            tipo_poi=TipoPuntoInteresEnum.CULTURAL,
            latitud=-31.427331,
            longitud=-64.185400,
            tiene_audioguia=False,
            nombre="Museo Evita – Palacio Ferreyra",
            nombre_en="Evita Museum – Ferreyra Palace",
            nombre_pt="Museu Evita – Palácio Ferreyra",
            descripcion="Palacio estilo Beaux-Arts con más de 500 obras de arte provincial.",
            descripcion_en="Beaux-Arts palace housing over 500 provincial artworks.",
            descripcion_pt="Palácio estilo Beaux-Arts com mais de 500 obras de arte provincial.",
            fecha_inauguracion=date(2007, 10, 17),
            dato_historico="Construido para la familia Ferreyra en 1916; convertido en museo en 2007.",
            dato_historico_en="Built for the Ferreyra family in 1916; converted into a museum in 2007.",
            dato_historico_pt="Construído para a família Ferreyra em 1916; convertido em museu em 2007.",
            informacion_cultural="Considerada la 6ª Maravilla Artificial de Córdoba; alberga obras de Caraffa, Seguí y Malanca.",
            informacion_cultural_en="Considered the 6th Artificial Wonder of Córdoba; houses works by Caraffa, Seguí and Malanca.",
            informacion_cultural_pt="Considerada a 6ª Maravilha Artificial de Córdoba; abriga obras de Caraffa, Seguí e Malanca.",
            activo=True,
        ),
        PuntoInteresModel(
            poi_id=5,
            tipo_poi=TipoPuntoInteresEnum.CULTURAL,
            latitud=-31.429133,
            longitud=-64.184865,
            tiene_audioguia=False,
            nombre="Museo Palacio Dionisi",
            nombre_en="Dionisi Palace Museum",
            nombre_pt="Museu Palácio Dionisi",
            descripcion="Palacio de principios del siglo XX reconvertido en museo de fotografía y artes visuales.",
            descripcion_en="Early 20th-century palace converted into a photography and visual arts museum.",
            descripcion_pt="Palácio do início do século XX reconvertido em museu de fotografia e artes visuais.",
            fecha_inauguracion=date(1920, 1, 1),
            dato_historico="Construido con materiales traídos de Europa, como el vecino Palacio Ferreyra.",
            dato_historico_en="Built with materials brought from Europe, like the neighboring Ferreyra Palace.",
            dato_historico_pt="Construído com materiais trazidos da Europa, como o vizinho Palácio Ferreyra.",
            informacion_cultural="Integra el circuito de tres museos provinciales de Av. Yrigoyen junto a Ferreyra y Caraffa.",
            informacion_cultural_en="Part of the three-museum provincial circuit on Av. Yrigoyen with Ferreyra and Caraffa.",
            informacion_cultural_pt="Integra o circuito de três museus provinciais da Av. Yrigoyen junto a Ferreyra e Caraffa.",
            activo=True,
        ),
        PuntoInteresModel(
            poi_id=6,
            tipo_poi=TipoPuntoInteresEnum.CULTURAL,
            latitud=-31.428557,
            longitud=-64.184194,
            tiene_audioguia=False,
            nombre="Museo Emilio Caraffa",
            nombre_en="Emilio Caraffa Museum",
            nombre_pt="Museu Emilio Caraffa",
            descripcion="Museo de arte contemporáneo con arquitectura moderna frente al Parque Sarmiento.",
            descripcion_en="Contemporary art museum with modern architecture facing Parque Sarmiento.",
            descripcion_pt="Museu de arte contemporânea com arquitetura moderna em frente ao Parque Sarmiento.",
            fecha_inauguracion=date(1916, 7, 9),
            dato_historico="Fundado en 1916 en honor al pintor cordobés Emilio Caraffa.",
            dato_historico_en="Founded in 1916 in honor of Córdoba painter Emilio Caraffa.",
            dato_historico_pt="Fundado em 1916 em homenagem ao pintor cordobês Emilio Caraffa.",
            informacion_cultural="Referente del arte contemporáneo regional con muestras permanentes y temporales.",
            informacion_cultural_en="Regional contemporary art landmark with permanent and temporary exhibitions.",
            informacion_cultural_pt="Referência da arte contemporânea regional com mostras permanentes e temporárias.",
            activo=True,
        ),
        PuntoInteresModel(
            poi_id=7,
            tipo_poi=TipoPuntoInteresEnum.CULTURAL,
            latitud=-31.424172,
            longitud=-64.186911,
            tiene_audioguia=False,
            nombre="Paseo del Buen Pastor",
            nombre_en="Paseo del Buen Pastor",
            nombre_pt="Passeio do Bom Pastor",
            descripcion="Ex cárcel de mujeres con capilla, sala de arte y fuentes danzantes.",
            descripcion_en="Former women's prison with chapel, art gallery and dancing fountains.",
            descripcion_pt="Ex-presídio feminino com capela, galeria de arte e fontes dançantes.",
            fecha_inauguracion=date(2007, 1, 1),
            dato_historico="Funcionó como cárcel de mujeres durante gran parte del siglo XX.",
            dato_historico_en="Served as a women's prison for much of the 20th century.",
            dato_historico_pt="Funcionou como prisão feminina durante grande parte do século XX.",
            informacion_cultural="Hoy alberga estatuas de 'La Mona' Jiménez y 'El Potro' Rodrigo, íconos del cuarteto cordobés.",
            informacion_cultural_en="Now home to statues of 'La Mona' Jiménez and 'El Potro' Rodrigo, icons of Córdoba's cuarteto music.",
            informacion_cultural_pt="Hoje abriga estátuas de 'La Mona' Jiménez e 'El Potro' Rodrigo, ícones do cuarteto cordobês.",
            activo=True,
        ),
        PuntoInteresModel(
            poi_id=8,
            tipo_poi=TipoPuntoInteresEnum.RELIGIOSO,
            latitud=-31.418057,
            longitud=-64.186369,
            tiene_audioguia=True,
            nombre="Iglesia de la Compañía de Jesús",
            nombre_en="Church of the Society of Jesus",
            nombre_pt="Igreja da Companhia de Jesus",
            descripcion="Iglesia más antigua de Argentina con techo de madera sin clavos.",
            descripcion_en="Oldest church in Argentina with a nailless wooden ceiling.",
            descripcion_pt="Igreja mais antiga da Argentina com teto de madeira sem pregos.",
            fecha_inauguracion=date(1671, 6, 1),
            dato_historico="Construida entre 1640 y 1671; su bóveda imita el casco invertido de un barco.",
            dato_historico_en="Built between 1640 and 1671; its vault mimics an inverted ship's hull.",
            dato_historico_pt="Construída entre 1640 e 1671; sua abóbada imita o casco invertido de um navio.",
            informacion_cultural="Joya del barroco americano declarada Patrimonio UNESCO en el año 2000.",
            informacion_cultural_en="Jewel of American Baroque declared UNESCO Heritage in the year 2000.",
            informacion_cultural_pt="Joia do barroco americano declarada Patrimônio UNESCO no ano 2000.",
            activo=True,
        ),
        PuntoInteresModel(
            poi_id=9,
            tipo_poi=TipoPuntoInteresEnum.RELIGIOSO,
            latitud=-31.417625,
            longitud=-64.187097,
            tiene_audioguia=False,
            nombre="Capilla Doméstica de la Compañía de Jesús",
            nombre_en="Domestic Chapel of the Society of Jesus",
            nombre_pt="Capela Doméstica da Companhia de Jesus",
            descripcion="Capilla privada jesuítica con murales del siglo XVIII descubiertos bajo capas de cal.",
            descripcion_en="Private Jesuit chapel with 18th-century murals discovered under layers of whitewash.",
            descripcion_pt="Capela privada jesuítica com murais do século XVIII descobertos sob camadas de cal.",
            fecha_inauguracion=date(1668, 1, 1),
            dato_historico="Construida entre 1644 y 1668; sus murales permanecieron ocultos hasta el siglo XX.",
            dato_historico_en="Built between 1644 and 1668; its murals remained hidden until the 20th century.",
            dato_historico_pt="Construída entre 1644 e 1668; seus murais permaneceram ocultos até o século XX.",
            informacion_cultural="Contiene retablos y bóvedas pintadas del barroco latinoamericano de valor excepcional.",
            informacion_cultural_en="Contains altarpieces and painted vaults of exceptional Latin American Baroque value.",
            informacion_cultural_pt="Contém retábulos e abóbadas pintadas do barroco latino-americano de valor excepcional.",
            activo=True,
        ),
        PuntoInteresModel(
            poi_id=10,
            tipo_poi=TipoPuntoInteresEnum.HISTORICO,
            latitud=-31.418309,
            longitud=-64.186471,
            tiene_audioguia=False,
            nombre="Museo Histórico UNC – Rectorado Histórico",
            nombre_en="UNC Historical Museum – Historic Rectory",
            nombre_pt="Museu Histórico UNC – Reitorado Histórico",
            descripcion="Antiguo Rectorado jesuítico con claustros, Salón de Grados e incunables.",
            descripcion_en="Former Jesuit rectory with cloisters, Hall of Degrees and incunabula.",
            descripcion_pt="Antigo Reitorado jesuítico com claustros, Salão de Graus e incunábulos.",
            fecha_inauguracion=date(1622, 1, 1),
            dato_historico="Cuna de la UNC, fundada en 1613, la 4ª universidad más antigua de América.",
            dato_historico_en="Birthplace of the UNC, founded in 1613, the 4th oldest university in the Americas.",
            dato_historico_pt="Berço da UNC, fundada em 1613, a 4ª universidade mais antiga das Américas.",
            informacion_cultural="Las visitas guiadas incluyen el Salón de Grados y cartografía e incunables jesuíticos únicos.",
            informacion_cultural_en="Guided tours include the Hall of Degrees and unique Jesuit cartography and incunabula.",
            informacion_cultural_pt="Os percursos guiados incluem o Salão de Graus e cartografia e incunábulos jesuíticos únicos.",
            activo=True,
        ),
        PuntoInteresModel(
            poi_id=11,
            tipo_poi=TipoPuntoInteresEnum.HISTORICO,
            latitud=-31.418842,
            longitud=-64.186702,
            tiene_audioguia=False,
            nombre="Colegio Nacional de Monserrat",
            nombre_en="Monserrat National College",
            nombre_pt="Colégio Nacional de Monserrat",
            descripcion="Histórico colegio fundado en 1687, Monumento Histórico Nacional, aún activo.",
            descripcion_en="Historic school founded in 1687, declared National Historic Monument, still active.",
            descripcion_pt="Histórico colégio fundado em 1687, Monumento Histórico Nacional, ainda ativo.",
            fecha_inauguracion=date(1782, 1, 1),
            dato_historico="Fundado en 1687; trasladado a su sede actual en 1782 tras la expulsión jesuita.",
            dato_historico_en="Founded in 1687; relocated to its current site in 1782 after the Jesuit expulsion.",
            dato_historico_pt="Fundado em 1687; transferido para sua sede atual em 1782 após a expulsão jesuíta.",
            informacion_cultural="Declarado Monumento Histórico Nacional en 1938; mantiene el modelo humanista jesuítico.",
            informacion_cultural_en="Declared National Historic Monument in 1938; preserves the Jesuit humanist model.",
            informacion_cultural_pt="Declarado Monumento Histórico Nacional em 1938; mantém o modelo humanista jesuítico.",
            activo=True,
        ),
        PuntoInteresModel(
            poi_id=12,
            tipo_poi=TipoPuntoInteresEnum.HISTORICO,
            latitud=-31.420050,
            longitud=-64.190008,
            tiene_audioguia=False,
            nombre="El Calicanto de la antigua Cañada",
            nombre_en="El Calicanto and La Cañada",
            nombre_pt="O Calicanto e La Cañada",
            descripcion="Primer murallón de contención del arroyo La Cañada, construido en 1761.",
            descripcion_en="First containment wall of La Cañada stream, built in 1761.",
            descripcion_pt="Primeira muralha de contenção do arroio La Cañada, construída em 1761.",
            fecha_inauguracion=date(1761, 1, 1),
            dato_historico="Construido por el gobernador Ángel Peredo en 1761 para controlar las inundaciones.",
            dato_historico_en="Built by Governor Ángel Peredo in 1761 to control flooding.",
            dato_historico_pt="Construído pelo governador Ángel Peredo em 1761 para controlar as inundações.",
            informacion_cultural="El arroyo sistematizado hoy es el paseo lineal más característico de la ciudad.",
            informacion_cultural_en="The channeled stream is now the city's most distinctive linear promenade.",
            informacion_cultural_pt="O arroio canalizado é hoje o passeio linear mais característico da cidade.",
            activo=True,
        ),
        PuntoInteresModel(
            poi_id=13,
            tipo_poi=TipoPuntoInteresEnum.RELIGIOSO,
            latitud=-31.422590,
            longitud=-64.191510,
            tiene_audioguia=False,
            nombre="Capilla San Francisco Solano",
            nombre_en="San Francisco Solano Chapel",
            nombre_pt="Capela São Francisco Solano",
            descripcion="Pequeña capilla de 1917 construida por la Sociedad Vicentina en Barrio Güemes.",
            descripcion_en="Small 1917 chapel built by the Vincentian Society in Barrio Güemes.",
            descripcion_pt="Pequena capela de 1917 construída pela Sociedade Vicentina no Bairro Güemes.",
            fecha_inauguracion=date(1917, 1, 1),
            dato_historico="Construida en 1917 por la Conferencia Nuestra Señora de Copacabana.",
            dato_historico_en="Built in 1917 by the Our Lady of Copacabana Conference.",
            dato_historico_pt="Construída em 1917 pela Conferência Nossa Senhora de Copacabana.",
            informacion_cultural="Testimonio de la fe de la comunidad inmigrante que habitó el barrio a principios del siglo XX.",
            informacion_cultural_en="Testament to the faith of the immigrant community that populated the neighborhood in the early 1900s.",
            informacion_cultural_pt="Testemunho da fé da comunidade imigrante que habitou o bairro no início do século XX.",
            activo=True,
        ),
        PuntoInteresModel(
            poi_id=14,
            tipo_poi=TipoPuntoInteresEnum.CULTURAL,
            latitud=-31.424161,
            longitud=-64.192196,
            tiene_audioguia=False,
            nombre="Paseo de las Artes",
            nombre_en="Arts Walk (Paseo de las Artes)",
            nombre_pt="Passeio das Artes",
            descripcion="Feria de artesanías al aire libre, epicentro cultural y bohemio de los fines de semana.",
            descripcion_en="Open-air crafts fair, bohemian and cultural epicenter on weekends.",
            descripcion_pt="Feira de artesanato ao ar livre, epicentro cultural e boêmio nos fins de semana.",
            fecha_inauguracion=date(1980, 1, 1),
            dato_historico="Surgió en 1980 al reconvertirse las antiguas casas de inquilinato del barrio.",
            dato_historico_en="Emerged in 1980 from the conversion of the neighborhood's old tenement houses.",
            dato_historico_pt="Surgiu em 1980 com a reconversão das antigas casas de inquilinato do bairro.",
            informacion_cultural="Alberga ocho ferias, galerías y anticuarios; corazón de la vida nocturna cordobesa.",
            informacion_cultural_en="Home to eight fairs, galleries and antique shops; heart of Córdoba's nightlife.",
            informacion_cultural_pt="Abriga oito feiras, galerias e antiquários; coração da vida noturna cordobesa.",
            activo=True,
        ),
        PuntoInteresModel(
            poi_id=15,
            tipo_poi=TipoPuntoInteresEnum.CULTURAL,
            latitud=-31.423601,
            longitud=-64.192045,
            tiene_audioguia=False,
            nombre="Museo Iberoamericano de Artesanías",
            nombre_en="Ibero-American Museum of Crafts",
            nombre_pt="Museu Ibero-Americano de Artesanatos",
            descripcion="Museo gratuito con artesanías de Brasil, Perú, Chile, Nicaragua y Argentina.",
            descripcion_en="Free museum with crafts from Brazil, Peru, Chile, Nicaragua and Argentina.",
            descripcion_pt="Museu gratuito com artesanatos do Brasil, Peru, Chile, Nicarágua e Argentina.",
            fecha_inauguracion=date(1985, 1, 1),
            dato_historico="Abrió en 1985 como parte de la puesta en valor del Paseo de las Artes.",
            dato_historico_en="Opened in 1985 as part of the Paseo de las Artes revitalization.",
            dato_historico_pt="Abriu em 1985 como parte da valorização do Passeio das Artes.",
            informacion_cultural="Reúne cerámicas, tallas, mimbre y ornamentos religiosos de toda Iberoamérica.",
            informacion_cultural_en="Brings together ceramics, carvings, wicker and religious ornaments from across Ibero-America.",
            informacion_cultural_pt="Reúne cerâmicas, esculturas, vime e ornamentos religiosos de toda a Ibero-América.",
            activo=True,
        ),
        PuntoInteresModel(
            poi_id=16,
            tipo_poi=TipoPuntoInteresEnum.HISTORICO,
            latitud=-31.416802,
            longitud=-64.181336,
            tiene_audioguia=False,
            nombre="Museo Histórico Marqués de Sobremonte",
            nombre_en="Marquis of Sobremonte Historical Museum",
            nombre_pt="Museu Histórico Marquês de Sobremonte",
            descripcion="Casa colonial del siglo XVIII, único ejemplo de vivienda familiar colonial conservada en la ciudad.",
            descripcion_en="18th-century colonial house, the only preserved colonial family residence in the city.",
            descripcion_pt="Casa colonial do século XVIII, único exemplo de residência familiar colonial conservada na cidade.",
            fecha_inauguracion=date(1919, 5, 15),
            dato_historico="Construida hacia 1752; residencia del gobernador Sobremonte entre 1783 y 1797.",
            dato_historico_en="Built around 1752; residence of Governor Sobremonte between 1783 and 1797.",
            dato_historico_pt="Construída por volta de 1752; residência do governador Sobremonte entre 1783 e 1797.",
            informacion_cultural="Declarada Monumento Histórico Nacional en 1941; alberga 26 habitaciones y 5 patios coloniales.",
            informacion_cultural_en="Declared National Historic Monument in 1941; houses 26 rooms and 5 colonial courtyards.",
            informacion_cultural_pt="Declarada Monumento Histórico Nacional em 1941; abriga 26 quartos e 5 pátios coloniais.",
            activo=True,
        ),
        PuntoInteresModel(
            poi_id=17,
            tipo_poi=TipoPuntoInteresEnum.HISTORICO,
            latitud=-31.416776,
            longitud=-64.185511,
            tiene_audioguia=False,
            nombre="Plazoleta del Fundador",
            nombre_en="Founder's Square",
            nombre_pt="Praça do Fundador",
            descripcion="Pequeña plaza frente a la Catedral con escultura de Jerónimo Luis de Cabrera.",
            descripcion_en="Small square in front of the Cathedral with a sculpture of Jerónimo Luis de Cabrera.",
            descripcion_pt="Pequena praça em frente à Catedral com escultura de Jerônimo Luís de Cabrera.",
            fecha_inauguracion=date(1973, 7, 6),
            dato_historico="Inaugurada en 1973 para conmemorar el 400° aniversario de la fundación de Córdoba.",
            dato_historico_en="Inaugurated in 1973 to commemorate the 400th anniversary of Córdoba's founding.",
            dato_historico_pt="Inaugurada em 1973 para comemorar o 400° aniversário da fundação de Córdoba.",
            informacion_cultural="Homenajea al fundador de la ciudad, Jerónimo Luis de Cabrera, quien fundó Córdoba el 6 de julio de 1573.",
            informacion_cultural_en="Honors city founder Jerónimo Luis de Cabrera, who founded Córdoba on July 6, 1573.",
            informacion_cultural_pt="Homenageia o fundador da cidade, Jerônimo Luís de Cabrera, que fundou Córdoba em 6 de julho de 1573.",
            activo=True,
        ),
        PuntoInteresModel(
            poi_id=18,
            tipo_poi=TipoPuntoInteresEnum.CULTURAL,
            latitud=-31.417360,
            longitud=-64.184597,
            tiene_audioguia=False,
            nombre="Museo de Arte Religioso Juan de Tejeda",
            nombre_en="Juan de Tejeda Museum of Religious Art",
            nombre_pt="Museu de Arte Religiosa Juan de Tejeda",
            descripcion="Exmonasterio carmelita del siglo XVII con excepcional colección de arte sacro colonial.",
            descripcion_en="Former 17th-century Carmelite convent with exceptional colonial sacred art collection.",
            descripcion_pt="Ex-convento carmelita do século XVII com excepcional coleção de arte sacra colonial.",
            fecha_inauguracion=date(1628, 1, 1),
            dato_historico="Edificio del siglo XVII en el solar fundacional de la familia Tejeda, a dos cuadras de la Plaza.",
            dato_historico_en="17th-century building on the Tejeda family's founding plot, two blocks from the Square.",
            dato_historico_pt="Edifício do século XVII no terreno fundacional da família Tejeda, a dois quarteirões da Praça.",
            informacion_cultural="Alberga tres colecciones de arte sacro: Catedral, Monasterio San José y donaciones privadas.",
            informacion_cultural_en="Houses three sacred art collections: Cathedral, San José Monastery and private donations.",
            informacion_cultural_pt="Abriga três coleções de arte sacra: Catedral, Mosteiro São José e doações privadas.",
            activo=True,
        ),
        PuntoInteresModel(
            poi_id=19,
            tipo_poi=TipoPuntoInteresEnum.HISTORICO,
            latitud=-31.413334,
            longitud=-64.184381,
            tiene_audioguia=False,
            nombre="Cripta Jesuítica",
            nombre_en="Jesuit Crypt",
            nombre_pt="Cripta Jesuítica",
            descripcion="Ruinas subterráneas del siglo XVIII bajo la Avenida Colón, entrada libre.",
            descripcion_en="18th-century underground ruins beneath Colón Avenue, free admission.",
            descripcion_pt="Ruínas subterrâneas do século XVIII sob a Avenida Colón, entrada gratuita.",
            fecha_inauguracion=date(1713, 1, 1),
            dato_historico="Construida en 1713, enterrada en 1928 y redescubierta en 1989 por obreros telefónicos.",
            dato_historico_en="Built in 1713, buried in 1928, rediscovered in 1989 by telephone cable workers.",
            dato_historico_pt="Construída em 1713, enterrada em 1928, redescoberta em 1989 por trabalhadores de telefonia.",
            informacion_cultural="Único vestigio arqueológico colonial accesible en el microcentro cordobés.",
            informacion_cultural_en="Only accessible colonial archaeological remain in Córdoba's city center.",
            informacion_cultural_pt="Único vestígio arqueológico colonial acessível no microcentro cordobés.",
            activo=True,
        ),
        PuntoInteresModel(
            poi_id=20,
            tipo_poi=TipoPuntoInteresEnum.RELIGIOSO,
            latitud=-31.424748,
            longitud=-64.186203,
            tiene_audioguia=False,
            nombre="Iglesia de los Capuchinos",
            nombre_en="Capuchins Church",
            nombre_pt="Igreja dos Capuchinhos",
            descripcion="Imponente iglesia neogótica de 1934, 1ª Maravilla Artificial de Córdoba y primera iglesia en hormigón armado del país.",
            descripcion_en="Imposing neo-Gothic church from 1934, 1st Artificial Wonder of Córdoba and the first reinforced concrete church in Argentina.",
            descripcion_pt="Imponente igreja neogótica de 1934, 1ª Maravilha Artificial de Córdoba e primeira igreja em concreto armado do país.",
            fecha_inauguracion=date(1934, 1, 1),
            dato_historico="Proyectada por el arquitecto italiano Augusto Ferrari en 1926; inaugurada oficialmente en 1934.",
            dato_historico_en="Designed by Italian architect Augusto Ferrari in 1926; officially inaugurated in 1934.",
            dato_historico_pt="Projetada pelo arquiteto italiano Augusto Ferrari em 1926; inaugurada oficialmente em 1934.",
            informacion_cultural="Sus torres asimétricas simbolizan la imperfección humana (40 m) y la perfección divina (70 m); las bóvedas mapean el cielo de Córdoba en 1930.",
            informacion_cultural_en="Its asymmetric towers symbolize human imperfection (40 m) and divine perfection (70 m); the vaults map Córdoba sky in 1930.",
            informacion_cultural_pt="Suas torres assimétricas simbolizam a imperfeição humana (40 m) e a perfeição divina (70 m); as abóbadas mapeiam o céu de Córdoba em 1930.",
            activo=True,
        ),
    ]
    for poi in pois:
        db.add(poi)
    db.commit()


def load_circuitos_ejemplo(db: Session):
    if db.query(CircuitoModel).first():
        return

    circuitos = [
        CircuitoModel(
            nombre="Centro Histórico",
            nombre_en="Historic Downtown",
            nombre_pt="Centro Histórico",
            descripcion="Recorrido patrimonial por el corazón de la ciudad, que incluye la Catedral, el Cabildo y el Pasaje Santa Catalina, entre otros.",
            descripcion_en="A heritage tour through the heart of the city, including the Cathedral, the Cabildo and the Santa Catalina Passage, among others.",
            descripcion_pt="Um passeio pelo patrimônio do coração da cidade, incluindo a Catedral, o Cabildo e a Passagem Santa Catalina, entre outros.",
            categoria_id=1,
            modo_transporte_id=1,
            distancia_total_metros=2320,
            duracion_estimada_minutos=84,
            url_imagen_portada="https://i.imgur.com/FbEd5vS.jpeg",
            accesible_auto=False,
            tiene_tramos_techados=True,
            activo=True,
        ),
        CircuitoModel(
            nombre="Nueva Córdoba Patrimonial",
            nombre_en="Nueva Córdoba Heritage",
            nombre_pt="Nueva Córdoba Patrimonial",
            descripcion="Tour por los principales museos culturales",
            descripcion_en="Tour of the main cultural museums.",
            descripcion_pt="Tour pelos principais museus culturais.",
            categoria_id=2,
            modo_transporte_id=1,
            distancia_total_metros=1800,
            duracion_estimada_minutos=120,
            url_imagen_portada="https://i.imgur.com/b6LXVj1.jpeg",
            accesible_auto=True,
            tiene_tramos_techados=False,
            activo=True,
        ),
        CircuitoModel(
            nombre="Manzana Jesuítica",
            nombre_en="Jesuit Block Heritage",
            nombre_pt="Manzana Jesuítica",
            descripcion="Tour profundo por la Manzana Jesuítica, Patrimonio de la Humanidad UNESCO. Explora iglesia, universidad y museos coloniales.",
            descripcion_en="Deep tour of the Jesuit Block, UNESCO World Heritage. Explore church, university and colonial museums.",
            descripcion_pt="Tour aprofundado pela Manzana Jesuítica, Patrimônio da Humanidade UNESCO. Explore igreja, universidade e museus coloniais.",
            categoria_id=1,
            modo_transporte_id=1,
            distancia_total_metros=800,
            duracion_estimada_minutos=45,
            url_imagen_portada="https://i.imgur.com/NbuiCLu.jpeg",
            accesible_auto=False,
            tiene_tramos_techados=True,
            activo=True,
        ),
        CircuitoModel(
            nombre="Barrio Güemes",
            nombre_en="Güemes Neighborhood",
            nombre_pt="Bairro Güemes",
            descripcion="Paseo bohemio por el barrio más vibrante de la ciudad",
            descripcion_en="Bohemian walk through the city's most vibrant neighborhood",
            descripcion_pt="Passeio boêmio pelo bairro mais vibrante da cidade",
            categoria_id=5,
            modo_transporte_id=1,
            distancia_total_metros=2100,
            duracion_estimada_minutos=90,
            url_imagen_portada="https://i.imgur.com/YAJXWWb.png",
            accesible_auto=True,
            tiene_tramos_techados=False,
            activo=True,
        ),
        CircuitoModel(
            nombre="El Camino del Marqués",
            nombre_en="The Marquis's Route",
            nombre_pt="O Caminho do Marquês",
            descripcion="Recorrido por los sitios históricos del Marqués de Sobremonte en el centro",
            descripcion_en="Tour through the historic sites of the Marquis of Sobremonte downtown",
            descripcion_pt="Percurso pelos sítios históricos do Marquês de Sobremonte no centro",
            categoria_id=1,
            modo_transporte_id=1,
            distancia_total_metros=3200,
            duracion_estimada_minutos=120,
            url_imagen_portada="https://i.imgur.com/tZXfvLK.jpeg",
            accesible_auto=True,
            tiene_tramos_techados=False,
            activo=True,
        ),
    ]
    for circuito in circuitos:
        db.add(circuito)
    db.commit()


def load_circuitos_puntos_interes(db: Session):
    if db.query(CircuitoPuntoInteresModel).first():
        return

    vinculos = [
        CircuitoPuntoInteresModel(circuito_poi_id=1, circuito_id=1, poi_id=1, orden_en_circuito=1),
        CircuitoPuntoInteresModel(circuito_poi_id=2, circuito_id=1, poi_id=2, orden_en_circuito=2),
        CircuitoPuntoInteresModel(circuito_poi_id=3, circuito_id=1, poi_id=3, orden_en_circuito=3),
        CircuitoPuntoInteresModel(circuito_poi_id=4, circuito_id=2, poi_id=7, orden_en_circuito=1),
        CircuitoPuntoInteresModel(circuito_poi_id=5, circuito_id=2, poi_id=20, orden_en_circuito=2),
        CircuitoPuntoInteresModel(circuito_poi_id=6, circuito_id=2, poi_id=4, orden_en_circuito=3),
        CircuitoPuntoInteresModel(circuito_poi_id=7, circuito_id=2, poi_id=5, orden_en_circuito=4),
        CircuitoPuntoInteresModel(circuito_poi_id=8, circuito_id=2, poi_id=6, orden_en_circuito=5),
        CircuitoPuntoInteresModel(circuito_poi_id=9, circuito_id=3, poi_id=8, orden_en_circuito=1),
        CircuitoPuntoInteresModel(circuito_poi_id=10, circuito_id=3, poi_id=9, orden_en_circuito=2),
        CircuitoPuntoInteresModel(circuito_poi_id=11, circuito_id=3, poi_id=10, orden_en_circuito=3),
        CircuitoPuntoInteresModel(circuito_poi_id=12, circuito_id=3, poi_id=11, orden_en_circuito=4),
        CircuitoPuntoInteresModel(circuito_poi_id=13, circuito_id=4, poi_id=12, orden_en_circuito=1),
        CircuitoPuntoInteresModel(circuito_poi_id=14, circuito_id=4, poi_id=13, orden_en_circuito=2),
        CircuitoPuntoInteresModel(circuito_poi_id=15, circuito_id=4, poi_id=15, orden_en_circuito=3),
        CircuitoPuntoInteresModel(circuito_poi_id=16, circuito_id=4, poi_id=14, orden_en_circuito=4),
        CircuitoPuntoInteresModel(circuito_poi_id=17, circuito_id=5, poi_id=16, orden_en_circuito=1),
        CircuitoPuntoInteresModel(circuito_poi_id=18, circuito_id=5, poi_id=17, orden_en_circuito=2),
        CircuitoPuntoInteresModel(circuito_poi_id=19, circuito_id=5, poi_id=18, orden_en_circuito=3),
        CircuitoPuntoInteresModel(circuito_poi_id=20, circuito_id=5, poi_id=19, orden_en_circuito=4),
    ]
    for vinculo in vinculos:
        db.add(vinculo)
    db.commit()


def load_data(db: Session):
    load_idiomas(db)
    load_paises(db)
    load_provincias(db)
    load_unidades_medicion(db)
    load_modos_transporte(db)
    load_categorias_circuitos(db)
    load_puntos_interes(db)
    load_circuitos_ejemplo(db)
    load_circuitos_puntos_interes(db)
