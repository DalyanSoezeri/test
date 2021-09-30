const express = require('express');
const route = express.Router();
const app = express();

const photo = "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixid=MXwyMDkyMnwwfDF8c2VhcmNofDI2NXx8cHJvZmVzc2lvbmFsfGVufDB8fHw&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=600&h=400&fit=crop";


route.get('/gotocontact', async (req, res) => {
    res.render('blog');
})

route.get('/gotobokkmarks', async (req, res) => {
    res.render('bookmarks');
})

route.post('/searchfor', async (req, res) => {
    //console.log(req.body)
   if(req.body.som==="Show"){
    const data = await getseries(req.body.searchseries)
    console.log(data[0].show._links);
    var genre = "";

    data[0].show.genres.forEach(element => {
        genre+=", "+element;
    });
    genre=genre.substring(2,genre.length)

    var pEp, nEp,  pEps="No Summary", nEps="", pEpp=photo, pEpseason='', pEpepisode='', nEpseason='', nEpepisode='';
    if(data[0].show._links.previousepisode!==undefined){
        pEp = await getEp(""+data[0].show._links.previousepisode.href);
        if(pEp.summary!==null&&pEp.airdate!==null){
            pEps = pEp.summary.replace('<p>','').replace('</p>','')
            pEps+="\n" + pEp.airdate;
        }

        if(pEp.image!==null){
            pEpp = pEp.image.original
        }
        pEpseason=pEp.season;
        if(pEp.number!==null){
            pEpepisode = pEp.number
        }
    }

    if(data[0].show._links.nextepisode!==undefined){
        nEp = await getEp(data[0].show._links.nextepisode.href);
        
        nEpseason=nEp.season;
        if(nEp.number!==null){
            nEpepisode = nEp.number
        }
        if(nEp.summary!==null){
            nEps = nEp.summary.replace('<p>','').replace('</p>','');
        }
        if(nEp.airdate!==null){
            
            nEps+="\n" + nEp.airdate;
        }
    }
    else{
        nEp={};
        if( data[0].show.status=="Running"){
            nEp.name="Wait for next season"
        }
        else
         nEp.name="The series is already done"
        
        nEps = "No summary"
    }

    const mor = await getmovieorratings(req.body.searchseries);

    //console.log(mor);

    var awards=mor.Awards+"";
    var prices="";
    var nominat="";
    var r = /\d+/;
    var split = awards.split('.');
    var numb=0;
    if(split.length>2){
        split[1].split(' ').forEach(element=>{
            if(element.match(r)){
                if(numb==0){
                    prices=element
                    numb++;
                }
                else{
                    nominat=element;
                }
            }
        });
    }
    else{
        split[0].split(' ').forEach(element=>{
            if(element.match(r)){
                if(numb==0){
                    prices=element
                    numb++;
                }
                else{
                    nominat=element;
                }
            }
        });
    }

    //var otherratings="";
    const trailer = await getseriestrailer(req.body.searchseries)


    res.render('index', {Titel:data[0].show.name,Status:"is "+ data[0].show.status, Genre: "Genre: "+genre, Premier:"Premier: "+data[0].show.premiered, 
    Summary: "Summary: "+data[0].show.summary.replace('<p>','').replace('</p>',''), linktowebsite:data[0].show.officialSite,linkofpicture:data[0].show.image.original,
    TitelofPreviousEp:pEp.name, TitelofNextEp:nEp.name, summarypEp: pEps, summarynEp: nEps, pEppicture: pEpp, nEpSEp:`${nEpseason} x ${nEpepisode}`, pEpSEp:`${pEpseason} x ${pEpepisode}`
    , imdbRating:mor.imdbRating,prices:prices, som:req.body.som, nominations:nominat, trailerkey:trailer})
   }
   else{
    const movie = await getmovieorratings(req.body.searchseries);

    console.log(movie);

    var awards=movie.Awards+"";
    var prices="";
    var nominat="";
    var r = /\d+/;
    var split = awards.split('.');
    var numb=0;
    if(split.length>2){
        split[1].split(' ').forEach(element=>{
            if(element.match(r)){
                if(numb==0){
                    prices=element
                    numb++;
                }
                else{
                    nominat=element;
                }
            }
        });
    }
    else{
        split[0].split(' ').forEach(element=>{
            if(element.match(r)){
                if(numb==0){
                    prices=element
                    numb++;
                }
                else{
                    nominat=element;
                }
            }
        });
    }

    const trailer = await getmovietrailer(req.body.searchseries)

    

    res.render('index', {Titel:movie.Title,Status:'', Genre: "Genre: "+movie.Genre, Premier:"Release: "+movie.Released, 
    Summary: "Summary: "+movie.Plot, linktowebsite:'#',linkofpicture:movie.Poster,
    TitelofPreviousEp:'', TitelofNextEp:'', summarypEp: '', summarynEp: '', pEppicture: '', nEpSEp:'', pEpSEp:''
    , imdbRating:movie.imdbRating,prices:prices, som:req.body.som, nominations:nominat, trailerkey:trailer})

    // axios.request(options).then(function (response) {
    //     console.log(response.data);
    // }).catch(function (error) {
    //     console.error(error);
    // });
   }
})

const axios = require('axios')


const getEp = async (link) => {

    const response = await axios.get(link)

    return response.data
}

const getseries = async (series) => {

    const response = await axios.get( `http://api.tvmaze.com/search/shows?q=`+series)

    return response.data
}

const getmovieorratings = async (titel) =>{
    const response = await axios.get( `http://www.omdbapi.com/?apikey=427ad70&t=${titel}`)

    return response.data
}

const getmovietrailer= async (titel) =>{
    const response = await axios.get( `https://api.themoviedb.org/3/search/movie?api_key=64478b09b1019b3aa33dfe3d4df09d74&language=en-US&query=${titel}&page=1&include_adult=false`)
    
    const trailer = await axios.get( ` https://api.themoviedb.org/3/movie/${response.data.results[0].id}/videos?api_key=64478b09b1019b3aa33dfe3d4df09d74&language=en-US`)

    return trailer.data.results[trailer.data.results.length-1].key;
}

const getseriestrailer= async (titel) =>{
    const response = await axios.get( `https://api.themoviedb.org/3/search/tv?api_key=64478b09b1019b3aa33dfe3d4df09d74&language=en-US&query=${titel}&page=1&include_adult=false`)

    const trailer = await axios.get( ` https://api.themoviedb.org/3/tv/${response.data.results[0].id}/videos?api_key=64478b09b1019b3aa33dfe3d4df09d74&language=en-US`)



    return trailer.data.results[trailer.data.results.length-1].key;
}


const options = {
    method: 'POST',
    url: 'https://gowatch.p.rapidapi.com/lookup/title/tmdb_id',
    params: {id: '496243', type: 'movie', country: 'us'},
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'x-rapidapi-key': '45f309aa8dmsh5fac962a7da4fd0p1f5d7ajsn32432eb4de5a',
      'x-rapidapi-host': 'gowatch.p.rapidapi.com'
    },
    data: {id: '496243', type: 'movie', country: 'us'}
  };
  
 



module.exports = route;