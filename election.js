document.addEventListener("DOMContentLoaded", function() {

  var summonCandidates = document.querySelector('#see-candidates')


  runSummonCandidates = summonCandidates.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('click');


    $.ajax({
      url: 'https://bb-election-api.herokuapp.com/',
      method: 'GET',
      dataType: 'json',
    }).done(function (responseData){
        console.log(responseData);
        for(var i = 0; i < responseData.candidates.length; i++) {
          var element = document.createElement('div');
          element.innerHTML = 'Name: ' + responseData.candidates[i].name + "<br>" + ' Votes:  ' + responseData.candidates[i].votes + "<br>"
          document.querySelector('#list').append(element);

          var form = document.createElement('form');
          form.setAttribute('method', 'POST');
          form.setAttribute('action', 'https://bb-election-api.herokuapp.com/vote');
          element.append(form);

          var input = document.createElement('input');
          input.setAttribute('type', 'hidden');
          input.setAttribute('value', responseData.candidates[i].name);
          input.setAttribute('name', 'name');
          form.append(input);

          var button = document.createElement('button');
          document.querySelectorAll('form')[i].addEventListener('submit', function(event){
            event.preventDefault();
            console.log('clicked');
            var vote = $(this).children('input[type=hidden]').val();
            console.log(vote)
            console.log(this)
            $.ajax({
              url: 'https://bb-election-api.herokuapp.com/vote?name=' + vote,
              method: 'POST',
              dataType: 'JSON'
            }).done(function(){
              console.log('voted');
            }).fail(function(){
              console.log('failed');
            });
          });
          button.setAttribute('type', 'submit');
          var buttonText = document.createTextNode('VOTE!');
          button.append(buttonText);
          form.append(button);

        };
      });
    });

    $("#refreshButton").click(function() {
      setTimeout(location.reload(true), t);
});


});
