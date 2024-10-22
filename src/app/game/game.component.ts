import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal} from '@angular/core';
import { ResponseJson } from '../response-json';
import { Question } from '../question';
import { Router } from '@angular/router';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['../app.component.css', './game.component.css'],
})
export class GameComponent implements OnInit {
  private url = "https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple";
  // private url = 'questions.json';
  questions: Question[] = [];
  currentQuestion: Question = {} as Question;
  availableQuestions = [];
  score: number = 0;
  questionCounter: number = 0;
  acceptingAnswers: boolean = true;
  CORRECT_BONUS: number = 10;
  MAX_QUESTIONS: number = 10;
  quizProgress: number = 0;
  classToApply: string = '';
  questionProgressText: string = '';
  answerOptions: string[];
  public optionClass = signal<string[]>([]);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.answerOptions = ['A', 'B', 'C', 'D'];
    this.optionClass.set(['', '', '', '']);
  }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this.acceptingAnswers = false;
    this.http.get<ResponseJson>(this.url).subscribe((response) => {
      this.questions = response.results.map((loadedQuestion: any) => {
        const formattedQuestion: Question = {
          question: this.decodeHTML(loadedQuestion.question),
          choices: {},
          answer: 0,
        };
        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
        answerChoices.splice(
          formattedQuestion.answer - 1,
          0,
          loadedQuestion.correct_answer
        );
        answerChoices.forEach((choice, index) => {
          formattedQuestion.choices[index + 1] = this.decodeHTML(choice);
        });
        return formattedQuestion;
      });
      this.startGame();
    });
  }

  startGame(): void {
    this.questionCounter = 0;
    this.score = 0;
    this.getNewQuestion();
  }

  getNewQuestion(): void {
    if (
      this.questions.length === 0 ||
      this.questionCounter >= this.MAX_QUESTIONS
    ) {
      sessionStorage.setItem('mostRecentScore', this.score.toString());
      this.router.navigate(['/end']);
    }
    this.questionCounter++;
    this.optionClass.set(['', '', '', '']);
    this.questionProgressText =
      'Question ' + this.questionCounter + '/' + this.MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random() * this.questions.length);
    this.currentQuestion = this.questions[questionIndex];
    this.questions.splice(questionIndex, 1);
    this.acceptingAnswers = true;
  }

  selectAnswer(selectedAnswer: number): void {
    this.quizProgress = this.questionCounter / this.MAX_QUESTIONS;
    this.classToApply =
      (selectedAnswer == this.currentQuestion.answer ? 'correct' : 'incorrect');
    const currOptionClass = this.optionClass();
    currOptionClass[selectedAnswer - 1] = this.classToApply;
    this.optionClass.set(currOptionClass);
    if (this.classToApply === 'correct')
      this.incrementScore(this.CORRECT_BONUS);
    setTimeout(() => {
      this.getNewQuestion();
    }, 1000); // Delay of 1 seconds to highlight correct/incorrect answer
  }

  incrementScore(num: number): void {
    this.score += num;
  }

  decodeHTML(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

}
