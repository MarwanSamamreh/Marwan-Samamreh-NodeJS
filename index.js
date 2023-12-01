const fs = require("fs/promises");

async function countWords(filePath) {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const words = fileContent.split(/\s+/).filter((word) => word !== "");
    return words.length;
  } catch (error) {
    if (error.code === "ENOENT") {
      //ENOENT = error no Entry for files that doesn't exist
      console.error(`File not found: ${filePath}`);
    } else {
      console.error(`Error reading file ${filePath}: ${error.message}`);
    }
    return 0; // Return 0 words for error
  }
}

async function readFiles() {
  try {
    const configFile = await fs.readFile("config.json", "utf-8");
    const config = JSON.parse(configFile);

    for (const filePath of config.files) {
      const fileName = filePath.split("/").pop();
      const wordCount = await countWords(filePath);
      console.log(`${fileName}: ${wordCount} words`);
    }
  } catch (error) {
    console.error(`Error reading config file: ${error.message}`);
  }
}

readFiles();
