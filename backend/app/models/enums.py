import enum

class GenderEnum(enum.Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"

class WorkType(enum.Enum):
    INFRA = "Infraestrutura"
    EDU = "Educacional"
    ASSIS = "Assistencia Social"
    SAUDE = "Saude"
    SAN = "Saneamento"

class Status(enum.Enum):
    Init = "Iniciada"
    End = "Finalizada"
    Atra = "Atrasada"
    Par = "Parada"
    Andam = "Andamento"