import React, { Component } from "react";
//import SimpleStorageContract from "./contracts/SimpleStorage.json";
import ChainListContract  from "./contracts/ChainList.json";

import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {




  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
   
  }

 


  state = { storageValue: 0, web3: null, accounts: null, contract: null ,price:"" , description:"" ,name :""  };

  componentDidMount = async () => {


    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
       // get from smart contract 
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ChainListContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ChainListContract.abi,
        deployedNetwork && deployedNetwork.address,
      );


    

     /* const instanceCL = new web3.eth.Contract(
        ChainListContract.abi,
        deployedNetwork && deployedNetwork.address,
      ); */

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

  };

  async handleSubmit (event){
   // alert('The value is: ' + this.input.value);
    event.preventDefault();
  // console.log("type is : ",typeof Number(this.price.value))
    // Stores a given value, 5 by default.
    console.log("contract address  is :",this.state.contract.options.address );
    
    alert('The value is: ' + parseFloat(this.state.price,"ether"));
    await this.state.contract.methods.sellArticle(this.state.name, this.state.description ,5 ).send( {from: this.state.accounts[0],
      gas: 500000
    }).then(function(result) {

    }).catch(function(err) {
      console.error(err);
    });
    // Get the value from the contract to prove it worked.
   // const response = await contract.methods.get().call();
  
    // Update state with the result.
    //this.setState({ storageValue: response });
  }


 

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
     
        <form onSubmit={this.handleSubmit}>
        <label>
          Article:
          <input type="text" value ={this.state.name} onChange={event => this.setState({ name: event.target.value })} />
        </label>

        <label>
          Price:
          <input type="text" value ={this.state.price} onChange={event => this.setState({ price: event.target.value })} />
        </label>

        <label>
          Description:
          <input type="text" value ={this.state.descripton} onChange={event => this.setState({ description: event.target.value })}/>
        </label>



        <input type="submit" value="Submit" />
      </form>
    


       
      </div>
    );
  }
}

export default App;
