$(document).foundation();
hljs.initHighlighting();

function navMatches(elt) {
  var path = window.location.pathname;
  var url = $('a', elt).attr('href');
  if (url === undefined || url.match('^(https?:)?\\/\\/')) {
    return false;
  }
  var mode = $('a', elt).attr('data-match');
  if (mode === undefined) {
    mode = 'prefix';
  }
  console.log('checking url ' + url);
  if (mode == 'exact') {
    return url === path;
  } else if (mode.substring(0,3) == 're:') {
    var regex = mode.substring(3);
    console.log('testing regex ' + regex);
    return new RegExp(regex).test(path);
  } else {
    var pat;
    if (url.charAt(0) == '/') {
      pat = '^' + url;
    } else {
      pat = '(^|/)' + url;
    }
    var regex = new RegExp(pat);
    return path.match(regex);
  }
}

$('.side-nav li').each(function() {
  if (navMatches(this)) {
    console.log('found active URL');
    $(this).addClass('active');
  }
});
$('#site-menu li').each(function() {
  if (navMatches(this)) {
    console.log('found active URL');
    $(this).addClass('active');
  }
});
// check if we need to enable HighlightJS
if ($('pre code').length > 0) {
  var hjsb = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/'
  $('head').append('<link rel="stylesheet" type="text/css" href="' + hjsb + 'styles/github.min.css">')
  $('head').append('<script type="text/javascript" src="' + hjsb + 'highlight.min.js" async></script>')
}
