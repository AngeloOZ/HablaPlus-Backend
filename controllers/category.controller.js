const { request, response } = require('express');
const { deleteFiles } = require('../helpers/deleteFiles');
const { printToJson } = require('../helpers/printJson');
const CategoryModel = require('../models/Category');
const { ShowByCategory } = require('../models/Word');

const getCategories = async (req = request, res = response) => {
   try {
      const categories = await CategoryModel.Show();
      if (categories.length != 0) {
         for (const category of categories) {
            category.icon = `${process.env.URL_BASE}${category.icon}`;
            category.icon2 = `${process.env.URL_BASE}${category.icon2}`;
         }
         return res.status(200).json(printToJson(200, "success", categories));
      }
      else
         return res.status(200).json(printToJson(200, "categories no found", []));
   } catch (error) {
      console.error(error)
      return res.status(500).json(printToJson(500, error.message));
   }
}

const getCategoryById = async (req = request, res = response) => {
   try {
      const { id } = req.params;
      const category = await CategoryModel.ShowById(id);
      if (category) {
         category.icon = `${process.env.URL_BASE}${category.icon}`;
         category.icon2 = `${process.env.URL_BASE}${category.icon2}`;
         return res.status(200).json(printToJson(200, "success", category));
      } else {
         return res.status(404).json(printToJson(404, "category no found"));
      }
   } catch (error) {
      console.error(error)
      return res.status(500).json(printToJson(500, error.message));
   }
}

const getWordByCategory = async (req = request, res = response) => {
   try {
      const { id } = req.params;
      const { limit } = req.query;
      let words;
      if (limit) {
         words = await ShowByCategory(id, Number.parseInt(limit));
      } else {
         words = await ShowByCategory(id, undefined);
      }

      if (words?.length != 0) {
         for (const word of words) {
            word.icon = `${process.env.URL_BASE}${word.icon}`;
            word.audio = `${process.env.URL_BASE}${word.audio}`;
         }
         return res.status(200).json(printToJson(200, "success", words));
      } else {
         return res.status(200).json(printToJson(200, "there aren't words in the category", []));
      }
   } catch (error) {
      console.error(error)
      return res.status(500).json(printToJson(500, error.message));
   }
}

const insertCategory = async (req = request, res = response) => {
   try {
      const { description, icon, icon2 } = req.body;
      const category = await CategoryModel.Insert({ description, icon, icon2 });
      return res.status(200).json(printToJson(200, "success", category));
   } catch (error) {
      return res.status(500).json(printToJson(500, error.message));
   }
}

const updateCategory = async (req = request, res = response) => {
   try {
      const { description, icon: iconAux, icon2: iconAux2, id_category } = req.body;
      const icon = iconAux.replace(process.env.URL_BASE, "");
      const icon2 = iconAux2.replace(process.env.URL_BASE, "");
      const category = await CategoryModel.Update({ id_category, description, icon, icon2 });
      return res.status(200).json(printToJson(200, "success", category));
   } catch (error) {
      console.log(error.message)
      res.status(500).json(printToJson(500, error.message));
   }
}

const deleteCategory = async (req = request, res = response) => {
   try {
      const { id } = req.params;
      const category = await CategoryModel.ShowById(id);
      if (category) {
         deleteFiles(category.icon);
         await CategoryModel.Delete(id);
         return res.status(204).json(printToJson(200, "success"));
      }
      return res.status(404).json(printToJson(404, "Category no found with id " + id));
   } catch (error) {
      console.error(error)
      return res.status(500).json(printToJson(500, error.message));
   }
}

module.exports = { getCategories, getCategoryById, getWordByCategory, insertCategory, updateCategory, deleteCategory }