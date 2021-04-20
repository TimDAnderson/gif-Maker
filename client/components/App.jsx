import GifList from './gifList.jsx';

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      selectedFile: null,
      gifArray: []
    }
  }

  onChangeHandler(event) {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  myClicker() {
    const data = new FormData()
    data.append('file', this.state.selectedFile)

    var options = {
      method: 'POST',
      body: data
    }

    fetch('http://localhost:3000/vidUpload', options)
      .then(response => {
        response.json().then(data =>{
          let linkArray = [];
          for (let i = 0; i < data.length; i++) {
            linkArray.unshift(data[i]['publicLink'])
          }
          this.setState({
            gifArray: linkArray
          })
        })
      })
  }

  componentDidMount() {
    fetch('http://localhost:3000/vidUpload')
      .then(response => {
        response.json().then(data => {
          let linkArray = [];
          for (let i = 0; i < data.length; i++) {
            linkArray.unshift(data[i]['publicLink'])
          }
          this.setState({
            gifArray: linkArray
          })
        })
    })
  }

  render(){
    return (
      <div className="App">
        <h1> .gif file maker! </h1>
        <h2>- Uses ffmpeg to convert any video file to a .gif</h2>
        <h2>- .gif files are stored in a AWS S3 Bucket</h2>
        <h2>- The public links pointing to the .gif's are persisted on a MySQL DB</h2>
        <h2>- Please inspect the HTML img tags below</h2>
        <div id="inputBar">
          <input type="file" name="file" onChange={this.onChangeHandler.bind(this)}/>
          <button type="button" className="btn btn-success btn-block" onClick={this.myClicker.bind(this)}>Upload</button>
        </div>
        <div className="displayGifs">
          <GifList gifs={this.state.gifArray}/>
        </div>
      </div>
    );
  }
}

export default App;