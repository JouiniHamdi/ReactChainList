import React, { Component } from "react";
//import SimpleStorageContract from "./contracts/SimpleStorage.json";
import ChainListContract  from "./contracts/ChainList.json";

import getWeb3 from "./utils/getWeb3";

import "./App.css";






class Product extends React.Component {


  constructor(props){
    super(props)

    this.handleClick = this.handleClick.bind(this);
    

  }
  async handleClick (event ) {

    

    alert("awww buyyy 3la 1000000 bel ETH")
    
    // alert('The value is: ' + this.input.value);
    event.preventDefault();
  // console.log("type is : ",typeof Number(this.price.value))
    // Stores a given value, 5 by default.é

    console.log("Web3 is :",this.props.web3 );


    console.log("contract address  is :",this.props.contract.options.address );

    //const _price = this.props.price;
    
    alert('The value is: ' + parseFloat(this.props.price,"ether"));

    alert('Idddd: ' +this.props.id);
    await this.props.contract.methods.buyArticle(this.props.id).send( {from: this.props.accounts[0],
      value: this.props.price,
      gas: 500000
    }).then(function(result) {

    }).catch(function(err) {
      console.error(err);
    });
 

    // retrieve the article
   // var _articleId = $(event.target).data('id');
    //var _price = parseFloat($(event.target).data('value'));
/*
    App.contracts.ChainList.deployed().then(function(instance){
      return instance.buyArticle(_articleId, {
        from: App.account,
        value: web3.toWei(_price, "ether"),
        gas: 500000
      });
    }).catch(function(error) {
      console.error(error);
    });
    */
    
  }
  render() {
   
    return (
      <li className="product">
      <div>
          <b>id</b> {this.props.id}
        </div>
        <div>
          <b>Article Name:</b> {this.props.name}
        </div>
        <div>
          <b>Price:</b> {this.props.price}
        </div>
        <div>
          <b>Description:</b> {this.props.description}
        </div>
        <div>
          <b>Sold By:</b> {this.props.seller}
        </div>

        <div>
        <button className="button"  onClick={this.handleClick} > Buy </button> 
         </div>
      </li>
    );
  }
}
 

class App extends Component {




  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state={products: []}


   
  }

 
 


  state = { web3: null, accounts: null, contract: null ,price:"" , description:"" ,name :""  ,id:"",    articleIds: []};

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
      this.setState({ web3, accounts, contract: instance } );
      this.loadBlockchainData();
      console.log("sleeeeeeeeeeeeeeeeeeeeeeee3",this.state.products);
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


  async buyArticle( event) {
    event.preventDefault();

    alert("hamdouuch aw buyyy 3la 1000000 bel ETH")
    /*
    // alert('The value is: ' + this.input.value);
    event.preventDefault();
  // console.log("type is : ",typeof Number(this.price.value))
    // Stores a given value, 5 by default.é
    console.log("contract address  is :",this.state.contract.options.address );
    
    alert('The value is: ' + parseFloat(this.state.price,"ether"));
    await this.state.contract.methods.sellArticle(this.state.name, this.state.description ,5 ).send( {from: this.state.accounts[0],
      gas: 500000
    }).then(function(result) {

    }).catch(function(err) {
      console.error(err);
    });
 


    // retrieve the article
    var _articleId = $(event.target).data('id');
    var _price = parseFloat($(event.target).data('value'));

    App.contracts.ChainList.deployed().then(function(instance){
      return instance.buyArticle(_articleId, {
        from: App.account,
        value: web3.toWei(_price, "ether"),
        gas: 500000
      });
    }).catch(function(error) {
      console.error(error);
    });
    */
  }





   loadBlockchainData() {
     let that = this;
    let articleId;
    let Instance;
   // let artcilesArray;
    Instance = this.state.contract;
    this.state.contract.methods.getArticlesForSale().call().then( res => {
      return res;
      }).then(function(result) {
        for (let i = 0; i < result.length; i++) {
          articleId  = result[i];
         
         Instance.methods.articles(articleId).call().then(function(article) {
           console.log('article: ', article);
          
           that.setState({
            products: [...that.state.products,article ]
          })
          });
         // console.log('array size: ' + articles.length);
        }

      }).catch(function(err) {
        console.error('articles error:' + err);
      });

 /*   ( (articleIds) =>{
 //   console.log("Im here")
  //   console.log('test', articleIds);
   // this.setState({ taskCount })
   for (var i = 0; i < articleIds.length; i++) {
  //   console.log("not here")
     const product =   this.state.contract.methods.getArticlesForSale(articleIds[i]).call({from:this.state.accounts[0],gas:1000000})
    this.setState({
      products: [...this.state.products , product]
    })
   }
   
     })() */
  
    }

 
  async handleSubmit (event){
   // alert('The value is: ' + this.input.value);
    event.preventDefault();
  // console.log("type is : ",typeof Number(this.price.value))
    // Stores a given value, 5 by default.é
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
    this.loadBlockchainData();
  }

  displayProducts(){
  
    console.log("displayyyyyyyyyyyyyyyyyyyyyyyy ");
 
   this.state.contract.methods.getArticlesForSale().call().then(function(articleIds) {

    

    for(var i = 0; i < articleIds.length; i++) {
      var articleId = articleIds[i];
      this.state.instance.articles(articleId).then(function(article){
        this.setState(article[0], article[1], article[3], article[4], article[5]);
      });

    }
  }).catch(function(err) {
    console.error(err.message);

    console.log("article iddddddddddddddddddd");
    //App.loading = false;
  });







  /* this.state.contract.methods.articles().then(function(article){

      this.setState(article[0], article[1], article[3], article[4], article[5])
      
    });*/
     
   
  }



  render() {

    var listItems = this.state.products.map(e => (
      <Product name={e.name} price={e.price} description={e.description} seller = {e.seller} web3={this.state.web3}  contract={this.state.contract} accounts={this.state.accounts} id ={e.id}/>
    ));

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
    

      <div id="container">
          

      </div>
      <ul className="product-list">
           {listItems}
        </ul>

      
       
      </div>
    );
  }
}

export default App;
