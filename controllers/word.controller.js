const { request, response } = require('express');
const errorsSequelize = require('../helpers/handleErrorsSequelize');
const { printToJson } = require('../helpers/printJson');
const WordModel = require('../models/Word');
const { deleteFiles } = require('../helpers/deleteFiles');

const getWords = async (req = request, res = response) => {
   try {
      const words = await WordModel.Show();
      if (words.length != 0) {
         for (const word of words) {
            word.icon = `${process.env.URL_BASE}${word.icon}`;
            word.audio = `${process.env.URL_BASE}${word.audio}`;
         }
         return res.status(200).json(printToJson(200, "success", words));
      } else {
         return res.status(200).json(printToJson(200, "words no found", []));
      }
   } catch (error) {
      return errorsSequelize(res, error);
   }
}

const getWordById = async (req = request, res = response) => {
   try {
      const { id } = req.params;
      const word = await WordModel.ShowById(id);
      if (word) {
         word.pronunciation = word.description.replace('*', '<span>').replace('*', '</span>');
         word.icon = `${process.env.URL_BASE}${word.icon}`;
         word.audio = `${process.env.URL_BASE}${word.audio}`;
         return res.status(200).json(printToJson(200, "success", word));
      } else {
         return res.status(404).json(printToJson(404, "word no found"));
      }
   } catch (error) {
      return errorsSequelize(res, error);
   }
}

const getWordByIdUnique = async (req = request, res = response) => {
   try {
      const { id } = req.params;
      const currentWord = await WordModel.ShowByIdUnique(id);
      if (currentWord) {
         const words = await WordModel.ShowByCategory(currentWord.id_category);
         const wordsResult = {
            current: undefined,
            next: undefined,
         }

         for (let i = 0; i < words.length; i++) {
            const element = words[i];
            if (element.id_unique === id) {
               element.dataValues.pronunciation = element.description.replace('*', '<span>').replace('*', '</span>');
               wordsResult.current = element;
               wordsResult.next = words[i + 1];
               break;
            }
         }

         wordsResult.current.icon = `${process.env.URL_BASE}${wordsResult.current.icon}`;
         wordsResult.current.audio = `${process.env.URL_BASE}${wordsResult.current.audio}`;

         if(wordsResult.next){
            wordsResult.next.icon = `${process.env.URL_BASE}${wordsResult.next.icon}`;
            wordsResult.next.audio = `${process.env.URL_BASE}${wordsResult.next.audio}`;
         }

         return res.status(200).json(printToJson(200, "success", wordsResult));
      }
      return res.status(404).json(printToJson(404, `word no found with id: ${id}`));
   } catch (error) {
      console.log(error);
      return errorsSequelize(res, error);
   }
}

const insertWord = async (req = request, res = response) => {
   try {
      const { id_category, description, icon, audio } = req.body;
      const word = await WordModel.Insert({ id_category, description, icon, audio });
      return res.status(201).json(printToJson(201, "success", word));
   } catch (error) {
      return errorsSequelize(res, error);
   }
}

const updateWord = async (req = request, res = response) => {
   try {
      const { id_word, id_category, description, icon: iconAux, audio: audioAux } = req.body;
      
      const icon = iconAux.replace(process.env.URL_BASE, "");
      const audio = audioAux.replace(process.env.URL_BASE, "");

      const category = await WordModel.Update({ id_word, id_category, description, icon, audio });

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
         deleteFiles(word.audio);
         deleteFiles(word.icon);
         await WordModel.Delete(id);
         return res.status(204).json(printToJson(204, "success"));
      }
      return res.status(404).json(printToJson(404, "Word no found with id " + id));
   } catch (error) {
      return errorsSequelize(res, error);
   }
}

module.exports = { getWords, getWordById, getWordByIdUnique, insertWord, updateWord, deleteWord }