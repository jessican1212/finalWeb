let fadeUp = anime({
    targets: '#grid-item3',
    easing: 'easeOutCirc',
    duration: 1000,
    loop: false,
    autoplay: true,
    translateY: -70,
    opacity: [0,1],
});

//url to authorize myself to waterpark, sometimes authorization code changes??? everytime to authorize i think
//https://accounts.spotify.com/en/authorize?client_id=4285a89feed349aebc6bb2d129265cb6&response_type=code&redirect_uri=https://www.google.com&scope=user-read-recently-played user-read-currently-playing user-top-read

//current auth code
//AQAOs0jHQylkxmh_kGMPp9tER653LieXCPcjeMle5gXVepZ9tLxGgaUksibgfbCU_KnbFTsYcki5J4k-a1Fv_D5yrj9_dwBvtLZYeNFh0eQssJt0PxDXKpCDhCxCLZlJyLw8zT2mwVxM1WHMCgOK53C8yi_TDgY1ybuImj_WJLIdvjy_CvFNDI6TsSLmwTv_dfrd8tnlOMSQPe6mLIVyOt8TsMi1G4Ig_GPKhbsNwSTURn_A60IduqbgvNgSa55K_Q

//ONLY USED ONCE TO INSTANTIATE LOCALSTORAGE
async function fetchTokens(){
    const response = await fetch("https://accounts.spotify.com/api/token?grant_type=authorization_code&code=AQAOs0jHQylkxmh_kGMPp9tER653LieXCPcjeMle5gXVepZ9tLxGgaUksibgfbCU_KnbFTsYcki5J4k-a1Fv_D5yrj9_dwBvtLZYeNFh0eQssJt0PxDXKpCDhCxCLZlJyLw8zT2mwVxM1WHMCgOK53C8yi_TDgY1ybuImj_WJLIdvjy_CvFNDI6TsSLmwTv_dfrd8tnlOMSQPe6mLIVyOt8TsMi1G4Ig_GPKhbsNwSTURn_A60IduqbgvNgSa55K_Q&redirect_uri=https://www.google.com", {
        method: 'POST',
      headers: {
        "Authorization": "Basic NDI4NWE4OWZlZWQzNDlhZWJjNmJiMmQxMjkyNjVjYjY6NmQ3NGJkMmY4YzllNDM4ZDg4ZmE4NjE4MjRiOTNhYmU",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  
    if (response.status == 200) {
        console.log("Request successful!")
        let data = await response.json()
        localStorage.setItem('accessToken', data['access_token'])
        localStorage.setItem('refreshToken', data['refresh_token'])
    }
    else {
        console.log("Request failed with status " + response.status)
        return
    }
}

async function getRecentlyPlayed() {
    console.log("CUREENT ACCESS TOKEEEN" + localStorage.getItem('accessToken')) 
  
    const response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
        method: 'GET',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('accessToken'),
        "Content-Type": "application/json",
      },
    })
  
    if (response.status == 200) {
        console.log("Recently played request successful!")
        let data = await response.json()
        let songTitle = data['items'][0]['track']['name']
        let songArtist = data['items'][0]['track']['artists'][0]['name']
        document.getElementById("lastSong").innerHTML = songTitle
        document.getElementById("lastArtist").innerHTML = songArtist
        console.log('Successfully got recently played')
        console.log(songTitle, songArtist)
        return true;
    }

    else if (response.status == 401) {
        console.log('Access Token expired :( response status 401')
        await refreshAccessToken()
        console.log('Successfully got new Access Token!')
        getRecentlyPlayed()
    }

    else {
        console.log("Get recently played request failed with status " + response.status)
        return false;
    }
}

async function refreshAccessToken() {

    const response = await fetch("https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=" + localStorage.getItem('refreshToken'), {
        method: 'POST',
      headers: {
        "Authorization": "Basic NDI4NWE4OWZlZWQzNDlhZWJjNmJiMmQxMjkyNjVjYjY6NmQ3NGJkMmY4YzllNDM4ZDg4ZmE4NjE4MjRiOTNhYmU",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  
    if (response.status == 200) {
        let data = await response.json()
        localStorage.setItem('accessToken', data['access_token'])
        console.log("Successfully updated accessToken in localStorage")
        console.log("new Access Token: " + localStorage.getItem('accessToken'))
        console.log("new/same Refresh Token: " + localStorage.getItem('refreshToken'))
    }
    else {
        console.log("Refresh request failed with status " + response.status)
    }

}


async function getTopArtists() {
  
    const response = await fetch("https://api.spotify.com/v1/me/top/artists?limit=3&offset=0&time_range=short_term", {
        method: 'GET',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('accessToken'),
      },
    })
  
    if (response.status == 200) {
        console.log("Top artist request successful!")
        let data = await response.json()
        let topArtists = []
        let topGenres = []
        for (let i = 0; i < 3; i++) {
            topArtists.push(data['items'][i]['name'])
            topGenres = topGenres.concat(data['items'][i]['genres'])
        }
        document.getElementById("a1").innerHTML = topArtists[0]
        document.getElementById("a2").innerHTML = topArtists[1]
        document.getElementById("a3").innerHTML = topArtists[2]
        document.getElementById("g1").innerHTML = topGenres[0]
        document.getElementById("g2").innerHTML = topGenres[1]
        console.log('Successfully got top artists')
        console.log(topArtists, topGenres)
        return true;
    }

    else if (response.status == 401) {
        console.log('Access Token expired :( respones status 401')
        refreshAccessToken()
        console.log('Successfully got new Access Token!')
        getTopArtists()
    }

    else {
        console.log("Get recently played request failed with status " + response.status)
        return false;
    }
}

async function getCurrentlyPlaying() {
  
    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        method: 'GET',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('accessToken'),
      },
    })
  
    if (response.status == 200) {
        console.log("CURRENT ACCESS TOKEN" + localStorage.getItem('accessToken'))
        console.log("Currently playing request successful!")
        let data = await response.json()
        let currentSong = data['item']['name']
        let currentArtist = data['item']['artists'][0]['name']
        console.log('Successfully got currently listening')
        console.log(currentSong, currentArtist)
        document.getElementById("currentSong").innerHTML = currentSong
        document.getElementById("currentArtist").innerHTML = currentArtist
        return true;
        
    }

    else if (response.status == 401) {
        console.log('Access Token expired :( response status 401')
        refreshAccessToken()
        console.log('Successfully got new Access Token!')
        getCurrrentlyPlaying()
    }

    else {
        document.getElementById("nothing").innerHTML = "I am not listening to Spotify :("
        console.log("Get currently playing request failed with status " + response.status + "(204 means No Content)")
        return false;
    }
}

function doAll(){
    //getCurrentlyPlaying()
    getRecentlyPlayed()
    //getTopArtists()
    getDate()
}

function getDate() {
    const date = new Date();
    let formattedDate = date.getMonth() + "/" + date.getDay() + "/"+ date.getFullYear() + " " + date.getHours() + ":"+ date.getMinutes() + ":"+ date.getSeconds()
    const htmlDate = document.getElementsByClassName("date");
    htmlDate[0].innerHTML = formattedDate;
    htmlDate[1].innerHTML = formattedDate;
}