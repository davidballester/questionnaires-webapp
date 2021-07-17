const fs = require('fs')
const path = require('path')

importQuestionnaires()

function importQuestionnaires() {
  const questionnaires = readQuestionnaires()
  createIndexFile(questionnaires)
}

function readQuestionnaires() {
  const questionnairesPath = path.join(
    __dirname,
    '../../questionnaires-processor/data/out'
  )
  return readFilesInFolder(questionnairesPath).filter(isJson).map(readContent)
}

function readFilesInFolder(folderPath) {
  const joinFolderPathAndFile = (f) => path.join(folderPath, f)
  return fs.readdirSync(folderPath).map(joinFolderPathAndFile)
}

function isJson(filePath) {
  return path.extname(filePath) === '.json'
}

function readContent(filePath) {
  return {
    name: getFileName(filePath),
    content: JSON.parse(fs.readFileSync(filePath, 'utf-8')),
  }
}

function getFileName(filePath) {
  return path.basename(filePath, path.extname(filePath))
}

function createIndexFile(questionnaires) {
  const filePath = path.join(__dirname, '../src/questionnaires', 'index.js')
  fs.writeFileSync(filePath, composeIndexFile(questionnaires), {
    encoding: 'utf-8',
  })
}

function composeIndexFile(questionnaires) {
  return `export const questionnaires = ${JSON.stringify(questionnaires)}`
}
