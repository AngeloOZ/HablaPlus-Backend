const { request, response } = require('express');
const { printToJson } = require('../helpers/printJson');
const Videos = require('../models/Videos');

const getVideos = async (req = request, res = response) => {
   try {
      const videos = await Videos.Show();
      return res.status(200).json(printToJson(200, "success", videos));
   } catch (error) {
      console.error(error)
      return res.status(500).json(printToJson(500, error.message));
   }
}

const getVideoById = async (req = request, res = response) => {
   try {
      const { id } = req.params;
      const video = await Videos.ShowById(id);
      if (video) {
         return res.status(200).json(printToJson(200, "success", video));
      } else {
         return res.status(404).json(printToJson(404, "video no found"));
      }
   } catch (error) {
      console.error(error)
      return res.status(500).json(printToJson(500, error.message));
   }
}

const getVideoByUnique = async (req = request, res = response) => {
   try {
      const { id } = req.params;
      const video = await Videos.ShowByIdUnique(id);
      if (video) {
         return res.status(200).json(printToJson(200, "success", video));
      } else {
         return res.status(404).json(printToJson(404, "video no found"));
      }
   } catch (error) {
      console.error(error)
      return res.status(500).json(printToJson(500, error.message));
   }
}

const insertVideo = async (req = request, res = response) => {
   try {
      const { description, link } = req.body;
      const iFrameVideo = link.replace('width="560"', "").replace('height="315"', "");
      const video = await Videos.Insert({ description, link: iFrameVideo });
      return res.status(200).json(printToJson(200, "success", video));
   } catch (error) {
      console.log(error.message)
      return res.status(500).json(printToJson(500, error.message));
   }
}

const updateVideo = async (req = request, res = response) => {
   try {
      const { description, link, id_video } = req.body;
      const iFrameVideo = link.replace('width="560"', "").replace('height="315"', "");
      const video = await Videos.Update({ id_video, description, link: iFrameVideo });
      return res.status(200).json(printToJson(200, "success", video));
   } catch (error) {
      console.log(error.message)
      res.status(500).json(printToJson(500, error.message));
   }
}

const deleteVideo = async (req = request, res = response) => {
   try {
      const { id } = req.params;
      const video = await Videos.ShowById(id);
      if (video) {
         await Videos.Delete(id);
         return res.status(204).json(printToJson(204, "success"));
      }
      return res.status(404).json(printToJson(404, "Video no found with id " + id));
   } catch (error) {
      console.error(error)
      return res.status(500).json(printToJson(500, error.message));
   }
}


module.exports = { getVideos, getVideoById, getVideoByUnique, insertVideo, updateVideo, deleteVideo };