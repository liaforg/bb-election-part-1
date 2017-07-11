document.addEventListener("DOMContentLoaded", function() {

  var summonCandidates = document.querySelectorAll('responseData.candidates')

  runSummonCandidates = document.addEventListener('click', function(event) {
    console.log('click');

    $.ajax({
      url: 'https://bb-election-api.herokuapp.com/',
      method: 'GET',
      dataType: 'json',
    }).done(function (responseData){
        console.log(responseData);
        for(var i = 0; i < responseData.candidates.length; i++) {
          var element = document.createElement('div');
          element.innerHTML = 'Name: ' + responseData.candidates[i].name + "<br>" + ' Votes:  ' + responseData.candidates[i].votes + "<br>" + "<br>";
          document.querySelector('#list').append(element);
        };
      });

    });
});
