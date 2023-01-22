import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
const CacheMedia_copy = async (url, setProgress, next) => {
  // console.log("url ", url);
  const fileName = url.split("/").pop();

  const FileStatus = await AsyncStorage.getItem(fileName)
  .then((res) => res)
  .catch((err) => {
    console.log("err ", err);
  });


  // console.log("FileStatus ", FileStatus);
  if (FileStatus === "Cancel") {
  const deletePrevious =  await FileSystem.deleteAsync(
      FileSystem.documentDirectory + fileName,
      { idempotent: true }
    );
    // console.log("deletePrevious ", deletePrevious);
  }

  const callback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setProgress(progress);
  };

  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    FileSystem.documentDirectory + fileName ,
    {},
    callback
  );

  const fileInfo = await FileSystem.getInfoAsync(
    FileSystem.documentDirectory + fileName
  );

  if (!fileInfo.exists) {
    // console.log("file is not exist ", fileInfo);
    try {
     const {uri} = await AsyncStorage.setItem(fileName, "Cancel")
        .then(async () => await downloadResumable.downloadAsync())
        // const { uri } = await downloadResumable.downloadAsync()
        .then(async (uri) => {
          await AsyncStorage.setItem(fileName, "Complete");
          return uri;
        })
        .then(async (uri) => {
          // console.log("__________URI________", uri.uri);
          next(uri.uri);
        });
    } catch (e) {
      console.error(e);
    }
  } else {
    // console.log("Video is cached locally. Skipping download.");
    setProgress(1);
    next(fileInfo.uri);
  }
};

module.exports = CacheMedia_copy;
