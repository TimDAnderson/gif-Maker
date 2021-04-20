var GifListEntry = (props) => {
  return (
    <div>
      <img className="leftImage gifImage" src={props.gif[0]} />
      <img className="middleImage gifImage" src={props.gif[1]} />
      <img className="rightImage gifImage" src={props.gif[2]} />
    </div>
  )
}

export default GifListEntry