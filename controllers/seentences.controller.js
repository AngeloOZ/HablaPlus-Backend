const { request, response } = require('express');
const { printToJson } = require('../helpers/printJson');
const SentenceModel = require('../models/Sentence');
const wordlModel = require('../models/Word');

/**
* @typedef {Object} ISentenceBase
* @property {Number} [id_sentence] El Id de la oración
* @property {String} id_unique El Id de la oración unica uuid
* @property {String} sentence Esta es la oracion
* @property {Number} pictograma_one Id de referencia de la imagén de una palabra (Pictograma correcto) 
* @property {Number} pictograma_two Id de referencia de la imagén de una palabra (Pictograma incorrecto)
*/

/**
* @typedef {Object} IPictograma
* @property {Number} id_word El Id de la palabra
* @property {String} url Url de la imagen
*/

/**
* @typedef {Object} ISentenceRenovado
* @property {Number} [id_sentence] El Id de la oración
* @property {String} id_unique El Id de la oración unica uuid
* @property {String} sentence Esta es la oracion
* @property {IPictograma} pictograma_one Id de referencia de la imagén de una palabra (Pictograma correcto) 
* @property {IPictograma} pictograma_two Id de referencia de la imagén de una palabra (Pictograma incorrecto)
*/


/**
 * Funcion que permite renovar el objeto oracion con la url de los pictogramas
 * @param {ISentenceBase} sentence Objeto sentence base
 * @returns {ISentenceRenovado} retorna un objeto sentence renovado
 */
async function renewSentenceUrl(sentence) {
   const current = (sentence.dataValues) ? sentence.dataValues : sentence;
   const word1 = await wordlModel.ShowById(current.pictograma_one);
   const word2 = await wordlModel.ShowById(current.pictograma_two);

   const newSentence = {
      ...current,
      word_name: word1.description.replaceAll("*",""),
      pictograma_one: {
         id_word: word1.id_word,
         id_category: word1.id_category,
         url: word1.icon
      },
      pictograma_two: {
         id_word: word2.id_word,
         id_category: word2.id_category,
         url: word2.icon
      }
   }
   return newSentence
}

const getAllSentences = async (req = request, res = response) => {
   try {
      const sentences = await SentenceModel.Show();
      let newSentences = [];
      for (const sentence of sentences) {
         newSentences = [...newSentences, await renewSentenceUrl(sentence)];
      }
      return res.status(200).json(printToJson(200, "success", newSentences));
   } catch (error) {
      console.error(error)
      return res.status(500).json(printToJson(500, error.message));
   }
}

const getSentenceByIdUnique = async (req = request, res = response) => {
   try {
      const { id } = req.params;
      const request = await SentenceModel.ShowByIdUnique(id);
      return res.status(200).json(printToJson(200, "success", await renewSentenceUrl(request)));
   } catch (error) {
      console.error(error)
      return res.status(500).json(printToJson(500, error.message));
   }
}

const getSentenceById = async (req = request, res = response) => {
   try {
      const { id } = req.params;
      const request = await SentenceModel.ShowById(id);
      return res.status(200).json(printToJson(200, "success", await renewSentenceUrl(request)));
   } catch (error) {
      console.error(error)
      return res.status(500).json(printToJson(500, error.message));
   }
}


const registerSencences = async (req = request, res = response) => {
   try {
      const { sentence, pictograma_one, pictograma_two } = req.body;
      const sentenceInseted = await SentenceModel.Insert({ sentence, pictograma_one, pictograma_two });
      return res.status(200).json(printToJson(200, "success", sentenceInseted));
   } catch (error) {
      console.log(error.message)
      return res.status(500).json(printToJson(500, error.message));
   }
}

const updateSencences = async (req = request, res = response) => {
   try {
      const { id_sentence, sentence, pictograma_one, pictograma_two } = req.body;

      const sentenceUpdated = await SentenceModel.Update({
         id_sentence,
         sentence,
         pictograma_one,
         pictograma_two
      });

      return res.status(200).json(printToJson(200, "success", sentenceUpdated));
   } catch (error) {
      console.log(error.message)
      return res.status(500).json(printToJson(500, error.message));
   }
}

const deleteSentence = async (req = request, res = response) => {
   try {
      const { id } = req.params;
      const sentence = await SentenceModel.ShowById(id);
      if (sentence) {
         await SentenceModel.Delete(id);
         return res.status(204).json(printToJson(204, "success"));
      }
      return res.status(404).json(printToJson(404, "Sentence no found with id " + id));
   } catch (error) {
      console.error(error)
      return res.status(500).json(printToJson(500, error.message));
   }
}

module.exports = { getAllSentences, getSentenceByIdUnique, getSentenceById, registerSencences, updateSencences, deleteSentence, renewSentenceUrl }