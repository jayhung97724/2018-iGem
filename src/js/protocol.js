let protocols = [];
let $accordion = $('.accordion');
$.getJSON("./data/protocols.json", (file) => {
  protocols = file;
  console.log(protocols);
  protocols.forEach((ptc) => {
    let templateString = $('#articleTemplate').html();
    let template = $(templateString);
    title = template.siblings('.title');
    content = template.siblings('.content');
    ptitle = title.find('span');
    ptitle.append($.parseHTML(ptc.title));
    $accordion.append(title);
    olTag = content.find('ol');
    _content = "";
    ptc.content.forEach(step => {
      _content = _content + `<li>${step}</li>`
    });
    olTag.append(_content);
    $accordion.append(content);
  })
  $('.accordion').accordion('open', 0);
  $('#articleTemplate').remove()
});
