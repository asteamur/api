const datasheetSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    title: "Ficha de datos de asociado",
    type: "object",
    definitions:{
        date: {
            type: 'object',
            properties: {
                _day: {
                    type: 'integer',
                    minimum: 1,
                    maximum: 31
                },
                _month: {
                    type: 'integer',
                    minimum: 1,
                    maximun: 12
                },
                _year: {type: 'integer'}
            }
        }
    },
    properties: {
        type: {
            type: "string",
            const: "datasheet"
        },
        father: {
            type: "object",
            title: "Padre",
            properties: {
                name: {
                    title: "Nombre del padre",
                    type: "string"
                },
                DNI: {
                    title: "DNI del padre",
                    type: "string"
                },
                email: {
                    title: "Correo electrónico del padre",
                    type: "string",
                    format: "email"
                }
            }
        },
        mother: {
            type: "object",
            title: "Madre",
            properties: {
                name: {
                    title: "Nombre de la madre",
                    type: "string"
                },
                DNI: {
                    title: "DNI de la madre",
                    type: "string"
                },
                email: {
                    title: "Correo electrónico de la madre",
                    type: "string",
                    format: "email"
                }
            }
        },
        tutor: {
            type: "object",
            title: "Tutor legal",
            properties: {
                name: {
                    title: "Nombre del tutor legal",
                    type: "string"
                },
                DNI: {
                    title: "DNI del tutor legal",
                    type: "string"
                },
                email: {
                    title: "Correo electrónico del tutor",
                    type: "string",
                    format: "email"
                }
            }
        },
        user: {
            type: "object",
            title: "Usuario",
            properties: {
                name: {
                    title: "Nombre del usuario",
                    type: "string"
                },
                adult: {
                    title: "es adulto?",
                    type: "boolean"
                },
                DNI: {
                    title: "DNI del usuario",
                    type: "string"
                },
                dateOfBirth: {
                    "$ref":"#/definitions/date",
                    title: "Fecha de nacimiento",
                },
                school: {
                    title: "Centro educativo",
                    type: "string"
                },
                brotherNames: {
                    title: 'Nombre de los hermanos/as',
                    type: 'string'
                },
                handicap: {
                    type: 'object',
                    title: 'Minusvalía',
                    properties: {
                        handicap: {
                            title: 'Minusvalía %',
                            type: 'integer'
                        },
                        validDate: {
                            title: 'Válido hasta',
                            "$ref":"#/definitions/date"
                        },
                        dependence: {
                            title: 'Dependencia',
                            type: 'boolean'
                        },
                        grade: {
                            title: 'Grado',
                            type: 'integer'
                        },
                        level: {
                            title: 'Nivel',
                            type: 'integer'
                        },
                        solicitationDate: {
                            title: 'Fecha de solicitud',
                            "$ref":"#/definitions/date"
                        }
                    }
                }
            }
        },
        invoice: {
            type: 'object',
            title: 'Factura',
            properties: {
                name: {
                    title: "Nombre",
                    type: "string"
                },
                address: {
                    type: 'string',
                    title: 'Calle'
                },
                town: {
                    type: 'string',
                    title: 'Población'
                },
                postalCode: {
                    type: 'string',
                    title: 'Código postal'
                }
            }
        }
    }
}

module.exports = {
    datasheetSchema
}