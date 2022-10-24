const { request, response } = require('express');
const { printToJson } = require('../helpers/printJson');
const { Word } = require('../models/Word');
const { Word_learned } = require('../models/Word_learned');
const { Sentence } = require("../models/Sentence");
const { renewSentenceUrl } = require('./seentences.controller');

async function getSentenceByIdWord(word) {
   const current = word.dataValues;
   const query = await Sentence.findOne({ where: { pictograma_one: current.id_word } });
   let sentence = undefined;
   if (query?.dataValues) {
      sentence = await renewSentenceUrl(query);
      sentence.pictograma_one = sentence.pictograma_one.url
      sentence.pictograma_two = sentence.pictograma_two.url
      delete sentence.word_name;
   }
   return sentence;
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
      const { id } = req.params;
      const wordsAll = await Word_learned.findAll({
         where: {
            id_user: id
         },
      });
      let resultWordsLearned = [];

      for (const word of wordsAll) {
         const curr = await getSentenceByIdWord(word);
         if(curr){
            resultWordsLearned = [...resultWordsLearned, curr];
         }
      }
      
      res.status(200).json(printToJson(200, 'succes', resultWordsLearned));
   } catch (error) {
      return res.status(500).json(printToJson(500, error.message));
   }
}

const getWordsByUser = async (req = request, res = response) => {
   const { id } = req.params;
   const wordsAll = await Word_learned.findAll({
      where: {
         id_user: id
      },
   });

   let resultWordsLearned = [];

   for (const word of wordsAll) {
      resultWordsLearned = [...resultWordsLearned, word.id_word];
   }

   res.status(200).json(resultWordsLearned);
}

module.exports = { registerWordLearned, getWordsLearnedByUser, getWordsByUser }