import sequelize from './db/db.config';
import App from './server';
import * as http from 'http';

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(App);

sequelize.authenticate().then(() => {
    console.log("Database connected...");
})

httpServer.listen(PORT, () => {
    console.log(`Server started at ${PORT}...`)
});
