
$(function () {
  // Cookie warning
  if (localStorage.getItem('accepted-cookie') !== 'true') {
    $('#ck-message').removeClass('hidden')
  }
  $('#ck-message .close').on('click', function () {
    $('#ck-message').hide(500)
  })
  $('#ok-ck').on('click', function (e) {
    e.preventDefault()
    localStorage.setItem('accepted-cookie', true)
    $('#ck-message .close').click()
  })
})
