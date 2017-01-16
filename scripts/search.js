
$(function () {
  $('.ui.checkbox').checkbox('check')
})

function result (r) {
  $('#arch').append('<div class="event"><div class="content"><div class="summary">' +
  '<a href="' + r.url + '">' + r.title + '</a>' +
  '<div class="date"><i class="calendar icon"></i> ' + r.date +
  '</div></div></div></div>')
}

function search () {
  var v = $('#search').val()
  if (!v) return
  var t = $('#s-title').parent().hasClass('checked')
  var d = $('#s-descrip').parent().hasClass('checked')
  var a = $('#s-author').parent().hasClass('checked')
  var c = $('#s-category').parent().hasClass('checked')
  var g = $('#s-tag').parent().hasClass('checked')
  if (!t && !d && !a && !c && !g) return
  $.getJSON('/index.json')
  .done(function (p) {
    var f
    $.each(p, function (i, r) {
      if (t && r.title.indexOf(v) > -1) {
        f = true
        result(r)
        return
      }
      if (d && (r.teaser.indexOf(v) > -1 || r.excerpt.indexOf(v) > -1)) {
        f = true
        result(r)
        return
      }
      if (a && r.author === v) {
        f = true
        result(r)
        return
      }
      if (c && r.categories.indexOf(v) > -1) {
        f = true
        result(r)
        return
      }
      if (g && r.tags.indexOf(v) > -1) {
        f = true
        result(r)
        return
      }
    })
    if (!f) $('#arch').append('<div class="event">Nu am găsit nici un rezultat <i class="large meh icon"></i></div>')
  })
  .fail(function (err) {
    console.warn('Error:', err)
  })
}

$('#search').on('keypress', function (e) {
  if (e.which === 13) {
    $('#arch').empty()
    setTimeout(search, 10)
  }
})
