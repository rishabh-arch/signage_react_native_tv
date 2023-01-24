function yt(url) {
  const regExp =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((?:\w|-){11})(?:&list=(\S+))?$/;

  const mat = url.trim(" ").match(regExp);  
  if (mat[2] == undefined) {
    return ["video", mat[1]];
  } else {
    return ["playlist", mat[1], mat[2]];
  }
}

export default yt;
