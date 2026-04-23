from sqlalchemy.orm.attributes import set_committed_value

IDIOMAS_SOPORTADOS = ("es", "en", "pt")
IDIOMA_DEFAULT = "es"


def normalizar_idioma(idioma):
    if not idioma:
        return IDIOMA_DEFAULT
    base = idioma.lower().split("-")[0].split("_")[0]
    return base if base in IDIOMAS_SOPORTADOS else IDIOMA_DEFAULT


def aplicar_idioma(obj, idioma, campos):
    if not obj:
        return
    idioma = normalizar_idioma(idioma)
    if idioma == IDIOMA_DEFAULT:
        return
    for campo in campos:
        valor = getattr(obj, f"{campo}_{idioma}", None)
        if valor:
            set_committed_value(obj, campo, valor)


CAMPOS_CIRCUITO = ("nombre", "descripcion")
CAMPOS_POI = ("nombre", "descripcion", "dato_historico", "informacion_cultural", "informacion_extra")
CAMPOS_CATEGORIA = ("nombre_categoria",)


def localizar_circuito(circuito, idioma: str) -> None:
    aplicar_idioma(circuito, idioma, CAMPOS_CIRCUITO)
    if getattr(circuito, "categoria", None):
        aplicar_idioma(circuito.categoria, idioma, CAMPOS_CATEGORIA)
    for poi in getattr(circuito, "puntos_interes", []) or []:
        aplicar_idioma(poi, idioma, CAMPOS_POI)
