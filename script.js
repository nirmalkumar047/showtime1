function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("city").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let city = data.address.city || data.address.town || data.address.village || "City not found";
            document.getElementById("city").innerHTML = `City: ${city}`;
        })
        .catch(error => {
            document.getElementById("city").innerHTML = "Error getting city name.";
            console.error("Error:", error);
        });
}

function showError(error) {
    let msg = "";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            msg = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            msg = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            msg = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            msg = "An unknown error occurred.";
            break;
    }
    document.getElementById("city").innerHTML = msg;
}

let currentIndex = 0;
const images = document.querySelectorAll(".slider img");
const totalImages = images.length;

function moveToNextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    document.querySelector(".slider").style.transform = `translateX(-${currentIndex * 2400}px)`;
}

// Change image every 3 seconds
setInterval(moveToNextImage, 3000);
//book tickets
function fetchNearbyTheaters() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            const map = new google.maps.Map(document.getElementById('map'), {
                center: userLocation,
                zoom: 12
            });

            const service = new google.maps.places.PlacesService(map);

            const request = {
                location: userLocation,
                radius: 5000, // 5km radius
                type: 'movie_theater'
            };

            service.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    const theaterList = document.getElementById('theater-list');
                    theaterList.innerHTML = "<h3>Nearby Theaters:</h3>";
                    
                    results.forEach(theater => {
                        let theaterElement = document.createElement('p');
                        theaterElement.textContent = theater.name;
                        theaterList.appendChild(theaterElement);
                    });
                } else {
                    alert("No theaters found nearby.");
                }
            });
        }, () => {
            alert('Location access denied. Please allow location access.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

function showLikes(){
    const count = document.getElementsByClassName(`${count+1}`).innerHTML;
    let likes = localStorage.getItem('likes');
    if(likes){
        document.getElementsByClassName('likes').innerHTML = likes;
    }

}

