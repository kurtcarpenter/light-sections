var scrollDelay = 1000 // ms between each section is scrolled

var curPage = 0
var numPages = (document.getElementsByClassName) ?
    document.getElementsByClassName('ls-section').length :
    document.querySelectorAll('.ls-section').length
var lastScrolled = 0
var firstSection = (document.getElementsByClassName) ?
    document.getElementsByClassName('ls-section')[0] :
    document.querySelectorAll('.ls-section')[0]
firstSection.style.transition += "margin 0.5s ease-in"
var paginationOuter = (document.getElementsByClassName) ?
    document.getElementsByClassName('ls-pagination-outer')[0] :
    document.querySelectorAll('.ls-pagination-outer')[0]
paginationOuter.style.transition += "top 0.5s ease-in"
var pagination = (document.getElementsByClassName) ?
    document.getElementsByClassName('ls-pagination')[0] :
    document.querySelectorAll('.ls-pagination')[0]

/* Scroll Handler */
var handleScroll = function (e) {
  if (Date.now() - lastScrolled < scrollDelay) {
    return
  }
  lastScrolled = Date.now()

  var e = window.event || e;
  //wheelData for scroll/mousewheel
  //detail for Firefox support :(
	var wDelta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))
  wDelta = (wDelta === -1) ? "down" : "up"
  document.getElementsByClassName("pager")[curPage].className = "pager"
  if (wDelta === "down") {
    curPage++
    curPage = Math.min(curPage, numPages - 1)
  } else if (wDelta === "up") {
    curPage--
    curPage = Math.max(0, curPage)
  }
  firstSection.style.marginTop = curPage * -100 + "vh"
  paginationOuter.style.top = 100 * curPage + "vh"
  document.getElementsByClassName("pager")[curPage].className += " active"
}

/* Manual scrolling (via pagination) */
var manualScroll = function(e) {
  if (Date.now() - lastScrolled < scrollDelay) {
    return
  }
    lastScrolled = Date.now()
  if (i < 0 || i > numPages - 1) {
    return
  }
  document.getElementsByClassName("pager")[curPage].className = "pager"
  e = e.target || e.srcElement
  for (var i = 0; i < pagination.childNodes.length; i++) {
    if (pagination.childNodes[i] === e) {
      curPage = i
    }
  }
  firstSection.style.marginTop = curPage * -100 + "vh"
  paginationOuter.style.top = 100 * curPage + "vh";
  document.getElementsByClassName("pager")[curPage].className += " active"
}

/* Setup Scroll Listener */
if (document.addEventListener) {
  forEach(["scroll", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
      function (item, i) { document.addEventListener(item, handleScroll, false) })
} else if (main.attachEvent) {
  document.attachEvent("onscroll", handleScroll)
}

/* Center pagination */
var centerPagination = function () {
 paginationOuter.style['line-height'] = paginationOuter.offsetHeight + 'px'
}
window.onload = centerPagination
window.onresize = centerPagination

/* Add pagination links */
for (var i = 0; i < numPages; i++) {
    var pager = document.createElement("li")
    pager.className += "pager"
    pagination.appendChild(pager)
    pager.addEventListener("click", manualScroll, false)
}
document.getElementsByClassName("pager")[0].className += " active"

/* Utils */
function forEach(array, fn) {
  for (i = 0; i < array.length; i++) {
    fn(array[i], i)
  }
}
