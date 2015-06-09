L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images'

Template.map.rendered = function () {
  $('#map').css('height', $(window).height() * 2)
  var token = 'pk.eyJ1IjoiYm1vcmRhbiIsImEiOiJvOHdmZ1pBIn0.SDHTHU1sNNTJRCgs4lfAEg'
  var light = 'bmordan.mdgog4e1'
  var opts = {
    scrollWheelZoom: false
  }
  var map = L.map('map', opts).setView([51.499, -0.13], 14)
  L.tileLayer('https://{s}.tiles.mapbox.com/v4/'+light+'/{z}/{x}/{y}.png?access_token='+token).addTo(map)
  new L.marker([51.4864606182951, -0.0926971435546875]).addTo(map)
}