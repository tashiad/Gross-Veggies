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
    this.props.searchByTitle(this.state.value)
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

render() {
    return (
      <form  className='search-body'onSubmit={this.handleSubmit}>
        <label>
          Search by title or enter your minimum desired movie rating:
          <input 
          type="text" 
          name="name" 
          className='input-field'
          value={this.state.value} onChange={this.handleChange}
          />
        </label>
        <button class='search-button'>RT</button>
      </form>
    )
  }
}

export default Form