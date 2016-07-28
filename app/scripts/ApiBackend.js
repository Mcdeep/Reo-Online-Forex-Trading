(function(){
  "use strict";
  
  angular.module('ApiBackend', ['ngMockE2E'])
    .run(function($httpBackend) {
      var module = {
        url: 'api/module',
        data: [
          {
            id: 1,
            name: 'What is forex?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum debitis harum sint natus? Deleniti voluptas, eum voluptates repellendus.',
            lesson: '1'              
          },
           {
            id: 2,
            name: 'What is forex?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum debitis harum sint natus? Deleniti voluptas, eum voluptates repellendus.',
            lesson: '2'              
          },
           {
            id: 3,
            name: 'What is forex?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum debitis harum sint natus? Deleniti voluptas, eum voluptates repellendus.',
            lesson: '3'              
          }
        ]
      };
      
      var lesson = {
        url: 'api/lesson/lesson_id',
        data: {
          name: 'What is Forex?',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum debitis harum sint natus? Deleniti voluptas, eum voluptates repellendus.',
          videoUrl: 'https://www.youtube.com/watch?v=JCHUAHohotA',
          pictureUrl:''
        }
      };
      
      var quiz = {
        url: 'api/quiz/lesson_id',
        data : 
        {
          questions: [
            {
              question_id: '1',
              question: 'What is a breakout?',
              question_answers: [
                  {
                    answer_id: '1',
                    answer: 'When Price Breaks Resistance'
                  },
                  {
                    answer_id: '2',
                    answer: 'When Price Breaks Support'
                  },
                  {
                    answer_id: '3',
                    answer: 'When Price Breaks Resistance or Support'
                  },
                  {
                    answer_id: '3',
                    answer: 'Don\'t Know'
                  }
                ]
            }
          ]
        }
        
      }
      
    });
})();