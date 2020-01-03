import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import Imageform from './components/Imageform/Imageform'
import Rank from './components/Rank/Rank'
import Facerecognition from './components/Facerecognition/Facerecognition'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Particles from 'react-particles-js';


const particlesopt = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    },
    line_linked: {
      enable_auto: true,
    }
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      }
    }
  }
}
const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }


}
class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }

    })
  }

  calculateFaceBox = (data) => {
    const boxValue = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      left: boxValue.left_col * width,
      top: boxValue.top_row * height,
      right: width - (boxValue.right_col * width),
      bottom: height - (boxValue.bottom_row * height),
    }
  }
  displayFacebox = (box) => {
    console.log(box)
    this.setState({ box: box })
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value });

  }
  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://cryptic-mesa-64756.herokuapp.com/imageurl", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    }).then(response => response.json())
      .then(response => {
        if (response) {
          fetch("https://cryptic-mesa-64756.herokuapp.com/image", {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(res => res.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(err => console.log(err))
        }

        this.displayFacebox(this.calculateFaceBox(response))
      })//console.log();// do something with response
      .catch(err => console.log(err))

  }
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesopt} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {route === 'home'
          ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <Imageform onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit} />
            <Facerecognition box={box} imageUrl={imageUrl} />
          </div>
          : (route === 'signin' ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />)
        }
      </div>
    );
  }
}

export default App;
