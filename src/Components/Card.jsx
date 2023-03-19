import { Component } from "react";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
        }
    }
    componentDidMount() {
        fetch('https://api.github.com/users')
        .then(res => {
            res.json()
            .then(datas => {
                this.setState({data : datas})
            })
        })
    }
    
    render() {
        return <>
        <div className="main_block">
            {this.state.data.map(value=> {
                let {avatar_url, login, html_url} = value;
                return <div className="card" key= {html_url}>
                <img src = {avatar_url}  alt="image is not loaded"/>
                <h2>{login}</h2>
                <a href={html_url} target = "_blank">Goto Profile</a>
            </div>
            }
                )}
        </div>
        </>
       
    }
}
export default Card;