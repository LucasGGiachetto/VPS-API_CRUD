const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost', // local onde o servidor ficará hospedado
    user: 'root', // seu usuário MySQL
    database: 'hoteis' // nome do banco de dados
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

// Criar vários clientes
app.post('/clientes', (req, res) => {
    const { nome, cpf, email, endereco, data_nascimento, data_cadastro } = req.body;
    const sql = 'INSERT INTO clientes (nome, cpf, email, endereco, data_nascimento, data_cadastro) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [nome, cpf, email, endereco, data_nascimento, data_cadastro], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ insertedId: result.insertId });
    });
});

// Listar clientes
app.get('/clientes', (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
});

// Atualizar cliente
app.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cpf, email, endereco, data_nascimento, data_cadastro } = req.body;
    const sql = 'UPDATE clientes SET nome = ?, cpf = ?, email = ?, endereco = ?, data_nascimento = ?, data_cadastro = ? WHERE cliente_id = ?';

    db.query(sql, [nome, cpf, email, endereco, data_nascimento, data_cadastro, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: `Cliente com ID ${id} atualizado com sucesso.` });
    });
});

// Deletar um cliente
app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM clientes WHERE cliente_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: `Cadastro do cliente com ID ${id} deletado com sucesso.` });
    });
});

// Criar telefone
app.post('/telefones', (req, res) => {
    const { cliente_id, numero, tipo } = req.body;
    const sql = 'INSERT INTO telefone (cliente_id, numero, tipo) VALUES (?, ?, ?)';
    db.query(sql, [cliente_id, numero, tipo], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ insertedId: result.insertId });
    });
});

// Listar telefones
app.get('/telefones', (req, res) => {
    db.query('SELECT * FROM telefone', (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
});

// Atualizar telefone
app.put('/telefones/:id', (req, res) => {
    const { id } = req.params;
    const { cliente_id, numero, tipo } = req.body;
    const sql = 'UPDATE telefone SET cliente_id = ?, numero = ?, tipo = ? WHERE telefone_id = ?';

    db.query(sql, [cliente_id, numero, tipo, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: `Telefone com ID ${id} atualizado com sucesso.` });
    });
});

// Deletar telefone
app.delete('/telefones/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM telefone WHERE telefone_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: `Telefone com ID ${id} deletado com sucesso.` });
    });
});

// Criar quarto
app.post('/quartos', (req, res) => {
    const { numero, andar, tipo, valor_diaria, statusQuarto, cliente_id } = req.body;
    const sql = 'INSERT INTO quartos (numero, andar, tipo, valor_diaria, statusQuarto, cliente_id) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [numero, andar, tipo, valor_diaria, statusQuarto, cliente_id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ insertedId: result.insertId });
    });
});

// Listar quartos
app.get('/quartos', (req, res) => {
    db.query('SELECT * FROM quartos', (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
});

// Atualizar quarto
app.put('/quartos/:id', (req, res) => {
    const { id } = req.params;
    const { numero, andar, tipo, valor_diaria, statusQuarto, cliente_id } = req.body;
    const sql = 'UPDATE quartos SET numero = ?, andar = ?, tipo = ?, valor_diaria = ?, statusQuarto = ?, cliente_id = ? WHERE quarto_id = ?';

    db.query(sql, [numero, andar, tipo, valor_diaria, statusQuarto, cliente_id, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: `Quarto com ID ${id} atualizado com sucesso.` });
    });
});

// Deletar quarto
app.delete('/quartos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM quartos WHERE quarto_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: `Quarto com ID ${id} deletado com sucesso.` });
    });
});

// Criar reserva
app.post('/reservas', (req, res) => {
    const { cliente_id, quarto_id, data_reserva, data_entrada, data_saida, valor_total, statusReserva } = req.body;
    const sql = 'INSERT INTO reservas (cliente_id, quarto_id, data_reserva, data_entrada, data_saida, valor_total, statusReserva) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [cliente_id, quarto_id, data_reserva, data_entrada, data_saida, valor_total, statusReserva], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ insertedId: result.insertId });
    });
});

// Listar reservas
app.get('/reservas', (req, res) => {
    db.query('SELECT * FROM reservas', (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
});

// Atualizar reserva
app.put('/reservas/:id', (req, res) => {
    const { id } = req.params;
    const { cliente_id, quarto_id, data_reserva, data_entrada, data_saida, valor_total, statusReserva } = req.body;
    const sql = 'UPDATE reservas SET cliente_id = ?, quarto_id = ?, data_reserva = ?, data_entrada = ?, data_saida = ?, valor_total = ?, statusReserva = ? WHERE reserva_id = ?';

    db.query(sql, [cliente_id, quarto_id, data_reserva, data_entrada, data_saida, valor_total, statusReserva, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: `Reserva com ID ${id} atualizada com sucesso.` });
    });
});

// Deletar reserva
app.delete('/reservas/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM reservas WHERE reserva_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: `Reserva com ID ${id} deletada com sucesso.` });
    });
});

// Criar estacionamento
app.post('/estacionamento', (req, res) => {
    const { cliente_id, veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida } = req.body;
    const sql = 'INSERT INTO estacionamento (cliente_id, veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [cliente_id, veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ insertedId: result.insertId });
    });
});

// Listar estacionamentos
app.get('/estacionamento', (req, res) => {
    db.query('SELECT * FROM estacionamento', (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
});

// Atualizar estacionamento
app.put('/estacionamento/:id', (req, res) => {
    const { id } = req.params;
    const { numero_vaga, cliente_id, status } = req.body;
    const sql = 'UPDATE estacionamento SET numero_vaga = ?, cliente_id = ?, status = ? WHERE estacionamento_id = ?';

    db.query(sql, [numero_vaga, cliente_id, status, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: `Estacionamento com ID ${id} atualizado com sucesso.` });
    });
});

// Deletar estacionamento
app.delete('/estacionamento/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM estacionamento WHERE estacionamento_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: `Estacionamento com ID ${id} deletado com sucesso.` });
    });
});


app.listen(port, () => {
    console.log(`API rodando no http://localhost:${port}`);
});
