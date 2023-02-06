import fs from 'fs'

const saveFile = (file: Express.Multer.File): string => {
  if(!fs.existsSync('./static')) {
    fs.mkdirSync('./static')
  }
  
  if(file && file.mimetype.includes('image')) {
    const parts = file.originalname.split('.')
    const fileName = parts[0].split(' ').join('_') + '-' + Date.now() + '.' + parts[parts.length - 1]
    const targetPath = 'static/' + fileName
    fs.writeFileSync(targetPath, file.buffer)
  
    return fileName
  }

  return ''
}

const deleteFile = (fileName: string) => {
  if(!fs.existsSync('./static')) {
    fs.mkdirSync('./static')
  }

  if(fileName) {
    const targetPath = 'static/' + fileName
    if(fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath)
    }
  }
}

export default {
  saveFile, 
  deleteFile
}