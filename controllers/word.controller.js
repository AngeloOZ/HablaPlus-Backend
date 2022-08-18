const { request, response } = require('express');
const { printToJson } = require('../helpers/printJson');
const WordModel = require('../models/Word');

const getWords = async (req = request, res = response) => {
   try {
      const words = await WordModel.Show();
      if (words.length != 0)
         return res.status(200).json(printToJson(200, "success", words));
      else
         return res.status(200).json(printToJson(200, "words no found", []));
   } catch (error) {
      console.error(error)
      return res.status(500).json(printToJson(500, error.message));
   }
}

const getWordById = async (req = request, res = response) => {
   try {
      const { id } = req.params;
      const word = await WordModel.ShowById(id);
      if (word) {
         return res.status(200).json(printToJson(200, "success", word));
      } else {
         return res.status(404).json(printToJson(404, "word no found"));
      }
   } catch (error) {
      console.error(error)
      return res.status(500).json(printToJson(500, error.message));
   }
}

const insertWord = async (req = request, res = response) => {
   try {
      const { id_category, description, icon } = req.body;
      const word = await WordModel.Insert({ id_category, description, icon });
      return res.status(200).json(printToJson(200, "success", word));
   } catch (error) {
      return res.status(500).json(printToJson(500, error.message));
   }
}

const updateWord = async (req = request, res = response) => {
   try {
      const { id_word, id_category, description, icon } = req.body;
      const category = await WordModel.Update({ id_word, id_category, description, icon });
      return res.status(200).json(printToJson(200, "success", category));
   } catch (error) {
      console.log(error.message)
      res.status(500).json(printToJson(500, error.message));
   }
}

const deleteWord = async (req = request, res = response) => {
   try {
      const { id } = req.params;
      await WordModel.Delete(id);
      return res.status(204).json(printToJson(200, "success"));
   } catch (error) {
      console.error(error)
      return res.status(500).json(printToJson(500, error.message));
   }
}

module.exports = { getWords, getWordById, insertWord, updateWord, deleteWord }