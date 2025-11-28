from sqlalchemy.orm import Session
from models.pais import PaisModel
from models.provincia import ProvinciaModel
from models.idioma import IdiomaModel
from models.unidad_medicion import UnidadMedicionModel
from models.modo_transporte import ModoTransporteModel

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

def load_data(db: Session):    
    load_idiomas(db)
    load_paises(db)
    load_provincias(db)
    load_unidades_medicion(db)
    load_modos_transporte(db)