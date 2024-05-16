
export default(sequelize, DataTypes) => {
   const User = sequelize.define( "user", {
        rut: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,

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
 }

