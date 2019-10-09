import React from 'react'
import { IonButton, IonModal, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonImg, IonMenuButton, IonPage, IonGrid, IonCol, IonRow, IonToolbar, IonProgressBar, IonInput, IonFooter } from '@ionic/react';
import { lock, unlock, trophy } from 'ionicons/icons'
import '../styles/quiz.css';
import '../styles/userOnboarding.css'

class Quiz extends React.Component {
    state = {
        quiz: {
            location: {
                lat: 0,
                lng: 0
            },
            question: {
                content: '',
                type: 'text'
            },
            answer: {
                content: '',
                type: 'text'
            },
            hint: {
                content: '',
                type: ''
            },
            score: 0,
            images: [],
            locationName: '',
            indication: '',
            placeDescription: '_ _',
        },
        progressValue: 0,
        iconAnswer: '',
        iconAnswerStyle: '',
        showHint: false,
        answer: '',
        hintUsed: false,
        disableInput: false,
        inputPlaceholder: '______',
        showPopover: false,
        correctAnswer: false,
        showModal: true,
        currentQuizz: 1,
        progressDiff: 0,
				showKeyboard: true
    }


    UNSAFE_componentDidMount() {
        console.log('quizz ==>', this.props.quiz)
        let placeholderLength = this.props.quiz.answer.content.length
        this.setState({
            quiz: this.props.quiz,
            currentQuizz: this.props.currentQuizz,
            inputPlaceholder: this.getPlaceholder(placeholderLength)
        })
    }

    componentWillReceiveProps(props) {
        console.log('quizzProp ==>', props)

        if (props.quiz.question) {
            let placeholderLength = props.quiz.answer.content.length
            this.setState({
                quiz: props.quiz,
                currentQuizz: props.currentQuizz + 1,
                progressDiff: props.progressDiff,
                inputPlaceholder: this.getPlaceholder(placeholderLength)
            })
        }

    }

		toggleFooter = () => {
			this.setState({
				showKeyboard: !this.state.showKeyboard
			})
		}

    changeAnswer = (e) => {
        this.setState({ answer: e.target.value })
        let answer = e.target.value.toUpperCase()
        let trueAnswer = this.state.quiz.answer.content.toUpperCase()

        if (answer === trueAnswer) {
            let hint = this.state.hintUsed ? 5 : 0
            let progressValue = this.state.progressValue + this.state.progressDiff
            let score = this.state.quiz.score - hint

            this.props.onCorrect(progressValue, score)

            this.setState({
                correctAnswer: true,
                iconAnswer: "far fa-check-circle",
                iconAnswerStyle: 'greenAnswer',
                disableInput: true,
                progressValue: progressValue
            })
        }

        else if (answer === '') {
            this.setState({
                iconAnswer: ''
            })
        }
        else {
            this.setState({
                correctAnswer: false,
                iconAnswer: "far fa-times-circle",
                iconAnswerStyle: 'redAnswer',
            })
        }

    }

    // getInputFontSize = () => {
    //     let w = width
    //     let l = length
    //     let r =
    // }

    getPlaceholder = (num) => {
        console.log('placeholder length', num)
        let outcome = ''
        for (var i = 0; i < num; i++) {
            outcome += '_ '
        }
        console.log('outcome', outcome)
        return outcome
    }


    showHint = () => {
        this.setState({
            showPopover: true,
            hintUsed: true
        })
    }

    backToDefault = () => {
        this.setState({
            currentQuizz: this.state.currentQuizz + 1,
            iconAnswerStyle: '',
            iconAnswer: '',
            hintUsed: false,
            disableInput: false,
            correctAnswer: false,
            answer: '',
            showModal: true,
            quiz: {}
        })
        this.props.nextQuiz()

        // console.log('next Quiz is ready!')
    }


    borderInput = () => {
        if (this.state.answer === '') {
            return ''
        }
        if (this.state.correctAnswer) {
            return 'greenBorder'
        }
        else {
            return 'redBorder'
        }
    }

    render() {
        return (

            <IonContent className="quizMain  ion-padding">
                <IonGrid>
                    <IonRow>
                        <h1 className="titleChallenge">CHALLENGE # {this.state.currentQuizz}</h1>
                    </IonRow>
                    <div className="extraInfo">
                        <h6>Did you know?</h6>
                        <p className="description" >
                            {this.state.quiz.placeDescription}
                        </p>
                    </div>
                </IonGrid>
                <IonGrid >
                    <IonRow>
                        <IonCol size="1" >
                            <IonIcon className="manaoLogo" src="assets/manao-logo.svg"></IonIcon>
                        </IonCol>
                        <IonCol size="9" offset="2" className="problemBox">
                            {
                                this.state.quiz.question.type === 'text' ? <p className="problemString">{this.state.quiz.question.content}</p> : <IonImg className="problemImg" src={`${this.state.quiz.question.content}`} />
                            }

                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonItem className={`answerForm ${this.borderInput()}`}>
                    <IonInput onFocus={this.toggleFooter} onBlur={this.toggleFooter} value={this.state.answer} className="answer" type="tel" maxlength={`${this.state.quiz.answer.content.length}`} disabled={this.state.disableInput} placeholder={this.state.inputPlaceholder} onIonChange={(e) => this.changeAnswer(e)}></IonInput>
                    <IonItem className={`checkIcon ${this.state.iconAnswerStyle}`}><i className={this.state.iconAnswer}></i></IonItem>
                </IonItem>

                <IonModal
                    isOpen={this.state.showPopover}
                    onDidDismiss={e => this.setState({ showPopover: false })}
                    cssClass="popover"
                    animated="false"
                >
                    {
                        this.state.quiz.hint.type === "text" ? (<div className="hintBox">{this.state.quiz.hint.content}</div>) : (
                            <IonImg className="problemImg imgHint" src={`${this.state.quiz.hint.content}`} />)
                    }
                </IonModal>
								{
									this.state.showKeyboard ?
									<IonButtons className={`hintIcon ${this.state.hintUsed ? 'hintUsed' : ''}`} onClick={this.showHint}><IonIcon className="manaoLogo" src="assets/hint.svg"></IonIcon></IonButtons> : ''
								}

								{
									this.state.showKeyboard ?
									<IonFooter className="footerQuiz" >
	                    <button disabled={!this.state.correctAnswer} onClick={() => this.backToDefault()}>
	                        {this.state.correctAnswer ? (<IonIcon className="lockIcon openLock" icon={unlock}></IonIcon>) :
	                            (<IonIcon className="lockIcon" icon={lock}></IonIcon>)}
	                    </button>
	                    {/* <div className="triangleGame"></div> */}
	                </IonFooter> : ''
								}

            </IonContent>

        )
    }
}

export default Quiz
