const { request, response } = require('express');
const { printToJson } = require('../helpers/printJson');
const { Word } = require('../models/Word');
const { Word_learned } = require('../models/Word_learned');
const { Sentence } = require("../models/Sentence");

async function getSentenceByIdWord(id_sentence) {
   const query = await Sentence.findOne({
      where: { id_sentence },
      include: [{ model: Word }, { model: Word }]
   });
   if (query?.dataValues) {
      const query2 = await Word.findOne({ where: { id_word: query.dataValues.pictograma_one } });
      query.pictograma_one = {
         url: `${process.env.URL_BASE}${query2.dataValues.icon}`,
         is_correct: true
      }
      query.pictograma_two = {
         url: `${process.env.URL_BASE}${query.dataValues.WORD.icon}`,
         is_correct: false
      };
      delete query.dataValues.WORD;
   }
   return query;
}

const registerWordLearned = async (req = request, res = response) => {
   try {
      const { id_user, id_word } = req.body;
      await Word_learned.create({ id_user, id_word });
      res.status(200).json(printToJson(200, 'success'));
   } catch (error) {
      res.status(500).json(printToJson(500, error.message, error));
   }
}

const getWordsLearnedByUser = async (req = request, res = response) => {
   try {
      const id = req.currentToken.id_user;
      const wordsAll = await Word_learned.findAll({
         where: {
            id_user: id,
         }
      });
      const query1 = await Sentence.findAll({ attributes: ['pictograma_one', 'id_sentence'] });
      const listSentences = query1.map(sen => sen.dataValues);

      let resultWordsLearned = [];
      for (const word of wordsAll) {
         const current = listSentences.find(sen => sen.pictograma_one == word.dataValues.id_word)
         if (current) {
            const curr = await getSentenceByIdWord(current.id_sentence);
            resultWordsLearned = [...resultWordsLearned, curr];
         }
      }
      res.status(200).json(printToJson(200, 'succes', resultWordsLearned));
   } catch (error) {
      return res.status(500).json(printToJson(500, error.message));
   }
}

const getWordsByUser = async (req = request, res = response) => {
   const id = req.currentToken.id_user;
   const wordsAll = await Word_learned.findAll({
      where: {
         id_user: id
      },
   });
   console.log(wordsAll)
   let resultWordsLearned = [];

   for (const word of wordsAll) {
      resultWordsLearned = [...resultWordsLearned, word.id_word];
   }

   res.status(200).json(resultWordsLearned);
}

module.exports = { registerWordLearned, getWordsLearnedByUser, getWordsByUser }