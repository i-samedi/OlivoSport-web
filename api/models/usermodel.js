/* import { FOREIGNKEYS } from "sequelize/lib/query-types"
import { SERIALIZABLE } from "sequelize/lib/table-hints"
 */
export default(sequelize, DataTypes) => {
   const User = sequelize.define( "user", {
        rut: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipo_de_usuario:{
            type: DataTypes.STRING,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {timestamps: false}, )
    return User

    /* const Profesores  = sequelize.define( "profesores", {
        id_profesor: {
            type: DataTypes.SERIALIZABLE,
            primaryKey: true,
            allowNull: false
        },
        id_usuario :{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        profesion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        especialidad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        especialidad: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },{timestamps: false},)
    return Profesores;

    const Horario = equelize.define( "horario", {
        id_horario: {
            type: DataTypes.SERIALIZABLE,
            primaryKey: true,
            allowNull: false
        },
        dia_semana :{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hora_inicio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hora_termino: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
  
    },{timestamps: false})
    return Horario;


    const Cursos = equelize.define("cursos", {
        id_horario: {
            type: DataTypes.SERIALIZABLE,
            primaryKey: true,
            allowNull: false
        },
        dia_semana :{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hora_inicio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hora_termino: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
    },{timestamps: false}) */
}