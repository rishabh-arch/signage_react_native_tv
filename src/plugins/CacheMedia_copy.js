import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
const CacheMedia_copy = async (url, setProgress, next) => {
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
  FileDownload();
};
const megabytesToBytes = (megabytes) => megabytes * 1000000.0;
const cleanMemory = async (totalClean) => {
  const memoryName = "TotalSavedMemory3";
  const TotalSavedMemory = await AsyncStorage.getItem(memoryName);
  if (TotalSavedMemory !== null) {
    const TotalSavedMemoryInArray = await JSON.parse(TotalSavedMemory);
    const TotalSavedMemoryInArrayLength = TotalSavedMemoryInArray.length;
    for (let i = 0; i < TotalSavedMemoryInArrayLength; i++) {
      const deletePrevious = await FileSystem.deleteAsync(
        TotalSavedMemoryInArray[i],
        { idempotent: true }
      ).then(() => {
        const totalCleanPercentage =
          (i / (TotalSavedMemoryInArrayLength - 1)) * 100;
        totalClean(
          `Oops! You have filled your memory. Don't worry. We are cleaning it: ${totalCleanPercentage.toFixed(0)}% ${
            totalCleanPercentage !== 100
              ? "Please wait..."
              : "Done! Now Restart the app."
          }
          `
        );
        if (totalCleanPercentage === 100) {
          totalClean(
            `ALL CLEANED!.
            `
          );
        }
      });
    }
    await AsyncStorage.removeItem(memoryName);
  }
  else{
    totalClean("All Cleaned")
  }
};
module.exports = { CacheMedia_copy, cleanMemory, megabytesToBytes };
