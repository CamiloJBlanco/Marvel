import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import md5 from "md5";
import Comics from "./components/Comics";
import Comic from "./components/Comic";
import logo from "./logo/marvel.jpg";
import "./App.scss";
import Filters from "./components/Filters";

//filteredC
class App extends Component {
    state = {
        filteredC: [],
        comics: [],
        inputValue: "",
        inputHidden: true,
        showWindowPortal: false,
    };

    componentDidMount() {
        var ts = new Date().getTime();
        var hash = md5(ts + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY);

        fetch(`https://gateway.marvel.com:443/v1/public/comics?apikey=${process.env.REACT_APP_PUBLIC_KEY}&ts=${ts}&hash=${hash}`)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    comics: json.data.results,
                    filteredC: json.data.results,
                });
            })
            .catch(console.log);
    }

    render() {
        return (
            <div>
                <Router>
                <div className="header" >
                    <Link to="/">
                        <img src={logo} alt="marvel" width="300" />
                    </Link>
                </div>   
                    <Switch>
                        <Route path="/comic/:comicId">
                            <Comic />
                        </Route>
                        <Route path="/comic">
                            <h3 className="comicNotSelected">Please select a comic</h3>
                        </Route>
                        <Route path="/">
                            <Filters 
                            onSearchHero={this.onSearchHero}
                            filteredC={this.state.filteredC}
                            />
                            <Comics
                                filteredC={this.state.filteredC}
                                inputValue={this.state.inputValue}
                                onSearchHero={this.onSearchHero}
                                inputHidden={this.state.inputHidden}
                                toggleInputClass={this.toggleInputClass}
                                toggleWindowPortal={this.toggleWindowPortal}
                                showWindowPortal={this.state.showWindowPortal}
                            />
                        </Route>
                    </Switch>
                </Router>
                <div className="footer">
                    2021 Marvel ©
                </div>
            </div>
        );
    }

    //Abre y cierra el toggle de input
    toggleInputClass = () => {
        this.setState({ inputHidden: !this.state.inputHidden });
    };
    
    //Dispara la busqueda del Hero (character)
    onSearchHero = (event) => {
        let searchValue = event.target.value;
        this.setState({ inputValue: searchValue });

        if (searchValue.length === 0) {
            this.setState({ filteredC: this.state.comics });
        } else {
            this.setState({
                filteredC: this.state.comics.filter((comic) => {
                    if (comic.characters.items.find((character) => character.name.toLowerCase().includes(searchValue.toLowerCase()))) {
                        return comic;
                    }
                    return null;
                }),
            });
        }
    };

}
export default App;
