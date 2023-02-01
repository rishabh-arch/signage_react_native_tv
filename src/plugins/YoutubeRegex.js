function yt(url) {
  
  const regExp =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((?:\w|-){11})(?:&list=(\S+))?$/;
    
  const regExp2 = /^.*?(?:v|list)=(.*?)(?:&|$)/;
    
  const mat = url.trim(" ").match(regExp);  
  if(mat == null){
  const newMat = url.trim(" ").match(regExp2);  
  return ["playlist", newMat[1]];
  }
  else if (mat[2] == undefined) {
    return ["video", mat[1]];
  } else {
    return ["playlist",mat[2]];
  }
}


export default yt;
