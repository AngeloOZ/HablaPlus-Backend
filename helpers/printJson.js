const printToJson = (status = 404, message = "No found", data = null) => {
   const res = {
      status,
      message,
   }
   if (data) res.data = data;
   return res;
}

module.exports = {printToJson};