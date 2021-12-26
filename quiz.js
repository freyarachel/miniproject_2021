(function() 
 {
  var allQuestions = [{
    question: "Feeling down, depressed, or hopeless",
    options: ["Not at all", "Several days", "Nearly Everyday"],
    answer: 3
  }, {
    question: "Sleeping too much or staying  asleep",
    options: ["Not at all", "Several days", "Nearly Everyday"],
    answer: 3
    
  }, {
    question: "Feeling tired or having little energy",
    options: ["Not at all", "Several days", "Nearly Everyday"],
    answer: 3
  },{
    question: "Trouble concentrating on things, such as reading the newspaper or watching television",
    options: ["Not at all", "Several days", "Nearly Everyday"],
    answer: 3
  }, {
    question: "Moving or speaking so slowly that other people could have noticed",
    options: ["Not at all", "Several days", "Nearly Everyday"],
    answer: 3
  },{
    question: "Thoughts that you would be better off dead, or of hurting yourself",
    options: ["Not at all", "Several days", "Nearly Everyday"],
    answer: 3
  },{
    question: "If you've had any days with issues above, how difficult have these problems made it for you at work, home, school, or with other people?",
    options: ["Not at all", "Several days", "Nearly Everyday"],
    answer: 3
  }];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
    
  nextQuestion();
    
  $('#next').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Please select an option !');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        /*var header = $('<h4>Q) ' + (index + 1) + '</h4>');
        element.append(header);*/

        var question = $('<h4>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        correct = 6;
        score.append('You scored ' + correct + ' out of ' +allQuestions.length);
        return score;
  }
})();