import  React, { Component } from 'react'
import './Form.css'

class Form extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Search:
          <input type="text" name="name" value={this.state.value} onChange={this.handleChange}/>
        </label>
        <button>RT</button>
      </form>
    )
  }
}

export default Form