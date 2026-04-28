from sqlalchemy import inspect, text
from sqlalchemy.orm import Session
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


COLUMNAS_I18N = {
    "circuitos": [
        ("nombre_en", "VARCHAR"),
        ("nombre_pt", "VARCHAR"),
        ("descripcion_en", "VARCHAR"),
        ("descripcion_pt", "VARCHAR"),
    ],
    "puntos_interes": [
        ("nombre_en", "VARCHAR"),
        ("nombre_pt", "VARCHAR"),
        ("descripcion_en", "VARCHAR"),
        ("descripcion_pt", "VARCHAR"),
        ("dato_historico_en", "VARCHAR(1000)"),
        ("dato_historico_pt", "VARCHAR(1000)"),
        ("informacion_cultural_en", "VARCHAR(1000)"),
        ("informacion_cultural_pt", "VARCHAR(1000)"),
        ("informacion_extra_en", "VARCHAR(500)"),
        ("informacion_extra_pt", "VARCHAR(500)"),
    ],
    "categorias_circuitos": [
        ("nombre_categoria_en", "VARCHAR"),
        ("nombre_categoria_pt", "VARCHAR"),
    ],
}


COLUMNAS_OBSOLETAS = {
    "circuitos_puntos_interes": ["distancia_tramo_metros", "duracion_tramo_minutos"],
}


def asegurar_columnas_i18n(db: Session):
    inspector = inspect(db.bind)
    for tabla, columnas in COLUMNAS_I18N.items():
        if not inspector.has_table(tabla):
            continue
        existentes = {col["name"] for col in inspector.get_columns(tabla)}
        for nombre_col, tipo in columnas:
            if nombre_col not in existentes:
                db.execute(text(f'ALTER TABLE {tabla} ADD COLUMN {nombre_col} {tipo}'))
    for tabla, columnas in COLUMNAS_OBSOLETAS.items():
        if not inspector.has_table(tabla):
            continue
        existentes = {col["name"] for col in inspector.get_columns(tabla)}
        for nombre_col in columnas:
            if nombre_col in existentes:
                db.execute(text(f'ALTER TABLE {tabla} DROP COLUMN {nombre_col}'))
    db.commit()


def load_idiomas(db: Session):
    idiomas_existentes = db.query(IdiomaModel).all()
    
    if len(idiomas_existentes) == 0:
        idiomas = [
            IdiomaModel(idioma_id=1, nombre_idioma="Español", codigo_iso="es"),
            IdiomaModel(idioma_id=2, nombre_idioma="English", codigo_iso="en"),
            IdiomaModel(idioma_id=3, nombre_idioma="Português", codigo_iso="pt"),
        ]
        
        for idioma in idiomas:
            db.add(idioma)
        db.commit()

def load_paises(db: Session):
    paises_existentes = db.query(PaisModel).all()
    
    if len(paises_existentes) == 0:
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
    provincias_existentes = db.query(ProvinciaModel).all()
    
    if len(provincias_existentes) == 0:
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
    unidades_existentes = db.query(UnidadMedicionModel).all()
    
    if len(unidades_existentes) == 0:
        unidades = [
            UnidadMedicionModel(unidad_medicion_id=1, nombre_unidad_medicion="Kilómetros"),
            UnidadMedicionModel(unidad_medicion_id=2, nombre_unidad_medicion="Millas"),
        ]
        
        for unidad in unidades:
            db.add(unidad)
        db.commit()

def load_modos_transporte(db: Session):
    modos_existentes = db.query(ModoTransporteModel).all()
    
    if len(modos_existentes) == 0:
        modos = [
            ModoTransporteModel(modo_transporte_id=1, nombre_modo_transporte="A pie"),
            ModoTransporteModel(modo_transporte_id=2, nombre_modo_transporte="Automóvil"),
            ModoTransporteModel(modo_transporte_id=3, nombre_modo_transporte="Bicicleta"),
        ]
        
        for modo in modos:
            db.add(modo)
        db.commit()

CATEGORIAS_SEED = [
    (1, "Histórico", "Historical", "Histórico"),
    (2, "Cultural", "Cultural", "Cultural"),
    (3, "Religioso", "Religious", "Religioso"),
    (4, "Gastronómico", "Gastronomic", "Gastronômico"),
    (5, "Arquitectónico", "Architectural", "Arquitetônico"),
    (6, "Naturaleza", "Nature", "Natureza"),
    (7, "Aventura", "Adventure", "Aventura"),
    (8, "Familiar", "Family-friendly", "Familiar"),
]


def load_categorias_circuitos(db: Session):
    categorias_existentes = db.query(CategoriaCircuitoModel).all()

    if len(categorias_existentes) == 0:
        for cat_id, es, en, pt in CATEGORIAS_SEED:
            db.add(CategoriaCircuitoModel(
                categoria_id=cat_id,
                nombre_categoria=es,
                nombre_categoria_en=en,
                nombre_categoria_pt=pt,
            ))
        db.commit()
        return

    # Completar traducciones faltantes.
    traducciones = {cat_id: (en, pt) for cat_id, _, en, pt in CATEGORIAS_SEED}
    for categoria in categorias_existentes:
        en, pt = traducciones.get(categoria.categoria_id, (None, None))
        if en and not categoria.nombre_categoria_en:
            categoria.nombre_categoria_en = en
        if pt and not categoria.nombre_categoria_pt:
            categoria.nombre_categoria_pt = pt
    db.commit()

POIS_SEED = [
    {
        "poi_id": 1,
        "tipo_poi": TipoPuntoInteresEnum.RELIGIOSO,
        "latitud": -31.416868,
        "longitud": -64.184422,
        "tiene_audioguia": True,
        "nombre": "Catedral de Córdoba",
        "nombre_en": "Córdoba Cathedral",
        "nombre_pt": "Catedral de Córdoba",
        "descripcion": "Principal iglesia de la ciudad.",
        "descripcion_en": "The city's main church.",
        "descripcion_pt": "Principal igreja da cidade.",
    },
    {
        "poi_id": 2,
        "tipo_poi": TipoPuntoInteresEnum.HISTORICO,
        "latitud": -31.416127,
        "longitud": -64.184042,
        "tiene_audioguia": True,
        "nombre": "Cabildo Histórico",
        "nombre_en": "Historic Cabildo",
        "nombre_pt": "Cabildo Histórico",
        "descripcion": "Antiguo edificio colonial, hoy museo.",
        "descripcion_en": "Former colonial building, today a museum.",
        "descripcion_pt": "Antigo edifício colonial, hoje um museu.",
    },
    {
        "poi_id": 3,
        "tipo_poi": TipoPuntoInteresEnum.ARQUITECTONICO,
        "latitud": -31.416374,
        "longitud": -64.18502,
        "tiene_audioguia": False,
        "nombre": "Pasaje Santa Catalina",
        "nombre_en": "Santa Catalina Passage",
        "nombre_pt": "Passagem Santa Catalina",
        "descripcion": "Conexión arquitectónica con la Plazoleta del Fundador.",
        "descripcion_en": "Architectural link with the Plazoleta del Fundador.",
        "descripcion_pt": "Conexão arquitetônica com a Plazoleta del Fundador.",
    },
    {
        "poi_id": 4,
        "tipo_poi": TipoPuntoInteresEnum.HISTORICO,
        "latitud": -31.4198,
        "longitud": -64.1880,
        "tiene_audioguia": True,
        "nombre": "Manzana Jesuítica",
        "nombre_en": "Jesuit Block",
        "nombre_pt": "Quarteirão Jesuíta",
        "descripcion": "Conjunto arquitectónico declarado Patrimonio de la Humanidad por la UNESCO.",
        "descripcion_en": "Architectural complex declared a UNESCO World Heritage Site.",
        "descripcion_pt": "Conjunto arquitetônico declarado Patrimônio da Humanidade pela UNESCO.",
    },
]

CAMPOS_I18N_POI = ["nombre", "descripcion"]

COORDS_OBSOLETAS_POI = {
    4: (-31.416506, -64.184525),
}


def load_puntos_interes(db: Session):
    puntos_existentes = db.query(PuntoInteresModel).all()

    if len(puntos_existentes) == 0:
        for data in POIS_SEED:
            db.add(PuntoInteresModel(**data, activo=True))
        db.commit()
        return

    # Completar traducciones y corregir coordenadas obsoletas.
    seed_por_id = {data["poi_id"]: data for data in POIS_SEED}
    for poi in puntos_existentes:
        seed = seed_por_id.get(poi.poi_id)
        if not seed:
            continue
        for campo in CAMPOS_I18N_POI:
            for lang in ("en", "pt"):
                attr = f"{campo}_{lang}"
                if seed.get(attr) and not getattr(poi, attr, None):
                    setattr(poi, attr, seed[attr])
        coord_obsoleta = COORDS_OBSOLETAS_POI.get(poi.poi_id)
        if coord_obsoleta and (poi.latitud, poi.longitud) == coord_obsoleta:
            poi.latitud = seed["latitud"]
            poi.longitud = seed["longitud"]
    db.commit()

CIRCUITOS_SEED = [
    {
        "nombre": "Centro Histórico",
        "nombre_en": "Historic Downtown",
        "nombre_pt": "Centro Histórico",
        "descripcion": "Recorrido patrimonial por el corazón de la ciudad, que incluye la Catedral, el Cabildo y el Pasaje Santa Catalina, entre otros.",
        "descripcion_en": "A heritage tour through the heart of the city, including the Cathedral, the Cabildo and the Santa Catalina Passage, among others.",
        "descripcion_pt": "Um passeio pelo patrimônio do coração da cidade, incluindo a Catedral, o Cabildo e a Passagem Santa Catalina, entre outros.",
        "categoria_id": 1,
        "modo_transporte_id": 1,
        "distancia_total_metros": 2320,
        "duracion_estimada_minutos": 84,
        "url_imagen_portada": "https://i.imgur.com/FbEd5vS.jpeg",
        "accesible_auto": False,
        "tiene_tramos_techados": True,
    },
    {
        "nombre": "Nueva Córdoba Patrimonial",
        "nombre_en": "Nueva Córdoba Heritage",
        "nombre_pt": "Nueva Córdoba Patrimonial",
        "descripcion": "Tour por los principales museos culturales",
        "descripcion_en": "Tour of the main cultural museums.",
        "descripcion_pt": "Tour pelos principais museus culturais.",
        "categoria_id": 2,
        "modo_transporte_id": 1,
        "distancia_total_metros": 1800,
        "duracion_estimada_minutos": 120,
        "url_imagen_portada": "https://i.imgur.com/b6LXVj1.jpeg",
        "accesible_auto": True,
        "tiene_tramos_techados": False,
    },
]


def load_circuitos_ejemplo(db: Session):
    circuitos_existentes = db.query(CircuitoModel).all()

    if len(circuitos_existentes) == 0:
        for data in CIRCUITOS_SEED:
            db.add(CircuitoModel(**data, activo=True))
        db.commit()
        return

    seed_por_nombre = {data["nombre"]: data for data in CIRCUITOS_SEED}
    totales_obsoletos = {
        "Centro Histórico": {"distancia_total_metros": 2500, "duracion_estimada_minutos": 90},
    }
    for circuito in circuitos_existentes:
        seed = seed_por_nombre.get(circuito.nombre)
        if not seed:
            continue
        for campo in ("nombre", "descripcion"):
            for lang in ("en", "pt"):
                attr = f"{campo}_{lang}"
                if seed.get(attr) and not getattr(circuito, attr, None):
                    setattr(circuito, attr, seed[attr])
        obsoletos = totales_obsoletos.get(circuito.nombre)
        if obsoletos:
            if (
                circuito.distancia_total_metros == obsoletos["distancia_total_metros"]
                and circuito.duracion_estimada_minutos == obsoletos["duracion_estimada_minutos"]
            ):
                circuito.distancia_total_metros = seed["distancia_total_metros"]
                circuito.duracion_estimada_minutos = seed["duracion_estimada_minutos"]
    db.commit()

VINCULOS_OBSOLETOS = {(1, 4)}


def load_circuitos_puntos_interes(db: Session):
    vinculos_existentes = db.query(CircuitoPuntoInteresModel).all()

    if len(vinculos_existentes) == 0:
        vinculos = [
            CircuitoPuntoInteresModel(circuito_poi_id=1, circuito_id=1, poi_id=1, orden_en_circuito=1),
            CircuitoPuntoInteresModel(circuito_poi_id=2, circuito_id=1, poi_id=2, orden_en_circuito=2),
            CircuitoPuntoInteresModel(circuito_poi_id=3, circuito_id=1, poi_id=3, orden_en_circuito=3),
        ]
        for vinculo in vinculos:
            db.add(vinculo)
        db.commit()
        return

    for vinculo in vinculos_existentes:
        if (vinculo.circuito_id, vinculo.poi_id) in VINCULOS_OBSOLETOS:
            db.delete(vinculo)
    db.commit()

def load_data(db: Session):
    asegurar_columnas_i18n(db)
    load_idiomas(db)
    load_paises(db)
    load_provincias(db)
    load_unidades_medicion(db)
    load_modos_transporte(db)
    load_categorias_circuitos(db)
    load_puntos_interes(db)
    load_circuitos_ejemplo(db)
    load_circuitos_puntos_interes(db)
