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
            url_imagen_portada="https://i.imgur.com/placeholder1.jpeg",
            accesible_auto=False,
            tiene_tramos_techados=True,
            activo=True,
        ),
        CircuitoModel(
            nombre="Santo Domingo y Teresa",
            nombre_en="Santo Domingo and Teresa Neighborhoods",
            nombre_pt="Santo Domingo e Teresa",
            descripcion="Paseo por los barrios bohemios con galerías de arte, tiendas de diseño y arquitectura contemporánea. Ideal para amantes del arte urbano.",
            descripcion_en="Walk through bohemian neighborhoods with art galleries, design shops and contemporary architecture. Perfect for urban art lovers.",
            descripcion_pt="Passeio pelos bairros boêmios com galerias de arte, lojas de design e arquitetura contemporânea. Ideal para amantes da arte urbana.",
            categoria_id=5,
            modo_transporte_id=1,
            distancia_total_metros=2100,
            duracion_estimada_minutos=90,
            url_imagen_portada="https://i.imgur.com/placeholder2.jpeg",
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
