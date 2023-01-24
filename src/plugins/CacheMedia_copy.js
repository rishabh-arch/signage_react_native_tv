import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
const CacheMedia_copy = async (url, setProgress, next) => {
  // const FreeSpace = await FileSystem.getFreeDiskStorageAsync();
  // console.log("__________FreeSpace________", FreeSpace * 0.000001, "MB");
  // console.log("url ", url);
  const fileName = url.split("/").pop();

  const FileStatus = await AsyncStorage.getItem(fileName)
    .then((res) => res)
    .catch((err) => {
      console.log("err ", err);
    });

  if (FileStatus === "Cancel") {
    const deletePrevious = await FileSystem.deleteAsync(
      FileSystem.documentDirectory + fileName,
      { idempotent: true }
    );
  }

  const callback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setProgress(progress);
  };

  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    FileSystem.documentDirectory + fileName,
    {},
    callback
  );

  const fileInfo = await FileSystem.getInfoAsync(
    FileSystem.documentDirectory + fileName
  );

  const FileDownload = async () => {
    if (!fileInfo.exists) {
      try {
        const uri_set = await AsyncStorage.setItem(fileName, "Cancel")
          .then(async () => await downloadResumable.downloadAsync())
          .then(async (uri) => {
            await AsyncStorage.setItem(fileName, "Complete");
            return uri;
          })
          .then(async (uri) => {
            const memoryName = "TotalSavedMemory3";
            const TotalSavedMemory = await AsyncStorage.getItem(memoryName);
            if (TotalSavedMemory === null) {
              await AsyncStorage.setItem(memoryName, JSON.stringify([uri.uri]));
            } else {
              const TotalSavedMemoryInArray = await JSON.parse(
                TotalSavedMemory
              );
              TotalSavedMemoryInArray.push(uri.uri);
              await AsyncStorage.setItem(
                memoryName,
                JSON.stringify(TotalSavedMemoryInArray)
              );
            }

            return uri;
          })
          .then(async (uri) => {
            next(uri.uri);
          });
      } catch (e) {}
    } else {
      setProgress(1);
      next(fileInfo.uri);
    }
  };

  // FileDownload();
  // if (FreeSpace > megabytesToBytes(500)) {
  FileDownload();
  // } else {
  // cleanMemory();
  // }
};
const megabytesToBytes = (megabytes) => megabytes * 1000000.0;
const cleanMemory = async (totalClean,done) => {
  const memoryName = "TotalSavedMemory3";
  const TotalSavedMemory = await AsyncStorage.getItem(memoryName);
  console.log("TotalSavedMemory ", TotalSavedMemory);
  if (TotalSavedMemory !== null) {
    const TotalSavedMemoryInArray = await JSON.parse(TotalSavedMemory);
    const TotalSavedMemoryInArrayLength = TotalSavedMemoryInArray.length;
    console.log(
      "TotalSavedMemoryInArrayLength ",
      TotalSavedMemoryInArrayLength
    );
    for (let i = 0; i < TotalSavedMemoryInArrayLength; i++) {
      const deletePrevious = await FileSystem.deleteAsync(
        TotalSavedMemoryInArray[i],
        { idempotent: true }
      ).then(() => {
        const totalCleanPercentage =
          (i / (TotalSavedMemoryInArrayLength - 1)) * 100;
        totalClean(
          `Oops! You have filled your memory. Don't worry. We are cleaning it: ${totalCleanPercentage}% ${
            totalCleanPercentage !== 100
              ? "Please wait..."
              : "Done! Now Restart the app."
          }
          `
        );
        if (totalCleanPercentage === 100) {
          done();
        }
      });
    }
    await AsyncStorage.removeItem(memoryName);
  }
};
module.exports = { CacheMedia_copy, cleanMemory, megabytesToBytes };
