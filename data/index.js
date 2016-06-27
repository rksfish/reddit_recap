const fs         = require('fs');
const path       = require('path');
const file       = process.env.FILE;
const returnFile = process.env.NEWFILE
const filePath   = path.join(__dirname, file);
const encFormat  = process.env.ENCODE;

fs.readFile(filePath, encFormat, beautifyJson)

/**
 * Function callback, when data is read by the readFile function.
 * Parse the data by:
 * 		'author', 'selftext', 'preview', 'thumbnail', 'created_utc', 'title'
 *
 * @param  {[String]} err  [description]
 * @param  {[String:Json]} data [description]
 * No return. callback another function that writes the data
 * to a new file
 */
function beautifyJson(err, data) {
  console.log(err || 'no errors found');
  const convertedData = JSON.parse(data);
  const parseData = convertedData.data.children;
  const parsedJson = {};
  parsedJson.data = [];

  for (var i = 0; i < parseData.length; i++) {
    // creates a new post object to be stored in our parsedJson file
    const post = {};
    for (var key in parseData[i].data) {
      // Conditions
      switch (key) {
        case 'author':
            post.author = parseData[i].data[key];
          break;
        case 'selftext':
            post.body = parseData[i].data[key];
          break;
        case 'preview':
            post.images = parseData[i].data[key];
          break;
        case 'thumbnail':
            post.thumbnail = parseData[i].data[key];
          break;
        case 'created_utc':
            post.created = parseData[i].data[key];
          break;
        case 'title':
            post.title = parseData[i].data[key];
          break;
        default:
      }
    }
    parsedJson.data.push(post);
    // Status Indacator for largeFiles;
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write("percent parsed: " + (Math.floor((parsedJson.data.length/parseData.length) * 100)) + "%");
  }
  console.log('\nWriting data to new file: ' + returnFile);
  // Callback to write data when parsing is finished.
  writeData(JSON.stringify(parsedJson, null, 2), returnFile, encFormat);
}


/**
 * Callback for beautify function that will
 * @param  {[Object:JSON]} data  JSON valid object.
 * @param  {[type]} newFileName  FileName for data to be written to
 * @param  {[type]} format       Type of format for the writter.
 * No return;
 */
function writeData(data, newFileName, format) {
  // creates an absolute path for fs
  const newFilePath = path.join(__dirname, newFileName);
  fs.writeFile(newFilePath, data, format, (err) => {
    if (err){
      console.error("There was a problem writing to the file", err);
    };
    console.log("new file created: " + newFilePath);
  })
}

/*End of File*/
