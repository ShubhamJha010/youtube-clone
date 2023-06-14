import _ from 'lodash';
import React , {Component} from 'react';
import  ReactDOM  from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VidList from './components/video_list';
import VidDetail from './components/video_detail';
const API_key = 'AIzaSyAG6cp80ZzLm0eVgpfmWx4D1tlPWyC8Dos';

//create  a new component,This component 
//should produce some html
//=> is used for function
class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('surfboards')
    }
    videoSearch(term) {
        YTSearch({key: API_key, term:term},(videos)=>{
            this.setState({
                videos:videos,
                selectedVideo: videos[0]
            });
            
        })
    }
    render(){
        const videoSearch = _.debounce((term) =>{this.videoSearch(term) },300)
    return(
        <div>
            <SearchBar onSearchTermChange ={videoSearch} />
            <VidDetail video = {this.state.selectedVideo}/>
            <VidList
                onVideoSelect = {selectedVideo => this.setState({selectedVideo})} 
                videos= {this.state.videos} />  {/*passing props*/}
        </div>
    );
    }
}

//take this compononet's generated HTML and put it
//on the page(in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));//creates an instance 