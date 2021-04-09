import React from 'react';
import { Redirect } from 'react-router-dom';

class Load extends React.Component {
    componentDidMount(){
        setTimeout(() => {
            this.setState({red:true});
            },5000);
    }
    constructor(props) {
        super(props);
        this.state = { red:false }
    }
    render() { 
        return (
        <>
            <div>
                <h1 className="">Bienvenid a Geek Cosmetics </h1>
            </div>
            {this.state.red&&<Redirect to="/opt"></Redirect>}
        </> );
    }
}
 
export default Load;
