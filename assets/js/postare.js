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
  this.re_db = this.db.ref().child('reactions')
  this.re_db.on('value', this.listReactions.bind(this))
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

ZiCuSoare.prototype.listReactions = function(snapshot) {
  var a = slugifyAddress()
  if (!snapshot.val()[a]) return
  this.reactions = snapshot.val()[a]
  $("#total-reactions").trigger("reaction-change",this.reactions)
  this.readMyReaction()
}
ZiCuSoare.prototype.readMyReaction = function() {
  var a = slugifyAddress()
  if (!this.reactions) return
  var u = this.auth.currentUser.uid
  var m = this.reactions[u]
  if (!m || !m.reaction) return
  $("#my-reaction").trigger("reaction-change",m.reaction)
}
ZiCuSoare.prototype.sendReaction = function(reaction) {
  var a = slugifyAddress()
  var u = this.auth.currentUser.uid
  console.log('Reactie:', reaction)
  this.re_db.child(a).child(u).set({
    name: this.auth.currentUser.displayName,
    reaction: reaction,
    postedAt: Date.now()
  })
}
ZiCuSoare.prototype.showAuthStatusLogged = function(name, profilePic) {
  console.log('Autentificat:', name, profilePic)
  this.readMyReaction()
  var u = this.auth.currentUser
  var p = u.providerData[0].providerId.replace(".com","")
  $("#my-reaction").trigger("sign-in",{p:p,u:name})
}
ZiCuSoare.prototype.showAuthStatusAnon = function() {
  console.log('Ne-autentificat!')
  $("#my-reaction").trigger("sign-out")
}

function slugifyAddress(){
  return window.location.pathname
    .toString().toLowerCase().trim()
    .replace(/^\//, '')
    .replace(/&/g, '-and-')
    .replace(/[\s\W-]+/g, '-')
    .replace(/[^a-zA-Z0-9-_]+/g,'')
}
function shake(elem){
  $(elem)
    .css("color", "red")
    .animate({ opacity: .5 }, 50)
    .animate({ "margin-left": "+=10px" }, 100)
    .animate({ "margin-left": "-=10px" }, 100)
    .animate({ opacity: 1 }, 50)
    .animate({ opacity: .5 }, 50)
    .animate({ "margin-left": "+=10px" }, 100)
    .animate({ "margin-left": "-=10px" }, 100)
    .animate({ opacity: 1 }, {
      duration: 50,
      complete: function() {$(this).css("color", "black")}
    })
}

// Start !
$(function(){
  window.z = new ZiCuSoare()

  $("#total-reactions").on("reaction-change",function(_,r){
    console.log('Reactii:', Object.keys(r).length)
    var l=0,h=0
    for (var key in r) {
      if (r[key].reaction==='love') l++
      else if (r[key].reaction==='hate') h++
    }
    $("#love-reactions").text(l)
    $("#hate-reactions").text(h)
  })
  $("#my-reaction").on("reaction-change",function(_,r){
    console.log('Reactia mea:', r)
    if (r==='love') {
      $("#send-love").addClass("red")
    } else if (r==='hate') {
      $("#send-hate").addClass("brown")
    }
  })
  $("#my-reaction").on("sign-in",function(_,o){
    $("#prov-id").addClass(o.p)
    $("#user-name").text(o.u)
    $("#post-auth-ok").removeClass("hidden")
    $("#post-auth-req").addClass("hidden")
  })
  $("#my-reaction").on("sign-out",function(){
    $("#send-love").removeClass("red")
    $("#send-hate").removeClass("brown")
    $("#post-auth-ok").addClass("hidden")
    $("#post-auth-req").removeClass("hidden")
    $("#prov-id").removeClass("facebook")
      .removeClass("google")
      .removeClass("twitter")
  })

  $("#post-auth-req .facebook.login.icon").click(function(){
    z.signInFacebook()
  })
  $("#post-auth-req .google.login.icon").click(function(){
    z.signInGoogle()
  })
  $("#post-auth-req .twitter.login.icon").click(function(){
    z.signInTwitter()
  })
  $("#post-sign-out").click(function(){
    z.signOut()
  })

  $("#send-love")
    .mouseenter(function(){ $(this).addClass("red") })
    .mouseleave(function(){ $(this).removeClass("red") })
    .click(function(){
      if(!z.checkSignedIn()){
        shake("#post-auth-req")
      } else {
        z.sendReaction('love')
      }
    })
  $("#send-hate")
    .mouseenter(function(){ $(this).addClass("brown") })
    .mouseleave(function(){ $(this).removeClass("brown") })
    .click(function(){
      if(!z.checkSignedIn()){
        shake("#post-auth-req")
      } else {
        z.sendReaction('hate')
      }
    })
})
