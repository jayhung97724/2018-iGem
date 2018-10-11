let members = []
let $memberbox = $('#memberbox')

const filterByDivName = (div) => {
  return members.filter((m) => {
    return m.division == div;
  });
}
$.getJSON("./data/NCHU-iGEM-Team.json", (file) => {
  members = file;
  console.log(members);
  var Divisions = $.unique(members.map(function (d) {
    return d.division;
  }));
  console.log(Divisions);
  // console.log(filterByDivName(Divisions[0]));
  Divisions.forEach(div => {
    console.log('=== ' + div + ' ===');
    let cardsTemplate = $('#cardsTemplate').html();
    let division = $(cardsTemplate);
    divHeader = division.siblings('#divHeader');
    divCards = division.siblings('.cards');
    divHeader.text(div);
    cardsID = div.replace(/\s+/, "") 
    divCards.attr('id', cardsID);

    $memberbox.append(divHeader);
    $memberbox.append(divCards);

    let cardTemplate = $(divCards).html();
    // console.log(cardTemplate);
    membersInDivision = filterByDivName(div);
    membersInDivision.forEach((m) => {
      console.log(m.name_EN);
      Dcard = $(cardTemplate).clone();
      // console.log(Dcard);
      // Dcard = card.clone();
      cardImage = Dcard.find('.image').find('img');
      cardContent1 = Dcard.find('#content1');
      cardName = cardContent1.find('#name');
      cardMajor = cardContent1.find('.meta a');
      cardDescription = cardContent1.find('.description');
      cardContent2 = Dcard.find('#content2');
      cardWork = cardContent2.find('.description');
      cardBottom = Dcard.find('.bottom');

      cardImage.attr('src', m.image)
      cardName.text(m.name_EN);
      cardMajor.text(m.major);
      cardWork.text(m.work);
      cardDescription.text(m.short);
      content = m.more;
      cardBottom.attr('data-content', content);
      Dcard.attr('id', m.id);
      // console.log(Dcard);
      divCards.append(Dcard);
    });
  });
  $('.cards .card:first-child()').remove();
  $('.button')
    .popup({
      transition: 'fade up',
      on: 'click'
    });
});