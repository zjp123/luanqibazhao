const fs = require('fs');

// 定义文件路径
const filePath = './js/big-file.js';

// 读取文件流
const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

// 定义变量用于存储文件内容
let data = '';

// 监听读取数据事件
readStream.on('data', (chunk) => {
  data += chunk;
});

// 监听读取完成事件
readStream.on('end', () => {
  // 将要追加的字符串
  const stringToAppend = 'Hello, world!';

  // 判断文件是否为空
  if (data.length === 0) {
    // 如果文件为空，直接写入字符串
    fs.writeFileSync(filePath, stringToAppend);
  } else {
    // 如果文件不为空，查找最后一行的换行符
    const lastNewLineIndex = data.lastIndexOf('\n');

    if (lastNewLineIndex === -1) {
      // 如果没有找到换行符，表示文件只有一行，直接写入字符串
      fs.writeFileSync(filePath, `${data}\n${stringToAppend}`);
    } else {
      // 如果找到了换行符，截取最后一行内容并追加字符串
    //   const lastLine = data.substring(lastNewLineIndex + 1);
    //   const newContent = `${lastLine}\n${stringToAppend}`;
    //   const updatedContent = data.substring(0, lastNewLineIndex + 1) + newContent;
        //  const lastLine = data.substring(lastNewLineIndex + 1);
        //  const newContent = `${lastLine}\n${stringToAppend}`;
         const updatedContent = data.substring(0, lastNewLineIndex) + `\n//${stringToAppend}`;

      // 将更新后的内容写入文件
      fs.writeFileSync(filePath, updatedContent);
    }
  }
});

// 监听错误事件
readStream.on('error', (err) => {
  console.error(err);
});
