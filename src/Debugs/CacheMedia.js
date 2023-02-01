// import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
const CacheMedia = async (url, setProgress,next) => {
    const fileName = url.split("/").pop();
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

  if (!fileInfo.exists) {
    console.log("Video isn't cached locally. Downloading...");
    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log("Finished downloading to ", uri);
      next(uri);
    } catch (e) {
      console.error(e);
    }
  } else {
    console.log("Video is cached locally. Skipping download.");
    setProgress(1);
    next(fileInfo.uri);
  }

//   const deletePrevious = FileSystem.deleteAsync(
//     FileSystem.documentDirectory + fileName,
//     { idempotent: true }
//   );

//   try {
//     await downloadResumable.pauseAsync();
//     console.log("Paused download operation, saving for future retrieval");
//     AsyncStorage.setItem(
//       "pausedDownload",
//       JSON.stringify(downloadResumable.savable())
//     );
//   } catch (e) {
//     console.error(e);
//   }

//   try {
//     const { uri } = await downloadResumable.resumeAsync();
//     console.log("Finished downloading to ", uri);
//   } catch (e) {
//     console.error(e);
//   }

  //To resume a download across app restarts, assuming the the DownloadResumable.savable() object was stored:

    // const downloadSnapshotJson = await AsyncStorage.getItem('pausedDownload');
    // const downloadSnapshot = JSON.parse(downloadSnapshotJson);
    // const downloadResumable = new FileSystem.DownloadResumable(
    //   downloadSnapshot.url,
    //   downloadSnapshot.fileUri,
    //   downloadSnapshot.options,
    //   callback,
    //   downloadSnapshot.resumeData
    // );

    // try {
    //   const { uri } = await downloadResumable.resumeAsync();
    //   console.log('Finished downloading to ', uri);
    // } catch (e) {
    //   console.error(e);
    // }
};

module.exports = CacheMedia;
