import React from 'react'
import Style from '../static/styles/main.less'
import Head from '../components/Head'

const STONE_IMAGES = ['1.png', '2.png', '3.png', '4.png', '5.png', 
                    '6.png', '7.png', '8.png', '9.png', '10.png', '11.gif']
                    .map(f => `/static/images/stone_${f}`)

const STONE_ANIM_CLASSES = ['anim-1', 'anim-2', 'anim-3', 'anim-4']

let UID = 0

export default class Index extends React.Component {
    state = {
        buffer: "",
        allText: "",
        kenBurnsMap: {},
    }
    speak = (words, voice) => {        
        console.log('rv: ', responsiveVoice)
        responsiveVoice.speak(words, voice)
    }
    playSound = (sound) => {
        if (sound.ended) sound.currentTime = 0
        if (sound.currentTime > 0) sound.currentTime = 0
        else sound.play()
    }
    onKeyDown = (e) => {
        console.log('on key down: ', e)
        if ((e.key >= 'a' && e.key <= 'z') || e.key == ' ' || e.key == ',' || e.key == '.') {
            this.setState({
                buffer: this.state.buffer + e.key,
                allText: this.state.allText + e.key
            })
            // this.speak("Ancorat in realitate si raportat la sinergia faptelor", "Romanian Female")
        } else if (e.key == 'Enter') {
            const { buffer, allText } = this.state
            this.speak(buffer, "US English Male")
            this.setState({ 
                buffer: "",
                allText: allText + "\n"
            })
        }  else if (e.key == '[') {
            
        } else if (e.key == ']') {

        } else if (e.key == '\\') {
            const newId = ++UID
            this.setState({
                kenBurnsMap: {
                    ...this.state.kenBurnsMap,
                    [newId]: true 
                }
            }, () => {
                setTimeout(() => {
                    this.setState({
                        kenBurnsMap: {
                            ...this.state.kenBurnsMap,
                            [newId]: false   
                        }
                    })
                }, 20000)
            })
        } else if (e.key == '-') {

        } else if (e.key == '=') {

        } else if (e.key == '1') {
            this.playSound(this._bell1)
        } else if (e.key == '2') {
            this.playSound(this._bell2)
        } else if (e.key == '3') {
            this.playSound(this._bell3)
        } else if (e.key == '4') {
            this.playSound(this._bell4)
        } else if (e.key == '5') {
            this.playSound(this._bell5)
        } else if (e.key == '6') {
            this.playSound(this._bell6)
        } else if (e.key == '7') {
            this.playSound(this._bell7)
        } else if (e.key == '8') {
            this.playSound(this._bell8)
        } else if (e.key == '9') {
            this.playSound(this._bell9)
        } 
    }
    getImageForCharacter = (c) => {
        let image
        if (c == " ") image = ""
        else image = STONE_IMAGES[c.charCodeAt() % STONE_IMAGES.length]

        let imageSize
        if (c == "," || c == ".") imageSize = 20
        else imageSize = 75

        let animClass
        animClass = STONE_ANIM_CLASSES[c.charCodeAt() % STONE_ANIM_CLASSES.length]

        return {
            image,
            imageSize,
            animClass
        }
    }
    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown)
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown)
    }
    render() {

        const { allText, kenBurnsMap } = this.state

        console.log(allText, allText.split("\n"))

        return (
            <div>
                <Head/>
                <audio autoPlay loop>
                  <source src="/static/audio/bg-sound.m4a"/>
                </audio>
                <audio ref={(r) => this._bell1 = r} src="/static/audio/bell1.mp3" preload="auto"></audio>
                <audio ref={(r) => this._bell2 = r} src="/static/audio/bell2.mp3" preload="auto"></audio>
                <audio ref={(r) => this._bell3 = r} src="/static/audio/bell3.mp3" preload="auto"></audio>
                <audio ref={(r) => this._bell4 = r} src="/static/audio/bell4.wav" preload="auto"></audio>
                <audio ref={(r) => this._bell5 = r} src="/static/audio/bell5.mp3" preload="auto"></audio>
                <audio ref={(r) => this._bell6 = r} src="/static/audio/bell6.mp3" preload="auto"></audio>
                <audio ref={(r) => this._bell7 = r} src="/static/audio/bell7.mp3" preload="auto"></audio>
                <audio ref={(r) => this._bell8 = r} src="/static/audio/bell8.mp3" preload="auto"></audio>
                <audio ref={(r) => this._bell9 = r} src="/static/audio/bell9.mp3" preload="auto"></audio>

                {   Object.keys(kenBurnsMap).map(k => {
                    if (!kenBurnsMap[k]) return null
                    return (
                        <div key={`ken-burns-${k}`} className="preview-elements-container ken-burns behind">
                            <img src="/static/images/pr1.png"/>
                        </div>    
                    )
                })

                }

                <div className="all-text-container">
                    { allText && allText.split("\n").map((s, index) => {
                        return (
                            <div className="line-container" key={`line-${index}`}>
                                <img className={`letter-image`} key={`image-newline`} src="" width={0} height={this.getImageForCharacter(' ').imageSize}/>

                                { s && s.split("").map((c, index2) => {
                                    const { image, imageSize, animClass } = this.getImageForCharacter(c)                                
                                    return (
                                        <img className={`letter-image ${animClass}`} key={`image-${index}-${index2}`} src={image} width={imageSize}/>
                                    )
                                })}
                            </div>
                        )
                    })
                    }
                </div>

            </div>
        )
    }
}