function ZiCuSoare() {
  var config = {
    apiKey: "AIzaSyD-C9LoYRZb5nudMJsRw-Rrei9YCWgvWBY",
    authDomain: "zi-cu-soare.firebaseapp.com",
    databaseURL: "https://zi-cu-soare.firebaseio.com",
    messagingSenderId: "227888148790"
  }
  firebase.initializeApp(config)
  this.initFirebase()
}
ZiCuSoare.prototype.initFirebase = function() {
  this.auth = firebase.auth()
  this.db = firebase.database()
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this))
}
ZiCuSoare.prototype.signInFacebook = function() {
  var provider = new firebase.auth.FacebookAuthProvider()
  this.auth.signInWithPopup(provider)
}
ZiCuSoare.prototype.signInGoogle = function() {
  var provider = new firebase.auth.GoogleAuthProvider()
  this.auth.signInWithPopup(provider)
}
ZiCuSoare.prototype.signInTwitter = function() {
  var provider = new firebase.auth.TwitterAuthProvider()
  this.auth.signInWithPopup(provider)
}
ZiCuSoare.prototype.checkSignedIn = function() {
  return !!(this.auth.currentUser)
}
ZiCuSoare.prototype.signOut = function() {
  this.auth.signOut()
}
ZiCuSoare.prototype.onAuthStateChanged = function(user) {
  if (user) {
    this.showAuthStatusLogged(user.displayName, user.photoURL)
  } else {
    this.showAuthStatusAnon()
  }
}
ZiCuSoare.prototype.reactToPage = function(reaction) {
  var a = slugifyAddress()
  var u = this.auth.currentUser.uid
  var r = this.db.ref().child('reactions')
  r.child(a).child(u).set({
    name: this.auth.currentUser.displayName,
    reaction: reaction,
    postedAt: Date.now() // firebase.ServerValue.TIMESTAMP ???
  });
}
ZiCuSoare.prototype.showAuthStatusLogged = function(name, profilePic) {
  console.log('Autentificat:', name, profilePic)
  $("#post-auth-status").html("Hello <i>" + name + "</i>! Iesire")
  $("#post-sign-out").removeClass("hidden")
  $("#post-sign-in").addClass("hidden")
}
ZiCuSoare.prototype.showAuthStatusAnon = function() {
  console.log('Ne-autentificat!')
  $("#post-auth-status").text("Autentificare")
  $("#post-sign-out").addClass("hidden")
  $("#post-sign-in").removeClass("hidden")
}

function slugifyAddress(){
  return window.location.pathname
    .toString().toLowerCase().trim()
    .replace(/^\//, '')
    .replace(/&/g, '-and-')
    .replace(/[\s\W-]+/g, '-')
    .replace(/[^a-zA-Z0-9-_]+/g,'');
}

// Start !
$(function(){
  window.z = new ZiCuSoare()
  var s = new jBox('Tooltip', {
    trigger: 'click',
    maxWidth: 300,
    closeOnEsc: true,
    closeButton: true,
    attach: '#post-sign-in',
    target: '#post-sign-in',
    content: $('#login-popup'),
    onCreated: function(){
      $(".facebook.login.icon").click(function(){
        z.signInFacebook()
        s.toggle()
      })
      $(".google.login.icon").click(function(){
        z.signInGoogle()
        s.toggle()
      })
      $(".twitter.login.icon").click(function(){
        z.signInTwitter()
        s.toggle()
      })
    },
    onCloseComplete: function(){
      $(".facebook.login.icon").off("click")
      $(".google.login.icon").off("click")
      $(".twitter.login.icon").off("click")
    }
  })

  $("#post-sign-out").click(function(){
    z.signOut()
  })
  $("#love-post").click(function(){
    if(!z.checkSignedIn()){
      s.toggle()
    } else {
      z.reactToPage('love')
    }
  })
  $("#meh-post").click(function(){
    if(!z.checkSignedIn()){
      s.toggle()
    } else {
      z.reactToPage('meh')
    }
  })
})
