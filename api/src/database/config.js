require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

class Database {
    constructor() {
        const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, URL, NODE_ENV } = process.env;

        this.sequelize = this._initializeSequelizeConnection(NODE_ENV, {
            DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, URL
        });

        this.models = this._loadModels();
        this._setupAssociations();
    }

    _initializeSequelizeConnection(env, credentials) {
        if (env === 'production') {
            return new Sequelize({
                database: credentials.DB_NAME,
                dialect: 'postgres',
                host: credentials.DB_HOST,
                port: 5432,
                username: credentials.DB_USER,
                password: credentials.DB_PASSWORD,
                pool: {
                    max: 3,
                    min: 1,
                    idle: 10000,
                },
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false,
                    },
                    keepAlive: true,
                },
                ssl: true,
            });
        } else {
            return new Sequelize(
                `postgres://${credentials.DB_USER}:${credentials.DB_PASSWORD}@${credentials.DB_HOST}/${credentials.DB_NAME}`,
                { logging: false, native: false }
            );
        }
    }

    _loadModels() {
        const basename = path.basename(__filename);
        const modelDefiners = [];

        fs.readdirSync(path.join(__dirname, "../models"))
            .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
            .forEach(file => {
                modelDefiners.push(require(path.join(__dirname, "../models", file)));
            });

        // Inyectar conexión y capitalizar nombres
        modelDefiners.forEach(model => model(this.sequelize));
        const entries = Object.entries(this.sequelize.models);
        const capsEntries = entries.map(([name, model]) => [
            name[0].toUpperCase() + name.slice(1),
            model
        ]);

        return Object.fromEntries(capsEntries);
    }

    _setupAssociations() {
        // Definir relaciones entre modelos
        if (this.models.Pokemon && this.models.Type) {
            this.models.Pokemon.belongsToMany(this.models.Type, { through: "Pokemon_Type" });
            this.models.Type.belongsToMany(this.models.Pokemon, { through: "Pokemon_Type" });
        }
    }

    async authenticate() {
        try {
            await this.sequelize.authenticate();
            console.log('Conexión a la base de datos establecida correctamente');
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            throw error;
        }
    }

    async sync(options = { alter: true }) {
        try {
            await this.sequelize.sync(options);
            console.log('Modelos sincronizados correctamente');
        } catch (error) {
            console.error('Error al sincronizar modelos:', error);
            throw error;
        }
    }
}

// Singleton para evitar múltiples instancias
const databaseInstance = new Database();

module.exports = {
    ...databaseInstance.models,
    conn: databaseInstance.sequelize,
    database: databaseInstance // Para acceso a métodos de la clase
};