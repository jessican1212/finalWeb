let fadeUp = anime({
    targets: '#grid-item3',
    easing: 'easeOutCirc',
    duration: 1000,
    loop: false,
    autoplay: true,
    translateY: -70,
    opacity: [0,1],
});

localStorage.setItem('refreshToken', 'AQBj3HEbfcyJxaxXCwcQpaIyw1kl1dtQdO7gySGXY_P8sUGVeLhazv4k1HcLsVKGtkEXP04rNxpshVXDIx-Odxn-2Mp9mg1KKs8tfu_J0vxi9gO69UtR8F2izRgjUsdEHBU')

//authorization url
//https://accounts.spotify.com/en/authorize?client_id=4285a89feed349aebc6bb2d129265cb6&response_type=code&redirect_uri=https://www.google.com&scope=user-read-recently-played user-read-currently-playing user-top-read

//authorization code
authCode = 'AQAOs0jHQylkxmh_kGMPp9tER653LieXCPcjeMle5gXVepZ9tLxGgaUksibgfbCU_KnbFTsYcki5J4k-a1Fv_D5yrj9_dwBvtLZYeNFh0eQssJt0PxDXKpCDhCxCLZlJyLw8zT2mwVxM1WHMCgOK53C8yi_TDgY1ybuImj_WJLIdvjy_CvFNDI6TsSLmwTv_dfrd8tnlOMSQPe6mLIVyOt8TsMi1G4Ig_GPKhbsNwSTURn_A60IduqbgvNgSa55K_Q'

//fetch initial access and refresh tokens with authCode
async function fetchTokens(){
    const response = await fetch("https://accounts.spotify.com/api/token?grant_type=authorization_code&code="+authCode+"&redirect_uri=https://www.google.com", {
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

//refresh access tokens using static refresh token
async function refreshAccessToken() {

    const response = await fetch("https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=" + localStorage.getItem('refreshToken'), {
        method: 'POST',
      headers: {
        "Authorization": "Basic NDI4NWE4OWZlZWQzNDlhZWJjNmJiMmQxMjkyNjVjYjY6NmQ3NGJkMmY4YzllNDM4ZDg4ZmE4NjE4MjRiOTNhYmU",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  
    if (response.status == 200) {
        console.log("Refresh function status 200!")
        let data = await response.json()
        localStorage.setItem('accessToken', data['access_token'])
        console.log("Successfully updated accessToken in localStorage")
        console.log("New access token: " + localStorage.getItem('accessToken'))
    }
    else {
        console.log("Refresh request failed with status " + response.status)
    }

}

//GET request recently played
async function getRecentlyPlayed() {

    const response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
        method: 'GET',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('accessToken'),
        "Content-Type": "application/json",
      },
    })
  
    if (response.status == 200) {
        console.log("Recently played request status 200!")
        let data = await response.json()
        let songTitle = data['items'][0]['track']['name']
        let songArtist = data['items'][0]['track']['artists'][0]['name']
        let pop = data['items'][0]['track']['popularity']
        document.getElementById("lastSong").innerHTML = songTitle
        document.getElementById("lastArtist").innerHTML = songArtist+", which has a popularity rating of "+pop+" out of 100 Spotify units"
        console.log("Recent song & artist: " + songTitle +" by "+ songArtist)
        return true;
    }

    else if (response.status == 401) {
        console.log('Access Token is wrong - response status 401')
        await refreshAccessToken()
        console.log('completed refreshAccessToken function')
        await getRecentlyPlayed()
    }

    else {
        console.log("Get recently played request failed with status " + response.status)
        return false;
    }
}

//GET request top artists
async function getTopArtists() {
  
    const response = await fetch("https://api.spotify.com/v1/me/top/artists?limit=3&offset=0&time_range=short_term", {
        method: 'GET',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('accessToken'),
      },
    })
  
    if (response.status == 200) {
        console.log("Top artist request status 200!")
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
        console.log("Arrays of top artists and genres: " + topArtists + topGenres)
        return true;
    }

    else if (response.status == 401) {
        console.log('Access Token is wrong - respones status 401')
        await refreshAccessToken()
        console.log('completed refreshAccessToken function')
        await getTopArtists()
    }

    else {
        console.log("Get top artists request failed with status " + response.status)
        return false;
    }
}

//GET request currently playing
async function getCurrentlyPlaying() {
  
    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        method: 'GET',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('accessToken'),
      },
    })
  
    if (response.status == 200) {
        console.log("Currently playing status 200!")
        let data = await response.json()
        let currentSong = data['item']['name']
        let currentArtist = data['item']['artists'][0]['name']
        let progress = data['progress_ms'] / data['item']['duration_ms']
        console.log("Current song & artist: " + currentSong + " by "+currentArtist)
        document.getElementById("curr").innerHTML = "At this very moment, I am listening to <span style='color: #FF595A;'>"+currentSong+"</span> by "+currentArtist
        if (progress) {
            progress = progress*100
            progress = progress.toString()
            progress = progress.substring(0, 4)
            document.getElementById("curr").innerHTML+=", and I am "+progress+"% of the way through this song!"
        }
        return true;
        
    }

    else if (response.status == 401) {
        console.log('Access Token expired is wrong - response status 401')
        await refreshAccessToken()
        console.log('completed refreshAccessToken function')
        await getCurrentlyPlaying()
    }

    else {
        console.log("Get currently playing request failed with status " + response.status + "(204 means No Content)")
        return false;
    }
}

//get current date and time
function getDate() {
    const date = new Date();
    let formattedDate = date.getMonth() + "/" + date.getDay() + "/"+ date.getFullYear() + " " + date.getHours() + ":"+ date.getMinutes() + ":"+ date.getSeconds()
    const htmlDate = document.getElementsByClassName("date");
    htmlDate[0].innerHTML = formattedDate;
    htmlDate[1].innerHTML = formattedDate;
}

//onload function
async function doAll(){
    await getRecentlyPlayed()
    await getTopArtists()
    await getCurrentlyPlaying()
    getDate()
}