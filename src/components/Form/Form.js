import React from 'react';
import APIService from '../../services/APIService/APIService'
import FileService from '../../services/FileService/FileService'
import states from './states'

const initialFormState = {
  sort: "relevance",
  city: "New York",
  state: "NY",
  raduis: 10,
  prop_type: {
    "single_family": true,
    "condo": true,
    "mobile": true,
    "multi_family": true,
    "farm": true,
    "land": true,
  },
  price_min: 100000,
  price_max: 250000,
  beds_min: 1,
  baths_min: 1,
  limit: 200,
  offset: 0,
}

function setHidesLoadingSpinner(hidesLoadingSpinner) {
  this.setState({ hidesLoadingSpinner })
}

function onPropTypeChange(event) {
  let form = { ...this.state.form }
  form.prop_type[event.target.id] = !form.prop_type[event.target.id]
  this.setState({ form })
}

function onInputChange(event) {
  let form = { ...this.state.form }
  form[event.target.id] = event.target.value

  this.setState({ form })
}

function onSubmit(event) {
  event.preventDefault()
  this.setHidesLoadingSpinner(false)

  const form = { ...this.state.form }

  form.prop_type = Object.keys(form.prop_type)
  .filter(type => this.state.form.prop_type[type])
  .join(',')

  this.apiService
  .post(form)
  .then(this.fileService.downloadFile)
  .catch(error => alert("Oops, something went wrong"))
  .finally(() => this.setHidesLoadingSpinner(true))
}

function PropertyTypeSelector() {
  const options = Object.keys(this.state.form.prop_type)

  return options.map((option, index) => {
    return (
      <div key={index} className="form-check">
        <input
        type="checkbox"
        className="form-check-input"
        id={option}
        onChange={this.onPropTypeChange}
        checked={this.state.form.prop_type[option]}
        />
        <label className="form-check-label">{option}</label>
      </div>
    )
  })
}

function SortSelector() {
  const options = [
    "relevance",
    "price_low",
    "price_high",
    "photos",
    "newest",
    "open_house_date",
    "sqft_high",
    "price_reduced_date",
  ]

  return (
    <div className="form-group">
      <label>Sort by</label>
      <select id="sort" defaultValue={this.state.form.sort} className="form-control" onChange={this.onInputChange}>
        {options.map(option => <option key={option}>{option}</option>)}
      </select>
    </div>
  )
}

function StateSelector() {
  return (
    <div className="form-group">
      <label>State</label>
      <select id="state" defaultValue={this.state.form.state} className="form-control" onChange={this.onInputChange}>
        {states.map((state, index) => <option key={index}>{state.Code}</option>)}
      </select>
    </div>
  )
}

function Inputs() {
  const inputData = [
    { id: 'city', title: "City", type: "text", value: this.state.form.city, placeholder: "Enter a city name" },
    { id: 'raduis', title: "Radius (miles)", type: "number", value: this.state.form.raduis },
    { id: 'price_min', title: "Min Price", type: "number", value: this.state.form.price_min },
    { id: 'price_max', title: "Max Price", type: "number", value: this.state.form.price_max },
    { id: 'beds_min', title: "Min Bedrooms", type: "number", value: this.state.form.beds_min },
    { id: 'baths_min', title: "Min Bathrooms", type: "number", value: this.state.form.baths_min },
    { id: 'limit', title: "Result Limit", type: "number", value: this.state.form.limit },
    { id: 'offset', title: "Page offset", type: "number", value: this.state.form.offset, description: 'Ex: Offset 0 will return first 200 records, offset 1 will return 201 - 400, etc.' },
  ]

  return inputData.map((input, index) => {
    return (
      <div className="form-group" key={input.id}>
        <label>{input.title}</label>
        <input
          id={input.id}
          className="form-control"
          aria-describedby={input.title}
          type={input.type}
          value={input.value}
          placeholder={input.placeholder}
          onChange={this.onInputChange}
        />
        {input.description ? <small>{input.description}</small> : null}
      </div>
    )
  })
}

function Button() {
  return <button type="submit" className="btn btn-primary">Submit</button>
}

function LoadingSpinner() {
  const style = {
    color: "#79bbb5",
    padding: '1%',
  }

  return (
    <div className='form-group'>
      <div className="la-ball-clip-rotate" style={style}>
        <div></div>
      </div>
    </div>
  )
}

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.apiService = new APIService()
    this.fileService = new FileService()
    this.onPropTypeChange = onPropTypeChange.bind(this)
    this.onSubmit = onSubmit.bind(this)
    this.setHidesLoadingSpinner = setHidesLoadingSpinner.bind(this)
    this.onInputChange = onInputChange.bind(this)
    this.PropertyTypeSelector = PropertyTypeSelector.bind(this)
    this.SortSelector = SortSelector.bind(this)
    this.StateSelector = StateSelector.bind(this)
    this.LoadingSpinner = LoadingSpinner.bind(this)
    this.Inputs = Inputs.bind(this)
    this.Button = Button.bind(this)
    this.state = {
      form: { ...initialFormState },
      hidesLoadingSpinner: true,
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <this.PropertyTypeSelector/>
        <this.SortSelector/>
        <this.StateSelector/>
        <this.Inputs/>
        {this.state.hidesLoadingSpinner ? <this.Button/> : <this.LoadingSpinner/>}
      </form>
    )
  }
}

export default Form
