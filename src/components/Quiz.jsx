import React from 'react'
import { IonPopover, IonButton, IonModal, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonImg, IonMenuButton, IonPage, IonGrid, IonCol, IonRow, IonToolbar, IonProgressBar, IonInput, IonFooter } from '@ionic/react';
import { trophy } from 'ionicons/icons';
import '../styles/quiz.css';

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
        progressDiff: 0, // should be 1/gameNumQuizzes.length
        totalScore: 0,
        progressValue: 0,
        quizScore: 20,
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
        refreshedData: false
    }


    UNSAFE_componentDidMount() {
        console.log('quizz ==>', this.props.quiz)
        this.setState({
            quiz: this.props.quiz,
            currentQuizz: this.props.currentQuizz,
        })
    }

    componentWillReceiveProps(props) {
        console.log('quizzProp ==>', props)
        if (props.quiz.question) {
            this.setState({
                quiz: props.quiz,
                currentQuizz: props.currentQuizz + 1,
                refreshedData: true
            })
        }

        console.log('question',props.quiz.question)
    }

    changeAnswer = (e) => {
        this.setState({ answer: e.target.value })
        let answer = e.target.value.toUpperCase()
        let trueAnswer = this.state.quiz.answer.content.toUpperCase()

        if (answer === trueAnswer) {
            let hint = this.state.hintUsed ? 5 : 0

            this.setState({
                correctAnswer: true,
                iconAnswer: "far fa-check-circle",
                iconAnswerStyle: 'greenAnswer',
                disableInput: true,
                progressValue: this.state.progressValue + this.state.progressDiff,
                totalScore: this.state.totalScore + this.state.quiz.score - hint,
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

    getPlaceholder = (num) => {
        return [...Array(num)].forEach(() => { return 'hello' })
    }


    showHint = () => {
        this.setState({
            showPopover: true,
            hintUsed: true
        })
    }


    sendCoordinates = () => {
        this.props.history.push({
            pathname: '/map',
            lat: this.state.quiz.location.lat,
            lng: this.state.quiz.location.lng,
            locationName: this.state.quiz.locationName
        })
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
                <IonModal
                    isOpen={this.state.showModal}
                    onDidDismiss={e => this.setState({ showModal: false })}
                >
                    <IonContent className="modalWindow three" >
                        <IonGrid className="onboardingGrid">
                            <IonRow>
                                <IonIcon className="manaoLogoLogin game" src="assets/Logo-yellow.svg"></IonIcon>
                            </IonRow>
                            <IonRow>
                                <h1 className="guide">{this.state.quiz.indication}</h1>
                            </IonRow>
                            <IonRow>
                                <IonItem className="guideContainer" onClick={this.sendCoordinates}>
                                    <h1 className="guide locationName">{this.state.quiz.locationName}</h1>
                                </IonItem>
                            </IonRow>
                        </IonGrid>

                        <i onClick={e => this.setState({ showModal: false })} style={{ backgroundColor: 'transparent' }} className="fas fa-angle-double-down"></i>

                    </IonContent>
                </IonModal>
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
                            <IonIcon className="manaoLogo" src="assets/logo-black-shadow.svg"></IonIcon>
                        </IonCol>
                        <IonCol size="9" offset="2" className="problemBox">
                            {/* {!this.state.refreshedData ? <p className="problemString">loading problem...</p> : <p className="problemString">problem loaded!</p>} */}
                            {
                                this.state.quiz.question.type === 'text' ? <p className="problemString">{this.state.quiz.question.content}</p> : <IonImg className="problemImg" src={`${this.state.quiz.question.content}`} />
                            }

                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonItem className={`answerForm ${this.borderInput()}`}>

                    {/* <IonInput value={this.state.answer} className="answer" type="tel" maxlength={`${this.state.quiz.answer.content.length}`} disabled={this.state.disableInput} placeholder={this.state.inputPlaceholder} onIonChange={(e) => this.changeAnswer(e)}></IonInput> */}
                    <IonItem className={`checkIcon ${this.state.iconAnswerStyle}`}><i className={this.state.iconAnswer}></i></IonItem>
                </IonItem>

                <IonPopover
                    translucent={true}
                    animated={false}
                    cssClass="popover"
                    isOpen={this.state.showPopover}
                    onDidDismiss={e => this.setState({ showPopover: false })}
                >
                    {/* {
                        this.state.quiz.hint.type === "text" ? (<div className="hintBox">{this.state.quiz.hint.content}</div>) : (
                            <IonImg className="problemImg imgHint" src={`${this.state.quiz.hint.content}`} />)

                    } */}
                </IonPopover>

                <IonButtons className={`hintIcon ${this.state.hintUsed ? 'hintUsed' : ''}`} onClick={this.showHint}><IonIcon className="manaoLogo " src="assets/hintIcon-white.svg"></IonIcon></IonButtons>
            </IonContent>


            // 
            //     <IonHeader no-border className="noShadow">
            //         <IonToolbar className="quizbar noShadow">
            //             <IonButtons slot="start">
            //                 <IonMenuButton style={{ color: 'white' }} />
            //             </IonButtons>
            //             <div className="menuBox"></div>

            //             <IonIcon className="scoreIcons trophy" icon={trophy}></IonIcon>
            //             <div className="scoreIcons score" >{this.state.totalScore}</div>
            //             <IonProgressBar value={this.state.progressValue} className="ionProgressBar" buffer={this.state.progressValue}>
            //             </IonProgressBar>
            //             <IonButtons onClick={this.sendCoordinates}>
            //                 <IonIcon className="mapIcon" slot="end" src="assets/locationmapIcon.svg"></IonIcon>
            //             </IonButtons>
            //         </IonToolbar>
            //     </IonHeader>

            //     <IonContent className="quizMain  ion-padding">
            // <IonGrid>
            //     <IonRow>
            //         <h1 className="titleChallenge">CHALLENGE # {this.state.currentQuizz}</h1>
            //     </IonRow>
            //     <div className="extraInfo">
            //         <h6>Did you know?</h6>
            //         <p className="description" >
            //             {this.state.quiz.placeDescription}
            //         </p>
            //     </div>

            // </IonGrid>
            // <IonGrid >
            //     <IonRow>
            //         <IonCol size="1" >
            //             <IonIcon className="manaoLogo" src="assets/logo-black-shadow.svg"></IonIcon>
            //         </IonCol>
            //         <IonCol size="9" offset="2" className="problemBox">
            //             {
            //                 this.state.quiz.question.type === 'text' ? <p className="problemString">{this.state.quiz.question.content}</p> : <IonImg className="problemImg" src={`${this.state.quiz.question.content}`} />
            //             }

            //         </IonCol>
            //     </IonRow>
            // </IonGrid>
            // <IonItem className={`answerForm ${this.borderInput()}`}>

            //     <IonInput value={this.state.answer} className="answer" type="tel" maxlength={`${this.state.quiz.answer.content.length}`} disabled={this.state.disableInput} placeholder={this.state.inputPlaceholder} onIonChange={(e) => this.changeAnswer(e)}></IonInput>
            //     <IonItem className={`checkIcon ${this.state.iconAnswerStyle}`}><i className={this.state.iconAnswer}></i></IonItem>
            // </IonItem>

            // <IonPopover
            //     translucent={true}
            //     animated={false}
            //     cssClass="popover"
            //     isOpen={this.state.showPopover}
            //     onDidDismiss={e => this.setState({ showPopover: false })}
            // >
            //     {
            //         this.state.quiz.hint.type === "text" ? (<div className="hintBox">{this.state.quiz.hint.content}</div>) : (
            //             <IonImg className="problemImg imgHint" src={`${this.state.quiz.hint.content}`} />)

            //     }
            // </IonPopover>

            //     </IonContent >
            //     <IonFooter >
            //     
            //     </IonFooter>

        )
    }
}

export default Quiz