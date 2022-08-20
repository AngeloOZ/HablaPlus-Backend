const { request, response } = require('express');
const { printToJson } = require('../helpers/printJson');
const { Word_learned } = require('../models/Word_learned');


const registerWordLearned = async (req = request, res = response) => {
   try {
      const { id_user, id_word } = req.body;
      await Word_learned.create({ id_user, id_word });
      res.status(200).json(printToJson(200, 'success'));
   } catch (error) {
      res.status(500).json(printToJson(500, error.message, error));
   }
}

const deleteWordLearned = async (req = request, res = response) => {
   try {

   } catch (error) {

   }
}

const getWordsLearnedByUser = async (req = request, res = response) => {

}

module.exports = { registerWordLearned }