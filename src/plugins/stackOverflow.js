
const VideoPlayer = ({ wholeResult }) => {
  const focuspoint = React.useRef(null);
  const [index, setIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(false);

  React.useEffect(() => {
    if (wholeResult !== undefined) {
      setProgress(true);
    }
  }, []);

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onLongPress={() => {
          navigation.navigate("Home");
        }}
        delayLongPress={3000}
      >
        {progress &&
        wholeResult[index] !== "" &&
        wholeResult[index] !== undefined
          ? <Video
          ref={focuspoint}
          style={styles.video}
          source={{
            uri: wholeResult.length == 1 ? wholeResult[0] : wholeResult[index],
          }}
          useNativeControls={false}
          shouldPlay
          resizeMode="stretch"
          isLooping={wholeResult.length == 1 ? true : false}
          onError={(error) => 
            Alert(error)
          }
          onPlaybackStatusUpdate={(status) =>
            status?.didJustFinish == true
              ? setIndex((idx) => (idx == wholeResult.length - 1 ? 0 : idx + 1))
              : null
          }
        />
          : null}
      </TouchableOpacity>
    </View>
  );
};

export default VideoPlayer;
