import GifListEntry from './gifListEntry.jsx';

var GifList = (props) => {

  let threeWideArray = []
  let remainder = props.gifs.length % 3
  let roundNumber = props.gifs.length - remainder
  for (let j = 0; j < roundNumber; j+=3) {
    threeWideArray.push([props.gifs[j], props.gifs[j+1], props.gifs[j+2]])
  }

  return (
    <div className="gif-list">
      {threeWideArray.map(gif =>
        <GifListEntry gif={gif} key={gif}/>
      )}
    </div>
  )
}

export default GifList