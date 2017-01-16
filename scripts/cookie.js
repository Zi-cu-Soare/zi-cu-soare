
$(function () {
  // Cookie warning
  if (localStorage.getItem('accepted-cookie') !== 'true') {
    $('.cookie.message').removeClass('hidden')
  }
  $('.cookie.message .close').on('click', function () {
    $(this).closest('.message').transition('fade')
  })
  $('#ok-cookie').on('click', function (e) {
    e.preventDefault()
    localStorage.setItem('accepted-cookie', true)
    $('.cookie.message .close').click()
  })
})
