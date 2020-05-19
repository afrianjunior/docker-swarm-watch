export default function (name) {
  let newName = ''
  const splitter = new RegExp(/([_-])/, 'g')
  const relativeName = name
    .replace(splitter, ' ')
    .split(' ')
    .splice(1, 2)
  
  relativeName.map(word => {
    newName += word.charAt(0).toUpperCase()
  })
  return newName
}