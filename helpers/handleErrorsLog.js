const fs = require('fs');
const pathLogger = __dirname + '/node.log.trycatch';
const writeLogger = (texto) => {
   try {
      if (fs.existsSync(pathLogger)) {
         fs.createWriteStream(pathLogger, { flags: 'a' })
      }
      const text = `*===========================================================*\n${Date.now}\n\n`;
      fs.appendFileSync(pathLogger, text);
      fs.appendFile(pathLogger, texto?.message | texto.toString(), (err) => {
         if (err) console.error('Error al escribir los logs')
      });
   } catch (error) {
      console.info(error)
      console.error('Error al escribir los logs')
   }
}

module.exports = writeLogger;