import './App.css'
import React from 'react'
import SearchBar from './SearchBar'
import youtube from '../apis/youtube'
import VideoList from './VideoList'
import VideoDetail from './VideoDetails'


const KEY = 'AIzaSyA49wADOJnFSxGf8T_kEDJM6ZUONBv7MZ8'

class App extends React.Component{

    state = {videos: [], selectedVideo : null}


    componentDidMount() {
        this.onTermSubmit('nature');
    }

    onTermSubmit = async (term) => {
        const response = await youtube.get('/search', {
            params: {
                q: term,
                part: 'snippet',
                type: 'video',
                maxResults: 10,
                key: KEY
            }
        })

        this.setState({ videos : response.data.items, selectedVideo: response.data.items[0] })
    } 

    onvideoSelect = (video) => {
        this.setState({ selectedVideo: video})
    }

    render(){
        return (
            <div className="main-section">
            <SearchBar onSubmit={this.onTermSubmit}/>
            <div className="ui grid">
                <div className="ui row">
                    <div className="eleven wide column">
                        <VideoDetail video={this.state.selectedVideo} />
                    </div>
                    
                    <div className="five wide column">
                        <VideoList onvideoSelect={this.onvideoSelect} videos={this.state.videos}/>
                    </div>
                    
                </div>
            </div>
            </div>
        )
    }
}

export default App;