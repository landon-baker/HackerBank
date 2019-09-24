const db = require('./config');

const userMethods = {
  addUser: async ({ name, password, balance }) => {
    try {
      await db.query(
        `INSERT INTO users (username, password, balance) VALUES ($1, $2, $3)`,
        [name, password, balance]
      );
      const query = userMethods.findUser({ name });
      return query;
    } catch (err) {
      return err;
    }
  },

  findUser: async ({ name }) => {
    try {
      const query = await db.query(`SELECT * FROM users WHERE username = $1`, [
        name
      ]);
      return query.rows;
    } catch (err) {
      return err;
    }
  },

  removeOrAddMoney: async ({ type, name, amount }) => {
    const params = [name, amount];
    try {
      const query = await db.query(
        `UPDATE users SET balance = balance ${
          type === 'Withdrawal' ? '-' : '+'
        } $2 WHERE username = $1`,
        params
      );
      return query.rows;
    } catch (err) {
      return err;
    }
  }
};

const txMethods = {
  withdrawalOrDeposit: async ({ type, name, amount }) => {
    const params = [name, amount];
    try {
      userMethods.removeOrAddMoney({ type, name, amount });
      const query = db.query(
        `INSERT INTO transactions (txtype, userid, amount) VALUES ($1, (SELECT id FROM users WHERE username = $2), $3)`,
        [type, ...params]
      );
    } catch (err) {
      return err;
    }
  }
};

module.exports = { userMethods, txMethods };
