var pictureSource; // picture source
var destinationType; // sets the format of returned value
// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
pictureSource = navigator.camera.PictureSourceType;
destinationType = navigator.camera.DestinationType;
}
// Called when a photo is successfully retrieved
//

function onPhotoDataSuccess(imageURI) {
// Uncomment to view the base64-encoded image data
console.log(imageURI);
// Get image handle
//
var cameraImage = document.getElementById('image');
var divwadah = document.getElementById('wadah');

// Unhide image elements
//
cameraImage.style.display = 'block';
divwadah.style.display = 'block';
$(".opening").fadeIn();
// Show the captured photo
// The inline CSS rules are used to resize the image
//
cameraImage.src = imageURI;
}
// Called when a photo is successfully retrieved
//

function onPhotoURISuccess(imageURI) {
// Uncomment to view the image file URI
console.log(imageURI);
// Get image handle
//
var galleryImage = document.getElementById('image');
var divwadah = document.getElementById('wadah');
// Unhide image elements
galleryImage.style.display = 'block';
divwadah.style.display = 'block';
$(".opening").fadeIn();
// Show the captured photo
// The inline CSS rules are used to resize the image
//
galleryImage.src = imageURI;
}
// A button will call this function
//

function capturePhoto() {
// Take picture using device camera and retrieve image as base64-encoded string
navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
quality: 30,
targetWidth: 600,
targetHeight: 600,
destinationType: destinationType.FILE_URI,
saveToPhotoAlbum: true
});
}
// A button will call this function
//

function getPhoto(source) {
// Retrieve image file location from specified source
navigator.camera.getPicture(onPhotoURISuccess, onFail, {
quality: 50,
targetWidth: 600,
targetHeight: 600,
destinationType: destinationType.FILE_URI,
sourceType: source
});
}
// Called if something bad happens.
//

function onFail(message) {
//alert('Failed because: ' + message);
}

function onDeviceReady(){
document.addEventListener("backbutton", function(e){
navigator.notification.confirm("Are you sure you want to exit ?", onConfirm, "Confirmation", "Yes,No");
}, false);
}

function onConfirm(button) {
    if(button==2){//If User selected No, then we just do nothing
        return;
    }else{
        navigator.app.exitApp();// Otherwise we quit the app.
    }
}

$(document).on("click","#ambilgambar", function(){
capturePhoto();
});
$(document).on("click","#galeri", function(){
getPhoto(pictureSource.PHOTOLIBRARY);
});


function showSpinner(){
$('#loader').show();}
function hideSpinner(){
$('#loader').hide();}
var googleapi = {
    authorize: function(options) {
        var deferred = $.Deferred();

        //Build the OAuth consent page URL
        var authUrl = 'https://www.instagram.com/oauth/authorize/?' + $.param({
            client_id: options.client_id,
            redirect_uri: options.redirect_uri,
            response_type: 'token'
        });

        //Open the OAuth consent page in the InAppBrowser
var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no,hidden=yes');
authWindow.addEventListener("loadstart", function() {
showSpinner();
});
authWindow.addEventListener("loadstop", function() {
authWindow.show();});
        //The recommendation is to use the redirect_uri "urn:ietf:wg:oauth:2.0:oob"
        //which sets the authorization code in the browser's title. However, we can't
        //access the title of the InAppBrowser.
        //
        //Instead, we pass a bogus redirect_uri of "http://localhost", which means the
        //authorization code will get set in the url. We can access the url in the
        //loadstart and loadstop events. So if we bind the loadstart event, we can
        //find the authorization code and close the InAppBrowser after the user
        //has granted us access to their data.
        $(authWindow).on('loadstart', function(e) {
            var url = e.originalEvent.url;
            var access_token = /\#access_token=(.+)$/.exec(url);
            var error = /\?error=(.+)$/.exec(url);

            if (access_token || error) {
                //Always close the browser when match is found
                authWindow.close();
            }

            if (access_token) {
deferred.resolve(access_token[1]);
            } else if (error) {
deferred.reject({
                    error: error[1]
                });
            }
        });

return deferred.promise();
    }
};

$(document).on('deviceready', function() {
    var $loginButton = $('#login a');
    var $loginStatus = $('#login p');

    $loginButton.on('click', function() {

        googleapi.authorize({
            client_id: 'fd8752cc71134fb7a5c0beef5d74e396',
            client_secret: '93556c003e8f4b469bd4b5e7e7fc1ee5',
            redirect_uri: 'http://janganlupapulang.xyz'
        }).done(function(data) {
        localStorage.token = data;
window.open('startpage.html','_self');
}).fail(function(data) {
            $loginStatus.html(data.error);
        });
    });
});

$(window).scroll(function(e) {
    var t = $("#head").offset().top+5;
    if ($(this).scrollTop() >= t) {
        $("#head").addClass('topfix');

    } else if($(this).scrollTop() <5)  {
        $("#head").removeClass('topfix');
    }
});



