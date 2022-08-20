const { request, response } = require('express');
const errorsSequelize = require('../helpers/handleErrorsSequelize');
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
      return errorsSequelize(res, error);
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
      return errorsSequelize(res, error);
   }
}

const insertWord = async (req = request, res = response) => {
   try {
      const { id_category, description, icon } = req.body;
      const word = await WordModel.Insert({ id_category, description, icon });
      return res.status(201).json(printToJson(201, "success", word));
   } catch (error) {
      return errorsSequelize(res, error);
   }
}

const updateWord = async (req = request, res = response) => {
   try {
      const { id_word, id_category, description, icon } = req.body;
      const category = await WordModel.Update({ id_word, id_category, description, icon });
      return res.status(200).json(printToJson(200, "success", category));
   } catch (error) {
      return errorsSequelize(res, error);
   }
}

const deleteWord = async (req = request, res = response) => {
   try {
      const { id } = req.params;
      const word = await WordModel.ShowById(id);
      if (word) {
         await WordModel.Delete(id);
         return res.status(204).json(printToJson(204, "success"));
      }
      return res.status(404).json(printToJson(404, "Word no found with id " + id));
   } catch (error) {
      return errorsSequelize(res, error);
   }
}

module.exports = { getWords, getWordById, insertWord, updateWord, deleteWord }