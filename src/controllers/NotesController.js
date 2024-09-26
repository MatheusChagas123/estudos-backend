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
        user_id
        // Adicione outros campos necessários na tabela tags, se houver
      }));
      await knex('tags').insert(tagsInsert);

      return response.status(201).json({ message: 'Nota criada com sucesso!' });
    } catch (error) {
      console.error('Erro ao criar nota:', error);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async show (request,response){
    const {id} = request.params;
    const note = await knex('notes').where({id}).first();
    const tags = await knex("tags").where({note_id:id}).orderBy("name");
    const links = await knex("links").where({note_id:id}).orderBy("created_at");
    return response.json({...note,
      tags,
      links});
  }

  async delete (request,response){
    const {id} = request.params;
    await knex('notes').where({id}).delete();
    return response.json();
  }
  async index(request, response) {
    const { title, user_id, tags } = request.query

    let notes

    if (tags) {
      const filterTags = tags.split(',').map(tag => tag.trim())

      notes = await knex("tags")
        .select([
          "notes.id",
          "notes.title",
          "notes.user_id",
        ])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .orderBy("notes.title")
        
    } else {
      notes = await knex("notes")
      .where({ user_id })
      .whereLike("title", `%${title}%`)
      .orderBy("title")
    }

    const userTags = await knex("tags").where({ user_id })
    const notesWhithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags
      }
    });

    return response.json(notesWhithTags)
  }


  




}

module.exports = NotesController;