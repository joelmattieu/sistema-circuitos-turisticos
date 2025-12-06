from __future__ import annotations
import enum

class TipoPuntoInteresEnum(str, enum.Enum):
    RELIGIOSO = "religioso"
    MUSEO = "museo"
    HISTORICO = "historico"
    NATURAL = "natural"
    ARQUITECTONICO = "arquitectonico"
    CULTURAL = "cultural"
    RECREATIVO = "recreativo"
    MONUMENTO = "monumento"