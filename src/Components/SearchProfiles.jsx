import { Component } from "react";
import Card from "./Card";

export default class SearchProfiles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[],
            login:"",
            is:true
        }
    }
    setValue =(event)=> {
        this.setState({login:event.target.value})
    }
    setData = ()=> {
        fetch(`https://api.github.com/users/${this.state.login}`)
        .then(res => {
            res.json()
            .then(datas => {
                this.setState({data:[datas],is:false})
            })
        })
    }
    render() {
        console.log(this.state.data);
        return <>
        <div>
            <div className="header"><h1>Created by Rohit Sharma</h1>
            <nav><input type="text" placeholder="Search here" onChange={this.setValue} /> <span onClick={this.setData}>🔍</span></nav>
            </div>
            <div>
                {
                    this.state.is?(<Card/>):(
                        this.state.data[0].message !=='Not Found'?(
                            <div className="main_block search_main_block">
                        {this.state.data.map(value=> {
                            let {avatar_url, login, html_url} = value;
                            return <div className="card" key= {html_url}>
                                    <img src = {avatar_url}  alt="image is not loaded"/>
                                    <h2>{login}</h2>
                                    <a href={html_url} target = "_blank" rel="noreferrer">Goto Profile</a>
                                    </div>
                            }
                        )}
                        </div>
                        ):(
                            <div className="not_found">
                                <h1>Data not found</h1>
                            </div>
                        )
                    )
                }
            </div>
        </div>
        </>
    }
}