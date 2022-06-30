const { app, colors } = require('./app');
const { db } = require('./utils/database.js');
const { User } = require('./models/user.model');
const { Task } = require('./models/task.model');

db.authenticate()
  .then(() => console.log('base de datos autenticados'.yellow))
  .catch(err => console.log(err));

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User);

db.sync()
  .then(() => console.log('base de datos sincronizada'.magenta))
  .catch(err => console.log(err));

const PORT = 5000;

app.listen(PORT, () => {
  console.log('el puerto esta funcionando'.cyan);
});
