import './App.css'
import {Component} from 'react'
import {v4} from 'uuid'

class App extends Component {
  state = {
    passwordsList: [],
    website: '',
    username: '',
    password: '',
    showPass: false,
    searchIn: '',
  }

  updateText = e => {
    this.setState({website: e.target.value})
  }

  updateUsername = e => {
    this.setState({username: e.target.value})
  }

  updatePassword = e => {
    this.setState({password: e.target.value})
  }

  savePassword = e => {
    e.preventDefault()
    const {passwordsList, website, username, password} = this.state
    passwordsList.push({id: v4(), website, username, password})
    this.setState({passwordsList, website: '', username: '', password: ''})
  }

  deleteItem = e => {
    const {passwordsList} = this.state
    const filterList = passwordsList.filter(
      password => password.id !== e.target.id,
    )
    this.setState({passwordsList: filterList})
  }

  filterResults = e => {
    this.setState({searchIn: e.target.value})
  }

  showHidePass = e => {
    this.setState({showPass: e.target.checked})
  }

  render() {
    const {
      passwordsList,
      website,
      username,
      password,
      showPass,
      searchIn,
    } = this.state
    const filteredList = passwordsList.filter(pass =>
      pass.website.toLowerCase().includes(searchIn.toLowerCase()),
    )
    const count = filteredList.length
    return (
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="add-passwords-card">
          <div className="add-card">
            <h1>Add New Password</h1>
            <form onSubmit={this.savePassword}>
              <div className="input-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-icon"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  value={website}
                  onChange={this.updateText}
                />
              </div>
              <br />
              <div className="input-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-icon"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.updateUsername}
                />
              </div>
              <br />
              <div className="input-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-icon"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.updatePassword}
                />
              </div>
              <br />
              <button type="submit" className="form-button">
                Add
              </button>
            </form>
          </div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="main-icon"
            />
          </div>
        </div>
        {count === 0 ? (
          <div className="password-card">
            <div className="header">
              <div className="header-left-card">
                <h1>Your Passwords</h1>
                <p className="password-count">{count}</p>
              </div>
              <div className="header-left-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
                <input
                  type="search"
                  placeholder="Search"
                  onChange={this.filterResults}
                  value={searchIn}
                />
              </div>
            </div>
            <hr />
            <div className="checkbox">
              <input
                type="checkbox"
                id="hideShowPass"
                onChange={this.showHidePass}
              />
              <label htmlFor="hideShowPass">Show Passwords</label>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
            />
            <p>No Passwords</p>
          </div>
        ) : (
          <div className="password-card">
            <div className="header">
              <div className="header-left-card">
                <h1>Your Passwords</h1>
                <p className="password-count">{count}</p>
              </div>
              <div className="header-left-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
                <input
                  type="search"
                  placeholder="Search"
                  onChange={this.filterResults}
                  value={searchIn}
                />
              </div>
            </div>
            <hr />
            <div className="checkbox">
              <input
                type="checkbox"
                id="hideShowPass"
                onChange={this.showHidePass}
              />
              <label htmlFor="hideShowPass">Show Passwords</label>
            </div>
            <ul className="password-cards">
              {filteredList.map(pwd => (
                <li className="pass-card" key={pwd.id}>
                  <p>{pwd.website}</p>
                  <p>{pwd.username}</p>
                  {showPass && <p>{pwd.password}</p>}
                  {!showPass && (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                      alt="stars"
                    />
                  )}
                  <button type="button" onClick={this.deleteItem}>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      id={pwd.id}
                      testid="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default App
