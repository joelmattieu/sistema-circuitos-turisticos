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

def load_idiomas(db: Session):
    idiomas_existentes = db.query(IdiomaModel).all()
    
    if len(idiomas_existentes) == 0:
        idiomas = [
            IdiomaModel(idioma_id=1, nombre_idioma="Español", codigo_iso="es"),
            IdiomaModel(idioma_id=2, nombre_idioma="Inglés", codigo_iso="en"),
            IdiomaModel(idioma_id=3, nombre_idioma="Portugués", codigo_iso="pt"),
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

def load_categorias_circuitos(db: Session):
    categorias_existentes = db.query(CategoriaCircuitoModel).all()
    
    if len(categorias_existentes) == 0:
        categorias = [
            CategoriaCircuitoModel(categoria_id=1, nombre_categoria="Histórico"),
            CategoriaCircuitoModel(categoria_id=2, nombre_categoria="Cultural"),
            CategoriaCircuitoModel(categoria_id=3, nombre_categoria="Religioso"),
            CategoriaCircuitoModel(categoria_id=4, nombre_categoria="Gastronómico"),
            CategoriaCircuitoModel(categoria_id=5, nombre_categoria="Arquitectónico"),
            CategoriaCircuitoModel(categoria_id=6, nombre_categoria="Naturaleza"),
            CategoriaCircuitoModel(categoria_id=7, nombre_categoria="Aventura"),
            CategoriaCircuitoModel(categoria_id=8, nombre_categoria="Familiar"),
        ]
        
        for categoria in categorias:
            db.add(categoria)
        db.commit()

def load_puntos_interes(db: Session):
    puntos_existentes = db.query(PuntoInteresModel).all()
    
    if len(puntos_existentes) == 0:
        puntos = [
            PuntoInteresModel(
                poi_id=1,
                nombre="Catedral de Córdoba",
                descripcion="Principal iglesia de la ciudad.",
                tipo=TipoPuntoInteresEnum.RELIGIOSO,
                latitud=-31.4173,
                longitud=-64.1887,
                tiene_audioguia=True,
                activo=True
            ),
            PuntoInteresModel(
                poi_id=2,
                nombre="Cabildo Histórico",
                descripcion="Antiguo edificio colonial, hoy museo.",
                tipo=TipoPuntoInteresEnum.HISTORICO,
                latitud=-31.4203,
                longitud=-64.1888,
                tiene_audioguia=True,
                activo=True
            ),
            PuntoInteresModel(
                poi_id=3,
                nombre="Pasaje Santa Catalina",
                descripcion="Conexión arquitectónica con la Plazoleta del Fundador.",
                tipo=TipoPuntoInteresEnum.ARQUITECTONICO,
                latitud=-31.4195,
                longitud=-64.1875,
                tiene_audioguia=False,
                activo=True
            ),
            PuntoInteresModel(
                poi_id=4,
                nombre="Manzana Jesuítica",
                descripcion="Conjunto arquitectónico declarado Patrimonio de la Humanidad por la UNESCO.",
                tipo=TipoPuntoInteresEnum.HISTORICO,
                latitud=-31.4205,
                longitud=-64.1892,
                tiene_audioguia=True,
                activo=True
            )
        ]
        
        for punto in puntos:
            db.add(punto)
        db.commit()

def load_circuitos_ejemplo(db: Session):
    circuitos_existentes = db.query(CircuitoModel).all()
    
    if len(circuitos_existentes) == 0:
        circuitos = [
            CircuitoModel(
                nombre="Centro Histórico",
                descripcion="Recorrido patrimonial por el corazón de la ciudad, que incluye la Catedral, el Cabildo y el Pasaje Santa Catalina, entre otros.",
                categoria_id=1,
                distancia_total_metros=2500,
                duracion_estimada_minutos=90,
                url_imagen_portada="https://drive.google.com/file/d/1LpeXWme0SVZMxVNxOu1pI3mg-iHAbKyp/view?usp=drive_link",
                activo=True
            ),
            CircuitoModel(
                nombre="Nueva Córdoba Patrimonial",
                descripcion="Tour por los principales museos culturales",
                categoria_id=2,
                distancia_total_metros=1800,
                duracion_estimada_minutos=120,
                url_imagen_portada="https://drive.google.com/file/d/1vMxBECTMyAqkaDZ_UX2keQ6qN7g1LSWy/view?usp=drive_link",
                activo=True
            )
        ]
        
        for circuito in circuitos:
            db.add(circuito)
        db.commit()

def load_circuitos_puntos_interes(db: Session):
    vinculos_existentes = db.query(CircuitoPuntoInteresModel).all()
    
    if len(vinculos_existentes) == 0:
        # vincula puntos de interés al circuito "Centro Histórico" (circuito_id=1)
        vinculos = [
            CircuitoPuntoInteresModel(
                circuito_poi_id=1,
                circuito_id=1,  # Centro Histórico
                poi_id=1,  # Catedral de Córdoba
                orden_en_circuito=1,
                distancia_tramo_metros=0,  # Punto de inicio
                duracion_tramo_minutos=0
            ),
            CircuitoPuntoInteresModel(
                circuito_poi_id=2,
                circuito_id=1,
                poi_id=2,  # Cabildo Histórico
                orden_en_circuito=2,
                distancia_tramo_metros=150,
                duracion_tramo_minutos=5
            ),
            CircuitoPuntoInteresModel(
                circuito_poi_id=3,
                circuito_id=1,
                poi_id=3,  # Pasaje Santa Catalina
                orden_en_circuito=3,
                distancia_tramo_metros=200,
                duracion_tramo_minutos=7
            ),
            CircuitoPuntoInteresModel(
                circuito_poi_id=4,
                circuito_id=1,
                poi_id=4,  # Manzana Jesuítica
                orden_en_circuito=4,
                distancia_tramo_metros=180,
                duracion_tramo_minutos=6
            ),
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