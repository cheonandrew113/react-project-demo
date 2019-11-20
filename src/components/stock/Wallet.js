import React from 'react'


class Wallet extends React.Component {
   
    
    state= {
        wallet: 100000
    }

    render() { 
        return ( 
            <div>
                ({this.state.wallet} - {this.props.onClick})

            </div>
         );
    }
}
 
export default Wallet;