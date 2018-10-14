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
    span = title.find('span');
    span.text(ptc.title);
    olTag = content.find('ol');
    _content = "";
    ptc.content.forEach(step => {
      _content = _content + `<li>${step}</li>`
    });
    olTag.append(_content);
    
    $accordion.append(title);
    $accordion.append(content);
  })
  $('.accordion').accordion('open', 0);
});
