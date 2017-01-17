
function reaction (r) {
  r = (r == 'love' ? 'heart red' : 'thumbs down brown' )
  return '<i class="' + r + ' icon"></i>'
}

function ZiCuSoare () {
  var config = {
    apiKey: 'AIzaSyD-C9LoYRZb5nudMJsRw-Rrei9YCWgvWBY',
    authDomain: 'zi-cu-soare.firebaseapp.com',
    databaseURL: 'https://zi-cu-soare.firebaseio.com',
    messagingSenderId: '227888148790'
  }
  firebase.initializeApp(config)
  this.initFirebase()
}
ZiCuSoare.prototype.initFirebase = function () {
  this.db = firebase.database()
  this.re_db = this.db.ref().child('reactions')
  this.re_db.on('value', this.listReactions.bind(this))
}
ZiCuSoare.prototype.listReactions = function (snapshot) {
  var data = snapshot.val()
  $('#rea').empty()
  Object.keys(data).forEach(function (k) {
    $('#rea').append('<div class="event"><div class="content"><div class="summary"><h3>' +
      k + '</h3><ul id="' + k + '"></ul></div></div></div>')
    Object.keys(data[k]).forEach(function (p) {
      $('#' + k).append('<li>' + data[k][p].name + ' = ' + reaction(data[k][p].reaction) + '</li>')
    })
  })
}

// Start !
$(function () {
  window.z = new ZiCuSoare()
  var z = window.z
})
