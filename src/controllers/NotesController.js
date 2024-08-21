const express = require('express');
const knex = require('../database/knex');

const app = express();

// Middleware para parsear o corpo da requisição em JSON
app.use(express.json());

class NotesController {
  async create(request, response) {
    try {
      const { title, description, tags, links } = request.body;
      const { user_id } = request.params; // Assuming user_id is received as a parameter

      // Inserir a nota
      const [noteId] = await knex('notes').insert({
        title,
        description,
        user_id,
      });

      // Inserir os links
      const linksInsert = links.map((link) => ({
        note_id: noteId,
        url: link,
      }));
      await knex('links').insert(linksInsert);

      // Inserir as tags (verifique a estrutura da tabela tags)
      const tagsInsert = tags.map((name) => ({
        note_id: noteId,
        name,
        // Adicione outros campos necessários na tabela tags, se houver
      }));
      await knex('tags').insert(tagsInsert);

      return response.status(201).json({ message: 'Nota criada com sucesso!' });
    } catch (error) {
      console.error('Erro ao criar nota:', error);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = NotesController;